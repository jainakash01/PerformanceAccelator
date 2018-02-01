from sorkin.signature import *
from sorkin.signature.handler import *
import json
import logging
import sorkin
import sorkin.signature
import webapp2
from google.appengine.api import mail
from google.appengine.api import app_identity
import random
from google.appengine.api import urlfetch
from google.appengine.api import images
from google.appengine.ext import blobstore
from datetime import datetime
from google.appengine.ext.webapp import blobstore_handlers


class ApproveAllSteve (RequestHandler):

    def get(self):

        logging.info('Test API for one time execution')


        qry = Credentials.query()
        results = []

        for signature in qry.fetch():
            signature.authenticate_steve = True
            signature.put()
            #x = signature.to_dict(exclude=["photo"])
            #x['_id'] = signature.key.id()
            #results.append(x)

        self.respond_ok()

class CustomerAllApi(RequestHandler):

    def get(self):

        logging.info('Fetching all customers')

        qry = Credentials.query()
        results = []

        for signature in qry.fetch():
            x = signature.to_dict(exclude=["photo"])
            x['_id'] = signature.key.id()
            results.append(x)

        self.respond(results)




class CustomerVerifyApi(RequestHandler):

    def put(self,username):

        submission = self.load()

        logging.info('Inside  verify')
        logging.info(submission)

        key = ndb.Key(Credentials, submission['username'])

        user = key.get()

        if not user:
            self.error('Invalid user', status = 404)
            return

        if not user.authenticate_steve:
            self.error('Verification from Steve is pending, please contact him.', status = 503)
            return

        if not user.authenticated:
            self.error('Email Verification is pending.', status = 503)
            return

        if (user.locked == True):
            logging.info('User is locked')
            elapsed_time = datetime.now() - user.locked_time
            logging.info(elapsed_time.total_seconds())
            if (elapsed_time.total_seconds() > 1 * 60 * 60):
                user.locked = False
                user.locked_time = None
                user.put()
            else:
                self.error('User is locked', status = 404)
                return

            
            

        if ((user.password != submission['password']) or (user is None)):
            self.error('Invalid user', status = 404)
            return

        self.respond(user)




class CustomerApi(RequestHandler):
    """Provide access to individual Customer entities."""

    def get(self, username):
        """Retrieve a customer by customer id. """

        key = ndb.Key(Credentials, username)
        customer = key.get()

        if not customer:
            self.error('Not found', status = 404)
            return

        self.respond(customer)


    def put(self, username):
        """ to update customer details """

        submission = self.load()

        logging.info('updating customer')

        logging.info(submission)

        key = ndb.Key(Credentials, username)

        if key.get() is None:
            customer = Credentials(key = key)
            customer.populate(**submission)
            customer.put()
        else:
            customer = key.get()
            logging.info('dupating')
            try :
                customer.first_name=submission[u'first_name']
            except KeyError as err:
                pass
            try:
                customer.role=submission[u'role']
            except KeyError as err:
                pass
            try:
                customer.company=submission[u'company']
            except KeyError as err:
                pass
            try:
                customer.coach_id=submission[u'coach_id']
            except KeyError as err:
                pass
            try:
                customer.password=submission[u'password']
            except KeyError as err:
                pass
            try:
                customer.phone_number=submission[u'phone_number']
            except KeyError as err:
                pass
            
            customer.first_time_logging = False
            

            customer.put()

        self.respond(customer)


    def delete(self, username):
        """ to delete customer """

        key = ndb.Key(Credentials, username)
        exists = key.get()

        if exists is None:
            self.error('No Such User Exists',404)
            return

        key.delete()

        programKey = ndb.Key(Programs,username)

        if programKey.get() is not None:
            programKey.delete()

        raterKey = ndb.Key(Raters,username)

        if raterKey.get() is not None:
             raterKey.delete()

        self.respond_ok()



    def post(self,username):
        """ to update customer details """

        logging.info('Inside post')

        submission = self.load()

        logging.info(submission)

        hash = str(random.getrandbits(32))

        key = ndb.Key(Credentials, username)
        customer = Credentials(key = key)
        customer.first_name = submission[u'first_name']
        customer.password = submission[u'password']
        customer.email = submission['email']
        customer.last_name = submission[u'last_name']
        customer.company = submission['company']
        customer.phone_number = submission['phone_number']
        customer.role = submission[u'role']
        customer.hashKey = hash
        customer.authenticated = False
        customer.authenticate_steve = False
        customer.first_time_logging = True
        customer.user_logging = False
        customer.put()

        sender_address = 'admin@iaccel-atstakeperformance.com'.format(app_identity.get_application_id())  #'admin@iaccel-atstakeperformance.com'
        logging.info(sender_address);
        message = mail.EmailMessage(
        sender=sender_address,
        subject="Welcome to iaccel")

        urlStr = 'https://iaccel-atstakeperformance.appspot.com/a/customer/' +  username + '/authenticate/' + hash;

        message.to = submission['email']

        message.body = """Dear """ + submission[u'first_name'] + """,

        Thank you for your participation. You are now registered in the i@ccel system provided by @Stake Performance.
        Please authenticate your email by clicking below. The system will subsequently authenticate you.

         """ + urlStr + """

        If you have questions, please contact us.

        Thank you,
        Steve

        ___________________________
        Stephen Sorkin
        Chief Performance Officer
        i@ccel Performance Accelerator
        @Stake Performance
        11622 El Camino Real, Suite 100
        San Diego, CA 92130
        stephen@atstakeperformance.com
        http://atstakeperformance.com/


        """

        message.send()

        urlStr2 = 'https://iaccel-atstakeperformance.appspot.com/a/customer/' +  username + '/steve_authenticate/' + hash;


        message2 = mail.EmailMessage(
        sender=sender_address,
        subject="New request for Client : " +  username)

        message2.to = 'stephen@iaccel-atstakeperformance.com'

        message2.body = """Dear """ + 'Steve' + """:


        New request for user creation.

        Email ID: """ + username + """

        You can confim this user by clicking on below link

        Thank you

        """ +  urlStr2

        message2.send()

        self.respond_ok()



