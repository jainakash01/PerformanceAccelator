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
from datetime import datetime



class DashboardReportApi(RequestHandler):

    def get(self,username):

        logging.info('Inside dashboard report')

        logging.info(username)
        
        
        program_key = ndb.Key(Programs, username)
        program = program_key.get()
        
        prog_creation = program.created

        report_data = DailyTasks.query(DailyTasks.user_id == username , DailyTasks.morning_prev_done == True , DailyTasks.created  >= prog_creation)

        morning_length  =0

        for data_row in report_data.fetch():
            logging.info(data_row.key.id())
            logging.info(data_row.user_id)
            morning_length = morning_length + 1


        report_eve_data = DailyTasks.query(DailyTasks.user_id == username , DailyTasks.evening_prev_done == True, DailyTasks.created  >= prog_creation)

        eve_length  =0

        for data_row in report_eve_data.fetch():
            eve_length = eve_length + 1


        #program_key = ndb.Key(Programs, username)
        #program = program_key.get()
        
        if program is None:
            
            results = {}
            results['morning_done'] = 0
            results['eve_done'] = 0
            results['days_sinc_start'] =  1
            results['total_prog_days']  = 1
            
            self.respond(results)
            return

        training_cycle = program.training_cycle

        today_date = datetime.now().date()

        creation_date = program.created

        logging.info(creation_date.date())
        logging.info(today_date)

        days_diff = today_date - creation_date.date()

        logging.info(days_diff.days)

        results = {}

        results['morning_done'] = morning_length
        results['eve_done'] = eve_length
        results['days_sinc_start'] = days_diff.days + 1
        results['total_prog_days']  = training_cycle

        self.respond(results)

