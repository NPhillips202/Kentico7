﻿using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.CMSHelper;
using CMS.GlobalHelper;
using CMS.OnlineMarketing;
using CMS.UIControls;

// Edited object
[EditedObject(OnlineMarketingObjectType.SCORE, "scoreid")]
public partial class CMSModules_Scoring_Pages_Header : CMSScorePage
{
    #region "Variables"

    private bool isDialogMode = false;

    #endregion


    #region "Page events"

    protected void Page_PreInit(object sender, EventArgs e)
    {
        isDialogMode = QueryHelper.GetBoolean("dialogmode", false);

        // Modify header master page in modal dialog
        if (isDialogMode)
        {
            Page.MasterPageFile = "~/CMSMasterPages/UI/Dialogs/TabsHeader.master";
        }
        else
        {
            Page.MasterPageFile = "~/CMSMasterPages/UI/TabsHeader.master";
        }
    }


    protected void Page_Load(object sender, EventArgs e)
    {
        // Set title
        CurrentMaster.Title.TitleImage = GetImageUrl("Objects/OM_Score/object.png");
        CurrentMaster.Title.TitleText = GetString("om.score.edit");

        // Set default help
        SetHelp("scoring_contacts", "helpTopic");

        // register scripts in modal dialog
        if (isDialogMode)
        {
            RegisterModalPageScripts();
        }

        // Modify header appearance in modal dialog (display title instead of breadcrumbs)
        if (!QueryHelper.GetBoolean("dialogmode", false))
        {
            CurrentPage.InitBreadcrumbs(2);
            CurrentPage.SetBreadcrumb(0, GetString("om.score.list"), "~/CMSModules/Scoring/Pages/List.aspx", "_parent", null);
            CurrentPage.SetBreadcrumb(1, CMSContext.ResolveMacros("{%EditedObject.DisplayName%}"), null, null, null);
        }
        else
        {
            if (EditedObject != null)
            {
                // Add score name to title in dialog mode
                string scoreName = ResHelper.LocalizeString(((ScoreInfo)EditedObject).ScoreDisplayName);
                CurrentMaster.Title.TitleText += " - " + HTMLHelper.HTMLEncode(scoreName);
            }
        }

        // Initialize tabs
        InitTabs("content");
        SetTab(0, GetString("om.score.contacts"), "Tab_Contacts.aspx", "SetHelpTopic('helpTopic', 'scoring_contacts');");
        SetTab(1, GetString("general.general"), "Tab_General.aspx", "SetHelpTopic('helpTopic', 'scoring_general');");
        SetTab(2, GetString("om.score.rules"), "Tab_Rules.aspx", "SetHelpTopic('helpTopic', 'scoring_rules');");

        if (QueryHelper.GetBoolean("saved", false))
        {
            // Select General tab if new score was created
            CurrentMaster.Tabs.SelectedTab = 1;
            CurrentMaster.Title.HelpTopicName = "scoring_general";
        }
    }


    protected void Page_PreRender(object sender, EventArgs e)
    {
        UITabs tabs = ((CMSMasterPage)CurrentMaster).Tabs;

        // Remove 'saved' query parameter
        string query = URLHelper.RemoveUrlParameter(URLHelper.Url.Query, "saved");
        for (int i = 0; i < tabs.TabItems.Count; i++)
        {
            tabs.TabItems[i].RedirectUrl += query;
        }
    }

    #endregion
}