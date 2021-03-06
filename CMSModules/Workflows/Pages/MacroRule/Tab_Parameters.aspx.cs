using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.CMSHelper;
using CMS.GlobalHelper;
using CMS.UIControls;
using CMS.SiteProvider;

// Edited object
[EditedObject(SiteObjectType.MACRORULE, "ruleId")]

public partial class CMSModules_Workflows_Pages_MacroRule_Tab_Parameters : SiteManagerPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        editElem.OnAfterDefinitionUpdate += new EventHandler(editElem_OnAfterDefinitionUpdate);

        // Set the form definition to the FieldEditor
        if (EditedObject != null)
        {
            editElem.FormDefinition = ((MacroRuleInfo)EditedObject).MacroRuleParameters;
        }
    }


    protected void editElem_OnAfterDefinitionUpdate(object sender, EventArgs e)
    {
        // Set the form definition to the FieldEditor
        if (EditedObject != null)
        {
            MacroRuleInfo rule = ((MacroRuleInfo)EditedObject);
            rule.MacroRuleParameters = editElem.FormDefinition;
            MacroRuleInfoProvider.SetMacroRuleInfo(rule);
        }
    }
}