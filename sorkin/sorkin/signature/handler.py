from google.appengine.api import users
from google.appengine.ext import ndb
from sorkin.signature import *
import datetime
import json
import logging
import mimetools
import string
import webapp2

class EntityJSONEncoder(json.JSONEncoder):
    """A JSON encoder that also knows how to process Datastore Entities."""

    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return int((obj - datetime.datetime(1970,1,1)).total_seconds())
        elif isinstance(obj, ndb.Model):
            return obj.to_dict(exclude=['photo'])
        else:
            return json.JSONEncoder.default(self, obj)


class ApiException(Exception):

    def __init__(self, status = None, message = None):
        if status:
            self.status = status
        else:
            self.status = 503

        if message is None:
            self.message = ''
        else:
            self.message = message


class BadContentType(ApiException):

    def __init__(self, content_type):
        self.content_type = content_type
        #if(content_type ="multipart/form-data; boundary=----WebKitFormBoundaryg79kJXYl3IiwGBCy"):
         #   self.content_type ="multipart/form-data"
        ApiException.__init__(self, 400, 'Unsupported Content (MIME) Type: %s' % (content_type, ))



class RequestHandler(webapp2.RequestHandler):

    INDENT = 4

    def roles(self, customer_id = None, customer = None):
        """Compute the set of roles that the request has.  This can be based on
        a number of factors.  Roles are strings, defined as such:

        'admin' - An application admin that can modify settings for the given
        customer_id.

        'domain_admin' - User can modify sensitive customer settings, such as
        list of other users who can access application.

        'appengine' - Request is coming from App Engine or an App Engine admin.

        'appengine_admin' - Logged in user is an App Engine admin.

        'appengine_taskqueue' - Request is coming from the App Engine Task
        Queue service.

        'appengine_cron' - Request is coming from the App Engine Cron service.

        'application_admin' - User is allowed to administrator the application
        itself, such as update the client id and view all customer information.
        """

        roles = set()

        if 'X-AppEngine-QueueName' in self.request.headers:
            roles.add('appengine_taskqueue')
            roles.add('appengine')

        if 'X-AppEngine-Cron' in self.request.headers:
            roles.add('appengine_cron')
            roles.add('appengine')

        if users.is_current_user_admin():
            roles.add('application_admin')
            roles.add('appengine_admin')
            roles.add('appengine')
            roles.add('admin')

        user = users.get_current_user()
        if user and (customer_id or customer):
            email = user.email().lower()
            if not customer:
                key = ndb.Key(Customer, customer_id)
                customer = key.get()

            if customer:
                if customer.domain_admin == email:
                    roles.add('domain_admin')
                roles.add('admin')

        return roles


    def handle_exception(self, exception, debug):
        if isinstance(exception, ApiException):
            status = exception.status
            message = exception.message
            lvl = logging.INFO
            exc_info = False
        elif isinstance(exception, webapp2.HTTPException):
            status = exception.code
            if debug:
                message = str(exception)
            else:
                message = 'Internal server error.'
            lvl = logging.ERROR
            exc_info = True
        else:
            status = 503
            if debug:
                message = str(exception)
            else:
                message = 'Internal server error.'
            lvl = logging.ERROR
            exc_info = True

        self.error(message, status = status, lvl = lvl, exc_info = exc_info)


    def load(self):
        content_type = self.request.headers.get('Content-Type', 'application/json')
        semi_index = content_type.find(';')
        if semi_index < 0:
            simple_type = content_type
        else:
            simple_type = content_type[:semi_index]

        if simple_type not in ('application/json','multipart/form-data','multipart/form-data; boundary=----WebKitFormBoundaryg79kJXYl3IiwGBCy'):
            raise BadContentType(content_type)

        try:
            return json.loads(self.request.body)
        except ValueError as err:
            raise ApiException(400, str(err))


    def error(self, message, status = None, lvl = None, exc_info = None):
        if lvl is None:
            if status >= 500:
                lvl = logging.ERROR
            else:
                lvl = logging.INFO

        if exc_info is None:
            if status >= 500 or lvl >= logging.ERROR:
                exc_info = True
            else:
                exc_info = False

        if lvl:
            logging.log(lvl, message, exc_info = exc_info)

        obj = {
            'error': True,
            'message': message
        }

        self.respond(obj, status = status)


    def respond(self, obj, status = None):
        if status is None:
            status = 200

        s = json.dumps(obj, indent = self.INDENT, cls = EntityJSONEncoder)

        self.response.status = status
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(s)


    def respond_ok(self):
        self.respond({'ok': True})


    def is_application_admin(self, customer_id = None, email = None):
        """Test if the user is authorized to adminsitrator the customer's
        account."""
        customer = self.get_customer(customer_id = customer_id, email = email)
        if customer:
            return True
        else:
            return False
