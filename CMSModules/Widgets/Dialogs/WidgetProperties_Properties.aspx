<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/CMSMasterPages/UI/SimplePage.master"
    Inherits="CMSModules_Widgets_Dialogs_WidgetProperties_Properties" Theme="default"
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
            var wopener = parent.wopener;
            if ((wopener != null) && wopener.RefreshPage) {
                wopener.RefreshPage();
            }
        }

        function UpdateVariantPosition(itemCode, variantId) {
            wopener = parent.wopener;
            if (wopener.UpdateVariantPosition) {
                wopener.UpdateVariantPosition(itemCode, variantId);
            }
        }
        //]]>
    </script>
    <cms:WidgetProperties IsLiveSite="false" ID="widgetProperties" runat="server" />
</asp:Content>
