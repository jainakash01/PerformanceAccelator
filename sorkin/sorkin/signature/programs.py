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
import customer
from google.appengine.api import urlfetch




class ProgramsApi(RequestHandler):


    def get(self, username):
        # submission = self.load()
        # key1 = ndb.Key(Credentials, submission['username'])
        # user = key1.get()            
        program_key = ndb.Key(Programs, username)
        program = program_key.get()
 
        if program is None:
            self.error('Program Not Exist !!!!', status = 503)
            return

        results = {}

        qry = program_key.get()
        doc = program.to_dict()
        doc['_id'] = program.key.id()
        logging.info(doc['_id'])
        results['training_cycle']  = qry.training_cycle
        results['programs']  = qry.program
        
        customer_key = ndb.Key(Credentials, username)
        cust = Credentials(key = customer_key)
        customer = customer_key.get()
        logging.info(customer)
        customer.user_logging = customer.user_logging
        logging.info(customer.user_logging)


        # if customer.application_role == "Admin":
        # # if customer.email == customer.coach_id:
        #     logging.info('its working')
        #     program_key = ndb.Key(Programs, username)
        #     program = program_key.get()

        #     results = {}

        #     qry = program_key.get()
        #     doc = program.to_dict()
        #     doc['_id'] = program.key.id()
        #     logging.info(doc['_id'])
        #     results['training_cycle']  = qry.training_cycle
        #     results['programs']  = qry.program
        # else:
        #      logging.info('its not working')
        #      self.error('Do Not Allow to this program..', status = 503) 
        #      return    
        
        # if customer.user_logging is True:
        #     logging.info('its working')
        #     if customer.application_role == "Admin":
        #     # if customer.email == customer.coach_id:
        #         logging.info('its working')
        #         program_key = ndb.Key(Programs, username)
        #         program = program_key.get()
        #         results = {}
        #         qry = program_key.get()
        #         doc = program.to_dict()
        #         doc['_id'] = program.key.id()
        #         logging.info(doc['_id'])
        #         results['training_cycle']  = qry.training_cycle
        #         results['programs']  = qry.program
        #     else:
        #          logging.info('not admin user')
        #          self.error('not admin user..' + customer.email + customer.first_name + user.first_name, status = 503) 
        #          return             
        # else:
        #      logging.info('not logged in')
        #      self.error('not logged in..' + customer.email + customer.first_name + user.first_name,  status = 503) 
        #      return
      
        
        self.respond(results)


    def put(self, username):
        """Update a Program."""

        logging.info('Called under PUT program')

        program_key = ndb.Key(Programs, username)
        program = program_key.get()

        submission = self.load()
        logging.info(submission)
        newProgram = submission[u'program']
        newTrainingCycle = submission[u'training_cycle']

        if program is not None:
            program.program = newProgram
            program.training_cycle = newTrainingCycle
        else:
            program = Programs(key = program_key)
            program.program=newProgram
            program.training_cycle= newTrainingCycle

        program.put()
        doc = program.to_dict()
        doc['_id'] = program.key.id()
        self.respond(doc)


    def delete(self, username):

        logging.info('Inside dleteing proghram')

        program_key = ndb.Key(Programs, username)
        program = program_key.get()

        if program is None:
            self.error('No Program to delete!!', status = 503)
            return

        program_key.delete()

        raters_key = ndb.Key(Raters, username)
        raters_key.delete()
        self.respond_ok()


    def post(self,username):
        logging.info('Inside Create program')

        submission = self.load()

        logging.info(submission)

        key = ndb.Key(Programs, username)
        prog = Programs(key = key)
        prog.populate(**submission)
        key = prog.put()

        doc = prog.to_dict()
        doc['_id'] = key.id()

        self.respond(doc)