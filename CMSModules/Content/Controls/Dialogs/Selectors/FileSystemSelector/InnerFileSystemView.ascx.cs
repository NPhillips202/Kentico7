using System;
using System.Collections;
using System.Security;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

using CMS.CMSHelper;
using CMS.EventLog;
using CMS.ExtendedControls;
using CMS.GlobalHelper;
using CMS.IO;
using CMS.SettingsProvider;
using CMS.UIControls;
using CMS.Controls;

public partial class CMSModules_Content_Controls_Dialogs_Selectors_FileSystemSelector_InnerFileSystemView : CMSUserControl
{
    #region "Variables"

    // Control settings

    // Data set settings
    private DataSet mDataSource = null;
    private string mInfoText = string.Empty;
    private string mFileIdColumn = "path";
    private string mFileNameColumn = "name";
    private string mFileExtensionColumn = "type";
    private string mFileSizeColumn = "size";

    private string mSearchText = string.Empty;
    private string mImagesPath = string.Empty;
    private string mFullStartingPath = string.Empty;

    private bool editAllowed;

    private const int PAGER_GROUP_SIZE = 10;

    private DialogViewModeEnum mViewMode = DialogViewModeEnum.ListView;

    #endregion


    #region "Properties"

    /// <summary>
    /// Switch between folders and files mode.
    /// </summary>
    public bool ShowOnlyFolders
    {
        get;
        set;
    }


    /// <summary>
    /// Source file system path.
    /// </summary>
    public string FileSystemPath
    {
        get;
        set;
    }


    /// <summary>
    /// Dialog configuration containning all necessary settings.
    /// </summary>
    public FileSystemDialogConfiguration Configuration
    {
        get;
        set;
    }


    /// <summary>
    /// Image relative path.
    /// </summary>
    private string ImagesPath
    {
        get
        {
            if (mImagesPath == string.Empty)
            {
                mImagesPath = GetImageUrl("Design/Controls/UniGrid/Actions/", IsLiveSite, true);
            }
            return mImagesPath;
        }
    }


    /// <summary>
    /// Gets or sets full starting path property.
    /// </summary>
    public string FullStartingPath
    {
        get
        {
            if (String.IsNullOrEmpty(mFullStartingPath))
            {
                mFullStartingPath = Configuration.StartingPath.StartsWithCSafe("~/") ? Server.MapPath(Configuration.StartingPath) : Configuration.StartingPath;
            }
            return mFullStartingPath;
        }
        set
        {
            mFullStartingPath = value;
        }
    }


    /// <summary>
    /// Gets or sets source of the data for view controls.
    /// </summary>
    public DataSet DataSource
    {
        get
        {
            if (DataHelper.DataSourceIsEmpty(mDataSource))
            {
                mDataSource = GetDataSet(FileSystemPath, SearchText);
            }
            return mDataSource;
        }
        set
        {
            mDataSource = value;
        }
    }


    /// <summary>
    /// Gets or sets text of the information label.
    /// </summary>
    public string InfoText
    {
        get
        {
            return mInfoText;
        }
        set
        {
            mInfoText = value;
        }
    }


    /// <summary>
    /// Gets or sets name of the column holding information on the file identifier.
    /// </summary>
    public string FileIdColumn
    {
        get
        {
            return mFileIdColumn;
        }
        set
        {
            mFileIdColumn = value;
        }
    }


    /// <summary>
    /// Gets or sets name of the column holding information on file name.
    /// </summary>
    public string FileNameColumn
    {
        get
        {
            return mFileNameColumn;
        }
        set
        {
            mFileNameColumn = value;
        }
    }


    /// <summary>
    /// Gets or sets name of the column holding information on file extension.
    /// </summary>
    public string FileExtensionColumn
    {
        get
        {
            return mFileExtensionColumn;
        }
        set
        {
            mFileExtensionColumn = value;
        }
    }


    /// <summary>
    /// Gets or sets name of the column holding information on file size.
    /// </summary>
    public string FileSizeColumn
    {
        get
        {
            return mFileSizeColumn;
        }
        set
        {
            mFileSizeColumn = value;
        }
    }


    /// <summary>
    /// Indicates whether the content tree is displaying more than max tree nodes.
    /// </summary>
    public bool IsDisplayMore
    {
        get
        {
            return ValidationHelper.GetBoolean(ViewState["IsDisplayMore"], false);
        }
        set
        {
            ViewState["IsDisplayMore"] = value;
        }
    }


    /// <summary>
    /// Gets a UniGrid control used to display files in LIST view mode.
    /// </summary>
    public UniGrid ListViewControl
    {
        get
        {
            return gridList;
        }
    }


    /// <summary>
    /// Gets a repeater control used to display files in TILES view mode.
    /// </summary>
    public BasicRepeater TilesViewControl
    {
        get
        {
            return repTilesView;
        }
    }


    /// <summary>
    /// Gets a repeater control used to display files in THUMBNAILS view mode.
    /// </summary>
    public BasicRepeater ThumbnailsViewControl
    {
        get
        {
            return repThumbnailsView;
        }
    }


