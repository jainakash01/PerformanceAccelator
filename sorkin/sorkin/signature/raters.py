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



class RatesInviteApi(RequestHandler):

    def put(self,username):

        submission = self.load()

        logging.info(submission)

        username_key = ndb.Key(Credentials, username)

        rater_id = submission[u'rater_id']
        invited_by = submission[u'invitedBy']
        first_name = submission[u'firstName']
        rater_scopes = submission[u'raterScopes']
        comments = submission[u'comments']


        logging.info(rater_id)
        logging.info(rater_scopes)

        #user = key.get()

        key = ndb.Key(Raters, username) # None instead of rater_id

        already_a_rater = key.get()

        if already_a_rater is not None:
            existing_students = already_a_rater.students_id
            raters = already_a_rater
            logging.info(len(existing_students))



            for i in xrange(0,len(existing_students) - 1):
                logging.info(existing_students[i])
                if (existing_students[i][u'name'] == rater_id):
                  logging.info('Already a rater')
                  self.error('Already your rater' , 503)
                  return
        else :
            existing_students =[]
            raters = Raters(key = key)

        logging.info(existing_students)

        existing_students.append({ 'comments' : comments, 'name':rater_id,'status':'Pending','scopes':rater_scopes,'gapDays':submission[u'gapDays'],'gapRatings':submission[u'gapRatings'],'raterGroup':submission[u'raterGroup']})

        raters.students_id = existing_students
        raters.put()


        sender_address = 'admin@iaccel-atstakeperformance.com'.format(app_identity.get_application_id())  #'admin@iaccel-atstakeperformance.com'
        logging.info(sender_address);
        message = mail.EmailMessage(
        sender=sender_address,
        subject=  invited_by + " is requesting your 360-feedback")

        #urlStr = 'https://iaccel-atstakeperformance.appspot.com/a/customer/' +  username + '/authenticate/' + hash;

        message.to = rater_id

        message.body = """Dear """ + rater_id + """:

        """ + first_name + """ invited you to be a performance-feedback rater in """ + first_name +"""'s i@ccel Performance Accelerator
        program --- an online system for customized individual development in alignment with team and organizational goals.

        If you are not currently a user in the i@ccel system, please register here
        http://iaccel-atstakeperformance.appspot.com/login.

        It's EASY and quick. You can opt out at any time and you will not be subject to any marketing or spam of any kind.

        If you have questions, please contact us.

        Thank you,
        The i@ccel Team

        ___________________________
        i@ccel Performance Accelerator
        By @Stake Performance
        iaccel@atstakeperformance.com
        http://atstakeperformance.com/
        """

        message.send()

        self.respond_ok()

        #self.respond_ok()

        #self.respond(raters)


class DeleteRaterApi(RequestHandler):

    def delete(self,username,rater_id):

        flag = False
        ind = 0

        logging.info('Deleting')
        logging.info(rater_id)

        rater_key = ndb.Key(Raters,username)

        rater = rater_key.get()

        students = rater.students_id

        for i in xrange(len(students) - 1):
            ind = i
            logging.info('Value of i ')
            logging.info(i)
            stu_name = students[i]['name']
            logging.info(stu_name)
            if (stu_name == rater_id):
                logging.info('Got')
                logging.info('Got the name')
                flag = True
                del students[i]


        if ((len(students) == 1) and (flag == False)):
             flag = True
             students = []


        if not flag:
            del students[ind+1]

        rater.students_id = students

        rater.put()

        self.respond_ok()


class ManageRatersApi(RequestHandler):

    def get(self,username):

        logging.info('Inside manage raters')

        logging.info(username)

        username_key = ndb.Key(Raters, username)

        #raters = Raters.query()

        rater = username_key.get()

        acceptedList = []
        pending = []
        r = {}

        for i in xrange(len(rater.students_id) ):
         logging.info(i)
         x= {}
         if(rater.students_id[i][u'status'] == 'Pending'):
            #x = rater.to_dict()
            logging.info(rater.students_id[i][u'name'])
            x['invited'] = rater.students_id[i][u'name']
            x['goals'] = rater.students_id[i][u'scopes']
            try:
                x['raterGroup'] = rater.students_id[i][u'raterGroup']
            except Exception as err:
                x['raterGroup']  = 'NA'
            x['_id'] = rater.key.id()
            pending.append(x)

         if(rater.students_id[i][u'status'] == 'Accepted'):
            x['invited'] = rater.students_id[i][u'name']
            x['goals'] = rater.students_id[i][u'scopes']
            x['_id'] = rater.key.id()
            acceptedList.append(x)
