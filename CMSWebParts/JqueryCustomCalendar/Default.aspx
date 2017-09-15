<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="CMSWebParts_JqueryCustomCalendar_Default" %>
<%@ Register Src="JqueryCustomCalendar.ascx" TagName="JqueryCustomCalendar" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="JqueryCustomCalendar_files/css_files/cupertino/jquery-ui-1.7.3.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="JqueryCustomCalendar_files/fullcalendar_files/fullcalendar.css" rel="stylesheet"
        type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
     <uc1:JqueryCustomCalendar ID="CustomCalendar1" runat="server" />
    </div>
    </form>
</body>
</html>