    /// <summary>
    /// Gets or sets text to be searched.
    /// </summary>
    public string SearchText
    {
        get
        {
            return mSearchText;
        }
        set
        {
            mSearchText = value;
        }
    }


    /// <summary>
    /// Gets or sets a view mode used to display files.
    /// </summary>
    public DialogViewModeEnum ViewMode
    {
        get
        {
            return mViewMode;
        }
        set
        {
            mViewMode = value;
        }
    }


    /// <summary>
    /// Control identifier.
    /// </summary>
    protected string Identifier
    {
        get
        {
            String identifier = ViewState["Identifier"] as String;
            if (identifier == null)
            {
                ViewState["Identifier"] = identifier = Guid.NewGuid().ToString("N");
            }

            return identifier;
        }
    }

    #endregion


    #region "Helper methods"

    /// <summary>
    /// Check if extension is set as allowed.
    /// </summary>
    /// <param name="extension">Extension to check</param>
    /// <returns>True if extension is allowed otherwise false</returns>
    private bool IsAllowedExtension(FileInfo info)
    {
        if (!String.IsNullOrEmpty(Configuration.AllowedExtensions))
        {
            if (Configuration.AllowedExtensions.ToLowerCSafe().Contains(info.Extension.ToLowerCSafe().TrimStart('.')))
            {
                return true;
            }
        }
        else
        {
            return true;
        }
        return false;
    }


    /// <summary>
    /// Check if extension is not set as excluded.
    /// </summary>
    /// <param name="extension">Extension to check</param>
    /// <returns>True if extension isn't excluded otherwise false</returns>
    private bool IsNotExcludedExtension(FileInfo info)
    {
        if (!String.IsNullOrEmpty(Configuration.ExcludedExtensions))
        {
            if (Configuration.ExcludedExtensions.ToLowerCSafe().Contains(info.Extension.ToLowerCSafe().TrimStart('.')))
            {
                return false;
            }
        }
        return true;
    }


    /// <summary>
    /// Returns correct ID for the item (for colorizing the item when selected).
    /// </summary>
    /// <param name="dataItem">Container.DataItem</param>
    protected string GetID(object dataItem)
    {
        DataRowView dr = dataItem as DataRowView;
        if (dr != null)
        {
            return GetColorizeID(dr);
        }

        return "";
    }


    /// <summary>
    /// Returns correct ID for the given item (for colorizing the item when selected).
    /// </summary>
    /// <param name="dr">Item to get the ID of</param>
    protected string GetColorizeID(DataRowView dr)
    {
        string id = dr[FileIdColumn].ToString().ToLowerCSafe();
        if (String.IsNullOrEmpty(id))
        {
            id = dr["Path"].ToString().ToLowerCSafe();
        }
        return id;
    }


    /// <summary>
    /// Check if item in row could be selected.
    /// </summary>
    /// <param name="extension">Extension of item</param>
    /// <returns>True if could be selected otherwise false</returns>
    private bool IsItemSelectable(bool isFile)
    {
        if ((!Configuration.ShowFolders) && (isFile))
        {
            return true;
        }
        else
        {
            if ((Configuration.ShowFolders) && (!isFile))
            {
                return true;
            }
        }

        return false;
    }


    /// <summary>
    /// Check if folder is allowed and not excluded.
    /// </summary>
    /// <param name="info">DiretoryInfo to check</param>
    /// <returns>True if folder is allowed and not excluded otherwise false</returns>
    private bool IsAllowedAndNotExcludedFolder(DirectoryInfo info)
    {
        bool isAllowed = false;
        bool isExcluded = false;
        string startPath = DirectoryHelper.EnsurePathBackSlash(FullStartingPath.ToLowerCSafe());
        string folderName = info.FullName.ToLowerCSafe();

        // Check if folder is allowed
        if (String.IsNullOrEmpty(Configuration.AllowedFolders))
        {
            isAllowed = true;
        }
        else
        {
            foreach (string path in Configuration.AllowedFolders.ToLowerCSafe().Split(';'))
            {
                if (folderName.StartsWithCSafe(startPath + path))
                {
                    isAllowed = true;
                }
            }
        }

        // Check if folder isn't excluded
        if (!String.IsNullOrEmpty(Configuration.ExcludedFolders))
        {
            foreach (string path in Configuration.ExcludedFolders.ToLowerCSafe().Split(';'))
            {
                if (folderName.StartsWithCSafe(startPath + path))
                {
                    isExcluded = true;
                }
            }
        }
        return (isAllowed) && (!isExcluded);
    }

    #endregion


    #region "Events & delegates"

    /// <summary>
    /// Delegate for an event occurring when argument set is required.
    /// </summary>
    /// <param name="dr">DataRow holding information on currently processed file</param>
    public delegate string OnGetArgumentSet(DataRow dr);


    /// <summary>
    /// Event occurring when argument set is required.
    /// </summary>
    public event OnGetArgumentSet GetArgumentSet;

    #endregion


    #region "Raise events methods"

