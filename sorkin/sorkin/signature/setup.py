# from google.appengine.api import app_identity
# from google.appengine.api import users
# from google.appengine.ext import ndb
# from apiclient import discovery
# from nova.signature import *
# from nova.signature.handler import *
# import json
# import logging
# import nova.signature.auth
# import webapp2
#
#
# class SetupApi(RequestHandler):
#     """Control the setup process for a new customer."""
#
#     @staticmethod
#     def get_directory_user(user):
#         """Attempt to get information about the user from the Admin SDK
#         Directory API.  If it fails, then either the application is
#         unauthorized or the user isn't a domain admin.  Only domain admins can
#         set the application up."""
#
#         email = user.email()
#         http = nova.signature.auth.make_authorized_http(prn = email)
#         directory = discovery.build('admin', 'directory_v1', http = http)
#
#         # TODO: Catch expected exceptions so a more helpful response can be
#         # made.
#
#         user = directory.users().get(userKey = email).execute()
#         return user
#
#
#     @staticmethod
#     def check_login(user):
#         """Check if the user is logged in.  If not, then they need to login
#         before we can run further checks."""
#         return user is not None
#
#
#     @staticmethod
#     def check_customer(directory_user):
#         """Check if a customer object has been setup for this user's
#         organization.  If so, then the application has already been setup.  If
#         not, we'll need some information from them to proceed."""
#         customer_id = directory_user['customerId']
#         customer = ndb.Key(Customer, customer_id).get()
#
#         if customer:
#             return False
#
#         return True
#
#
#     def get(self):
#         """Determine the status of setting up a customer and return information
#         about required next steps."""
#
#         user = users.get_current_user()
#
#         if not self.check_login(user):
#             self.respond({'step': 'login', 'login_url': users.create_login_url('/setup')})
#             return
#
#         directory_user = self.get_directory_user(user)
#         if not directory_user:
#             self.respond({'step': 'authorize'})
#             return
#
#         customer_id = directory_user['customerId']
#
#         if not self.check_customer(directory_user):
#             self.respond({'step': 'complete', 'customer_id': customer_id})
#             return
#
#         self.respond({'step': 'activate', 'customer_id': customer_id})
#
#
#     def post(self):
#         user = users.get_current_user()
#         if not user:
#             raise ApiException(401, 'Unauthorized.')
#
#         directory_user = self.get_directory_user(user)
#         if not directory_user:
#             raise ApiException(401, 'Unauthorized.')
#
#         if not self.check_customer(directory_user):
#             raise ApiException(400, 'Setup already completed.')
#
#         customer_id = directory_user['customerId']
#         key = ndb.Key(Customer, customer_id)
#         customer = Customer(key = key)
#         customer.domain_admin = user.email()
#         customer.put()
#         self.redirect('/panel')
