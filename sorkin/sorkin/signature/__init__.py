from google.appengine.ext import ndb
import logging
import sorkin
import httplib2



class Credentials(ndb.Model):

    password = ndb.StringProperty(required = True)
    created = ndb.DateTimeProperty(auto_now_add = True)
    first_name =  ndb.StringProperty(required = True)
    last_name =  ndb.StringProperty(required = True)
    company =  ndb.StringProperty(required = True)
    role =  ndb.StringProperty(required = True)
    hashKey =  ndb.StringProperty()
    authenticated = ndb.BooleanProperty()
    authenticate_steve = ndb.BooleanProperty(required=True,default=False)
    email = ndb.StringProperty(required = True)
    isRater = ndb.BooleanProperty(required=False)
    application_role =  ndb.StringProperty(required = True,default='Client')
    coach_id = ndb.StringProperty(required = False)
    photo = ndb.BlobKeyProperty()
    phone_number = ndb.IntegerProperty(required=False)
    locked = ndb.BooleanProperty(required=False,default=False)
    locked_time = ndb.DateTimeProperty(required=False)
    first_time_logging = ndb.BooleanProperty(required=False,default=True)
    user_logging = ndb.BooleanProperty(required=False,default=False)


class AppSetup(ndb.Model):

    og = ndb.StringProperty(repeated = True)
    idg = ndb.StringProperty(repeated = True)
    ipg = ndb.StringProperty(repeated = True)
    skills = ndb.StringProperty(repeated = True)
    roots = ndb.StringProperty(repeated = True)

class Raters(ndb.Model):

    #rater_id  =  ndb.StringProperty(required = False)
    #accepted =  ndb.StringProperty(required = True)
    created = ndb.DateTimeProperty(auto_now_add = True)
    #section = ndb.StringProperty(repeated = True)
    students_id = ndb.JsonProperty(repeated = True,indexed=False) # This will be used for quick retrieveing



class Programs(ndb.Model):

    updated  =  ndb.DateTimeProperty(auto_now = True)
    created = ndb.DateTimeProperty(auto_now_add = True)
    program = ndb.JsonProperty(required = True)
    #organis_goals =  ndb.StringProperty(repeated = True)
    #indiv_goals = ndb.StringProperty(repeated = True)
    #indiv_dev_goals = ndb.StringProperty(repeated = True)
    #indiv_skill_compt = ndb.StringProperty(repeated = True)
    #indiv_root_fact = ndb.StringProperty(repeated = True)
    training_cycle = ndb.IntegerProperty(required=True)
    #daily_statement = ndb.StringProperty(required=True)
    #daily_statement1 = ndb.StringProperty(required=False)



class DailyTasks(ndb.Model):
    user_id = ndb.StringProperty(required=True)
    updated  =  ndb.DateTimeProperty(auto_now_add = True)
    created = ndb.DateTimeProperty(auto_now = True)
    #organis_goals =  ndb.JsonProperty(repeated = True)
    #indiv_goals = ndb.JsonProperty(repeated = True)
    #indiv_dev_goals = ndb.JsonProperty(repeated = True)
    #indiv_skill_compt = ndb.JsonProperty(repeated = True)
    #indiv_root_fact = ndb.JsonProperty(repeated = True)
    #training_cycle = ndb.IntegerProperty(required=True)
    ##daily_statement = ndb.StringProperty(required=True)
    #daily_statement1 = ndb.StringProperty(required=False)
    morning_prev_done = ndb.BooleanProperty(required=True)
    evening_prev_done = ndb.BooleanProperty(required=True)
    raters_review_done = ndb.BooleanProperty(required=False)
    user_ratings = ndb.JsonProperty(required=False)
    biggest_chall =  ndb.StringProperty(required=False)
    way_addresed = ndb.StringProperty(required=False)
    really_well = ndb.StringProperty(required=False)
    reason_grateful = ndb.StringProperty(required=False)
    raters_ratings = ndb.JsonProperty(repeated=True)
    #raters_organis_goals =  ndb.JsonProperty(repeated = True)
    #raters_indiv_goals = ndb.JsonProperty(repeated = True)
    #raters_indiv_dev_goals = ndb.JsonProperty(repeated = True)
    #raters_indiv_skill_compt = ndb.JsonProperty(repeated = True)
    #raters_indiv_root_fact = ndb.JsonProperty(repeated = True)



#
#
# class Signature(ndb.Model):
#     """Define an email signature."""
#
#     # Human readable title of signature.
#     title = ndb.StringProperty(required = True)
#
#     # Body of signature.  This is a template that will be applied for each
#     # user.
#     body = ndb.TextProperty(required = True, indexed = False)
#
#
#
# class Event(ndb.Model):
#     """Records an event of some kind for a customer."""
#
#     # The customer that this event is associated with.
#     customer_id = ndb.StringProperty(required = True)
#
#     # An opaque string that indicates which event occurred.
#     kind = ndb.StringProperty(required = True)
#
#     # A unique string used to group events across a long running task.
#     context_id = ndb.StringProperty()
#
#     # Used to signal whether or not there are any more tasks pending for this
#     # context.  When the ref_count for all events with the same context_id
#     # equals 0 then there are nor more events.
#     #
#     # TODO: This may not be reliable while events are being generated for a
#     # context.  More testing and thought is needed.
#     ref_count = ndb.IntegerProperty()
#
#     # The time associated with this event.
#     time = ndb.DateTimeProperty(auto_now_add = True)
#
#     # The object that this event is related to, such as an email address.
#     focus = ndb.StringProperty()
#
#     # A field for any kind-specific extra data.
#     info = ndb.JsonProperty()
#
#
# class SummaryReport(ndb.Model):
#     """Provides summary report for a sweep over a customer's users.  This model
#     is used to collect information from many events and consolidate it into a
#     single report."""
#
#     # The customer that this summary relates to.
#     customer_id = ndb.StringProperty(required = True)
#
#     # The context_id this summary is for.  A SummaryReport will only be stored
#     # in the datastore after all events are finished for a context.
#     context_id = ndb.StringProperty(required = True)
#
#     # The date/time of the first event in this context.
#     started = ndb.DateTimeProperty()
#
#     # The data/time of the last event in this context.
#     completed = ndb.DateTimeProperty()
#
#     # Maps an event "kind" to a count.  i.e., "apply:failed" -> 36
#     stats = ndb.JsonProperty()
#
#     # The sum of event ref_counts.  When 0, that should mean the task is
#     # complete and nor more events will be generated.
#     ref_count = ndb.IntegerProperty()
#
#     # Provides a more explicit indication of the context's status.
#     state = ndb.ComputedProperty(lambda self: ['complete', 'active'][int(self.ref_count != 0)])
#
#
# class StatusReport(ndb.Model):
#     """Record pipeline Id, its start time and special remark whenever Rule is applied. """
#     #Start time
#     started = ndb.DateTimeProperty(auto_now_add = True)
#      #Brief remark while rule application like
#      #"Execution of all available rules" in case all rules for a customer have been triggered.
#      # Or 'Execution of rule for xyz orgunit '
#     remark  = ndb.StringProperty()
#
#
# def list_grouper(lst, n):
#     for i in xrange(0, len(lst), n):
#         yield lst[i:i+n]

