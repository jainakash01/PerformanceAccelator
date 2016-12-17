from sorkin.signature.customer import *
from sorkin.signature.session import *
from sorkin.signature.raters import *
from sorkin.signature.test import *
from sorkin.signature.programs import *
from sorkin.signature.dailytasks import *
from sorkin.signature.report import *
from sorkin.signature.app_setup import *
from sorkin.signature.cron import *
import json
import webapp2


wsgi = webapp2.WSGIApplication([
    webapp2.Route(r'/a/allCustomers', CustomerAllApi),
    webapp2.Route(r'/a/customer/<username>', CustomerApi),
    webapp2.Route(r'/a/customer/<username>/verify', CustomerVerifyApi),
    webapp2.Route(r'/a/customer/<username>/lock', CustomerLockApi),
    webapp2.Route(r'/a/customer/<username>/checkFirstLogging', CheckIfFirstLogging),
    webapp2.Route(r'/a/customer/<username>/steve_authenticate/<hashkey>', CustomerSteveAuthenticateApi),
    webapp2.Route(r'/a/customer/<username>/authenticate/<hashkey>', CustomerAuthenticateApi),
    webapp2.Route(r'/a/customer/<username>/invite', RatesInviteApi),
    webapp2.Route(r'/a/customer/<username>/manageRaters', ManageRatersApi),
    webapp2.Route(r'/a/customer/<username>/report/<dateWanted>', GetRatingData),
    webapp2.Route(r'/a/customer/<username>/toAccept', AcceptRatersApi),
    webapp2.Route(r'/a/customer/<username>/confirmAccepted', AcceptConfirmedListApi),
    webapp2.Route(r'/a/customer/<username>/program', ProgramsApi),
    webapp2.Route(r'/a/customer/<username>/morningPrev', MorningPreviewApi),
    webapp2.Route(r'/a/customer/<username>/eveningPrev', EveningPreviewApi),
    webapp2.Route(r'/a/customer/<username>/checkIfRater', CheckIfRater),
    webapp2.Route(r'/a/customer/<username>/checkIfCoach', CheckIfCoach),
    webapp2.Route(r'/a/customer/<username>/deleteRater/<rater_id>', DeleteRaterApi),
    webapp2.Route(r'/a/customer/<username>/evening_report/<rater_id>', RaterPreview),
    webapp2.Route(r'/a/customer/<username>/dashboardReport', DashboardReportApi),
    webapp2.Route(r'/a/customer/<username>/submitRatersRate/<rater_id>', RatersRatingApi),
    webapp2.Route(r'/a/customer/<username>/confirmAcceptance/<invited_by>', ConfirmRaterInvite),
    webapp2.Route(r'/a/customer/<username>/changePassword', CustomerChangePasswordApi),
    webapp2.Route(r'/a/customer/<username>/changeAdmin', CustomerChangeAdminApi),
    webapp2.Route(r'/a/customer/<username>/photo', GetPhotoDataApi),
    webapp2.Route(r'/a/GetUploadPhotoUrl/<username>', UploadPhotoUrlApi),
    webapp2.Route(r'/a/uploadPhoto/<username>', UploadPhotoApi),
    webapp2.Route(r'/a/customer/<username>/forgetPassword', ForgetPasswordApi),
    webapp2.Route(r'/a/appPrograms', ProgramSetupApi),
    webapp2.Route(r'/a/cronJob', CronJobApi),
    webapp2.Route(r'/a/CronJobMailApi/<username>', CronJobMailApi),
    webapp2.Route(r'/a/OneTimeExecution', ApproveAllSteve),
 ], debug = True)



# from nova.signature.clientid import *
# from nova.signature.customer import *
# from nova.signature.enforce import *
# from nova.signature.image import *
# from nova.signature.report import *
# from nova.signature.rule import *
# from nova.signature.session import *
# from nova.signature.setup import *
# from nova.signature.signature import *
# from nova.signature.scheduler import *
# from nova.signature.test import *
# import json
# import webapp2
#
#
# wsgi = webapp2.WSGIApplication([
#     webapp2.Route(r'/a/apply', EnforceApplyApi),
#     webapp2.Route(r'/a/check_contexts', CheckContextsApi),
#     webapp2.Route(r'/a/clean_reports', CleanUpReportsApi),
#     webapp2.Route(r'/a/clientid', ClientIdApi),
#     webapp2.Route(r'/a/test', TestApi),
#     webapp2.Route(r'/a/customer/<customer_id>/apply', handler = CustomerApplyApi),
#     webapp2.Route(r'/a/customer/<custid>', handler = CustomerApi),
#     webapp2.Route(r'/a/customer/<custid>/image', handler = ImageListApi),
#     webapp2.Route(r'/a/customer/<custid>/image/<imageid>', handler = ImageApi),
#     webapp2.Route(r'/a/customer/<custid>/orgunits', handler = CustomerOrgUnitsApi),
#     webapp2.Route(r'/a/customer/<custid>/preview/<email>', handler = SignaturePreviewApi),
#     webapp2.Route(r'/a/customer/<custid>/report', handler = ReportApi),
#     webapp2.Route(r'/a/customer/<custid>/report/user/<email>', handler = ReportUserApi),
#     webapp2.Route(r'/a/customer/<custid>/rule', handler = RuleListApi),
#     webapp2.Route(r'/a/customer/<customer_id>/rule/<rule_id>/apply', handler = RuleApplyApi),
#     webapp2.Route(r'/a/customer/<custid>/rule/<ruleid>', handler = RuleApi),
#     webapp2.Route(r'/a/customer/<custid>/rule/<ruleid>/validate', handler = RuleValidateApi),
#     webapp2.Route(r'/a/customer/<custid>/signature', handler = SignatureListApi),
#     webapp2.Route(r'/a/customer/<custid>/signature/<sigid>/apply/<email>', handler = SignatureApplyApi),
#     webapp2.Route(r'/a/customer/<custid>/signature/<sigid>', handler = SignatureApi),
#     webapp2.Route(r'/a/customer/<custid>/signature/<sigid>/validate/<email>', handler = SignatureValidateApi),
#     webapp2.Route(r'/a/customer/<custid>/validate', handler = CustomerValidateApi),
#     webapp2.Route(r'/a/customer/<custid>/users', handler = CustomerUsersApi),
#     webapp2.Route(r'/a/customer', CustomerListApi),
#     webapp2.Route(r'/a/_scheduler', SchedulerApi),
#     webapp2.Route(r'/a/session', SessionApi),
#     webapp2.Route(r'/a/setup', SetupApi),
#     webapp2.Route(r'/a/validate', EnforceValidateApi),
# ], debug = True)
