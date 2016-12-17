# from apiclient import discovery
# from datetime import datetime
# from gdata.apps.emailsettings.client import EmailSettingsClient
# from gdata.apps.emailsettings.data import EmailSettingsSignature
# from gdata.gauth import OAuth2TokenFromCredentials
# from google.appengine.api import memcache
# from google.appengine.api import urlfetch
# from google.appengine.api import users
# from google.appengine.ext import db , ndb
# from google.appengine.runtime import DeadlineExceededError
# from nova.signature.handler import *
# from nova.signature import *
# #from webapp2_extras import jinja2
# import atom.core
# import cgi
# import cloudstorage as gcs
# import gdata.gauth
# import jinja2
# import json
# import logging
# import nova
# import nova.signature.auth
# import nova.signature.report
# 
# 
# class SignatureListApi(RequestHandler):
#     """Manage signatures."""
# 
#     def get(self, custid):
#         """Get a list of all signatures for customer."""
# 
#         # An admin of any kind can manipulate signatures for a customer.
#         if not {'admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
# 
#         customer_key = ndb.Key(Customer, custid)
#         customer = customer_key.get()
#         if customer is None:
#             self.error('Customer does not exist.', status = 404)
#             return
# 
#         qry = Signature.query(ancestor = customer_key)
#         results = []
# 
#         for signature in qry.fetch():
#             x = signature.to_dict()
#             x['_id'] = signature.key.id()
#             results.append(x)
# 
#         self.respond(results)
# 
# 
# 
#     def post(self, custid):
#         """Create a new signature."""
# 
#         # An admin of any kind can manipulate signatures for a customer.
#         if not {'admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
# 
#         customer_key = ndb.Key(Customer, custid)
#         customer = customer_key.get()
#         if customer is None:
#             self.error('Customer does not exist.', status = 404)
#             return
# 
#         submission = self.load()
# 
#         key = ndb.Key(Signature, None, parent = customer_key)
#         signature = Signature(key = key)
#         signature.populate(**submission)
#         signature.customer_id = custid
#         key = signature.put()
# 
#         doc = signature.to_dict()
#         doc['_id'] = key.id()
# 
#         self.respond(doc)
# 
# 
# 
# class SignatureApi(RequestHandler):
# 
#     @staticmethod
#     def key(customer_id, signature_id):
#         """Build a key for the given customer and signature ids."""
# 
#         if isinstance(customer_id, Customer):
#             customer_id = customer_id.key.id()
# 
#         try:
#             signature_id = int(signature_id)
#         except ValueError as err:
#             # Raise a 404 since the sigid part of the URL and technically
#             # could exist.
#             raise nova.ApiException(404, 'Not found.')
# 
#         customer_key = ndb.Key(Customer, customer_id)
#         return ndb.Key(Signature, signature_id, parent = customer_key)
# 
# 
#     def get(self, custid, sigid):
#         """Get a signature."""
# 
#         # An admin of any kind can manipulate signatures for a customer.
#         if not {'admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
# 
#         key = self.key(custid, sigid)
#         signature = key.get()
# 
#         if not signature:
#             self.error('Not found.', status = 404)
#             return
# 
#         doc = signature.to_dict()
#         doc['_id'] = signature.key.id()
# 
#         self.respond(doc)
# 
# 
#     def put(self, custid, sigid):
#         """Update a signature."""
# 
#         # An admin of any kind can manipulate signatures for a customer.
#         if not {'admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
# 
#         key = self.key(custid, sigid)
#         signature = key.get()
# 
#         if signature is None:
#             self.error('Not found.', status = 404)
#             return
# 
#         submission = self.load()
# 
#         if '_id' in submission:
#             del submission['_id']
# 
#         signature = Signature(key = key)
#         signature.populate(**submission)
#         signature.put()
# 
#         doc = signature.to_dict()
#         doc['_id'] = signature.key.id()
# 
#         self.respond(doc)
# 
# 
#     def delete(self, custid, sigid):
#         """Delete a signature."""
# 
#         # An admin of any kind can manipulate signatures for a customer.
#         if not {'admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
# 
#         key = self.key(custid, sigid)
#         key.delete()
# 
#         self.respond_ok()
# 
# 
# class SignatureApplyApi(RequestHandler):
# 
#     def post(self, custid, sigid, email):
#         """Update a user's signature based on the given signature id."""
#         self.respond_ok()
# 
# 
# 
# class SignatureValidateApi(RequestHandler):
# 
#     def get(self, custid, sigid, email):
#         """Validate that the users signature is correct and report if the user
#         has since changed their signature."""
# 
#         self.respond_ok()
# 
# 
# class SignaturePreviewApi(RequestHandler):
# 
#     def post(self, custid, email):
#         """Generate what would be the user's computed signature and return it.
#         The users email signature will remain unchanged."""
# 
#         # An admin of any kind can manipulate signatures for a customer.
#         if not {'admin'} & self.roles(customer_id = custid):
#             raise ApiException(403, 'Forbidden.')
# 
#         customer = Customer.find(customer_id = custid)
#         if customer is None:
#             raise ApiException(404, 'Not found.')
# 
#         signature = self.load()
#         if signature is None:
#             raise ApiException(400, 'No signature submitted to preview.')
# 
#         # Using both the admin and user seem to be valid.  Using the admin may
#         # run into hidden per-user quotas, but using the user means getting a
#         # new access token for each call.
#         prn = customer.domain_admin
#         #prn = email
# 
#         http = nova.signature.auth.make_authorized_http(prn = prn)
#         directory = discovery.build('admin', 'directory_v1', http = http)
#         user = directory.users().get(userKey = email).execute()
#         template = jinja2.Template(signature['body'])
#         body = template.render(**user)
# 
#         self.respond({"ok": True, "body": body})
# 

