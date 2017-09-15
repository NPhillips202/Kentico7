using System;
using System.Collections;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.DataCom;
using CMS.EventLog;
using CMS.ExtendedControls.ActionsConfig;
using CMS.GlobalHelper;
using CMS.OnlineMarketing;
using CMS.SettingsProvider;
using CMS.UIControls;
using CMS.CMSHelper;
using System.Web;
using System.Net;

/// <summary>
/// Provides UI elements to display and edit CMS account and possibly update it from the specified Data.com company.
/// </summary>
[EditedObject(OnlineMarketingObjectType.ACCOUNT, "accountId")]
public partial class CMSModules_ContactManagement_Pages_Tools_Account_Tab_DataCom : CMSDataComPage, ICallbackEventHandler
{
    #region "Variables"

    /// <summary>
    /// New instance of credential provider.
    /// </summary>
    private readonly ICredentialProvider credentialProvider = new UserCredentialProvider(CMSContext.CurrentUser);

    #endregion


    #region "Properties"

    /// <summary>
    /// Gets or sets the Data.com company to display side-by-side with the CMS account.
    /// </summary>
    public Company Company
    {
        get
        {
            return ViewState["DataComCompany"] as Company;
        }
        set
        {
            ViewState["DataComCompany"] = value;
        }
    }


    /// <summary>
    /// Gets or sets the suggested Data.com company filter when the Data.com search didn't return an exact match.
    /// </summary>
    public CompanyFilter Filter
    {
        get;
        set;
    }


    /// <summary>
    /// Gets the site identifier of the edited account.
    /// </summary>
    public int AccountSiteID
    {
        get
        {
            return AccountHelper.ObjectSiteID(EditedObject);
        }
    }


    /// <summary>
    /// Gets the unique identifier to pass the parameters on to the Data.com company selection dialog window.
    /// </summary>
    private string ParametersIdentifier
    {
        get
        {
            string identifier = ViewState["PID"] as string;
            if (identifier == null)
            {
                identifier = Guid.NewGuid().ToString("N");
                ViewState["PID"] = identifier;
            }

            return identifier;
        }
    }


    /// <summary>
    /// Returns redirect url to login page.
    /// </summary>
    private string LoginPageUrl
    {
        get
        {
            var url = "~/CMSModules/ContactManagement/Pages/Tools/DataCom/Login.aspx";
            url = URLHelper.AddParameterToUrl(url, "returnurl", HttpUtility.UrlEncode(URLHelper.CurrentURL));
            return url;
        }
    }

    #endregion


