<%@ Page Language="C#" AutoEventWireup="true" CodeFile="~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/CustomCalendar.aspx.cs"
    Inherits="CMSWebParts_CustomCalendar_CustomCalendar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
  <%--  <link href="css_files/cupertino/jquery-ui-1.7.3.custom.css" rel="stylesheet" type="text/css" />
    <link href="fullcalendar_files/fullcalendar.css" rel="stylesheet" type="text/css" />
    <script src="jquery_files/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="jquery_files/jquery-ui-1.7.3.custom.min.js" type="text/javascript"></script>
    <script src="jquery_files/jquery.qtip-1.0.0-rc3.min.js" type="text/javascript"></script>
    <script src="fullcalendar_files/fullcalendar.min.js" type="text/javascript"></script>
    <script src="scripts_files/calendarscript.js" type="text/javascript"></script>
    <script src="jquery_files/jquery-ui-timepicker-addon-0.6.2.min.js" type="text/javascript"></script>
   --%>
    <style type='text/css'>
        body
        {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            font-family: "Lucida Grande" ,Helvetica,Arial,Verdana,sans-serif;
        }
        
        #calendar
        {
            width: 900px;
            margin: 0 auto;
        }
        /* css for timepicker */
        .ui-timepicker-div dl
        {
            text-align: left;
        }
        
        .ui-timepicker-div dl dt
        {
            height: 25px;
        }
        
        .ui-timepicker-div dl dd
        {
            margin: -25px 0 10px 65px;
        }
        
        .style1
        {
            width: 100%;
        }
        
        /* table fields alignment*/
        .alignRight
        {
            text-align: right;
            padding-right: 10px;
            padding-bottom: 10px;
        }
        
        .alignLeft
        {
            text-align: left;
            padding-bottom: 10px;
        }
        #calendar
        {
            width: 690px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
    </asp:ScriptManager>
    <div id="calendar">
    </div>
    <div id="popUpDialog" style="font: 70% 'Trebuchet MS', sans-serif; margin: 50px;">
        <table width="100%" border="0" cellspacing="4" cellpadding="2">
            <tbody>
                <tr>
                    <td class="Label">
                        Time Start:
                    </td>
                    <td class="CalendarContent" id="timeStart">
                    </td>
                    <td class="Label">
                        Time End:
                    </td>
                    <td class="CalendarContent" id="timeEnd">
                    </td>
                </tr>
                <tr>
                    <td class="Label">
                        Description:
                    </td>
                    <td class="CalendarContent" colspan="3" id="description">
                    </td>
                </tr>
                <tr>
                    <td class="Label">
                        Location:
                    </td>
                    <td class="CalendarContent" colspan="3" id="location">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div runat="server" id="jsonDiv" />
    <input type="hidden" id="hdClient" runat="server" />
    </form>
</body>
</html>
