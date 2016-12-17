from sorkin.signature import *
from sorkin.signature.handler import *
import json
import logging
import sorkin
import sorkin.signature
import webapp2




# from google.appengine.api import users
# from sorkin.signature.customer import Customer
# from sorkin.signature import *
# from sorkin.signature.handler import *
# import json
# import logging
# import sorkin
# import sorkin.signature
# import webapp2
#
#
# class SessionApi(RequestHandler):
#     """Reflects back information about the calling user.  There's no good way
#     for a web app to figure information out about the user, so this provides
#     a way to get that information.
#
#     Currently the information comes from the App Engine Users Service, but
#     conceivably we could add in some other information as well in the future.
#     """
#
#     def get(self):
#         """Get information about the current user session."""
#
#         # FIXME:  Don't hard code the redirect for the login and logout URLs
#         # below.  This API is too generic to know that.  Instead, accept it as
#         # a query parameter.
#
#         doc = {}
#         user = users.get_current_user()
#
#         if user:
#             doc['logged_in'] = True
#             doc['nickname'] = user.nickname()
#             doc['email'] = user.email()
#             doc['user_id'] = user.user_id()
#             doc['logout_url'] = users.create_logout_url('/')
#             doc['appengine_admin'] = users.is_current_user_admin()
#
#             customer = Customer.find(email = user.email())
#             if customer:
#                 doc['authorized'] = True
#                 doc['customer_id'] = customer.key.id()
#
#                 if user and customer.domain_admin == user.email():
#                     doc['domain_admin'] = True
#                     doc['signature_admins'] = customer.signature_admins
#
#         doc['login_url'] = users.create_login_url('/panel/')
#         doc['roles'] = list(self.roles(customer_id = doc.get('customer_id')))
#
#         self.respond(doc)
#

