<%@ Page Language="C#" AutoEventWireup="true" Inherits="CMSModules_Widgets_LiveDialogs_WidgetProperties_Properties"
    MasterPageFile="~/CMSMasterPages/LiveSite/SimplePage.master" Theme="default"
    EnableEventValidation="false" ValidateRequest="false" CodeFile="WidgetProperties_Properties.aspx.cs" %>

<%@ Register Src="~/CMSModules/Widgets/Controls/WidgetProperties.ascx" TagName="WidgetProperties"
    TagPrefix="cms" %>
<asp:Content ID="pnlContent" ContentPlaceHolderID="plcContent" runat="server">
    <style type="text/css">
        body
        {
            margin: 0px;
            padding: 0px;
            height: 100%;
            width: 100%;
        }
    </style>
    <script type="text/javascript">
        //<![CDATA[
        var wopener = parent.wopener;

        function ChangeWidget(zoneId, widgetId, aliasPath) {
            if (parent.ChangeWidget) {
                parent.ChangeWidget(zoneId, widgetId, aliasPath);
            }
        }

        function RefreshPage() {
            wopener = parent.wopener;
            if (wopener.RefreshPage) {
                wopener.RefreshPage();
            }
        }
        //]]>
    </script>
    <cms:WidgetProperties ID="widgetProperties" runat="server" />
</asp:Content>
