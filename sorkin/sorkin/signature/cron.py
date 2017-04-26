from sorkin.signature.handler import*
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
from google.appengine.api import taskqueue


class CronJobApi(RequestHandler):


    def get(self):
        logging.info('Here inisde cron job')

        now = datetime.now()

        qry = Credentials.query()
        results = []

        for user in qry.fetch():
            logging.info(user.key.id())
            try:
             task = taskqueue.add(
                                 url='/a/CronJobMailApi/' + user.key.id(),
                                 target='default')
            except Exception as err:
                
                pass
        dt_key =   '_' + str(now.day) + str(now.month) + str(now.year)

        logging.info(dt_key)

class CronJobMailApi(RequestHandler):

    def post(self,username):
        
        #logging.info('Inside new cron job')
         now =  datetime.now()
           
         qry = Credentials.query()
         results = []

         for user in qry.fetch():
          
          #logging.info(user.key.id())

          if username in [user.key.id()]:

         
            user_rating_summary = []
            raters_rating_summary = []
            #r = []
            mail_content = []
            body_content = ''
            body_content_data = ''

            for delta in range(0,6):

                date_delta = now - timedelta(days=delta)
                
                delta_key = username + '_' + str(date_delta.day) + str(date_delta.month) + str(date_delta.year)

                #logging.info('Parent Date Loop')
                #logging.info(delta_key)
                userKey = ndb.Key(Raters,username)

                students = userKey.get()

                if students is not None:

                      all_studs = students.students_id

                      logging.info('Total number of raters are ' )
                      logging.info(len(all_studs))

                      key = ndb.Key(DailyTasks, delta_key)
                      prog = key.get()
                      r2 = []
                      
                      if (prog is not None) and (prog.user_ratings is not None):
                          
                      
                          ownRating = prog.user_ratings
                          og_length = len(ownRating)
                          for og in xrange(og_length):
                                                           if ('children' in ownRating[og]):
           
                                                               for ipg_len in xrange(len(ownRating[og][u'children'])):
                                                                   if ('children' in ownRating[og][u'children'][ipg_len]):
           
                                                                       for idg_len in xrange(len(ownRating[og][u'children'][ipg_len][u'children'])):
                                                                           #logging.info('Inside idg')
                                                                           if ( 'children' in ownRating[og][u'children'][ipg_len][u'children'][idg_len]):
                                                                               for skills_len in xrange(len(ownRating[og][u'children'][ipg_len][u'children'][idg_len][u'children'])):
                                                                                   if ('children' in ownRating[og][u'children'][ipg_len][u'children'][idg_len][u'children'][skills_len]):
                                                                                       #logging.info('Inside skills')
           
                                                                                       for rf_len in xrange(len(ownRating[og][u'children'][ipg_len][u'children'][idg_len][u'children'][skills_len][u'children'])):
                                                                              # logging.info('Inside root factors')
                                                                              # logging.info(ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
                                                                                            r2.append(ownRating[og][u'children'][ipg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
                                   
           
    
    
    
                          user_rating_summary.append({'summary' : r2 , 'date':date_delta})
                                    

                      for stud in xrange(len(all_studs) ):
                          #logging.info('Value of Stud is now ' + str(stud))
                          logging.info('Running for  ' + all_studs[stud]['name'])

                          gap_defined_for_user = all_studs[stud][u'gapRatings']

                          
                          if prog is None:
                              logging.info('Dailytaks not found for date' )
                              logging.info(delta_key)
                              break

                          else:

                              ownRating = prog.user_ratings
                              
                              if (not prog.user_ratings):
                                  logging.info('No Rater has not done eveing preview for date ' + str(delta_key))
                              else:
                               og_length = len(ownRating)

                              #logging.info('Okay daily tasks found')

                               if (not prog.evening_prev_done):
                                  logging.info('User has not done eveing preview for date ' + str(delta_key))
                               else:
                                  logging.info('chalo, evening  kiya hai')
                                  #logging.info(ownRating)
                                  if(not prog.raters_review_done):
                                      logging.info('Rater has not done review yet for date ' + str(delta_key))
                                  else:
                                        #logging.info('rater bhi kiya hai ')
                                        raters_ratings = prog.raters_ratings
                                        #logging.info('Final verdict, wit both parties did the ratings ')
                                        #logging.info(str(delta_key))


                                        for i in xrange(len(raters_ratings)):


                                                if raters_ratings[i][u'rating_by'] == all_studs[stud]['name']:
                                                    #logging.info('Ratings by new')
                                                    ratings_by = raters_ratings[i][u'rating_by']
                                                    ratings = raters_ratings[i][u'ratings']
                                                    #logging.info(ratings_by)

                                                    userRatingTemp = raters_ratings[i][u'ratings']

                                                    og_length = len(userRatingTemp)
                                                     
                                                    r = []
                                                    
                                                    for og in xrange(og_length):
                                                            if ('children' in userRatingTemp[og]):
                                                                #logging.info('Inside OG')
                                                               # logging.info(userRatingTemp[og])

                                                                for ipg_len in xrange(len(userRatingTemp[og][u'children'])):
                                                                    if ('children' in userRatingTemp[og][u'children'][ipg_len]):
                                                                        #logging.info('Inside idg')

                                                                        for idg_len in xrange(len(userRatingTemp[og][u'children'][ipg_len][u'children'])):
                                                                          #  logging.info('Inside idg')
                                                                            if ( 'children' in userRatingTemp[og][u'children'][ipg_len][u'children'][idg_len]):
                                                                                for skills_len in xrange(len(userRatingTemp[og][u'children'][ipg_len][u'children'][idg_len][u'children'])):
                                                                                    if ('children' in userRatingTemp[og][u'children'][ipg_len][u'children'][idg_len][u'children'][skills_len]):
                                                                                     #   logging.info('Inside skills')
                                                                                      #  logging.info(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'])
                                                                                        for rf_len in xrange(len(userRatingTemp[og][u'children'][ipg_len][u'children'][idg_len][u'children'][skills_len][u'children'])):
                                                                                        #    logging.info('Inside root factors')
                                                                                         #   logging.info(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
                                                                                            r.append(userRatingTemp[og][u'children'][ipg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
                                                                                            #logging.info('This value of r should have been appended')
                                                                                            #logging.info(r)


                                                    #logging.info('Ok all own ratings summary done')
                                                    #logging.info('But actually this value is getting appended')
                                                    #logging.info(r)
                                                    raters_rating_summary.append({'rating_by' : raters_ratings[i][u'rating_by'],'summary' : r , 'gapX' :  gap_defined_for_user  ,  'date':date_delta})
                                                    
                                                    #r = []
                                        r = []
                                        #user_rating_summary = []



                else :

                    logging.info(str(username) + 'User has no rater till now')

            logging.info('Okay before conclusions')
            logging.info(raters_rating_summary)
            logging.info(user_rating_summary)
            logging.info(len(user_rating_summary))

            for jj in xrange(len(raters_rating_summary)):
                    summary = raters_rating_summary[jj][u'summary']
                    rater_id = raters_rating_summary[jj][u'rating_by']
                    day_delta = raters_rating_summary[jj][u'date']

                    for j in xrange(len(user_rating_summary)):
                        #logging.info(user_rating_summary[j])
                        if (user_rating_summary[j]['date'] == raters_rating_summary[jj]['date']):
                            #logging.info('Halo')

                            try:
                                #user_rating_summary[j][u'summary'][u'name']:
                                for t in xrange(len(user_rating_summary[j][u'summary'])):

                                    #logging.info(user_rating_summary[j][u'summary'][t])
                                    jsp = json.dumps(user_rating_summary[j][u'summary'][t])
                                    #logging.info(jsp)
                                    if 'name' in jsp:
                                        #logging.info('Hassattribute')
                                        curr_rf_name = user_rating_summary[j][u'summary'][t][u'name'][u'name']
                                        user_rf_rating = user_rating_summary[j][u'summary'][t][u'rating']
                                        #logging.info(curr_rf_name)
                                        #logging.info(user_rf_rating)

                                        for k in xrange(len(raters_rating_summary[jj][u'summary'])):
                                            if 'name' in raters_rating_summary[jj][u'summary'][k]:
                                                #logging.info('yaha fat raha hai ')
                                                #logging.info(raters_rating_summary[jj][u'summary'][k])
                                                try:
                                                 if raters_rating_summary[jj][u'summary'][k][u'name'][u'name'] == curr_rf_name:
                                                    rater_rf_rating = raters_rating_summary[jj][u'summary'][k][u'rating']
                                                    #logging.info('Check Here')
                                                    #logging.info(raters_rating_summary[jj][u'summary'][k])
                                                    gapY = raters_rating_summary[jj][u'gapX']
                                                    #logging.info('RATINMG SUMMARY 2')
                                                    #logging.info(gapY)
                                                   

                                                    if abs(rater_rf_rating -  user_rf_rating) >= gapY :
                                                          #logging.info('Diffference in rating boss')
                                                          sender_address = 'admin@iaccel-atstakeperformance.com'.format(app_identity.get_application_id())  #'admin@iaccel-atstakeperformance.com'
                                                          #logging.info(sender_address);
                                                          mail_content.append({ 'gapDefined' : gapY,  'rating_by' :  rater_id , 'rater_rating' : str(rater_rf_rating) , 'own_rating' : str(user_rf_rating)  , 'root_factor'  : curr_rf_name , 'date' : str(user_rating_summary[j]['date'].day) + '-' +  str(user_rating_summary[j]['date'].month) + '-' + str(user_rating_summary[j]['date'].year)  })
                            
                                                except Exception as err:
                                                    logging.info('blanck rf wale pass')
                                                    pass 
                                                        
                            except Exception as err:
                                logging.info(err)
                                logging.info('Not complete RF set, skip')




            logging.info('final mail content is ')
            logging.info(mail_content)

            sender_address = 'admin@iaccel-atstakeperformance.com'.format(app_identity.get_application_id())  #'admin@iaccel-atstakeperformance.com'

            message = mail.EmailMessage(
                    sender=sender_address,
                    subject="Performance Accelerator Weekly Report Testing For " + username)

            for i in xrange(len(mail_content)):
                logging.info(mail_content[i])

                body_content =  body_content + '<span style= "font-weight: bold;">'  +  mail_content[i][u'rating_by']  + '</style>'  '</span>'   ' has given you '    ' <span style= "color:blue;font-weight: bold;" >'   + mail_content[i][u'rater_rating'] + '</style> ' '</span>' '     And you gave yourself '  '   <span style="color:green;font-weight: bold;">  '  + mail_content[i][u'own_rating'] + '</style>'  '</span>'   ' for Root Factor '  '  <span style="color:#e22214;text-decoration: underline;font-weight: bold;">' + mail_content[i][u'root_factor'] + '</style>'  '</span>'  ' on ' '<span style= "font-weight: bold;">'  + mail_content[i][u'date'] + '</span>'  '  Gap defined was  ' '   <span style="color:#f403d4;font-weight: bold;"> '  + str(mail_content[i][u'gapDefined']) + '</style>'  '</span>'  '<br>'
            logging.info('Entire body content')
            logging.info(body_content)
            
            if body_content == '':
               logging.info('Mail not Sent')
            else:
                  message.body = body_content
                  message.html = '<html><head></head><body>' + body_content + '</body></html>'
                  logging.info('Mail Sent')
                  message.to = username   #username
                  logging.info(message.to)
                  logging.info(message.html)
                  message.send()
                  
                        
            #logging.info('Mail Sent')
                  
                 
            return



#
#
# class CronJobMailApiBkup(RequestHandler):
#
#
#     def post(self,username):
#         logging.info('Here inisde cron mail waali job')
#
#         now = datetime.now()
#
#         user_rating_summary = []
#         raters_rating_summary = []
#         r = []
#
#         dt_key =  username + '_' + str(now.day) + str(now.month) + str(now.year)
#
#
#         userKey = ndb.Key(Raters,username)
#
#         students = userKey.get()
#
#         if students is not None:
#
#             logging.info('All Students ')
#             logging.info(students.students_id)
#
#             all_studs = students.students_id
#
#
#             #logging.info(all_studs[u'gapDays'])
#
#             #l#ogging.info(all_studs)
#
#             key = ndb.Key(DailyTasks, dt_key)
#             prog = key.get()
#             if prog is None:
#                 logging.info('Dailytaks not found')
#                 return
#             else:
#
#
#
#
#                 ownRating = prog.user_ratings
#
#                 if (not prog.evening_prev_done):
#                     logging.info('User has not done eveing preview')
#                 else:
#                     logging.info(ownRating)
#                     if(not prog.raters_review_done):
#                         logging.info('Rater has not done review yet')
#                     else:
#                         raters_ratings = prog.raters_ratings
#                         logging.info('Final verdict')
#
#                         for i in xrange(len(raters_ratings)):
#                             logging.info('Ratings by')
#
#                             for k in xrange(len(all_studs)):
#                                     logging.info(all_studs[k])
#                                     if all_studs[k][u'name'] ==  raters_ratings[i][u'rating_by']:
#                                        gapRatings = all_studs[k][u'gapRatings']
#                                        logging.info('Final Rating gaps acceptable is ')
#                                        logging.info(gapRatings)
#
#                             logging.info(raters_ratings[i][u'rating_by'])
#                             userRatingTemp = raters_ratings[i][u'ratings']
#
#                             og_length = len(userRatingTemp)
#                             for og in xrange(og_length):
#                                 if ('children' in userRatingTemp[og]):
#                                     logging.info('Inside OG')
#                                     logging.info(userRatingTemp[og])
#
#                                     for idg_len in xrange(len(userRatingTemp[og][u'children'])):
#                                         if ('children' in userRatingTemp[og][u'children'][idg_len]):
#                                             logging.info('Inside idg')
#
#                                             for idg_len in xrange(len(userRatingTemp[og][u'children'][idg_len][u'children'])):
#                                                 logging.info('Inside idg')
#                                                 if ( 'children' in userRatingTemp[og][u'children'][idg_len][u'children'][idg_len]):
#                                                     for skills_len in xrange(len(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'])):
#                                                         if ('children' in userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len]):
#                                                             logging.info('Inside skills')
#                                                             logging.info(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'])
#                                                             for rf_len in xrange(len(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'])):
#                                                                 logging.info('Inside root factors')
#                                                                 logging.info(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
#                                                                 r.append(userRatingTemp[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
#
#
#
#                             logging.info('Ok all own ratings summary done')
#                             logging.info(r)
#                             raters_rating_summary.append({'rating_by' : raters_ratings[i][u'rating_by'],'summary' : r})
#
#                         r = []
#                         og_length = len(ownRating)
#                         for og in xrange(og_length):
#                             if ('children' in ownRating[og]):
#                                 logging.info('Inside OG')
#                                 logging.info(ownRating[og])
#
#                                 for idg_len in xrange(len(ownRating[og][u'children'])):
#                                     if ('children' in ownRating[og][u'children'][idg_len]):
#                                         logging.info('Inside idg')
#
#                                         for idg_len in xrange(len(ownRating[og][u'children'][idg_len][u'children'])):
#                                             logging.info('Inside idg')
#                                             if ( 'children' in ownRating[og][u'children'][idg_len][u'children'][idg_len]):
#                                                 for skills_len in xrange(len(ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'])):
#                                                     if ('children' in ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len]):
#                                                         logging.info('Inside skills')
#                                                         logging.info(ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'])
#                                                         for rf_len in xrange(len(ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'])):
#                                                             logging.info('Inside root factors')
#                                                             logging.info(ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
#                                                             r.append(ownRating[og][u'children'][idg_len][u'children'][idg_len][u'children'][skills_len][u'children'][rf_len])
#
#                         user_rating_summary = r
#
#
#                         logging.info('Finally after all mess')
#                         logging.info(user_rating_summary)
#                         logging.info('And raters ratings are')
#                         logging.info(raters_rating_summary)
#
#                         for i in xrange(len(raters_rating_summary)):
#                             summary = raters_rating_summary[i][u'summary']
#                             rater_id = raters_rating_summary[i]['rating_by']
#
#                             for j in xrange(len(user_rating_summary)):
#                                 if ('name' in user_rating_summary[j] ):
#
#                                     curr_rf_name = user_rating_summary[j][u'name'][u'name']
#                                     user_rf_rating = user_rating_summary[j][u'rating']
#
#                                     for k in xrange(len(raters_rating_summary[i][u'summary'])):
#                                         if 'name' in raters_rating_summary[i][u'summary'][k]:
#                                             if raters_rating_summary[i][u'summary'][k][u'name'][u'name'] == curr_rf_name:
#                                                 rater_rf_rating = raters_rating_summary[i][u'summary'][k][u'rating']
#                                                 logging.info('RATINMG SUMMARY')
#                                                 logging.info(rater_rf_rating)
#                                                 logging.info(user_rf_rating)
#
#
#
#
#                                                 if abs( rater_rf_rating -  user_rf_rating) > gapRatings :
#                                                     logging.info('Diffference in rating boss')
#                                                     sender_address = 'admin@iaccel-atstakeperformance.com'.format(app_identity.get_application_id())  #'stephen@iaccel-atstakeperformance.com'
#                                                     logging.info(sender_address);
#                                                     message = mail.EmailMessage(
#                                                     sender=sender_address,
#                                                     subject="Difference in Ratings between " + rater_id + ' And ' + username + ' for ' + curr_rf_name)
#                                                     message.body = """Dear """ + username + """:
#                                                         Rating by """ + rater_id + """ Is """ + str(rater_rf_rating) + """ And you gave yourself  """  + str(user_rf_rating) + """ for your Root Factor """ + curr_rf_name
#
#
#
#                                                     #urlStr = 'https://iaccel-atstakeperformance.appspot.com/a/customer/' +  username + '/authenticate/' + hash;
#
#                                                     message.to = username
#
#                                                     message.send()
#
#
#
#
