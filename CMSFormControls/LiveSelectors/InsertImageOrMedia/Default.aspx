<%@ Page Language="C#" AutoEventWireup="true" EnableEventValidation="false" Inherits="CMSFormControls_LiveSelectors_InsertImageOrMedia_Default"
    CodeFile="Default.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server" enableviewstate="false">
    <title>Insert</title>
</head>
<frameset border="0" rows="<%=TabsFrameHeight%>, *, 43" id="rowsFrameset">
    <frame name="insertHeader" src="<%=mBlankUrl%>" scrolling="no" frameborder="0" noresize="noresize"
        id="menu" />
    <frame name="insertContent" src="<%=mBlankUrl%>" scrolling="no" frameborder="0" id="content" />
    <frame name="insertFooter" src="Footer.aspx<%=Request.Url.Query%>" scrolling="no"
        frameborder="0" noresize="noresize" id="footer" />
    <cms:NoFramesLiteral ID="ltlNoFrames" runat="server" />
</frameset>
</html>
