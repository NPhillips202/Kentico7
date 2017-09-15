using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.PortalControls;
using CMS.GlobalHelper;
using CMS.CMSHelper;
using CMS.PortalEngine;
using CMS.UIControls;
using CMS.IO;

public partial class CMSWebParts_JqueryCustomCalendar_JqueryCustomCalendar : CMSAbstractWebPart
{
    #region "Properties"

    public string Form
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("Form"), "");
        }
        set
        {
            this.SetValue("Form", value);
        }
    }
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!((ViewMode == ViewModeEnum.LiveSite) || (ViewMode == ViewModeEnum.Preview)))
        {
            return;
        }
    
        Response.Cookies["formName"].Value = Form;
        //string s = Form;
        // Registration to chat webservice
        AbstractCMSPage cmsPage = Page as AbstractCMSPage;
        //if (cmsPage != null)
        //{
        //    ChatHelper.RegisterChatAJAXProxy(cmsPage);
        //}

        // Script references insertion
        ScriptHelper.RegisterJQuery(Page);
        ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/JsonResponse.ashx", false);
        //ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/jquery_files/jquery.min.js");
        //ScriptHelper.RegisterScriptFile(Page, "/Custom/marriottdelraybeach.com 0009/jquery.min.js");
        //ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/jquery_files/jquery-ui-1.7.3.custom.min.js");
        ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/jquery_files/jquery.qtip-1.0.0-rc3.min.js");
        ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/fullcalendar_files/fullcalendar.min.js");
        ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/scripts_files/calendarscript.js");
        ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/jquery_files/jquery-ui-timepicker-addon-0.6.2.min.js");

        //StringWriter _writer = new StringWriter();
        //HttpContext.Current.Server.Execute("~/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/CustomCalendar.aspx", _writer);

        //string html = _writer.ToString();
        //Response.Write(html);
    }

    
    #region "Methods"

    /// <summary>
    /// Content loaded event handler
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }


    /// <summary>
    /// Initializes the control properties
    /// </summary>
    protected void SetupControl()
    {
        if (this.StopProcessing)
        {
            // Do not process
        }
        else
        {
           
        }
    }


    /// <summary>
    /// Reloads the control data
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }

    #endregion

    
}



