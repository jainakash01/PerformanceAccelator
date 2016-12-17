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
import httplib2





class TestApi(RequestHandler):

    def get(self):


        uname = 'jain.shashank@novasoftcorps.com'
        #/a/customer/<username>/manageRaters
        url = 'http://localhost:8080/a/customer/' +  uname  + '/program'


        for i in range(2):
            print i
            for i in range(4,6):
                print i


        jsonLoad =  { 'training_cycle' : 100, 'goals' :
                      [{'OG':'Increase Revenue','IPG':'Onboarcd','IDG':'RETENDTION','SKILLCOMP':'sada','ROOTFACT':'dharam','DS':'I AM HERO',
                        'rater':['jain.akash@gmail.com','sarveshgmail.com'] , 'coach' : 'steve@gmail.com'}]}

        #jsonLoad = {'rater_id':'jaon.shashank','section':['das','asdasd']}

#         jsonLoad = {'organis_goals': ['individual','Hero banna hai'],
#              'indiv_goals' : ['sdfds','afaf'] ,
#              'indiv_dev_goals' : ['aswr2','qwrer2'],'indiv_skill_compt' : ['dfwe','dfewf']  ,
#              'indiv_root_fact' : ['wqweqw'] , 'training_cycle' : 90,
#              'daily_statement' : 'Hello am shashank' ,
#              'ratings':  [{'name': 'increase retention' , 'rate' : 3},{'name': 'increase proft' , 'rate' : 4}] }

        #body_json = json.dumps(jsonLoad)
        #headers = {'Content-Type': 'application/json'}

        #http  = httplib2.Http()

        #resp, content = http.request(url,  'PUT'  ,    headers = headers ,body=body_json)

        return
        #self.respond(content)
