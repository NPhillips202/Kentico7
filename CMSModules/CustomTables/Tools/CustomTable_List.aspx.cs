using System;
using System.Data;
using System.Collections;

using CMS.CMSHelper;
using CMS.GlobalHelper;
using CMS.SettingsProvider;
using CMS.UIControls;

public partial class CMSModules_CustomTables_Tools_CustomTable_List : CMSCustomTablesToolsPage
{
    #region "Page events"

    /// <summary>
    /// Page_Load event handler.
    /// </summary>
    protected void Page_Load(object sender, EventArgs e)
    {
        // Initialize master page
        CurrentMaster.Title.TitleText = GetString("customtable.list.Title");
        CurrentMaster.Title.TitleImage = GetImageUrl("Objects/CMS_CustomTable/object.png");
        CurrentMaster.Title.HelpTopicName = "custom_tables_tools_list";
        CurrentMaster.Title.HelpName = "helpTopic";

        // Initialize unigrid
        uniGrid.OnAction += uniGrid_OnAction;
        uniGrid.ZeroRowsText = GetString("customtable.notable");
        uniGrid.OnDataReload += uniGrid_OnDataReload;
    }

    #endregion


    #region "UniGrid events"

    /// <summary>
    /// Data reloading event handler.
    /// </summary>
    /// <param name="completeWhere">Complete where condition</param>
    /// <param name="currentOrder">Current order by clause</param>
    /// <param name="currentTopN">Current top N value</param>
    /// <param name="columns">Currently selected columns</param>
    /// <param name="currentOffset">Current page offset</param>
    /// <param name="currentPageSize">Current size of page</param>
    /// <param name="totalRecords">Returns number of returned records</param>
    protected DataSet uniGrid_OnDataReload(string completeWhere, string currentOrder, int currentTopN, string columns, int currentOffset, int currentPageSize, ref int totalRecords)
    {
        DataSet ds = DataClassInfoProvider.GetCustomTableClasses(CMSContext.CurrentSiteID, completeWhere, currentOrder, currentTopN, columns);
        if (!DataHelper.DataSourceIsEmpty(ds))
        {
            DataRowCollection rows = ds.Tables[0].Rows;

            // Check permission to each custom table if user is not authorized to read all (from module)
            if (!CMSContext.CurrentUser.IsAuthorizedPerResource("CMS.CustomTables", "Read"))
            {
                ArrayList toDelete = new ArrayList();

                foreach (DataRow row in rows)
                {
                    int customtableid = ValidationHelper.GetInteger(row["ClassID"], 0);
                    string className = DataClassInfoProvider.GetClassName(customtableid);
                    if (String.IsNullOrEmpty(className) || !CMSContext.CurrentUser.IsAuthorizedPerClassName(className, "Read"))
                    {
                        toDelete.Add(row);
                    }
                }

                // Delete from DataSet
                foreach (DataRow row in toDelete)
                {
                    rows.Remove(row);
                }

                // Redirect to access denied page if user doesn't have permission to any custom table only if filter is not set
                if ((rows.Count == 0) && !uniGrid.FilterIsSet)
                {
                    MissingPermissionsRedirect();
                }
            }

            totalRecords = rows.Count;
        }

        return ds;
    }


    /// <summary>
    /// Handles the UniGrid's OnAction event.
    /// </summary>
    /// <param name="actionName">Name of item (button) that throws event</param>
    /// <param name="actionArgument">ID (value of Primary key) of corresponding data row</param>
    protected void uniGrid_OnAction(string actionName, object actionArgument)
    {
        if (actionName == "edit")
        {
            int classId = ValidationHelper.GetInteger(actionArgument, 0);
            DataClassInfo dci = DataClassInfoProvider.GetDataClass(classId);
            if (dci != null)
            {
                // Check if custom table class hasn't set specific listing page
                if (dci.ClassListPageURL != String.Empty)
                {
                    URLHelper.Redirect(dci.ClassListPageURL + "?customtableid=" + classId);
                }
                else
                {
                    URLHelper.Redirect("CustomTable_Data_List.aspx?customtableid=" + classId);
                }
            }
        }
    }

    #endregion


    #region "Other methods"

    /// <summary>
    /// Redirects to access denied page with appropriate message.
    /// </summary>
    private void MissingPermissionsRedirect()
    {
        RedirectToAccessDenied(GetString("customtable.anytablepermiss"));
    }

    #endregion
}