class CustomerLockApi(RequestHandler):
    """Provide access to individual Customer entities."""

    def put(self, username):
        """Retrieve a customer by customer id. """

        key = ndb.Key(Credentials, username)
        customer = key.get()

        if not customer:
            self.error('Not found', status = 404)
            return

        else:
            logging.info('Locking the user')
            customer.locked = True
            customer.locked_time = datetime.now()
            customer.put()

        self.respond(customer)





class CustomerAuthenticateApi(RequestHandler):

    def get(self,username,hashkey):

        #submission = self.load()



        logging.info('Inside  verify')
        #logging.info(submission)

        key = ndb.Key(Credentials, username)

        #user = Credentials(key = key)

        user = key.get()

        if not user:
            self.error('Invalid user', status = 404)
            return

        if (user.hashKey == hashkey) :
            user.authenticated = True
            user.put()
            self.redirect('/')
            return
            #urlfetch.fetch(url='https://localhost:8080/')

        else :
            self.error('Invalid session', status = 404)
            return

        self.respond(user)


class CustomerSteveAuthenticateApi(RequestHandler):

    def get(self,username,hashkey):


        key = ndb.Key(Credentials, username)

        user = key.get()

        if not user:
            self.error('Invalsid user', status = 404)
            return

        if (user.hashKey == hashkey) :
            user.authenticate_steve = True
            user.put()
            self.redirect('/')
            return
            #urlfetch.fetch(url='https://localhost:8080/')

        else :
            self.error('Invalid session', status = 404)
            return

        self.respond(user)

class CustomerChangeAdminApi(RequestHandler):
    """Provide access to individual Customer entities."""

    def put(self,username):
        """ to update customer details """
        logging.info('Changing user admin')

        submission = self.load()

        logging.info(submission)

        if not submission[u'iAmAdmin']:
            self.error('Unauthorized Access', status = 404)
            return

        key = ndb.Key(Credentials, username)
        customer = key.get()

        if not customer:
            self.error('User Not found', status = 404)
            return

        customer.application_role = submission[u'newRole']
        customer.put()




        self.respond(customer)




class CustomerChangePasswordApi(RequestHandler):
    """Provide access to individual Customer entities."""

    def put(self,username):
        """ to update customer details """
        logging.info('Changing user password')

        submission = self.load()

        logging.info(submission)

        if not submission[u'iAmAdmin']:
            self.error('Unauthorized Access', status = 404)
            return

        key = ndb.Key(Credentials, username)
        customer = key.get()

        if not customer:
            self.error('User Not found', status = 404)
            return

        customer.password = submission[u'newPassword']
        customer.put()

        self.respond(customer)


class ForgetPasswordApi(RequestHandler):
    """Provide access to individual Customer entities."""

    def put(self,username):
        """ to update customer details """
        logging.info('Changing user password')

        #submission = self.load()

        #logging.info(submission)


        key = ndb.Key(Credentials, username)
        customer = key.get()

        if not customer:
            self.error('User Not found', status = 404)
            return

        sender_address = 'admin@iaccel-atstakeperformance.com'.format(app_identity.get_application_id())  #'admin@iaccel-atstakeperformance.com'
        logging.info(sender_address);
        message = mail.EmailMessage(
        sender=sender_address,
        subject="Forgot Password Request")

        urlStr = 'http://iaccel-atstakeperformance.com/';

        message.to = username

        message.body = """Dear Member,"""  """:

        Your Password is """ +  customer.password  + """


        """ +  urlStr

        message.send()

        #customer.password = submission[u'newPassword']
        #customer.put()

        self.respond(customer)


