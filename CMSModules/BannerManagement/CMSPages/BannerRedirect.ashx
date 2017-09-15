<%@ WebHandler Language="C#" Class="BannerRedirect" %>

using System;
using System.Web;

using CMS.GlobalHelper;
using CMS.WebAnalytics;
using CMS.CMSHelper;
using CMS.SiteProvider;
using CMS.PortalEngine;

public class BannerRedirect : IHttpHandler
{
    #region "Public methods"

    /// <summary>
    /// Redirects user to the address specified in query parameter "redirectURL" and logs
    /// banner click for banner with ID specified in query parameter "bannerID".
    /// </summary>
    /// <param name="context"></param>
    public void ProcessRequest(HttpContext context)
    {
        var banner = BannerInfoProvider.GetBannerInfo(QueryHelper.GetInteger("bannerID", 0));

        if ((banner == null) || (!banner.IsGlobal && (banner.BannerSiteID != CMSContext.CurrentSiteID)))
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Unknown banner or wrong site");

            return;
        }

        // Count click only on live site
        if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
        {
            string currentSiteName = CMSContext.CurrentSiteName;

            if (AnalyticsHelper.AnalyticsEnabled(currentSiteName))
            {
                HitLogProvider.LogHit("bannerclick", currentSiteName, null, null, banner.BannerID);
            }

            BannerInfoProvider.DecrementClicksLeft(banner.BannerID);
        }

        string bannerRedirectURL = URLHelper.ResolveUrl(banner.BannerURL);

        context.Response.Redirect(bannerRedirectURL, true);
    }

    #endregion


    #region "Properties"

    /// <summary>
    /// This handler can be reused.
    /// </summary>
    public bool IsReusable
    {
        get { return true; }
    }

    #endregion
}