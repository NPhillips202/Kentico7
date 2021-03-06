﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

using CMS.CMSHelper;
using CMS.DocumentEngine;
using CMS.EventLog;
using CMS.GlobalHelper;
using CMS.PortalEngine;
using CMS.SettingsProvider;
using CMS.SiteProvider;
using CMS.WebAnalytics;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.ComponentModel.ToolboxItem(false)]
[ScriptService]
public class WebAnalyticsService : WebService
{
    [ScriptMethod]
    [WebMethod]
    public string LogSearch(string keyword, string pageGUID)
    {
        try
        {
            string siteName = CMSContext.CurrentSiteName;
            if (!AnalyticsHelper.JavascriptLoggingEnabled(siteName))
            {
                throw new InvalidOperationException("Logging by JS not enabled.");
            }

            PageInfo currentPage = CMSContext.CurrentPageInfo = PageInfoProvider.GetPageInfo(new Guid(pageGUID));
            AnalyticsHelper.LogOnSiteSearchKeywords(CMSContext.CurrentSiteName, currentPage.NodeAliasPath, currentPage.DocumentCulture, keyword, 0, 1);
            return "ok";
        }
        catch (Exception e)
        {
            EventLogProvider.LogException("WebAnalyticsService", "LogSearch", e);

            // Only string error message is returned in order to not disclose full exception details such as call stack
            return GetErrorMessage(e);
        }
    }


    [ScriptMethod]
    [WebMethod]
    public string LogBannerHit(string bannerID)
    {
        try
        {
            string siteName = CMSContext.CurrentSiteName;
            if (!AnalyticsHelper.JavascriptLoggingEnabled(siteName))
            {
                throw new InvalidOperationException("Logging by JS not enabled.");
            }

            HitLogProvider.LogHit("bannerhit", CMSContext.CurrentSiteName, null, null, ValidationHelper.GetInteger(bannerID, 0));
            return "ok";
        }
        catch (Exception e)
        {
            EventLogProvider.LogException("WebAnalyticsService", "LogBannerHit", e);

            // Only string error message is returned in order to not disclose full exception details such as call stack
            return GetErrorMessage(e);
        }
    }


    [ScriptMethod]
    [WebMethod(EnableSession = true)]
    public string LogHits(string pageGUID, string referrer)
    {
        try
        {
            if (!ValidationHelper.IsGuid(pageGUID))
            {
                return "PageGUID not valid";
            }

            string siteName = CMSContext.CurrentSiteName;
            UserInfo currentUser = CMSContext.CurrentUser;

            LogHitsInternal(pageGUID, referrer, siteName, currentUser);

            return "ok";
        }
        catch (Exception e)
        {
            EventLogProvider.LogException("WebAnalyticsService", "LogHits", e);

            // Only string error message is returned in order to not disclose full exception details such as call stack
            return GetErrorMessage(e);
        }
    }


    private static void LogHitsInternal(string pageGUID, string referrer, string siteName, UserInfo currentUser)
    {
        // Need to fake referrer and current page
        RequestStockHelper.Add("AnalyticsReferrerString", referrer);
        PageInfo currentPage = CMSContext.CurrentPageInfo = PageInfoProvider.GetPageInfo(new Guid(pageGUID));

        if (!AnalyticsHelper.JavascriptLoggingEnabled(siteName))
        {
            throw new InvalidOperationException("Logging by JS not enabled.");
        }

        // Log activities
        LogActivities(siteName);

        if (AnalyticsHelper.IsLoggingEnabled(siteName, currentPage.NodeAliasPath))
        {
            // PAGE VIEW
            if (AnalyticsHelper.TrackPageViewsEnabled(siteName))
            {
                HitLogProvider.LogHit(HitLogProvider.PAGE_VIEWS, siteName, currentUser.PreferredCultureCode, currentPage.NodeAliasPath, currentPage.NodeID);
            }


            // AGGREGATED VIEW
            /// not logged by JavaScript call


            // FILE DOWNLOADS
            /// file downloads are logged via special WebPart that directly outputs specified file (and before that logs a hit), so there is no way we can log this via JS


            // BROWSER CAPABILITIES
            /// are already logged by JavaScript via WebPart AnalayicsBrowserCapabilities


            // SEARCH CRAWLER
            /// not logged by JavaScript call


            // INVALID PAGES
            /// throw 404 and there's no need to call it via JavaScript (even if RSS gets 404, we should know about it)


            // ON-SITE SEARCH KEYWORDS
            /// separate method


            // BANNER HITS
            /// separate method


            // BANNER CLICKS


            // VISITOR
            // BROWSER TYPE
            // MOBILE DEVICES
            // BROWSER TYPE
            // COUNTRIES
            /// Cookies VisitorStatus, VisitStatus (a obsolete CurrentVisitStatus)
            /// IP
            /// method uses AnalyticsHelper.GetContextStatus and AnalyticsHelper.SetContextStatus and also logs all mobile devices
            AnalyticsMethods.LogVisitor(siteName);


            // URL REFFERALS
            // ALL TRAFFIC SOURCES (REFERRINGSITE + "_local") (REFERRINGSITE + "_direct") (REFERRINGSITE + "_search") (REFERRINGSITE + "_referring")
            // SEARCH KEYWORDS
            // LANDING PAGE
            // EXIT PAGE
            // TIME ON PAGE
            AnalyticsMethods.LogAnalytics(SessionHelper.GetSessionID(), currentPage, siteName);


            // CONVERSION
            AnalyticsMethods.LogConversion(siteName, currentPage.DocumentTrackConversionName, currentPage.DocumentConversionValue);

            // CAMPAIGNS
            // Log campaigns stored in cookies.
            AnalyticsMethods.LogTrackedCampaigns(siteName);
        }
    }


    private static string GetErrorMessage(Exception e)
    {
        return "Error occurred while processing data. More details can be found in the event log. Exception message: " + e.Message;
    }


    private static void LogActivities(string siteName)
    {
        if (ActivitySettingsHelper.ActivitiesEnabledAndModuleLoaded(siteName) && ActivitySettingsHelper.ActivitiesEnabledForThisUser(CMSContext.CurrentUser))
        {
            int contactId = ModuleCommands.OnlineMarketingGetCurrentContactID();

            CMSContext.ContactID = contactId;
            if (contactId > 0)
            {
                ModuleCommands.OnlineMarketingLogLandingPage(0);
                ModuleCommands.OnlineMarketingLogExternalSearch(0);
                ModuleCommands.OnlineMarketingLogPageVisit(0);
                UpdateContactsIPandUserAgent(siteName);
            }
        }
    }


    private static void UpdateContactsIPandUserAgent(string siteName)
    {
        if (SettingsKeyProvider.GetBoolValue(siteName + ".CMSEnableOnlineMarketing"))
        {
            ModuleCommands.OnlineMarketingUpdateContactInformation(siteName);
        }
    }
}