using System;
using System.Data;

using CMS.CMSHelper;
using CMS.GlobalHelper;
using CMS.Newsletter;
using CMS.SettingsProvider;
using CMS.UIControls;

[Title(Text = "Newsletters", ImageUrl = "CMSModules/CMS_Newsletter/module.png")]
[CheckLicence(FeatureEnum.Newsletters)]
public partial class CMSAPIExamples_Code_OnlineMarketing_Newsletters_Default : CMSAPIExamplePage
{
    #region "Initialization"

    protected void Page_Load(object sender, EventArgs e)
    {
        // Subscription template
        apiCreateSubscriptionTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateSubscriptionTemplate);
        apiDeleteSubscriptionTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteSubscriptionTemplate);

        // Unsubscription template
        apiCreateUnsubscriptionTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateUnsubscriptionTemplate);
        apiDeleteUnsubscriptionTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteUnsubscriptionTemplate);

        // Issue template
        apiCreateIssueTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateIssueTemplate);
        apiGetAndUpdateIssueTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndUpdateIssueTemplate);
        apiGetAndBulkUpdateIssueTemplates.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndBulkUpdateIssueTemplates);
        apiDeleteIssueTemplate.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteIssueTemplate);

        // Static newsletter
        apiCreateStaticNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateStaticNewsletter);
        apiGetAndUpdateStaticNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndUpdateStaticNewsletter);
        apiGetAndBulkUpdateStaticNewsletters.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndBulkUpdateStaticNewsletters);
        apiDeleteStaticNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteStaticNewsletter);

        // Dynamic newsletter
        apiCreateDynamicNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateDynamicNewsletter);
        apiGetAndUpdateDynamicNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndUpdateDynamicNewsletter);
        apiGetAndBulkUpdateDynamicNewsletters.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndBulkUpdateDynamicNewsletters);
        apiDeleteDynamicNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteDynamicNewsletter);

        // Subscriber
        apiCreateSubscriber.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateSubscriber);
        apiGetAndUpdateSubscriber.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndUpdateSubscriber);
        apiGetAndBulkUpdateSubscribers.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndBulkUpdateSubscribers);
        apiDeleteSubscriber.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteSubscriber);
        apiSubscribeToNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(SubscribeToNewsletter);
        apiUnsubscribeFromNewsletter.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(UnsubscribeFromNewsletter);

        // Static issue
        apiCreateStaticIssue.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateStaticIssue);
        apiGetAndUpdateStaticIssue.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndUpdateStaticIssue);
        apiGetAndBulkUpdateStaticIssues.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndBulkUpdateStaticIssues);
        apiDeleteStaticIssue.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteStaticIssue);

        // Dynamic issue
        apiCreateDynamicIssue.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(CreateDynamicIssue);
        apiGetAndUpdateDynamicIssue.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndUpdateDynamicIssue);
        apiGetAndBulkUpdateDynamicIssues.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(GetAndBulkUpdateDynamicIssues);
        apiDeleteDynamicIssue.RunExample += new CMSAPIExamples_Controls_APIExample.OnRunExample(DeleteDynamicIssue);
    }

    #endregion


    #region "Mass actions"

    /// <summary>
    /// Runs all creating and managing examples.
    /// </summary>
    public override void RunAll()
    {
        base.RunAll();

        // Subscription template
        apiCreateSubscriptionTemplate.Run();

        // Unsubscription template
        apiCreateUnsubscriptionTemplate.Run();

        // Issue template
        apiCreateIssueTemplate.Run();
        apiGetAndUpdateIssueTemplate.Run();
        apiGetAndBulkUpdateIssueTemplates.Run();

        // Static newsletter
        apiCreateStaticNewsletter.Run();
        apiGetAndUpdateStaticNewsletter.Run();
        apiGetAndBulkUpdateStaticNewsletters.Run();

        // Dynamic newsletter
        apiCreateDynamicNewsletter.Run();
        apiGetAndUpdateDynamicNewsletter.Run();
        apiGetAndBulkUpdateDynamicNewsletters.Run();

        // Subscriber
        apiCreateSubscriber.Run();
        apiGetAndUpdateSubscriber.Run();
        apiGetAndBulkUpdateSubscribers.Run();
        apiSubscribeToNewsletter.Run();

        // Static issue
        apiCreateStaticIssue.Run();
        apiGetAndUpdateStaticIssue.Run();
        apiGetAndBulkUpdateStaticIssues.Run();

        // Dynamic issue
        apiCreateDynamicIssue.Run();
        apiGetAndUpdateDynamicIssue.Run();
        apiGetAndBulkUpdateDynamicIssues.Run();
    }


    /// <summary>
    /// Runs all cleanup examples.
    /// </summary>
    public override void CleanUpAll()
    {
        base.CleanUpAll();

        // Dynamic issue
        apiDeleteDynamicIssue.Run();

        // Static issue
        apiDeleteStaticIssue.Run();

        // Subscriber
        apiUnsubscribeFromNewsletter.Run();

        // Subscriber
        apiDeleteSubscriber.Run();

        // Dynamic newsletter
        apiDeleteDynamicNewsletter.Run();

        // Static newsletter
        apiDeleteStaticNewsletter.Run();

        // Subscription template
        apiDeleteSubscriptionTemplate.Run();

        // Unsubscription template
        apiDeleteUnsubscriptionTemplate.Run();

        // Issue template
        apiDeleteIssueTemplate.Run();
    }

    #endregion


    #region "API examples - Subscription template"

    /// <summary>
    /// Creates subscription template. Called when the "Create template" button is pressed.
    /// </summary>
    private bool CreateSubscriptionTemplate()
    {
        // Create new subscription template object
        EmailTemplateInfo newTemplate = new EmailTemplateInfo();

        // Set the properties
        newTemplate.TemplateDisplayName = "My new subscription template";
        newTemplate.TemplateName = "MyNewSubscriptionTemplate";
        newTemplate.TemplateType = EmailTemplateType.Subscription;
        newTemplate.TemplateBody = "My new subscription template body";
        newTemplate.TemplateHeader = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Newsletter</title><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /></head><body>";
        newTemplate.TemplateFooter = "</body></html>";
        newTemplate.TemplateSiteID = CMSContext.CurrentSiteID;

        // Save the subscription template
        EmailTemplateInfoProvider.SetEmailTemplateInfo(newTemplate);

        return true;
    }


    /// <summary>
    /// Deletes subscription template. Called when the "Delete template" button is pressed.
    /// Expects the CreateSubscriptionTemplate method to be run first.
    /// </summary>
    private bool DeleteSubscriptionTemplate()
    {
        // Get the subscription template
        EmailTemplateInfo deleteTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewSubscriptionTemplate", CMSContext.CurrentSiteID);

        // Delete the subscription template
        EmailTemplateInfoProvider.DeleteEmailTemplateInfo(deleteTemplate);

        return (deleteTemplate != null);
    }

    #endregion


    #region "API examples - Unsubscription template"

    /// <summary>
    /// Creates unsubscription template. Called when the "Create template" button is pressed.
    /// </summary>
    private bool CreateUnsubscriptionTemplate()
    {
        // Create new unsubscription template object
        EmailTemplateInfo newTemplate = new EmailTemplateInfo();

        // Set the properties
        newTemplate.TemplateDisplayName = "My new unsubscription template";
        newTemplate.TemplateName = "MyNewUnsubscriptionTemplate";
        newTemplate.TemplateType = EmailTemplateType.Unsubscription;
        newTemplate.TemplateBody = "My new unsubscription template body";
        newTemplate.TemplateHeader = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Newsletter</title><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /></head><body>";
        newTemplate.TemplateFooter = "</body></html>";
        newTemplate.TemplateSiteID = CMSContext.CurrentSiteID;

        // Save the unsubscription template
        EmailTemplateInfoProvider.SetEmailTemplateInfo(newTemplate);

        return true;
    }


    /// <summary>
    /// Deletes unsubscription template. Called when the "Delete template" button is pressed.
    /// Expects the CreateUnsubscriptionTemplate method to be run first.
    /// </summary>
    private bool DeleteUnsubscriptionTemplate()
    {
        // Get the unsubscription template
        EmailTemplateInfo deleteTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewUnsubscriptionTemplate", CMSContext.CurrentSiteID);

        // Delete the unsubscription template
        EmailTemplateInfoProvider.DeleteEmailTemplateInfo(deleteTemplate);

        return (deleteTemplate != null);
    }

    #endregion


    #region "API examples - Issue template"

    /// <summary>
    /// Creates issue template. Called when the "Create template" button is pressed.
    /// </summary>
    private bool CreateIssueTemplate()
    {
        // Create new issue template object
        EmailTemplateInfo newTemplate = new EmailTemplateInfo();

        // Set the properties
        newTemplate.TemplateDisplayName = "My new issue template";
        newTemplate.TemplateName = "MyNewIssueTemplate";
        newTemplate.TemplateType = EmailTemplateType.Issue;
        newTemplate.TemplateBody = "<p>My new issue template body</p><p>$$content:800:600$$</p>";
        newTemplate.TemplateHeader = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Newsletter</title><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /></head><body>";
        newTemplate.TemplateFooter = "</body></html>";
        newTemplate.TemplateSiteID = CMSContext.CurrentSiteID;

        // Save the issue template
        EmailTemplateInfoProvider.SetEmailTemplateInfo(newTemplate);

        return true;
    }


    /// <summary>
    /// Gets and updates issue template. Called when the "Get and update template" button is pressed.
    /// Expects the CreateIssueTemplate method to be run first.
    /// </summary>
    private bool GetAndUpdateIssueTemplate()
    {
        // Get the issue template
        EmailTemplateInfo updateTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewIssueTemplate", CMSContext.CurrentSiteID);
        if (updateTemplate != null)
        {
            // Update the properties
            updateTemplate.TemplateDisplayName = updateTemplate.TemplateDisplayName.ToLower();

            // Save the changes
            EmailTemplateInfoProvider.SetEmailTemplateInfo(updateTemplate);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and bulk updates issue templates. Called when the "Get and bulk update templates" button is pressed.
    /// Expects the CreateIssueTemplate method to be run first.
    /// </summary>
    private bool GetAndBulkUpdateIssueTemplates()
    {
        // Prepare the parameters
        string where = "TemplateName LIKE N'MyNewIssueTemplate%'";

        // Get the data
        DataSet templates = EmailTemplateInfoProvider.GetEmailTemplates(where, null);
        if (!DataHelper.DataSourceIsEmpty(templates))
        {
            // Loop through the individual items
            foreach (DataRow templateDr in templates.Tables[0].Rows)
            {
                // Create object from DataRow
                EmailTemplateInfo modifyTemplate = new EmailTemplateInfo(templateDr);

                // Update the properties
                modifyTemplate.TemplateDisplayName = modifyTemplate.TemplateDisplayName.ToUpper();

                // Save the changes
                EmailTemplateInfoProvider.SetEmailTemplateInfo(modifyTemplate);
            }

            return true;
        }

        return false;
    }


    /// <summary>
    /// Deletes issue template. Called when the "Delete template" button is pressed.
    /// Expects the CreateIssueTemplate method to be run first.
    /// </summary>
    private bool DeleteIssueTemplate()
    {
        // Get the issue template
        EmailTemplateInfo deleteTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewIssueTemplate", CMSContext.CurrentSiteID);

        // Delete the issue template
        EmailTemplateInfoProvider.DeleteEmailTemplateInfo(deleteTemplate);

        return (deleteTemplate != null);
    }

    #endregion


    #region "API examples - Static newsletter"

    /// <summary>
    /// Creates static newsletter. Called when the "Create newsletter" button is pressed.
    /// </summary>
    private bool CreateStaticNewsletter()
    {
        EmailTemplateInfo subscriptionTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewSubscriptionTemplate", CMSContext.CurrentSiteID);
        EmailTemplateInfo unsubscriptionTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewUnsubscriptionTemplate", CMSContext.CurrentSiteID);
        EmailTemplateInfo myNewIssueTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewIssueTemplate", CMSContext.CurrentSiteID);

        if ((subscriptionTemplate != null) && (unsubscriptionTemplate != null) && (myNewIssueTemplate != null))
        {
            // Create new static newsletter object
            NewsletterInfo newNewsletter = new NewsletterInfo();

            // Set the properties
            newNewsletter.NewsletterDisplayName = "My new static newsletter";
            newNewsletter.NewsletterName = "MyNewStaticNewsletter";
            newNewsletter.NewsletterType = NewsletterType.TemplateBased;
            newNewsletter.NewsletterSubscriptionTemplateID = subscriptionTemplate.TemplateID;
            newNewsletter.NewsletterUnsubscriptionTemplateID = unsubscriptionTemplate.TemplateID;
            newNewsletter.NewsletterTemplateID = myNewIssueTemplate.TemplateID;
            newNewsletter.NewsletterSenderName = "Sender name";
            newNewsletter.NewsletterSenderEmail = "sender@localhost.local";
            newNewsletter.NewsletterSiteID = CMSContext.CurrentSiteID;

            // Save the static newsletter
            NewsletterInfoProvider.SetNewsletterInfo(newNewsletter);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and updates static newsletter. Called when the "Get and update newsletter" button is pressed.
    /// Expects the CreateStaticNewsletter method to be run first.
    /// </summary>
    private bool GetAndUpdateStaticNewsletter()
    {
        // Get the static newsletter
        NewsletterInfo updateNewsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);
        if (updateNewsletter != null)
        {
            // Update the properties
            updateNewsletter.NewsletterDisplayName = updateNewsletter.NewsletterDisplayName.ToLower();

            // Save the changes
            NewsletterInfoProvider.SetNewsletterInfo(updateNewsletter);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and bulk updates static newsletters. Called when the "Get and bulk update newsletters" button is pressed.
    /// Expects the CreateStaticNewsletter method to be run first.
    /// </summary>
    private bool GetAndBulkUpdateStaticNewsletters()
    {
        // Prepare the parameters
        string where = "NewsletterName LIKE N'MyNewStaticNewsletter%'";

        // Get the data
        DataSet newsletters = NewsletterInfoProvider.GetNewsletters(where, null, 0, null);
        if (!DataHelper.DataSourceIsEmpty(newsletters))
        {
            // Loop through the individual items
            foreach (DataRow newsletterDr in newsletters.Tables[0].Rows)
            {
                // Create object from DataRow
                NewsletterInfo modifyNewsletter = new NewsletterInfo(newsletterDr);

                // Update the properties
                modifyNewsletter.NewsletterDisplayName = modifyNewsletter.NewsletterDisplayName.ToUpper();

                // Save the changes
                NewsletterInfoProvider.SetNewsletterInfo(modifyNewsletter);
            }

            return true;
        }

        return false;
    }


    /// <summary>
    /// Deletes static newsletter. Called when the "Delete newsletter" button is pressed.
    /// Expects the CreateStaticNewsletter method to be run first.
    /// </summary>
    private bool DeleteStaticNewsletter()
    {
        // Get the static newsletter
        NewsletterInfo deleteNewsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        // Delete the static newsletter
        NewsletterInfoProvider.DeleteNewsletterInfo(deleteNewsletter);

        return (deleteNewsletter != null);
    }

    #endregion


    #region "API examples - Dynamic newsletter"

    /// <summary>
    /// Creates dynamic newsletter. Called when the "Create newsletter" button is pressed.
    /// </summary>
    private bool CreateDynamicNewsletter()
    {
        EmailTemplateInfo subscriptionTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewSubscriptionTemplate", CMSContext.CurrentSiteID);
        EmailTemplateInfo unsubscriptionTemplate = EmailTemplateInfoProvider.GetEmailTemplateInfo("MyNewUnsubscriptionTemplate", CMSContext.CurrentSiteID);

        if ((subscriptionTemplate != null) && (unsubscriptionTemplate != null))
        {
            // Create new dynamic newsletter object
            NewsletterInfo newNewsletter = new NewsletterInfo();

            // Set the properties
            newNewsletter.NewsletterDisplayName = "My new dynamic newsletter";
            newNewsletter.NewsletterName = "MyNewDynamicNewsletter";
            newNewsletter.NewsletterType = NewsletterType.Dynamic;
            newNewsletter.NewsletterSubscriptionTemplateID = subscriptionTemplate.TemplateID;
            newNewsletter.NewsletterUnsubscriptionTemplateID = unsubscriptionTemplate.TemplateID;
            newNewsletter.NewsletterSenderName = "Sender name";
            newNewsletter.NewsletterSenderEmail = "sender@localhost.local";
            newNewsletter.NewsletterDynamicURL = "http://www.google.com";
            newNewsletter.NewsletterDynamicSubject = "My new dynamic issue";
            newNewsletter.NewsletterSiteID = CMSContext.CurrentSiteID;

            // Save the dynamic newsletter
            NewsletterInfoProvider.SetNewsletterInfo(newNewsletter);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and updates dynamic newsletter. Called when the "Get and update newsletter" button is pressed.
    /// Expects the CreateDynamicNewsletter method to be run first.
    /// </summary>
    private bool GetAndUpdateDynamicNewsletter()
    {
        // Get the dynamic newsletter
        NewsletterInfo updateNewsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewDynamicNewsletter", CMSContext.CurrentSiteID);
        if (updateNewsletter != null)
        {
            // Update the properties
            updateNewsletter.NewsletterDisplayName = updateNewsletter.NewsletterDisplayName.ToLower();

            // Save the changes
            NewsletterInfoProvider.SetNewsletterInfo(updateNewsletter);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and bulk updates dynamic newsletters. Called when the "Get and bulk update newsletters" button is pressed.
    /// Expects the CreateDynamicNewsletter method to be run first.
    /// </summary>
    private bool GetAndBulkUpdateDynamicNewsletters()
    {
        // Prepare the parameters
        string where = "NewsletterName LIKE N'MyNewDynamicNewsletter%'";

        // Get the data
        DataSet newsletters = NewsletterInfoProvider.GetNewsletters(where, null, 0, null);
        if (!DataHelper.DataSourceIsEmpty(newsletters))
        {
            // Loop through the individual items
            foreach (DataRow newsletterDr in newsletters.Tables[0].Rows)
            {
                // Create object from DataRow
                NewsletterInfo modifyNewsletter = new NewsletterInfo(newsletterDr);

                // Update the properties
                modifyNewsletter.NewsletterDisplayName = modifyNewsletter.NewsletterDisplayName.ToUpper();

                // Save the changes
                NewsletterInfoProvider.SetNewsletterInfo(modifyNewsletter);
            }

            return true;
        }

        return false;
    }


    /// <summary>
    /// Deletes dynamic newsletter. Called when the "Delete newsletter" button is pressed.
    /// Expects the CreateDynamicNewsletter method to be run first.
    /// </summary>
    private bool DeleteDynamicNewsletter()
    {
        // Get the dynamic newsletter
        NewsletterInfo deleteNewsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewDynamicNewsletter", CMSContext.CurrentSiteID);

        // Delete the dynamic newsletter
        NewsletterInfoProvider.DeleteNewsletterInfo(deleteNewsletter);

        return (deleteNewsletter != null);
    }

    #endregion


    #region "API examples - Subscriber"

    /// <summary>
    /// Creates subscriber. Called when the "Create subscriber" button is pressed.
    /// </summary>
    private bool CreateSubscriber()
    {
        // Create new subscriber object
        SubscriberInfo newSubscriber = new SubscriberInfo();

        // Set the properties
        newSubscriber.SubscriberFirstName = "Name";
        newSubscriber.SubscriberLastName = "Surname";
        newSubscriber.SubscriberFullName = "Name Surname";
        newSubscriber.SubscriberEmail = "subscriber@localhost.local";
        newSubscriber.SubscriberSiteID = CMSContext.CurrentSiteID;

        // Save the subscriber
        SubscriberInfoProvider.SetSubscriberInfo(newSubscriber);

        return true;
    }


    /// <summary>
    /// Gets and updates subscriber. Called when the "Get and update subscriber" button is pressed.
    /// Expects the CreateSubscriber method to be run first.
    /// </summary>
    private bool GetAndUpdateSubscriber()
    {
        // Get the subscriber
        SubscriberInfo updateSubscriber = SubscriberInfoProvider.GetSubscriberInfo("subscriber@localhost.local", CMSContext.CurrentSiteID);
        if (updateSubscriber != null)
        {
            // Update the properties
            updateSubscriber.SubscriberFullName = updateSubscriber.SubscriberFullName.ToLower();

            // Save the changes
            SubscriberInfoProvider.SetSubscriberInfo(updateSubscriber);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and bulk updates subscribers. Called when the "Get and bulk update subscribers" button is pressed.
    /// Expects the CreateSubscriber method to be run first.
    /// </summary>
    private bool GetAndBulkUpdateSubscribers()
    {
        // Prepare the parameters
        string where = "SubscriberEmail LIKE N'subscriber@localhost.local%'";

        // Get the data
        DataSet subscribers = SubscriberInfoProvider.GetSubscribers(where, null);
        if (!DataHelper.DataSourceIsEmpty(subscribers))
        {
            // Loop through the individual items
            foreach (DataRow subscriberDr in subscribers.Tables[0].Rows)
            {
                // Create object from DataRow
                SubscriberInfo modifySubscriber = new SubscriberInfo(subscriberDr);

                // Update the properties
                modifySubscriber.SubscriberFullName = modifySubscriber.SubscriberFullName.ToUpper();

                // Save the changes
                SubscriberInfoProvider.SetSubscriberInfo(modifySubscriber);
            }

            return true;
        }

        return false;
    }


    /// <summary>
    /// Deletes subscriber. Called when the "Delete subscriber" button is pressed.
    /// Expects the CreateSubscriber method to be run first.
    /// </summary>
    private bool DeleteSubscriber()
    {
        // Get the subscriber
        SubscriberInfo deleteSubscriber = SubscriberInfoProvider.GetSubscriberInfo("subscriber@localhost.local", CMSContext.CurrentSiteID);

        // Delete the subscriber
        SubscriberInfoProvider.DeleteSubscriberInfo(deleteSubscriber);

        return (deleteSubscriber != null);
    }


    /// <summary>
    /// Subscribes subscriber to a newsletter. Called when the "Subscribe to newsletter" button is pressed.
    /// Expects the CreateSubscriber method to be run first.
    /// </summary>
    private bool SubscribeToNewsletter()
    {
        // Get the subscriber and newsletter
        SubscriberInfo subscriber = SubscriberInfoProvider.GetSubscriberInfo("subscriber@localhost.local", CMSContext.CurrentSiteID);
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        if ((subscriber != null) && (newsletter != null))
        {
            // Subscribe to 'My new static newsletter'
            SubscriberInfoProvider.Subscribe(subscriber.SubscriberID, newsletter.NewsletterID, DateTime.Now);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Subscribes subscriber to a newsletter. Called when the "Unsubscribe from newsletter" button is pressed.
    /// Expects the CreateSubscriber method to be run first.
    /// </summary>
    private bool UnsubscribeFromNewsletter()
    {
        // Get the subscriber and newsletter
        SubscriberInfo subscriber = SubscriberInfoProvider.GetSubscriberInfo("subscriber@localhost.local", CMSContext.CurrentSiteID);
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        if ((subscriber != null) && (newsletter != null))
        {
            // Unubscribe from 'My new static newsletter'
            SubscriberInfoProvider.Unsubscribe(subscriber.SubscriberID, newsletter.NewsletterID);

            return true;
        }

        return false;
    }

    #endregion


    #region "API examples - Static issue"

    /// <summary>
    /// Creates static issue. Called when the "Create issue" button is pressed.
    /// </summary>
    private bool CreateStaticIssue()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Create new static issue object
            IssueInfo newIssue = new IssueInfo();

            // Set the properties
            newIssue.IssueSubject = "My new static issue";
            newIssue.IssueNewsletterID = newsletter.NewsletterID;
            newIssue.IssueSiteID = CMSContext.CurrentSiteID;
            newIssue.IssueText = "<?xml version=\"1.0\" encoding=\"utf-16\"?><content><region id=\"content\">Issue text</region></content>";
            newIssue.IssueUnsubscribed = 0;
            newIssue.IssueSentEmails = 0;
            newIssue.IssueTemplateID = newsletter.NewsletterTemplateID;
            newIssue.IssueShowInNewsletterArchive = false;

            // Save the static issue
            IssueInfoProvider.SetIssueInfo(newIssue);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and updates static issue. Called when the "Get and update issue" button is pressed.
    /// Expects the CreateStaticIssue method to be run first.
    /// </summary>
    private bool GetAndUpdateStaticIssue()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Prepare the parameters
            string where = "IssueNewsletterID = " + newsletter.NewsletterID;

            // Get the data
            DataSet issues = IssueInfoProvider.GetIssues(where, null);

            if (!DataHelper.DataSourceIsEmpty(issues))
            {
                // Create object from DataRow
                IssueInfo updateIssue = new IssueInfo(issues.Tables[0].Rows[0]);

                if (updateIssue != null)
                {
                    // Update the properties
                    updateIssue.IssueSubject = updateIssue.IssueSubject.ToLower();

                    // Save the changes
                    IssueInfoProvider.SetIssueInfo(updateIssue);

                    return true;
                }
            }
        }
        return false;
    }


    /// <summary>
    /// Gets and bulk updates static issues. Called when the "Get and bulk update issues" button is pressed.
    /// Expects the CreateStaticIssue method to be run first.
    /// </summary>
    private bool GetAndBulkUpdateStaticIssues()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Prepare the parameters
            string where = "IssueNewsletterID = " + newsletter.NewsletterID;

            // Get the data
            DataSet issues = IssueInfoProvider.GetIssues(where, null);
            if (!DataHelper.DataSourceIsEmpty(issues))
            {
                // Loop through the individual items
                foreach (DataRow issueDr in issues.Tables[0].Rows)
                {
                    // Create object from DataRow
                    IssueInfo modifyIssue = new IssueInfo(issueDr);

                    // Update the properties
                    modifyIssue.IssueSubject = modifyIssue.IssueSubject.ToUpper();

                    // Save the changes
                    IssueInfoProvider.SetIssueInfo(modifyIssue);
                }

                return true;
            }
        }

        return false;
    }


    /// <summary>
    /// Deletes static issue. Called when the "Delete issue" button is pressed.
    /// Expects the CreateStaticIssue method to be run first.
    /// </summary>
    private bool DeleteStaticIssue()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewStaticNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Prepare the parameters
            string where = "IssueNewsletterID = " + newsletter.NewsletterID;

            // Get the data
            DataSet issues = IssueInfoProvider.GetIssues(where, null);

            if (!DataHelper.DataSourceIsEmpty(issues))
            {
                // Create object from DataRow
                IssueInfo deleteIssue = new IssueInfo(issues.Tables[0].Rows[0]);

                // Delete the static issue
                IssueInfoProvider.DeleteIssueInfo(deleteIssue);

                return (deleteIssue != null);
            }
        }
        return false;
    }

    #endregion


    #region "API examples - Dynamic issue"

    /// <summary>
    /// Creates dynamic issue. Called when the "Create issue" button is pressed.
    /// </summary>
    private bool CreateDynamicIssue()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewDynamicNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Generate dynamic issue
            EmailQueueManager.GenerateDynamicIssue(newsletter.NewsletterID);

            return true;
        }

        return false;
    }


    /// <summary>
    /// Gets and updates dynamic issue. Called when the "Get and update issue" button is pressed.
    /// Expects the CreateDynamicIssue method to be run first.
    /// </summary>
    private bool GetAndUpdateDynamicIssue()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewDynamicNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Prepare the parameters
            string where = "IssueNewsletterID = " + newsletter.NewsletterID;

            // Get the data
            DataSet issues = IssueInfoProvider.GetIssues(where, null);

            if (!DataHelper.DataSourceIsEmpty(issues))
            {
                // Create object from DataRow
                IssueInfo updateIssue = new IssueInfo(issues.Tables[0].Rows[0]);

                if (updateIssue != null)
                {
                    // Update the properties
                    updateIssue.IssueSubject = updateIssue.IssueSubject.ToLower();

                    // Save the changes
                    IssueInfoProvider.SetIssueInfo(updateIssue);

                    return true;
                }
            }
        }
        return false;
    }


    /// <summary>
    /// Gets and bulk updates dynamic issues. Called when the "Get and bulk update issues" button is pressed.
    /// Expects the CreateDynamicIssue method to be run first.
    /// </summary>
    private bool GetAndBulkUpdateDynamicIssues()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewDynamicNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Prepare the parameters
            string where = "IssueNewsletterID = " + newsletter.NewsletterID;

            // Get the data
            DataSet issues = IssueInfoProvider.GetIssues(where, null);
            if (!DataHelper.DataSourceIsEmpty(issues))
            {
                // Loop through the individual items
                foreach (DataRow issueDr in issues.Tables[0].Rows)
                {
                    // Create object from DataRow
                    IssueInfo modifyIssue = new IssueInfo(issueDr);

                    // Update the properties
                    modifyIssue.IssueSubject = modifyIssue.IssueSubject.ToUpper();

                    // Save the changes
                    IssueInfoProvider.SetIssueInfo(modifyIssue);
                }

                return true;
            }
        }
        return false;
    }


    /// <summary>
    /// Deletes dynamic issue. Called when the "Delete issue" button is pressed.
    /// Expects the CreateDynamicIssue method to be run first.
    /// </summary>
    private bool DeleteDynamicIssue()
    {
        // Get the newsletter
        NewsletterInfo newsletter = NewsletterInfoProvider.GetNewsletterInfo("MyNewDynamicNewsletter", CMSContext.CurrentSiteID);

        if (newsletter != null)
        {
            // Prepare the parameters
            string where = "IssueNewsletterID = " + newsletter.NewsletterID;

            // Get the data
            DataSet issues = IssueInfoProvider.GetIssues(where, null);

            if (!DataHelper.DataSourceIsEmpty(issues))
            {
                // Create object from DataRow
                IssueInfo deleteIssue = new IssueInfo(issues.Tables[0].Rows[0]);

                // Delete the dynamic issue
                IssueInfoProvider.DeleteIssueInfo(deleteIssue);

                return (deleteIssue != null);
            }
        }
        return false;
    }

    #endregion
}