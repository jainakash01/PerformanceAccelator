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



class ProgramsApi(RequestHandler):



    def get(self, username):

        program_key = ndb.Key(Programs, username)
        program = program_key.get()

        if program is None:
            self.error('Please create a program first!!', status = 503)
            return

        results = {}

        qry = program_key.get()
        results['training_cycle']  = qry.training_cycle
        results['programs']  = qry.program
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