    /// <summary>
    /// Fires specific action and returns result provided by the parent control.
    /// </summary>
    /// <param name="dr">Data related to the action</param>
    private string RaiseOnGetArgumentSet(DataRow dr)
    {
        if (GetArgumentSet != null)
        {
            return GetArgumentSet(dr);
        }
        return string.Empty;
    }

    #endregion


    #region "Control methods"

    /// <summary>
    /// Initializes all nested controls.
    /// </summary>
    private void SetupControls()
    {
        InfoText = string.Empty;

        // Initialize displaying controls according view mode
        LoadViewControls();

        // Include javascript functions
        InitializeControlScripts();

        // Select mode according required
        switch (ViewMode)
        {
            case DialogViewModeEnum.ListView:
                InitializeListView();
                ListViewControl.OnExternalDataBound += ListViewControl_OnExternalDataBound;
                ListViewControl.GridView.RowDataBound += GridView_RowDataBound;
                break;

            case DialogViewModeEnum.TilesView:
                InitializeTilesView();
                TilesViewControl.ItemDataBound += ViewControl_ItemDataBound;
                break;

            case DialogViewModeEnum.ThumbnailsView:
                InitializeThumbnailsView();
                ThumbnailsViewControl.ItemDataBound += ViewControl_ItemDataBound;
                break;
        }
    }


    /// <summary>
    /// OnPreRender event.
    /// </summary>
    /// <param name="e">Event argument set</param>
    protected override void OnPreRender(EventArgs e)
    {
        // Display information on empty data
        bool isEmpty = DataHelper.DataSourceIsEmpty(DataSource);
        if (isEmpty)
        {
            plcViewArea.Visible = false;
        }
        else
        {
            lblInfo.Visible = false;
            plcViewArea.Visible = true;
        }

        // If info text is set display it
        if (!string.IsNullOrEmpty(InfoText))
        {
            lblInfo.Text = InfoText;
            lblInfo.Visible = true;
        }
        else
        {
            if (isEmpty)
            {
                lblInfo.Text = Configuration.ShowFolders ? GetString("dialogs.filesystem.nofolders") : GetString("dialogs.view.list.nodata");
                lblInfo.Visible = true;
            }
        }

        // Register the scripts
        ScriptHelper.RegisterTooltip(Page);
        ScriptHelper.RegisterDialogScript(Page);

        base.OnPreRender(e);
    }


    /// <summary>
    /// PageLoad event.
    /// </summary>
    /// <param name="sender">Sender</param>
    /// <param name="e">Event argument set</param>
    protected void Page_Load(object sender, EventArgs e)
    {
        editAllowed = CMSContext.CurrentUser.IsGlobalAdministrator;

        Visible = !StopProcessing;
        if (!StopProcessing)
        {
            if (URLHelper.IsPostback())
            {
                Reload(true);
            }
        }
    }


    /// <summary>
    /// Loads view controls according currently set view mode.
    /// </summary>
    public void LoadViewControls()
    {
        InfoText = "";

        // Select mode according required
        switch (ViewMode)
        {
            case DialogViewModeEnum.ListView:
                plcListView.Visible = true;

                // Stop processing                
                plcTilesView.Visible = false;
                plcThumbnailsView.Visible = false;
                break;

            case DialogViewModeEnum.TilesView:
                plcTilesView.Visible = true;
                repTilesView.DataBindByDefault = false;
                pagerElemTiles.Pager.ConnectToPagedControl(repTilesView);

                // Stop processing
                plcListView.Visible = false;
                plcThumbnailsView.Visible = false;
                break;

            case DialogViewModeEnum.ThumbnailsView:
                plcThumbnailsView.Visible = true;
                repThumbnailsView.DataBindByDefault = false;
                pagerElemThumbnails.Pager.ConnectToPagedControl(repThumbnailsView);

                // Stop processing
                plcListView.Visible = false;
                plcTilesView.Visible = false;
                break;
        }
    }

    #endregion


    #region "Public methods"

    /// <summary>
    /// Loads data from the data source property.
    /// </summary>
    public void ReloadData()
    {
        // Select mode according required
        switch (ViewMode)
        {
            case DialogViewModeEnum.ListView:
                ReloadListView();
                break;

            case DialogViewModeEnum.TilesView:
                ReloadTilesView();
                break;

            case DialogViewModeEnum.ThumbnailsView:
                ReloadThumbnailsView();
                break;
        }
    }


    /// <summary>
    /// Reloads control with data.
    /// </summary>
    /// <param name="forceSetup">Indicates whether the inner controls should be re-setuped</param>
    public void Reload(bool forceSetup)
    {
        Visible = !StopProcessing;
        if (Visible)
        {
            if (forceSetup)
            {
                // Initialize controls
                SetupControls();
            }

            // Load passed data
            ReloadData();
        }
    }

    #endregion


    #region "List view methods"

    /// <summary>
    /// Initializes list view controls.
    /// </summary>
    private void InitializeListView()
    {
        gridList.OrderBy = "isfile,name";
    }


