using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using CMS.CMSHelper;
using CMS.DataEngine;
using CMS.DocumentEngine;
using CMS.GlobalHelper;
using CMS.SiteProvider;

namespace CMS.Controls
{
    public partial class CMSTransformation
    {
        /// <summary>
        /// Converts a GUID returned via a Document Selector field into a valid URL
        /// </summary>
        public static string GUIDtoURL(object inputGUID)
        {
            string txtGUID = (string)inputGUID;
            Guid guid = new Guid(txtGUID);
            if (guid != null)
            {
                int nodeid = CMS.DocumentEngine.TreePathUtils.GetNodeIdByNodeGUID(guid, CMS.CMSHelper.CMSContext.CurrentSite.SiteName);
                if (nodeid != null)
                {
                    CMS.DocumentEngine.TreeNode node = CMS.CMSHelper.TreeHelper.SelectSingleNode(nodeid);
                    return CMS.CMSHelper.CMSContext.GetUrl(node.NodeAliasPath, node.DocumentUrlPath, CMS.CMSHelper.CMSContext.CurrentSiteName);
                }

            }
            return "";
        }

        /// <summary>
        /// Gets parent document URL
        /// </summary>
        public static string GetParentDocumentUrl(string nodeAlias)
        {
            string txtNodeAlias = (string)nodeAlias;
            string parentPath = CMS.DocumentEngine.TreePathUtils.GetParentPath(txtNodeAlias);
            if (parentPath != null)
            {
                return parentPath;
            }
            return "";
        }

        /// <summary>
        /// Insert row into Hospitality Upgrade custom table to indicate a page visit has occurred
        /// </summary>
        public static string HuMagazineTrack(string article) 
        {
            CustomTableItemProvider customTableProvider = new CustomTableItemProvider(CMSContext.CurrentUser);
            string customTableClassName = "hospitalityupgradecom0093.magazineArticleTracking";
            CustomTableItem newCustomTableItem = CustomTableItem.New(customTableClassName, customTableProvider);
            newCustomTableItem.SetValue("article", (string)article);
            newCustomTableItem.Insert();
            return "";
        }

    }

}