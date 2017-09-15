<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FedExConfiguration.aspx.cs" Inherits="FedExConfiguration" Theme="Default" MasterPageFile="~/CMSMasterPages/UI/SimplePage.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="plcContent" runat="Server">
    <div class="WebPartForm">
        <table class="EditingFormCategoryTableHeader" cellpadding="0" cellspacing="0">
            <tbody>
                <tr class="EditingFormCategoryRow">
                    <td class="EditingFormLeftBorder">&nbsp;
                    </td>
                    <td colspan="2" class="EditingFormCategory" id="Accounts">Settings
                    </td>
                    <td class="EditingFormRightBorder">&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <table class="EditingFormCategoryTableContent" border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Key:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtAccessKey" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Password:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtPassword" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Account Number:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtAccount" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Meter Number:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtMeter" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table cellpadding="0" cellspacing="0">
            <tbody>
                <tr class="EditingFormFooterRow">
                    <td class="EditingFormLeftBorder">&nbsp;
                    </td>
                    <td class="EditingFormLabelCell">&nbsp;
                    </td>
                    <td class="EditingFormValueCell">&nbsp;
                    </td>
                    <td class="EditingFormRightBorder">&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="WebPartForm">
        <table class="EditingFormCategoryTableHeader" cellpadding="0" cellspacing="0">
            <tbody>
                <tr class="EditingFormCategoryRow">
                    <td class="EditingFormLeftBorder">&nbsp;
                    </td>
                    <td colspan="2" class="EditingFormCategory" id="Td1">Address
                    </td>
                    <td class="EditingFormRightBorder">&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <table class="EditingFormCategoryTableContent" border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">My Shipping Address:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtAddress" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">My Shipping City:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtCity" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">My Shipping Postal Code:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtPostalCode" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">My Shipping Province Code:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtProvinceCode" Width="100%" MaxLength="3"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">My Shipping Country:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:DropDownList runat="server" ID="ddlCountry" Width="100%"></asp:DropDownList>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table cellpadding="0" cellspacing="0">
            <tbody>
                <tr class="EditingFormFooterRow">
                    <td class="EditingFormLeftBorder">&nbsp;
                    </td>
                    <td class="EditingFormLabelCell">&nbsp;
                    </td>
                    <td class="EditingFormValueCell">&nbsp;
                    </td>
                    <td class="EditingFormRightBorder">&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="WebPartForm">
        <table class="EditingFormCategoryTableHeader" cellpadding="0" cellspacing="0">
            <tbody>
                <tr class="EditingFormCategoryRow">
                    <td class="EditingFormLeftBorder">&nbsp;
                    </td>
                    <td colspan="2" class="EditingFormCategory" id="Td2">Additional Information
                    </td>
                    <td class="EditingFormRightBorder">&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <table class="EditingFormCategoryTableContent" border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Company Name:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtCompanyName" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Phone Number:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:TextBox runat="server" ID="txtPhoneNumber" Width="100%"></asp:TextBox>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                    <tr class="EditingFormRow">
                        <td class="EditingFormLeftBorder">&nbsp;
                        </td>
                        <td class="EditingFormLabelCell" style="width: 250px;">Sandbox Mode:
                        </td>
                        <td style="width: 25px;"></td>
                        <td style="width: 300px">
                            <asp:CheckBox runat="server" ID="cbSandbox"/>
                        </td>
                        <td></td>
                        <td class="EditingFormRightBorder">&nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table cellpadding="0" cellspacing="0">
            <tbody>
                <tr class="EditingFormFooterRow">
                    <td class="EditingFormLeftBorder">&nbsp;
                    </td>
                    <td class="EditingFormLabelCell">&nbsp;
                    </td>
                    <td class="EditingFormValueCell">&nbsp;
                    </td>
                    <td class="EditingFormRightBorder">&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <asp:Button runat="server" ID="btnSave" Text="Save" OnClick="btnSave_Click" CssClass="LongButton" />
</asp:Content>
