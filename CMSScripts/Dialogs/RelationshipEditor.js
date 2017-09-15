
function InsertSelectedItem(obj) {
    if ((window.wopener) && (obj)) {
        if ((obj.editor_clientid != null) && (obj.editor_clientid != '')) {
            var editorClientId = obj.editor_clientid;

            // Get elements
            var editor = window.wopener.document.getElementById(editorClientId);

            // Set node alias path
            if (editor != null) {
                editor.value = obj.doc_nodealiaspath;
            }

            // Refresh
            if (window.wopener.RefreshRelatedPanel) {
                window.wopener.RefreshRelatedPanel(editorClientId);
            }
        }
    }
}

function GetSelectedItem(editorId) {
}