class GetPhotoDataApi(blobstore_handlers.BlobstoreDownloadHandler,RequestHandler):

    def get(self,username):

        logging.info('fecthing data for image')

        key = ndb.Key(Credentials, username)
        customer = key.get()

        image_url = images.get_serving_url(customer.photo)

        self.respond(image_url)

        #self.send_blob(customer.photo)




class UploadPhotoUrlApi(blobstore_handlers.BlobstoreUploadHandler,RequestHandler):
    """Provide access to individual Customer entities."""

    def get(self,username):
        """ to update customer details """
        logging.info('uploading user photo')
        upload_url = blobstore.create_upload_url('/a/uploadPhoto/' + username)

        self.respond(upload_url)


class UploadPhotoApi(blobstore_handlers.BlobstoreUploadHandler,RequestHandler):
    """Provide access to individual Customer entities."""

    def post(self,username):
        """ to update customer details """
        logging.info('uploading user photo')

        upload = self.get_uploads()[0]

        image = self.request.POST['file']
        content_type = image.headers['Content-Type']
        key = ndb.Key(Credentials, username)
        customer = key.get()

        if (customer.photo):
            #Deleting Existing Blob
            blobstore.delete(customer.photo)


        customer.photo = upload.key()
        customer.put()

        self.redirect('/#/settings')


class CheckIfFirstLogging(RequestHandler):

    def get(self,username):

        logging.info('Inside check if firsttimelogging')

        key = ndb.Key(Credentials, username)
        customer = key.get()
        logging.info(customer)
        customer.user_logging = True
        results = {}
        if not customer:
            self.error('User Not found', status = 404)
            return

        if customer.first_time_logging == True:
            results = {'first_time_logging':True , 'user_logging':False} 
            customer.first_time_logging = False
            customer.user_logging = True
            customer.put()
            
        if customer.first_time_logging == False:
            results = {'user_logging':False} 
            customer.user_logging = True
            customer.put()
            

        self.respond(results)



class CheckIfCoach(RequestHandler):

    def get(self,username):

        logging.info('Inside check if coach')

        logging.info(username)

        users = Credentials.query()

        results = []

        for user in users.fetch():
                x = {}

                if (user.coach_id == username):
                    x['flag'] = True
                    x['coach_for'] =user.key.id()

                    results.append(x)

        self.respond(results)

class LogoutCurrentUser(RequestHandler):

    def get(self,username):

        logging.info('Inside check if loginuser')

        logging.info(username)

        key = ndb.Key(Credentials, username)
        customer = key.get()
        results = {}
        if not customer:
            self.error('User Not found', status = 404)
            return

        if customer.first_time_logging == False:
            results = {'user_logging':True} 
            customer.user_logging = False
            customer.put()
            
        self.respond(results)
