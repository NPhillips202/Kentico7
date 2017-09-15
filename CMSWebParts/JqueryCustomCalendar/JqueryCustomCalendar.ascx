<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_JqueryCustomCalendar_JqueryCustomCalendar"
    CodeFile="~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar.ascx.cs" %>
<%--<head>--%>
    <link href="~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/css_files/cupertino/jquery-ui-1.7.3.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/fullcalendar_files/fullcalendar.css"
        rel="stylesheet" type="text/css" />
<%--</head>--%>
<%--<body>--%>
    <input type="text" id="miniCalendar" class="input" value="Select a Date &raquo;" />
    <div id="Jquerycalendar"></div>
    <div id="calendarMobile"></div>
    <div id="LegendDialog" style="font: 70% 'Trebuchet MS', sans-serif; margin: 50px;">
        <table width="100%" border="0" cellspacing="4" cellpadding="2">
            <tbody>
                <tr>
                    <td>
                        <ul style="list-style-type: none;" class="legend-list">


                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>  
    <div id="popUpDialog" style="font: 70% 'Trebuchet MS', sans-serif; margin: 50px;">
        
    </div>
    <div runat="server" id="jsonDiv" />
    <input type="hidden" id="hdClient" runat="server" />

   
<%--    
</body>--%>
