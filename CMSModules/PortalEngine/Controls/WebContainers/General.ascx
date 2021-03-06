<%@ Control Language="C#" AutoEventWireup="true" CodeFile="General.ascx.cs" Inherits="CMSModules_PortalEngine_Controls_WebContainers_General" %>
<%@ Register Src="~/CMSModules/Objects/Controls/Locking/ObjectEditPanel.ascx" TagName="ObjectEditPanel"
    TagPrefix="cms" %>
<%@ Register TagPrefix="cms" TagName="CSSStylesEditor" Src="~/CMSFormControls/Layouts/CSSStylesEditor.ascx" %>
<%@ Register TagPrefix="cms" TagName="WebpartContainerCode" Src="~/CMSModules/PortalEngine/Controls/WebContainers/WebpartContainerCode.ascx" %>
<cms:CMSUpdatePanel runat="server" ID="pnlUpdate">
    <ContentTemplate>
        <cms:ObjectEditPanel runat="server" ID="editMenuElem" />
    </ContentTemplate>
</cms:CMSUpdatePanel>
<asp:Panel ID="pnlContainer" runat="server" CssClass="PreviewDefaultContent">
    <div class="PageContent">
        <cms:UIForm runat="server" ID="EditForm" ObjectType="cms.webpartcontainer" DefaultFieldLayout="TwoColumns">
            <LayoutTemplate>
                <cms:FormField runat="server" ID="fDisplayName" Field="ContainerDisplayName" FormControl="LocalizableTextBox"
                    ResourceString="general.displayname" DisplayColon="true" />
                <cms:FormField runat="server" ID="fName" Field="ContainerName" FormControl="CodeName"
                    ResourceString="general.codename" DisplayColon="true" />
                <cms:FormField runat="server" ID="fCode" Field="ContainerTextBefore" ResourceString="Container_Edit.ContainerText"
                    DisplayColon="true">
                    <div style="width: 600px">
                        <cms:WebpartContainerCode runat="server" ID="codeElem" />
                    </div>
                </cms:FormField>
                <cms:FormField runat="server" ID="fCSS" Field="ContainerCSS">
                    <cms:CSSStylesEditor runat="server" ID="cssEditor" TwoColumnMode="true" />
                </cms:FormField>
            </LayoutTemplate>
        </cms:UIForm>
    </div>
</asp:Panel>
<asp:HiddenField runat="server" ID="hdnClose" EnableViewState="false" />