    /// <summary>
    /// Reloads list view according source type.
    /// </summary>
    private void ReloadListView()
    {
        // Fill the grid data source
        if (!DataHelper.DataSourceIsEmpty(DataSource))
        {
            gridList.DataSource = DataSource;
            gridList.ReloadData();
        }
    }

    #endregion


    #region "Tiles view methods"

    /// <summary>
    /// Initializes controls for the tiles view mode.
    /// </summary>
    private void InitializeTilesView()
    {
        // Initialize page size
        pagerElemTiles.PageSizeItems = new string[] { "16", "32", "100" };
        pagerElemTiles.Pager.PageSize = pagerElemTiles.GetPageSize(16);

        // Basic control properties
        repTilesView.HideControlForZeroRows = true;

        // UniPager properties        
        SetupPager(pagerElemTiles.Pager);
    }


    /// <summary>
    /// Setups the UniPager
    /// </summary>
    /// <param name="pager">Pager to setup</param>
    private void SetupPager(UniPager pager)
    {
        pager.GroupSize = PAGER_GROUP_SIZE;
        pager.DisplayFirstLastAutomatically = false;
        pager.DisplayPreviousNextAutomatically = false;
        pager.HidePagerForSinglePage = true;
        pager.PagerMode = UniPagerMode.PostBack;
    }


    /// <summary>
    /// Loads content for media libraries tile view element.
    /// </summary>
    private void ReloadTilesView()
    {
        // Connects repeater with data source
        if (!DataHelper.DataSourceIsEmpty(DataSource))
        {
            repTilesView.DataSource = DataSource;
            repTilesView.DataBind();
        }
    }

    #endregion


    #region "Thumbnails view methods"

    /// <summary>
    /// Initializes controls for the thumbnails view mode.
    /// </summary>
    private void InitializeThumbnailsView()
    {
        // Initialize page size
        pagerElemThumbnails.PageSizeItems = new string[] { "10", "20", "50", "100" };
        pagerElemThumbnails.Pager.PageSize = pagerElemThumbnails.GetPageSize(10);

        // Basic control properties
        repThumbnailsView.HideControlForZeroRows = true;

        // UniPager properties     
        SetupPager(pagerElemThumbnails.Pager);
    }


    /// <summary>
    /// Loads content for media libraries thumbnails view element.
    /// </summary>
    private void ReloadThumbnailsView()
    {
        // Connects repeater with data source
        if (!DataHelper.DataSourceIsEmpty(DataSource))
        {
            repThumbnailsView.DataSource = DataSource;
            repThumbnailsView.DataBind();
        }
    }


    protected void ViewControl_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        DataRowView drv = (DataRowView)e.Item.DataItem;
        IDataContainer data = new DataRowContainer(drv);

        string fileNameColumn = FileNameColumn;

        // Get information on file
        string fileName = HTMLHelper.HTMLEncode(data.GetValue(fileNameColumn).ToString());
        string ext = HTMLHelper.HTMLEncode(data.GetValue(FileExtensionColumn).ToString());

        // Load file type
        Label lblType = e.Item.FindControl("lblTypeValue") as Label;
        if (lblType != null)
        {
            fileName = fileName.Substring(0, fileName.Length - ext.Length);
            lblType.Text = ResHelper.LocalizeString(ext);
        }

        // Load file name
        Label lblName = e.Item.FindControl("lblFileName") as Label;
        if (lblName != null)
        {
            lblName.Text = fileName;
        }

        // Load file size
        Label lblSize = e.Item.FindControl("lblSizeValue") as Label;
        if (lblSize != null)
        {
            long size = ValidationHelper.GetLong(data.GetValue(FileSizeColumn), 0);
            lblSize.Text = DataHelper.GetSizeString(size);
        }

        string argument = RaiseOnGetArgumentSet(drv.Row);
        string selectAction = GetSelectScript(drv, argument);

        // Initialize SELECT button
        ImageButton btnSelect = e.Item.FindControl("btnSelect") as ImageButton;
        if (btnSelect != null)
        {
            btnSelect.ImageUrl = ResolveUrl(ImagesPath + "next.png");
            btnSelect.ToolTip = GetString("dialogs.list.actions.select");
            btnSelect.Attributes["onclick"] = selectAction;
        }

        // Initialize EDIT button
        ImageButton btnEdit = e.Item.FindControl("btnEdit") as ImageButton;
        if (btnEdit != null)
        {
            btnEdit.ToolTip = GetString("general.edit");
            btnEdit.ImageUrl = ResolveUrl(ImagesPath + "edit.png");

            string path = data.GetValue("Path").ToString();
            string editScript = GetEditScript(path, ext);

            if (!String.IsNullOrEmpty(editScript))
            {
                btnEdit.OnClientClick = editScript;
            }
            else
            {
                btnEdit.Visible = false;
            }
        }

        // Initialize DELETE button
        ImageButton btnDelete = e.Item.FindControl("btnDelete") as ImageButton;
        if (btnDelete != null)
        {
            btnDelete.ImageUrl = ResolveUrl(ImagesPath + "delete.png");
            btnDelete.ToolTip = GetString("general.delete");
            btnDelete.OnClientClick = GetDeleteScript(argument);
        }

