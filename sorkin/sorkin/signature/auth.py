# from oauth2client.client import AccessTokenCredentials, SignedJwtAssertionCredentials
# from google.appengine.ext import ndb
# from google.appengine.api import memcache
# import google.appengine.api.app_identity
# import httplib2
# import json
# import logging
# import nova.signature.clientid
# import datetime
#
#
#
# class ServiceAccount(ndb.Model):
#     client_id = ndb.StringProperty(required = True)
#     client_email = ndb.StringProperty(required = True)
#     private_key = ndb.StringProperty(required = True, indexed = False)
#     private_key_id = ndb.StringProperty(required = True)
#     type = ndb.StringProperty()
#
#
# # The scopes also need to be added to the Marketplace listing and authorized by
# # a domain's admin.
# SCOPES = ['https://www.googleapis.com/auth/userinfo.email',
#         'https://www.googleapis.com/auth/userinfo.profile',
#         'https://apps-apis.google.com/a/feeds/emailsettings/2.0/',
#         'https://www.googleapis.com/auth/admin.directory.user.readonly',
#         'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
#         'https://www.googleapis.com/auth/admin.directory.group.readonly',
# #        'https://apps-apis.google.com/a/feeds/domain/',
#         'https://www.googleapis.com/auth/appsmarketplace.license',
# ]
#
# USER_AGENT = 'nova-signature-1.0'
# CLIENT_ID_KEY = ndb.Key(ServiceAccount, 'default')
#
#
# def make_http():
#     """Create an Http object for performing HTTP calls."""
#     return httplib2.Http(cache = memcache)
#
#
# def make_authorized_http(prn = None):
#     """Create an Http object that is authorized to call Google APIs.  If the
#     credential can not be created then a valid Http object still returned."""
#     http = make_http()
#     credential = make_credential(prn = prn, http = http)
#     if credential:
#         return credential.authorize(http)
#     else:
#         return http
#
#
# def make_credential(prn = None, http = None):
#     global SCOPES, CLIENT_ID_KEY
#
#     logging.info('Making credential (prn %s)', prn)
#
#     client_id = CLIENT_ID_KEY.get()
#     if client_id is None:
#         return None
#
#     credential = SignedJwtAssertionCredentials(client_id.client_email,
#         client_id.private_key, SCOPES, sub = prn)
#
#     # Check memcache for an existing Access token.
#
#     mc = memcache.Client()
#
#     if prn:
#         key = 'access-token:%s' % (prn, )
#     else:
#         key = 'access-token'
#
#     cached_token = mc.gets(key)
#     if cached_token is None:
#         credential.refresh(http)
#         cached_token = credential.access_token, credential.token_expiry
#         time = (credential.token_expiry - datetime.datetime.now()).total_seconds()
#         mc.set(key, cached_token, time = time)
#         logging.info('Got new access token.')
#     else:
#         credential.access_token = cached_token[0]
#         credential.token_expiry = cached_token[1]
#         logging.info('Got cached access token.')
#
#     return credential
#
#
# def get_http(prn = None):
#     return make_authorized_http(prn)

