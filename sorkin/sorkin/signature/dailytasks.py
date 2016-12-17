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
from datetime import datetime,timedelta





class MorningPreviewApi(RequestHandler):


    def get(self,username):
        logging.info('Here ia,')
        now = datetime.now() + timedelta(hours = -4)

        dt_key = username + '_' + str(now.day) + str(now.month) + str(now.year)

        key = ndb.Key(DailyTasks, dt_key)
        program = key.get()

        logging.info(program.to_dict())
        self.respond(program.to_dict())




    def post(self,username):
        logging.info('Inside Create Morning Preview')
        logging.info('Training to srvesh')

        logging.info(datetime.now() +  timedelta(hours = -4))

        now = datetime.now() + timedelta(hours = -4)
        logging.info(now.day)
        logging.info(now.year)
        logging.info(now.month)
        dt_key = username + '_' + str(now.day) + str(now.month) + str(now.year)

        logging.info(dt_key)

#         submission = self.load()
#
#
#         if '_username' in submission:
#             del submission['_username']
#
#         if 'created' in submission:
#             del submission['created']
#
#         if 'updated' in submission:
#             del submission['updated']
#
#         logging.info(submission)

        key = ndb.Key(DailyTasks, dt_key)
        prog = DailyTasks(key = key)



        #prog.populate(**submission)
        prog.morning_prev_done = True
        prog.evening_prev_done = False
        prog.raters_review_done = False
        prog.user_id = username
        key = prog.put()

        doc = prog.to_dict()
        doc['_id'] = key.id()
        #return
        self.respond(doc)



class EveningPreviewApi(RequestHandler):

    def post(self,username):

        logging.info('Inside Create Evening Preview')

        now = datetime.now() +  timedelta(hours = -4)

        dt_key = username + '_' + str(now.day) + str(now.month) + str(now.year)

        logging.info(dt_key)

        submission = self.load()

        if '_username' in submission:
            del submission['_username']

        if 'created' in submission:
            del submission['created']

        if 'updated' in submission:
            del submission['updated']

        logging.info(submission)

        key = ndb.Key(DailyTasks, dt_key)

        prog = key.get()

        if prog is None:
            self.error('Morning preview not done', 503)
            return


        prog = DailyTasks(key=key)


        prog.populate(**submission)
        prog.morning_prev_done = True
        prog.evening_prev_done = True
        key = prog.put()

        doc = prog.to_dict()
        doc['_id'] = key.id()
        #return
        self.respond(doc)


class RatersRatingApi(RequestHandler):

    def put(self,username,rater_id):

        logging.info('Inside Submit raters Evening Preview')

        now = datetime.now() +  timedelta(hours = -4)

        dt_key = rater_id + '_' + str(now.day) + str(now.month) + str(now.year)

        logging.info(dt_key)

        submission = self.load()

        logging.info(submission)

        key = ndb.Key(DailyTasks, dt_key)

        prog = key.get()
        exising_ratings = []

        if prog is None:
            prog = DailyTasks(key=key)
            len_exist = 0
            exising_ratings = [submission]
            prog.user_id = username
            prog.morning_prev_done  = False
            prog.evening_prev_done = False
            #self.error('User has not completed his Review Yet', 200) ## This validation needs to be removed !!
            #return
        else:
            exising_ratings = prog.raters_ratings
            #len_exist = len(exising_ratings)
            #logging.info(exising_ratings[0])
            exising_ratings.append(submission)


        prog.raters_review_done = True
        prog.raters_ratings = exising_ratings
        key = prog.put()

        doc = prog.to_dict()
        doc['_id'] = key.id()
        #return
        self.respond(doc)


class GetRatingData(RequestHandler):
    
    
    def post(self,username,dateWanted):
        logging.info('Inside Create Morning Preview')
        logging.info('Training to srvesh 2')
        logging.info(dateWanted)

        #logging.info(datetime.now())

        ##logging.info(now.day)
        ##logging.info(now.year)
        #logging.info(now.month)
        dt_key = username + '_' + dateWanted

        logging.info(dt_key)

#         submission = self.load()
#
#
#         if '_username' in submission:
#             del submission['_username']
#
#         if 'created' in submission:
#             del submission['created']
#
#         if 'updated' in submission:
#             del submission['updated']
#
#         logging.info(submission)

        key = ndb.Key(DailyTasks, dt_key)
        prog = key.get()

        
        if prog is not None:
            doc = prog.to_dict()
            doc['_id'] = key.id()
        else:
            doc = []    
        #return
        self.respond(doc)