        // Image area
        Image fileImage = e.Item.FindControl("imgElem") as Image;
        if (fileImage != null)
        {
            string url = null;
            if (ImageHelper.IsImage(ext))
            {
                url = URLHelper.UnMapPath(data.GetValue("Path").ToString());

                // Generate new tooltip command
                if (!String.IsNullOrEmpty(url))
                {
                    url = String.Format("{0}?chset={1}", url, Guid.NewGuid());

                    UIHelper.EnsureTooltip(fileImage, ResolveUrl(url), 0, 0, null, null, ext, null, null, 300);
                }
            }
            else
            {
                url = UIHelper.GetFileIconUrl(Page, ext, "");
            }

            fileImage.ImageUrl = ResolveUrl(url);
        }

        // Selectable area
        Panel pnlItemInageContainer = e.Item.FindControl("pnlTiles") as Panel;
        if (pnlItemInageContainer == null)
        {
            pnlItemInageContainer = e.Item.FindControl("pnlThumbnails") as Panel;
        }
        if (pnlItemInageContainer != null)
        {
            pnlItemInageContainer.Attributes["onclick"] = selectAction;
        }

    }

    #endregion


    #region "Private methods"

    /// <summary>
    /// Initializes all the necessary JavaScript blocks.
    /// </summary>
    private void InitializeControlScripts()
    {
        const string activeBackgroundPath = "CMSModules/CMS_Content/Dialogs/";

        string script = String.Format(
@"  
var activeBackgroundList = 'url({0})';
var activeBackgroundTiles = 'url({1})';
var activeBackgroundThumbs = 'url({2})';
var attemptNo = 0;
function ColorizeRow(itemId) {{
    if (itemId != null) 
    {{
        var hdnField = document.getElementById('{3}');         
        if (hdnField != null) 
        {{
            // If some item was previously selected
            if ((hdnField.value != null) && (hdnField.value != '')) 
            {{   
                // Get selected item and reset its selection
                var lastColorizedElem = document.getElementById(hdnField.value);
                if (lastColorizedElem != null) 
                {{   
                    ColorizeElement(lastColorizedElem, '', itemId);
                }}
            }}

            // Update field value
            hdnField.value = itemId;
        }}                                                              

        // Colorize currently selected item
        var elem = document.getElementById(itemId);
        if (elem != null) 
        {{
            ColorizeElement(elem, activeBackgroundList, itemId);
            attemptNo = 0;
        }}
        else
        {{
            if(attemptNo < 1)
            {{
                setTimeout('ColorizeRow(\'' + itemId + '\')', 300);
                attemptNo = attemptNo + 1;
            }}
            else
            {{
                attemptNo = 0;
            }}
        }}
    }}
}}

function ColorizeLastRow() {{
    var hdnField = document.getElementById('{3}');     
    if (hdnField != null) 
    {{
        // If some item was previously selected
        if ((hdnField.value != null) && (hdnField.value != '')) 
        {{               
            // Get selected item and reset its selection
            var lastColorizedElem = document.getElementById(hdnField.value);
            if (lastColorizedElem != null) 
            {{    
                ColorizeElement(lastColorizedElem, activeBackgroundList);
            }}
        }}
    }}
}}
function ColorizeElement(elem, bgImage, itemId) {{
    if((bgImage != null) && (bgImage != '')){{
        if (elem.className == 'DialogTileItem') {{
           bgImage = activeBackgroundTiles; 
        }}
        else if (elem.className == 'DialogThumbnailItem') {{
           bgImage = activeBackgroundThumbs; 
        }}
        else {{
           bgImage = activeBackgroundList; 
        }}
        elem.className += ' Selected';
    }}
    else {{
        elem.className = elem.className.replace(' Selected','');
    }}
    elem.style.backgroundImage = bgImage;
}}
function ClearColorizedRow()
{{
    var hdnField = document.getElementById('{3}');      
    if (hdnField != null) 
    {{
        // If some item was previously selected
        if ((hdnField.value != null) && (hdnField.value != '')) 
        {{               
            // Get selected item and reset its selection
            var lastColorizedElem = document.getElementById(hdnField.value);
            if (lastColorizedElem != null) 
            {{   
                ColorizeElement(lastColorizedElem, '');

                // Update field value
                hdnField.value = '';
            }}
        }}
    }}
}}
",
            ResolveUrl(GetImageUrl(activeBackgroundPath + "highlightline.png")),
            ResolveUrl(GetImageUrl(activeBackgroundPath + "highlighttiles.png")),
            ResolveUrl(GetImageUrl(activeBackgroundPath + "highlightthumbs.png")),
            hdnItemToColorize.ClientID
        );


        ScriptManager.RegisterStartupScript(this, GetType(), "DialogsColorize", script, true);
    }


    /// <summary>
    /// Gets DataSource dataSet.
    /// </summary>
    /// <param name="fileSystemPath">File system path to obtain dataset for</param>
    /// <param name="searchText">Text to be searched</param>
    private DataSet GetDataSet(string fileSystemPath, string searchText)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();

        // Defining table columns
        dt.Columns.Add(FileNameColumn, typeof(string));
        dt.Columns.Add(FileExtensionColumn, typeof(string));
        dt.Columns.Add(FileIdColumn, typeof(string));
        dt.Columns.Add(FileSizeColumn, typeof(long));
        dt.Columns.Add("filemodified", typeof(DateTime));
        dt.Columns.Add("isfile", typeof(bool));
        dt.Columns.Add("childscount", typeof(int));

        if (!string.IsNullOrEmpty(fileSystemPath))
        {
            try
            {
                // Get directory info
                if (Directory.Exists(fileSystemPath))
                {
                    DirectoryInfo di = DirectoryInfo.New(fileSystemPath);

                    // Check if folders should be displayed
                    if ((IsDisplayMore) || (Configuration.ShowFolders))
                    {
                        // Get folders array and filter it
                        DirectoryInfo[] folders = di.GetDirectories();
                        folders = Array.FindAll(folders, IsAllowedAndNotExcludedFolder);

                        int childCount = 0;

                        foreach (DirectoryInfo folder in folders)
                        {
                            if ((String.IsNullOrEmpty(searchText)) || (folder.Name.ToLowerCSafe().Contains(searchText.ToLowerCSafe())))
                            {
                                try
                                {
                                    // Set children number
                                    if (Configuration.ShowFolders)
                                    {
                                        childCount = folder.GetDirectories().Length;
                                    }
                                    else
                                    {
                                        childCount = folder.GetDirectories().Length;
                                        if (childCount == 0)
                                        {
                                            FileInfo[] files = folder.GetFiles();
                                            // Check for alowed extensions 
                                            if (!String.IsNullOrEmpty(Configuration.AllowedExtensions))
                                            {
                                                files = Array.FindAll(files, IsAllowedExtension);
                                            }

                                            // Check for excluded extensions 
                                            if (!String.IsNullOrEmpty(Configuration.ExcludedExtensions))
                                            {
                                                files = Array.FindAll(files, IsNotExcludedExtension);
                                            }
                                            childCount = files.Length;
                                        }
                                    }
                                }
                                catch (UnauthorizedAccessException)
                                {
                                    childCount = 0;
                                }
                                finally
                                {
                                    dt.Rows.Add(folder.Name, string.Empty, folder.FullName, 0, folder.LastWriteTime, false, childCount);
                                }
                            }
                        }
                    }

                    // Try to load files
                    try
                    {
                        if (!Configuration.ShowFolders)
                        {
                            // Obtain list of files
                            FileInfo[] files = di.GetFiles();

                            // Check for alowed extensions 
                            if (!String.IsNullOrEmpty(Configuration.AllowedExtensions))
                            {
                                files = Array.FindAll(files, IsAllowedExtension);
                            }

                            // Check for excluded extensions 
                            if (!String.IsNullOrEmpty(Configuration.ExcludedExtensions))
                            {
                                files = Array.FindAll(files, IsNotExcludedExtension);
                            }

                            // Add files item to table 
                            foreach (FileInfo file in files)
                            {
                                if ((String.IsNullOrEmpty(searchText)) || (Path.GetFileNameWithoutExtension(file.Name).ToLowerCSafe().Contains(searchText.ToLowerCSafe())))
                                {
                                    dt.Rows.Add(file.Name, file.Extension, file.FullName, file.Length, file.LastWriteTime, true, 0);
                                }
                            }
                        }
                    }
                    catch (SecurityException se)
                    {
                        EventLogProvider.LogException("FileSystemDialog", "SECURITYEXCEPTION", se);
                    }
                }
            }
            catch (Exception e)
            {
                EventLogProvider.LogException("FileSystemDialog", "FOLDERNOTACCESSIBLE", e);
            }
        }
        ds.Tables.Add(dt);
        return ds;
    }


    /// <summary>
    /// Returns panel with image according extension of the processed file.
    /// </summary>
    /// <param name="ext">Extension of the file used to determine icon</param>
    /// <param name="url">File url</param>
    /// <param name="isFile">True for file items</param>
    /// <param name="item">Control inserted as a file name</param>
    /// <param name="isSelectable">If item can be selected</param>
    private Panel GetListItem(string ext, string url, bool isFile, Control item, bool isSelectable)
    {
        Panel pnl = new Panel();
        pnl.CssClass = "DialogListItem" + (isSelectable ? string.Empty : "Unselectable");
        pnl.Controls.Add(new LiteralControl("<div class=\"DialogListItemNameRow\">"));

        // Create new image as file icon
        Image docImg = new Image()
        {
            ImageUrl = isFile ? UIHelper.GetFileIconUrl(Page, ext, "List") : GetDocumentTypeIconUrl("cms.folder"),
            CssClass = "FloatLeft"
        };

        // Generate new tooltip command
        if (!String.IsNullOrEmpty(url))
        {
            url = String.Format("{0}?chset={1}", url, Guid.NewGuid());

            UIHelper.EnsureTooltip(docImg, ResolveUrl(url), 0, 0, null, null, ext, null, null, 300);
        }

        // Set style for icons
        docImg.Attributes["style"] = "width: 16px; height: 16px;";
        pnl.Controls.Add(docImg);

        if ((isSelectable) && (item is LinkButton))
        {
            // Create clickabe compelte panel
            pnl.Attributes["onclick"] = ((LinkButton)item).Attributes["onclick"];
            ((LinkButton)item).Attributes["onclick"] = null;
        }


        // Add file name                  
        pnl.Controls.Add(new LiteralControl(String.Format("&nbsp;<span class=\"DialogListItemName\" {0}>", (!isSelectable ? "style=\"cursor:default;\"" : string.Empty))));
        pnl.Controls.Add(item);
        pnl.Controls.Add(new LiteralControl("</span></div>"));

        return pnl;
    }


    /// <summary>
    /// Unigrid row data bound event.
    /// </summary>
    /// <param name="sender">Sender</param>
    /// <param name="e">Argument identifier</param>
    protected void GridView_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            DataRowView drv = (e.Row.DataItem as DataRowView);
            if (drv != null)
            {
                e.Row.Attributes["id"] = GetColorizeID(drv);
            }
        }
    }


    /// <summary>
    /// On external databound event.
    /// </summary>
    /// <param name="sender">Sender</param>
    /// <param name="sourceName">Action what is called</param>
    /// <param name="parameter">Parameter</param>
    /// <returns>Result object</returns>
    protected object ListViewControl_OnExternalDataBound(object sender, string sourceName, object parameter)
    {
        // Initializing variables
        object result = null;

        string argument = string.Empty;
        string ext = string.Empty;
        bool isSelectable = false;


        switch (sourceName.ToLowerCSafe())
        {
            // Select event
            case "select":
                GridViewRow gvr = (parameter as GridViewRow);
                DataRowView drv = (DataRowView)gvr.DataItem;
                ImageButton btn = ((ImageButton)sender);

                // Get item extension
                ext = drv[FileExtensionColumn].ToString().Trim('.');
                isSelectable = IsItemSelectable(ValidationHelper.GetBoolean(drv["isfile"], true));

                // Check if item is selectable, if not remove select action button
                if (!isSelectable)
                {
                    btn.ImageUrl = ResolveUrl(ImagesPath + "transparent.png");
                    btn.ToolTip = "";
                    btn.Attributes["style"] = "margin:0px 3px;cursor:default;";
                    btn.Enabled = false;
                }
                else
                {
                    argument = RaiseOnGetArgumentSet(drv.Row);

                    // Initialize command
                    btn.Attributes["onclick"] = "ColorizeRow('" + GetColorizeID(drv).Replace("\\", "\\\\").Replace("'", "\\'") + "'); SetSelectAction(\"" + argument + "\"); return false;";

                    result = btn;
                }
                break;

            // Select subdocs event
            case "selectsubdocs":
                drv = (DataRowView)(parameter as GridViewRow).DataItem;
                btn = ((ImageButton)sender);

                string nodeId = ValidationHelper.GetString(drv[FileIdColumn], "");
                int childCount = ValidationHelper.GetInteger(drv["childscount"], 0);

                if (((IsDisplayMore) || (Configuration.ShowFolders))
                    && (!ValidationHelper.GetBoolean(drv["isfile"], true)))
                {
                    // Check if item is selectable, if not remove select action button
                    if (childCount > 0)
                    {
                        // Initialize command
                        btn.Attributes["onclick"] = "SetParentAction('" + nodeId.Replace("\\", "\\\\").Replace("'", "\\'") + "'); return false;";
                    }
                    else
                    {
                        btn.ImageUrl = ResolveUrl(ImagesPath + "subdocumentdisabled.png");
                        btn.ToolTip = GetString("dialogs.list.actions.showsubfolders");
                        btn.Attributes["style"] = "margin:0px 3px;cursor:default;";
                        btn.Enabled = false;
                    }
                }
                else
                {
                    // Hide subdocs button
                    btn.Attributes["style"] = "display:none;";
                }
                break;

            // Edit action
            case "edit":
                {
                    btn = ((ImageButton)sender);

                    if (editAllowed && Configuration.AllowManage)
                    {
                        drv = (DataRowView)(parameter as GridViewRow).DataItem;

                        ext = drv[FileExtensionColumn].ToString();
                        string path = drv["Path"].ToString();

                        string editScript = GetEditScript(path, ext);

                        // Assign the onclick script
                        if (!String.IsNullOrEmpty(editScript))
                        {
                            btn.Attributes.Add("onclick", editScript);

                            return result;
                        }
                    }

                    btn.Visible = false;
                }
                break;

            // Delete event
            case "delete":
                {
                    btn = ((ImageButton)sender);

                    if (editAllowed && Configuration.AllowManage)
                    {
                        gvr = (parameter as GridViewRow);
                        drv = (DataRowView)gvr.DataItem;

                        // Get item extension
                        ext = drv[FileExtensionColumn].ToString().Trim('.');

                        argument = RaiseOnGetArgumentSet(drv.Row);

                        // Initialize command
                        btn.Attributes["onclick"] = GetDeleteScript(argument);

                        return result;
                    }

                    btn.Visible = false;
                }
                break;

            // Name event
            case "name":
                {
                    drv = (DataRowView)parameter;

                    // Get name and extension
                    string name = drv[FileNameColumn].ToString();
                    ext = drv[FileExtensionColumn].ToString();

                    bool isFile = ValidationHelper.GetBoolean(drv["isfile"], true);

                    // Remove extension if available
                    if (isFile)
                    {
                        name = HTMLHelper.HTMLEncode(Path.GetFileNameWithoutExtension(name));
                    }

                    string url = null;
                    if (ImageHelper.IsImage(ext))
                    {
                        url = URLHelper.UnMapPath(drv["Path"].ToString());
                    }

                    // Check if item is selectable
                    if (!IsItemSelectable(isFile))
                    {
                        LiteralControl ltlName = new LiteralControl(name);

                        // Get final panel
                        result = GetListItem(ext, url, isFile, ltlName, false);
                    }
                    else
                    {
                        // Make a file name link
                        LinkButton lnkBtn = new LinkButton();

                        // Escape chars for postback javascript event
                        lnkBtn.ID = name.Replace("'", "").Replace("$", "");
                        lnkBtn.Text = HTMLHelper.HTMLEncode(name);

                        argument = RaiseOnGetArgumentSet(drv.Row);

                        // Initialize command
                        lnkBtn.Attributes["onclick"] = GetSelectScript(drv, argument);

                        // Get final panel
                        result = GetListItem(ext, url, isFile, lnkBtn, true);
                    }
                }
                break;

            // Type event
            case "type":
                drv = (DataRowView)parameter;

                // Remove starting dot
                result = drv[FileExtensionColumn].ToString().ToLowerCSafe();
                break;

            // Size event
            case "size":
                drv = (DataRowView)parameter;

                // Get formatted size string
                if (ValidationHelper.GetBoolean(drv["isfile"], true))
                {
                    long size = ValidationHelper.GetLong(drv[FileSizeColumn], 0);
                    result = DataHelper.GetSizeString(size);
                }
                else
                {
                    return "";
                }
                break;

            // File modified event
            case "filemodified":
                drv = (DataRowView)parameter;
                result = drv["filemodified"].ToString();
                break;
        }

        return result;
    }


    /// <summary>
    /// Gets the item selection script
    /// </summary>
    /// <param name="drv">Item data</param>
    /// <param name="argument">Item argument</param>
    protected string GetSelectScript(DataRowView drv, string argument)
    {
        return String.Format("ColorizeRow('{0}'); SetSelectAction(\"{1}\"); return false;", GetColorizeID(drv).Replace("\\", "\\\\").Replace("'", "\\'"), argument);
    }


    /// <summary>
    /// Gets the deletion script for the item
    /// </summary>
    /// <param name="argument">Item argument</param>
    protected string GetDeleteScript(string argument)
    {
        return String.Format("if (confirm('{0}')) {{ SetDeleteAction(\"{1}\"); }} return false;", GetString("General.ConfirmDelete"), argument);
    }


    /// <summary>
    /// Gets the editing script for the given path and extension
    /// </summary>
    /// <param name="path">File path</param>
    /// <param name="ext">File extension</param>
    protected string GetEditScript(string path, string ext)
    {
        string fileIdentifier = Identifier + path.GetHashCode();
        WindowHelper.Remove(fileIdentifier);

        Hashtable properties = new Hashtable();
        properties.Add("filepath", URLHelper.UnMapPath(path));

        WindowHelper.Add(fileIdentifier, properties);

        if (ImageHelper.IsSupportedByImageEditor(ext))
        {
            // Image editing (image editor)
            string parameters = String.Format("?identifier={0}&refresh=1", fileIdentifier);
            string validationHash = QueryHelper.GetHash(parameters);
            string url = URLHelper.ResolveUrl("~/CMSModules/Content/CMSDesk/Edit/ImageEditor.aspx") + parameters + "&hash=" + validationHash;

            return String.Format("modalDialog({0}, 'imageeditor', 905, 670); return false;", ScriptHelper.GetString(url));
        }
        else
        {
            // Text file editing
            switch (ext.TrimStart('.').ToLowerCSafe())
            {
                case "css":
                case "skin":
                case "txt":
                case "xml":
                case "js":
                    {
                        // Prepare parameters
                        string parameters = String.Format("?identifier={0}", fileIdentifier);
                        string validationHash = QueryHelper.GetHash(parameters);
                        string url = URLHelper.ResolveUrl("~/CMSModules/Content/Controls/Dialogs/Selectors/FileSystemSelector/EditTextFile.aspx") + parameters + "&hash=" + validationHash;

                        return String.Format("modalDialog({0}, 'texteditor', 905, 670); return false;", ScriptHelper.GetString(url));
                    }
            }
        }

        return null;
    }

    #endregion
}