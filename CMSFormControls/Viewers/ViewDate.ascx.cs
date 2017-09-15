using System;
using System.Data;
using System.Collections;
using System.Globalization;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

using CMS.CMSHelper;
using CMS.FormControls;
using CMS.GlobalHelper;

public partial class CMSFormControls_Viewers_ViewDate : FormEngineUserControl
{
    #region "Private fields"

    private DateTime? mValue;

    #endregion


    #region "Public properties"

    /// <summary>
    /// Gets or sets field value.
    /// </summary>
    public override object Value
    {
        get
        {
            return mValue;
        }
        set
        {
            if (ValidationHelper.IsDateTime(value))
            {
                mValue = ValidationHelper.GetDateTime(value, DateTime.MinValue);
            }
            else
            {
                mValue = null;
            }
        }
    }

    #endregion


    #region "Methods"

    protected void Page_Load(object sender, EventArgs e)
    {
        // Check if datetime is avaible
        if (mValue != null)
        {
            if (CMSContext.CurrentUser != null)
            {
                try
                {
                    // Try to print the date in user culture
                    CultureInfo ci = CultureInfo.CreateSpecificCulture(CMSContext.CurrentUser.PreferredCultureCode);
                    lblDate.Text = ValidationHelper.GetString(mValue, null, ci.ToString());
                    return;
                }
                catch (ArgumentException)
                {
                    // Can't get culture
                }
            }

            // Default print
            lblDate.Text = ValidationHelper.GetString(mValue, null);
        }
        else
        {
            lblDate.Text = GetString("general.na");
        }
    }

    #endregion
}