#         raters = Raters.query(Raters.students_id == {'name' : username , 'status' : 'Complete'})
#
#
#         for rater in raters.fetch():
#                 logging.info(rater.accepted)
#                 x = rater.to_dict()
#                 x['_id'] = rater.key.id()
#                 acceptedList.append(x)


        r['pending'] = pending
        r['acceptedList']  = acceptedList

        logging.info(r)

        self.respond(r)




class AcceptRatersApi(RequestHandler):

    def get(self,username):

        logging.info('Inside to accept raters')

        logging.info(username)

        raters = Raters.query()

        results = []

        for rater in raters.fetch():
                logging.info(len(rater.students_id))
                for i in xrange(len(rater.students_id)):
                    logging.info(i)
                    logging.info(rater.students_id[i][u'name'])

                    if(rater.students_id[i][u'name'] == username and rater.students_id[i][u'status'] == 'Pending' ):

                        x = rater.to_dict()
                        x['invitedBy'] = rater.key.id()
                        x['scopes'] = rater.students_id[i][u'scopes']
                        x['designation'] = rater.students_id[i][u'raterGroup']
                        x['comments']  = rater.students_id[i][u'comments']
                        results.append(x)

        self.respond(results)

class AcceptConfirmedListApi(RequestHandler):

    def get(self,username):

        logging.info('Inside accept raters')

        logging.info(username)

        raters = Raters.query()

        results = []

        for rater in raters.fetch():
                logging.info(len(rater.students_id))
                for i in xrange(len(rater.students_id)):
                    logging.info(i)
                    if(rater.students_id[i][u'name'] == username and rater.students_id[i][u'status'] == 'Accepted' ):
                        x = rater.to_dict()
                        x['invitedBy'] = rater.key.id()
                        x['scopes'] = rater.students_id[i][u'scopes']
                        x['designation'] = rater.students_id[i][u'raterGroup']
                        results.append(x)


        #username_key = ndb.Key(Credentials, username)

#         raters = Raters.query(Raters.rater_id == username)
#         results= []
#
#         for rater in raters.fetch():
#
#             logging.info(rater.key)
#             logging.info('Parent is')
#             #logging.info(rater.key.parent().id())
#
#             invitedBy = rater.key.parent().id()
#
#             x = rater.to_dict()
#             x['invitedBy'] = invitedBy
#             x['_id'] = rater.key.id()
#             results.append(x)

        self.respond(results)


class RaterPreview(RequestHandler):

    def get(self,username,rater_id):

        logging.info('Inside raters review page')

        logging.info(username)

        now = datetime.now() +   timedelta(hours = -4)

        dt_key = username + '_' + str(now.day) + str(now.month) + str(now.year)

        daily_key = ndb.Key(DailyTasks, dt_key)

        raters = ndb.Key(Raters,username)

        rater = raters.get()

        if daily_key.get() is None:
            self.error('No Activity done from user today',503)
            return

        if daily_key.get().evening_prev_done == False:
            self.error('Evening Preview is still pending with User',503)
            return

        results = []

        for scope in rater.students_id:
             if (scope[u'name'] == rater_id):
                 logging.info('Rater id is a part')

                 user_evening_record = daily_key.get()
                 results = user_evening_record.to_dict()
                 self.respond(results)
                 return


#         for rater in raters.fetch():
#                 x = {}
#                 logging.info(len(rater.students_id))
#                 for i in xrange(len(rater.students_id)):
#                     if (rater.students_id[i][u'name'] == username):
#                         x['rating_for'] =rater.key.id()
#                         x['rating_scopes'] = rater.students_id[i][u'scopes']
#                 results.append(x)

        #self.respond(results)

class CheckIfRater(RequestHandler):

    def get(self,username):

        logging.info('Inside check if raters')

        logging.info(username)

        raters = Raters.query()

        results = []

        for rater in raters.fetch():
                x = {}
                logging.info(len(rater.students_id))
                for i in xrange(len(rater.students_id)):
                    if (rater.students_id[i][u'name'] == username):
                        #x['flag'] = True
                        x['rating_for'] =rater.key.id()
                        x['rating_scopes'] = rater.students_id[i][u'scopes']
                        results.append(x)

        self.respond(results)


class ConfirmRaterInvite(RequestHandler):

    def put(self,username,invited_by):

        logging.info('Inside Confirm Raters')

        logging.info(username)

        submission = self.load()

        confirm  = submission[u'confirm']

        username_key = ndb.Key(Raters, invited_by)

        #raters = Raters.query()

        rater = username_key.get()

        new_list = []

        students_id = rater.students_id

        for each_stud in students_id:
            if each_stud[u'name'] == username:
                if confirm:
                    each_stud['status'] = 'Accepted'
                else:
                     each_stud['status'] = 'No Commitment'


            new_list.append(each_stud)


        rater.students_id = new_list
        rater.put()

        self.respond_ok()





        #self.respond(results)
