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


class ProgramSetupApi(RequestHandler):

    def get(self):

        logging.info('Inside prohram Setup APi')

        key=ndb.Key(AppSetup,'primary')
        app_data = key.get()

        if app_data is None:
            self.error('Admin needs to setup the programs',503)


        self.respond(app_data)





    def put(self):

        logging.info('Inside prohram Setup PUT APi')


        key=ndb.Key(AppSetup,'primary')
        app_data = key.get()

        if app_data is None:
            app_data = AppSetup(key = key)

        submission = self.load()


        logging.info(submission[u'og'])
        og = []
        ipg = []
        idg = []
        skills = []
        roots = []

        og.append(submission[u'og'])
        idg.append(submission[u'idg'])
        ipg.append(submission[u'ipg'])
        skills.append(submission[u'skills'])
        roots.append(submission[u'roots'])

        app_data.og = og
        app_data.idg =  idg
        app_data.ipg =  ipg
        app_data.skills =  skills
        app_data.roots =  roots

        app_data.put()

        self.respond(app_data)