# from apiclient import discovery
# from google.appengine.api import taskqueue
# from google.appengine.ext import ndb
# from nova.signature.handler import *
# from nova.signature import *
# from pprint import pprint
# import logging
# import nova.signature.report
#
#
#
# class CustomerListApi(RequestHandler):
#     """Top-level handler for all customer requests.  Used for managing the list
#     of all customers."""
#
#     def get(self):
#         """Get list of all customers."""
#
#
#         # Only an application admin should be able to get a list of all
#         # customers.  That is, customers should be able to see who else is a
#         # customer.
#         if not {'application_admin'} <= self.roles():
#             raise ApiException(403, 'Forbidden.')
#
#         # TODO: The list of customers may become very large.  Add support for
#         # pagination.
#
#         r = []
#
#         for customer in Customer.query():
#             x = customer.to_dict()
#             x['_id'] = customer.key.id()
#             r.append(x)
#
#         self.respond(r)
#
#
# class CustomerApi(RequestHandler):
#     """Provide access to individual Customer entities."""
#
#     def get(self, custid, action = None):
#         """Retrieve a customer by customer id. """
#
#         key = ndb.Key(Customer, custid)
#         customer = key.get()
#         if not customer:
#             self.error('Not found', status = 404)
#             return
#
#         # Anyone who is an admin of any kind can get information about the
#         # customer.  Knowing who has access to an application is considered to
#         # be privileged information.
#         if not {'admin'} <= self.roles(customer = customer):
#             raise ApiException(403, 'Forbidden.')
#
#         self.respond(customer)
#
#
#     def put(self, custid):
#         """ to update customer details """
#
#         # Updating the Customer object allows you to change who is authorized
#         # to access a customer's data.  It is therefore very sensitive and
#         # should only be allowed by Domain Admins (people responsible for the
#         # customer) or by Application Admins (people who administrate the
#         # application itself).
#         if not {'domain_admin', 'application_admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
#
#         submission = self.load()
#
#         key = ndb.Key(Customer, custid)
#         customer = Customer(key = key)
#         customer.populate(**submission)
#         customer.put()
#
#         self.respond(customer)
#
#
#     def delete(self, custid):
#         """ to delete customer """
#
#         if not {'domain_admin', 'application_admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
#
#         key = ndb.Key(Customer, custid)
#         key.delete()
#
#         self.respond_ok()
#
#
# class CustomerApplyApi(RequestHandler):
#     """Control a customer level "apply" operation.  At this level we simply
#     apply all the rules."""
#
#     def get(self, customer_id):
#         return self.post(customer_id)
#
#     def post(self, customer_id):
#         """Schedule an "apply" operation for all rules belonging to this customer."""
#
#         # This endpoint is typically called from the Task Queue service or
#         # directly by someone kicking of a run manually.
#         roles = self.roles()
#         """
#         if 'appengine' not in roles and 'admin' not in roles:
#             raise ApiException(403, 'Forbidden.')
#         """
#         stage = nova.signature.apply.ApplyRulesForCustomer(customer_id)
#         stage.start()
#         logging.info('Stage started with pipeline id = %s', stage.pipeline_id)
#
#         """ To save the pipelineid of current Event."""
#         customer_key = ndb.Key(Customer, customer_id)
#         key = ndb.Key(StatusReport,stage.pipeline_id , parent = customer_key)
#         report = StatusReport(key = key)
#         report.remark = 'Execution of all available rules'
#         report.put()
#
#         self.respond_ok()
#
#
# class CustomerValidateApi(RequestHandler):
#     """Control a customer level "validate" operation."""
#
#     def post(self, custid):
#         """Schedule a "validate" operation for all rules belonging to this customer."""
#         logging.error('Customer level validate not implemented yet.')
#         self.respond_ok()
#
#
# class CustomerOrgUnitsApi(RequestHandler):
#     """Retrieve the list of organization units for the customer."""
#
#     def get(self, custid):
#         """Get a list of org units.  If a rule applys to an org unit then
#         include the rule id."""
#
#         key = ndb.Key(Customer, custid)
#         customer = key.get()
#         if not customer:
#             self.error('Not found', status = 404)
#             return
#
#         # Getting the list of organizational units is necessary for setting up
#         # rules, but it should not be publicly available.  Therefore it is just
#         # restricted to admins (of any kind).
#         if not {'admin'} & self.roles(customer = customer):
#             raise ApiException(403, 'Forbidden.')
#
#         try:
#             http = nova.signature.auth.make_authorized_http(prn = customer.domain_admin)
#         except AccessTokenRefreshError as err:
#             logging.warning('Application not authorized for customer.', exc_info = True)
#             raise err
#
#         directory = discovery.build('admin', 'directory_v1', http = http)
#         orgunits = directory.orgunits().list(customerId = custid, orgUnitPath = '/').execute()
#
#         index = dict()
#         for orgunit in orgunits.get('organizationUnits', []):
#             index[orgunit['orgUnitPath']] = orgunit
#
#         for rule in Rule.query(ancestor = key):
#             for path, orgunit in index.iteritems():
#                 if path.startswith(unicode(rule.org_unit)):
#                     orgunit[u'rule'] = unicode(rule.key.id())
#
#         self.respond(orgunits)
#
#
# class CustomerUsersApi(RequestHandler):
#
#     def get(self, custid):
#         """Get a list of users in a customer's domain.  A query parameter can
#         be passed in (q) to search the list.  This parameter is passed directly
#         to the "query" parameter in the Directory API.
#
#         This call is to facilitate auto complete on user's names and emails.
#         It's not meant for getting the full list of all users.
#         """
#         customer = ndb.Key(Customer, custid).get()
#         if not customer:
#             self.error('Not found', status = 404)
#             return
#
#         # Getting the list of organizational units is necessary for setting up
#         # rules, but it should not be publicly available.  Therefore it is just
#         # restricted to admins (of any kind).
#         if not {'admin'} & self.roles(customer = customer):
#             raise ApiException(403, 'Forbidden.')
#
#         query_str = self.request.GET['q']
#
#         http = nova.signature.auth.make_authorized_http(prn = customer.domain_admin)
#         directory = discovery.build('admin', 'directory_v1', http = http)
#         users = directory.users().list(customer = custid, maxResults = 10, query = query_str,
#                 fields = "users(primaryEmail),users(name)").execute()
#
#         self.respond(users)
