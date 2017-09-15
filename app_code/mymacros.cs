using System.Data;
using System.Web;
using CMS.CMSHelper;
using CMS.GlobalHelper;
using CMS.SettingsProvider;
 
public static class CustomMacros
{
    /// <summary>
    /// Registers custom macro methods with the Kentico Macro Resolver
    /// </summary>
    public static void RegisterMethods()
    {
        // Register ReturnURL function
        MacroMethod ReturnURLMacro = new MacroMethod("ReturnURL", ReturnURL)
        {
            Comment = "Returns the actual URL in the address bar.",
            Type = typeof(DataRowCollection),
            MinimumParameters = 0
        };
        MacroMethods.RegisterMethod(ReturnURLMacro);

        // Register ReturnFailoverKeyword function
        MacroMethod ReturnFailoverKeywordMacro = new MacroMethod("ReturnFailoverKeyword", ReturnFailoverKeyword)
        {
            Comment = "Returns the failover keyword.",
            Type = typeof(DataRowCollection),
            MinimumParameters = 0
        };
        MacroMethods.RegisterMethod(ReturnFailoverKeywordMacro);
    }

    /// <summary>
    /// Return current page URL
    /// </summary>
    public static string ReturnURL(params object[] parameters)
    {
        string url = HttpContext.Current.Request.Url.AbsoluteUri;
        return url;
    }

    /// <summary>
    /// Return failover keyword "KenticoProduction" or "KenticoFailover" depending on server name
    /// </summary>
    public static string ReturnFailoverKeyword(params object[] parameters)
    {
        string serverName = System.Environment.MachineName;
        if (serverName == "PHB-SAWEB001")
        {
            return "KenticoProduction";
        }
        else if (serverName == "PHB-WKEWEB002") 
        {
            return "KenticoFailover";
        }
        else
        {
            return "KenticoOther";
        }
    }
}
 
/// <summary>
/// This class calls the registration of the custom macros when the CMS is initialized
/// </summary>
[CustomMacrosLoader]
public partial class CMSModuleLoader
{
    private class CustomMacrosLoaderAttribute : CMSLoaderAttribute
    {
        public override void Init()
        {
            CustomMacros.RegisterMethods();
        }
    }
}