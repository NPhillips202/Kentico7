using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.CMSHelper;
using CMS.FormControls;
using CMS.FormEngine;
using CMS.SettingsProvider;
using CMS.SiteProvider;
using CMS.ExtendedControls;

public partial class CMSFormControls_Captcha_SecurityCode : FormEngineUserControl, ICaptchaControl
{
    #region "Variables"

    private FormEngineUserControl mCaptchaControl = null;

    #endregion


    #region "Methods"

    protected override void OnInit(EventArgs e)
    {
        Controls.Add(CaptchaControl);
    }


    /// <summary>
    /// Gets selected captcha from settings.
    /// </summary>
    /// <param name="siteName">Site name</param>
    protected CaptchaEnum CaptchaSetting(string siteName)
    {
        CaptchaEnum selectedCaptcha = CaptchaEnum.Default;
        selectedCaptcha = (CaptchaEnum)SettingsKeyProvider.GetIntValue(siteName + ".CMSCaptchaControl");
        return selectedCaptcha;
    }

    #endregion


    #region "Properties"

    /// <summary>
    /// Gets captcha control.
    /// </summary>
    protected FormEngineUserControl CaptchaControl
    {
        get
        {
            if (mCaptchaControl == null)
            {
                CaptchaEnum selectedCaptcha = CaptchaSetting(CMSContext.CurrentSiteName);

                string captchaControlName = null;
                switch (selectedCaptcha)
                {
                    // Default simple captcha
                    case CaptchaEnum.Default:
                        captchaControlName = "SimpleCaptcha";
                        //captchaPath = "~/CMSFormControls/Captcha/SimpleCaptcha.ascx";
                        break;

                    // Logic captcha
                    case CaptchaEnum.Logic:
                        captchaControlName = "LogicCaptcha";
                        //captchaPath = "~/CMSFormControls/Captcha/LogicCaptcha.ascx";
                        break;

                    // Text captcha
                    case CaptchaEnum.Text:
                        captchaControlName = "TextCaptcha";
                        //captchaPath = "~/CMSFormControls/Captcha/TextCaptcha.ascx";
                        break;
                }

                // Get form control
                FormUserControlInfo ctrl = FormUserControlInfoProvider.GetFormUserControlInfo(captchaControlName);
                if (ctrl == null)
                {
                    throw new Exception(string.Format("[SecurityCode]: The CAPTCHA control with name '{0}' doesn't exist.", captchaControlName));
                }

                mCaptchaControl = Page.LoadUserControl(ctrl.UserControlFileName) as FormEngineUserControl;
                mCaptchaControl.ID = "captchaControl";

                // Load the default properties of the form control
                FormInfo properties = FormHelper.GetFormControlParameters(captchaControlName, ctrl.UserControlParameters, false);
                mCaptchaControl.LoadDefaultProperties(properties);
            }

            return mCaptchaControl;
        }
    }


    /// <summary>
    /// Captcha as interface ICaptchaControl.
    /// </summary>
    protected ICaptchaControl Captcha
    {
        get
        {
            return CaptchaControl as ICaptchaControl;
        }
    }


    /// <summary>
    /// Gets or sets value.
    /// </summary>
    public override object Value
    {
        get
        {
            return CaptchaControl.Value;
        }
        set
        {
            CaptchaControl.Value = value;
        }
    }


    /// <summary>
    /// Sets whether the captcha control should display info label.
    /// </summary>
    public bool ShowInfoLabel
    {
        set
        {
            CaptchaControl.SetValue("ShowInfoLabel", value);
        }
    }


    /// <summary>
    /// Gets or sets enabled state of captcha controls.
    /// </summary>
    public override bool Enabled
    {
        get
        {
            return base.Enabled;
        }
        set
        {
            CaptchaControl.Enabled = base.Enabled = value;
        }
    }


    /// <summary>
    /// Returns true if entered data is valid.
    /// </summary>
    public override bool IsValid()
    {
        bool isValid = CaptchaControl.IsValid();
        if (!isValid)
        {
            ValidationError = GetString("SecurityCode.ValidationError");
        }

        return isValid;
    }

    #endregion


    #region ICaptchaControl Members

    /// <summary>
    /// Generates new captcha.
    /// </summary>
    public void GenerateNew()
    {
        Captcha.GenerateNew();
    }


    /// <summary>
    /// Indicates whether the after text should be displayed.
    /// </summary>
    public bool ShowAfterText
    {
        get
        {
            return Captcha.ShowAfterText;
        }
        set
        {
            Captcha.ShowAfterText = value;
        }
    }


    /// <summary>
    /// Indicates if CAPTCHA code is always generated and stored to the session.
    /// </summary>
    public bool KeepCodeAutomatically
    {
        get
        {
            return Captcha.KeepCodeAutomatically;
        }
        set
        {
            Captcha.KeepCodeAutomatically = value;
        }
    }


    /// <summary>
    /// Indicates whether new captcha is generated after the wrong input was entered.
    /// </summary>
    public bool AlwaysGenerate
    {
        get
        {
            return Captcha.AlwaysGenerate;
        }
        set
        {
            Captcha.AlwaysGenerate = value;
        }
    }

    #endregion
}