    #region "Life cycle methods"

    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);

        AccountInfo account = EditedObject as AccountInfo;
        AuthorizeReadRequest(account);

        ScriptHelper.RegisterDialogScript(Page);
    }


    protected void Page_Load(object sender, EventArgs e)
    {
        IDataComConfiguration configuration = DataComHelper.GetConfiguration(AccountSiteID);

        // Do not check login if it's a CallBack - search button was pressed (see CreateSearchActionClientScript method)
        if (!RequestHelper.IsCallback())
        {
            bool validCredential = false;
            try
            {
                validCredential = CheckCredential();
            }
            catch (Exception ex)
            {
                HandleException(ex);
                return;
            }

            if (!validCredential)
            {
                URLHelper.Redirect(LoginPageUrl);
            }
        }

        try
        {
            if (!String.IsNullOrEmpty(CompanyHiddenField.Value))
            {
                JsonSerializer serializer = new JsonSerializer();
                Company freshCompany = serializer.Unserialize<Company>(CompanyHiddenField.Value);
                if (Company == null || Company.CompanyId != freshCompany.CompanyId)
                {
                    CompanyForm.MergeHint = true;
                }
                Company = freshCompany;
            }
            AccountInfo accountInfo = EditedObject as AccountInfo;
            CompanyIdentity identity = DataComHelper.CreateCompanyIdentity(accountInfo);
            Filter = identity.CreateFilter();
            // Do not search for company if it's a CallBack - search button was pressed (see CreateSearchActionClientScript method)
            if (Company == null && !RequestHelper.IsCallback())
            {
                DataComClient client = DataComHelper.CreateClient();
                ICompanyProvider provider = DataComHelper.CreateCompanyProvider(client, configuration);
                CompanyFinder finder = DataComHelper.CreateCompanyFinder(provider);
                CompanyFilter filterHint = null;
                Company match = finder.Find(identity, out filterHint);
                if (match != null)
                {
                    ShowInformation(GetString("datacom.companymatch"));
                    Company = match;
                    CompanyForm.MergeHint = true;
                }
                else
                {
                    ShowInformation(GetString("datacom.nocompanymatch"));
                }
            }
            InitializeHeaderActions();
            InitializeDataComForm();
        }
        catch (Exception exception)
        {
            HandleException(exception);
        }
    }


    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        if (Company == null)
        {
            CompanyFormPanel.CssClass = "Hidden";
            HeaderAction action = HeaderActions.ActionsList.SingleOrDefault(x => x.CommandName == "save");
            if (action != null)
            {
                action.Visible = false;
            }
        }
    }


    protected void HeaderActions_ActionPerformed(object sender, CommandEventArgs e)
    {
        switch (e.CommandName.ToLowerInvariant())
        {
            case "save":
                AccountInfo account = EditedObject as AccountInfo;
                AuthorizeModifyRequest(account);
                try
                {
                    if (CompanyForm.Validate() && CompanyForm.Store())
                    {
                        CompanyForm.Merge();
                        BaseInfo data = CompanyForm.Data as BaseInfo;
                        data.Generalized.SetObject();
                        Filter = null;
                        ShowChangesSaved();
                    }
                }
                catch (Exception exception)
                {
                    HandleException(exception);
                }
                break;

            case "logout":
                credentialProvider.SetCredential(new NetworkCredential());
                URLHelper.Redirect(LoginPageUrl);
                break;
        }
    }

    #endregion


    #region "Private methods"

    /// <summary>
    /// Initializes the form with the required dependencies and the specified CMS account.
    /// </summary>
    protected void InitializeDataComForm()
    {
        IDataComConfiguration configuration = DataComHelper.GetConfiguration(AccountSiteID);
        AccountInfo accountInfo = EditedObject as AccountInfo;
        CompanyForm.FormInformation = DataComHelper.GetAccountFormInfo();
        CompanyForm.EntityInfo = DataComHelper.GetCompanyEntityInfo(configuration);
        CompanyForm.EntityMapping = configuration.GetCompanyMapping();
        CompanyForm.EntityAttributeMapperFactory = DataComHelper.GetCompanyAttributeMapperFactory();
        CompanyForm.Entity = Company;
        CompanyForm.EntityAttributeFormatter = DataComHelper.GetEntityAttributeFormatter();
        CompanyForm.Restore(accountInfo);
    }


    /// <summary>
    /// Adds actions to the page header.
    /// </summary>
    protected void InitializeHeaderActions()
    {
        AddHeaderActions(new HeaderAction
        {
            ControlType = HeaderActionTypeEnum.LinkButton,
            Text = GetString("general.apply"),
            ImageUrl = GetImageUrl("CMSModules/CMS_Content/EditMenu/save.png"),
            CommandName = "save",
            RegisterShortcutScript = true
        });

        AddHeaderActions(new HeaderAction
        {
            ControlType = HeaderActionTypeEnum.LinkButton,
            Text = GetString("general.search"),
            ImageUrl = GetImageUrl("CMSModules/CMS_ContactManagement/search.png"),
            OnClientClick = CreateSearchActionClientScript()
        });

        AddHeaderActions(new HeaderAction
        {
            Text = string.Format(GetString("datacom.logout"), credentialProvider.GetCredential().UserName),
            GenerateSeparatorBeforeAction = true,
            ImageUrl = GetImageUrl("CMSModules/CMS_PortalEngine/OnSiteEdit/signout.png"),
            CommandName = "logout",
            OnClientClick = "return confirm('" + GetString("datacom.automation.confirmlogout") + "')"
        });

        HeaderActions.ActionPerformed += HeaderActions_ActionPerformed;
    }


    /// <summary>
    /// Creates a client script to open the dialog window to select a Data.com company, and returns it.
    /// </summary>
    /// <returns>A client script to open the dialog window to select a Data.com company.</returns>
    protected string CreateSearchActionClientScript()
    {
        string baseUrl = URLHelper.ResolveUrl("~/CMSModules/ContactManagement/Pages/Tools/DataCom/SelectCompany.aspx");
        string url = String.Format("{0}?pid={1}", baseUrl, ParametersIdentifier);
        string script = String.Format("function DataCom_SelectCompany (arg, context) {{ modalDialog('{0}', 'SelectCompany', '1000', '700', null); return false; }}", URLHelper.AddParameterToUrl(url, "hash", QueryHelper.GetHash(url)));
        ScriptHelper.RegisterClientScriptBlock(this, GetType(), "DataCom_SelectCompany", script, true);

        return String.Format("{0}; return false;", Page.ClientScript.GetCallbackEventReference(this, null, "DataCom_SelectCompany", null));
    }


    /// <summary>
    /// Displays an error message and logs the specified exception to the event log.
    /// </summary>
    /// <param name="exception">The exception to handle.</param>
    private void HandleException(Exception exception)
    {
        ErrorSummary.Report(exception);
        EventLogProvider.LogException("Data.com Connector", "AccountPage", exception);
    }


    /// <summary>
    /// Checks whether is user has provided credentials to DataCom or not. If not, user is redirected to login page.
    /// </summary>
    /// <exception cref="Exception">Might be thrown when error occurs in communicating with Data.com</exception>
    private bool CheckCredential()
    {
        var credential = credentialProvider.GetCredential();
        var client = DataComHelper.CreateClient();
        return (credential != null && client.UserIsValid(credential));
    }

    #endregion


    #region ICallbackEventHandler Members

    string ICallbackEventHandler.GetCallbackResult()
    {
        return null;
    }


    void ICallbackEventHandler.RaiseCallbackEvent(string eventArgument)
    {
        JsonSerializer serializer = new JsonSerializer();
        Hashtable parameters = new Hashtable();
        if (Filter != null)
        {
            parameters["Filter"] = serializer.Serialize(Filter);
        }
        parameters["SiteID"] = AccountSiteID;
        WindowHelper.Add(ParametersIdentifier, parameters);
    }

    #endregion
}