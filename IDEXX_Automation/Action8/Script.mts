'' --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
'Test Suite Name: MLB Automation Suite
'Test Script Name:IDEXX_Automation
'Action Name: Login
'Function/Sub Name:Login
'Description:This is for Mobile Automation using SeeTest
'Argument List: URL,Username,Password,BrowserName
'Return Value: 1 on Successful login, 0 on Failure;TaskResponse
'Author: Vikas Joshi
'Creation Date:  21 Jan 2015      
'Calling Functions:Start_Execution
'Called Functions:Login,ReadDataTable
'Modified By:
'Modification Date:
'Modification Reason:
'Application Under Test Details:IDEXX QA Order
'Comments: Cross-browser compatible . Tested for IE,Firefox
'Copyrights:Marlabs Inc.
'' --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----

ExitAction

'Initialize variables with test data
Call ReadDataTable("Global")
Username=Values(4)
Password=Values(5)

Set client = DotNetFactory.CreateInstance("experitestClient.Client", "C:\\Program Files (x86)\\Experitest\\SeeTest\\clients\\C#\\imageClient.dll")
client.Connect "127.0.0.1", 8889
client.SetProjectBaseDirectory "D:\\ UFT 12.02\\UFT & SeeTest\\Seetest Practice\\Project Tetng"
client.SetDevice "adb:GT-S7562"
Report
client.Launch "com.experitest.ExperiBank/.LoginActivity", true, false
Report
client.ElementSendText "default", "Username", 0, Username
Report
If StrComp (client.WaitForElement ( "default", "Password", 0, 10000 ), "True") = 0 Then
	Report
	'If statement
Else
	Report
End If
client.ElementSendText "default", "Password", 0, Password
Report
If StrComp (client.WaitForElement ( "default", "Login", 0, 30000 ), "True") = 0 Then
	Report
	'If statement
Else
	Report
End If
client.Click "default", "Login", 0, 1
Report
If StrComp (client.WaitForElement ( "default", "Close", 0, 60000 ), "True") = 0 Then
	Report
	'If statement
Else
	Report
End If
client.VerifyElementFound "NATIVE", "xpath=//*[@text='Invalid username or password2!']", 0
Report
str3 = client.ElementGetText ( "NATIVE", "xpath=//*[@text='Invalid username or password!']", 0 )
Report
client.Click "default", "Close", 0, 1
Report



Sub Report()
Dim logLine, outFile, status, errorMessage
logLine = client.GetResultValue ("logLine")
outFile = client.GetResultValue("outFile")
status = client.GetResultValue("status")
If StrComp (status, "True") = 0 then
	Reporter.ReportEvent micPass, logLine, "", outFile
Else 
	errorMessage = client.GetResultValue("errorMessage")
	Reporter.ReportEvent micFail, logLine, errorMessage, outFile
End If
End Sub