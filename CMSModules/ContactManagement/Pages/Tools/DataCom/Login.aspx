<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="CMSModules_ContactManagement_Pages_Tools_DataCom_Login"
    MasterPageFile="~/CMSMasterPages/UI/SimplePage.master" Theme="Default" %>
<%@ Register Src="~/CMSModules/ContactManagement/Controls/UI/DataCom/ErrorSummary.ascx" TagName="ErrorSummary" TagPrefix="cms" %>

<asp:Content ID="MainContent" runat="server" ContentPlaceHolderID="plcContent">
    <cms:ErrorSummary ID="ErrorSummary" runat="server" EnableViewState="false" MessagesEnabled="true" />
    <asp:Panel ID="pnlGeneral" runat="server" CssClass="PageContent">
        <cms:LocalizedLabel ResourceString="datacom.datacomaccount" runat="server" ID="lblTitle" CssClass="Title" />
        <table style="margin-top: 12px">
            <tr>
                <td>
                    <cms:LocalizedLabel ID="lblEmail" runat="server" EnableViewState="false" ResourceString="general.emailaddress"
                        DisplayColon="true" AssociatedControlID="txtEmail" /><span class="RequiredMark">*</span>
                </td>
                <td>
                    <cms:CMSTextBox ID="txtEmail" runat="server" EnableViewState="false" CssClass="TextBoxField" />
                </td>
            </tr>
            <tr>
                <td>
                    <cms:LocalizedLabel ID="lblPassword" runat="server" EnableViewState="false" ResourceString="general.password"
                        DisplayColon="true" AssociatedControlID="txtPassword" /><span class="RequiredMark">*</span>
                </td>
                <td>
                    <cms:CMSTextBox ID="txtPassword" runat="server" EnableViewState="false" TextMode="Password" CssClass="TextBoxField" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <cms:CMSButton ID="btnLogin" runat="server" EnableViewState="false" CssClass="SubmitButton" OnClick="btnLogin_Click" />
                    <cms:LocalizedLabel ID="lblSignUp" runat="server" EnableViewState="false" ResourceString="datacom.needaccount" CssClass="VerticalAlignBottom" />
                    <cms:LocalizedHyperlink ID="linkSignUpHere" runat="server" EnableViewState="false" Target="_blank" ResourceString="datacom.register" CssClass="VerticalAlignBottom"/>
                </td>
            </tr>
        </table>
    </asp:Panel>
</asp:Content>
