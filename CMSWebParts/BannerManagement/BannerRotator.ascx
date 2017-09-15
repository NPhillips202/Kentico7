<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_BannerManagement_BannerRotator" CodeFile="~/CMSWebParts/BannerManagement/BannerRotator.ascx.cs" %>

<asp:HyperLink runat="server" id="lnkBanner" Visible="true" EnableViewState="false">
    <asp:Literal ID="ltrBanner" runat="server" Visible="false" />
    <asp:Image ID="imgBanner" runat="server" Visible="false" />
</asp:HyperLink>