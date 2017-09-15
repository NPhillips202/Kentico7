using CMS.CMSHelper;
using CMS.Ecommerce;
using CMS.GlobalHelper;
using CMS.SettingsProvider;
using CMS.SiteProvider;
using INO.Shipping.FedEx;
using System;
using System.Data;
using System.Linq;
using System.Web.UI.WebControls;

public partial class FedExConfiguration : CMSEcommerceStoreSettingsPage
{
    // Create new Custom table item provider
    private readonly CustomTableItemProvider _customTableProvider = new CustomTableItemProvider(CMSContext.CurrentUser);

    protected void Page_Load(object sender, EventArgs e)
    {
        DataClassInfo customTable = DataClassInfoProvider.GetDataClass(FedExHelper.FEDEX_TABLE_NAME);
        if (customTable == null)
            throw new Exception(string.Format("'{0}' not found.", FedExHelper.FEDEX_TABLE_NAME));

        if (Page.IsPostBack)
            return;

        InitializeCountry();

        LoadData();

        txtPassword.Attributes.Add("type", "password");
    }

    private void LoadData()
    {
        // Get the data set according to the parameters
        DataSet dataSet = _customTableProvider.GetItems(FedExHelper.FEDEX_TABLE_NAME, null, null);

        if (DataHelper.DataSourceIsEmpty(dataSet))
            return;

        // Get the custom table item ID
        int itemId = ValidationHelper.GetInteger(dataSet.Tables[0].Rows[0][0], 0);

        // Get the custom table item
        CustomTableItem customTableItem = _customTableProvider.GetItem(itemId, FedExHelper.FEDEX_TABLE_NAME);

        //Fill up values
        txtAccessKey.Text = ValidationHelper.GetString(customTableItem.GetValue("Key"), string.Empty);
        txtPassword.Text = ValidationHelper.GetString(customTableItem.GetValue("Password"), string.Empty);
        txtAccount.Text = ValidationHelper.GetString(customTableItem.GetValue("AccountNumber"), string.Empty);
        txtMeter.Text = ValidationHelper.GetString(customTableItem.GetValue("MeterNumber"), string.Empty);
        txtAddress.Text = ValidationHelper.GetString(customTableItem.GetValue("Address"), string.Empty);
        txtCity.Text = ValidationHelper.GetString(customTableItem.GetValue("City"), string.Empty);
        txtPostalCode.Text = ValidationHelper.GetString(customTableItem.GetValue("PostalCode"), string.Empty);
        txtProvinceCode.Text = ValidationHelper.GetString(customTableItem.GetValue("ProvinceCode"), string.Empty);
        txtCompanyName.Text = ValidationHelper.GetString(customTableItem.GetValue("CompanyName"), string.Empty);
        txtPhoneNumber.Text = ValidationHelper.GetString(customTableItem.GetValue("PhoneNumber"), string.Empty);
        cbSandbox.Checked = customTableItem.GetBooleanValue("IsSandbox", true);

        ListItem listItem =
            ddlCountry.Items.FindByValue(ValidationHelper.GetString(customTableItem.GetValue("CountryCode"),
                string.Empty));
        if (listItem != null)
            listItem.Selected = true;
    }

    private void InitializeCountry()
    {
        InfoDataSet<CountryInfo> dataSet = CountryInfoProvider.GetCountries(null, null);

        if (DataHelper.DataSourceIsEmpty(dataSet))
            return;

        ddlCountry.DataSource = dataSet;
        ddlCountry.DataTextField = "CountryDisplayName";
        ddlCountry.DataValueField = "CountryTwoLetterCode";
        ddlCountry.DataBind();

        ddlCountry.Items.Insert(0, new ListItem { Text = "- Select -", Value = "" });
    }

    private void ClearTable()
    {
        DataClassInfo customTable = DataClassInfoProvider.GetDataClass(FedExHelper.FEDEX_TABLE_NAME);

        if (customTable == null)
            return;

        DataSet dataSet = _customTableProvider.GetItems(FedExHelper.FEDEX_TABLE_NAME, null, null);

        if (DataHelper.DataSourceIsEmpty(dataSet))
            return;

        foreach (
            CustomTableItem customTableItem in
                from DataRow dataRow in dataSet.Tables[0].Rows
                select CustomTableItem.New(dataRow, FedExHelper.FEDEX_TABLE_NAME))
        {
            customTableItem.Delete();
        }
    }

    protected void btnSave_Click(object sender, EventArgs e)
    {
        ClearTable();

        // Check if Custom table 'Sample table' exists
        DataClassInfo customTable = DataClassInfoProvider.GetDataClass(FedExHelper.FEDEX_TABLE_NAME);

        if (customTable == null)
            return;

        // Create new custom table item
        CustomTableItem customTableItem = CustomTableItem.New(FedExHelper.FEDEX_TABLE_NAME, _customTableProvider);

        // Set the ItemText field value
        customTableItem.SetValue("Key", ValidationHelper.GetString(txtAccessKey.Text, null));
        customTableItem.SetValue("Password", ValidationHelper.GetString(txtPassword.Text, null));
        customTableItem.SetValue("AccountNumber", ValidationHelper.GetString(txtAccount.Text, null));
        customTableItem.SetValue("MeterNumber", ValidationHelper.GetString(txtMeter.Text, null));
        customTableItem.SetValue("Address", ValidationHelper.GetString(txtAddress.Text, null));
        customTableItem.SetValue("City", ValidationHelper.GetString(txtCity.Text, null));
        customTableItem.SetValue("PostalCode", ValidationHelper.GetString(txtPostalCode.Text, null));
        customTableItem.SetValue("ProvinceCode", ValidationHelper.GetString(txtProvinceCode.Text, null));
        customTableItem.SetValue("CountryCode", ValidationHelper.GetString(ddlCountry.SelectedValue, null));
        customTableItem.SetValue("CompanyName", ValidationHelper.GetString(txtCompanyName.Text, null));
        customTableItem.SetValue("PhoneNumber", ValidationHelper.GetString(txtPhoneNumber.Text, null));
        customTableItem.SetValue("IsSandbox", cbSandbox.Checked);

        // Insert the custom table item into database
        customTableItem.Insert();
    }
}




