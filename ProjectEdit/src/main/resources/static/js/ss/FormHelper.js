var FormHelper = {};
FormHelper.isUnLoadPage = true;

/* The following section is using for handling previous page state */
FormHelper.getGridState = function (grid) {
    var gridState = {};
    var store = grid.getStore();
    Ext.apply(gridState, (store.lastOptions) ? store.lastOptions.params : {});
    gridState[store.getLoadedParam()] = Ext.value(gridState[store.getLoadedParam()], false);
    return gridState;
};

FormHelper.submitTo = function (url, params, stateObject) {
    var children = [];

    if (params) {
        for (var paramName in params) {
            children[children.length] = {
                tag: 'input',
                type: 'hidden',
                name: paramName,
                value: params[paramName]
            };
        }
    }

    if (stateObject) {
        var escapedState = Url.encode(Ext.encode(stateObject));
        children[children.length] = {
            tag: 'input',
            type: 'hidden',
            name: '__pageState',
            value: escapedState
        };
    } else if (FormHelper.storePageStateObject && params && !params.__pageState) {
        var escapedState = FormHelper.storePageStateObject;
        children[children.length] = {
            tag: 'input',
            type: 'hidden',
            name: '__pageState',
            value: escapedState
        };
    }

    var navigatorForm = Ext.DomHelper.append(Ext.getBody(), {
        id: '__navigatorForm',
        tag: 'form',
        action: url,
        method: 'POST',
        children: children
    });
    
    FormHelper.isUnLoadPage = false; 
    navigatorForm.submit();
};

FormHelper.loadPageState = Ext.emptyFn;
FormHelper.setStateToForm = function () {
    if (FormHelper.pageStateObject) {
        for (var id in FormHelper.pageStateObject) {
            var cmp = Ext.getCmp(id);
            if (cmp) {
                cmp.setValue(FormHelper.pageStateObject[id]);
            };
        }
    }
};

/* The following section is using for handling Dirty Form confirmation */
FormHelper.isPageDirty = undefined;

FormHelper.changePage = undefined;
FormHelper.unchangePage = undefined;
FormHelper.confirmDirtyPage = function (args) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this, args)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'ok' && FormHelper.changePage) { FormHelper.isUnLoadPage = false; FormHelper.changePage.call(this, args); }
                else if (FormHelper.unchangePage) FormHelper.unchangePage.call(this, args);
            }
        });
    } else {
        if (FormHelper.changePage)  { FormHelper.isUnLoadPage = false; FormHelper.changePage.call(this, args); }
    }
};

FormHelper.changeMenu = undefined;
FormHelper.unchangeMenu = undefined;
FormHelper.confirmChangeMenu = function (menu) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this, menu)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'ok' && FormHelper.changeMenu) { FormHelper.isUnLoadPage = false;   FormHelper.changeMenu.call(this, menu); }
                else if (FormHelper.unchangeMenu) FormHelper.unchangeMenu.call(this, menu);
            }
        });
    } else {
        if (FormHelper.changeMenu) { FormHelper.isUnLoadPage = false;   FormHelper.changeMenu.call(this, menu); }
    }
};

FormHelper.confirmChangeUrl = function (url) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'ok') {
                    window.location.href = url;
                }
            }
        });
    } else {
        window.location.href = url;
    }
};

FormHelper.changeTab = undefined;
FormHelper.unchangeTab = undefined;
FormHelper.confirmChangeTab = function (tab) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this, tab)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'ok' && FormHelper.changeTab) FormHelper.changeTab.call(this, tab);
                else if (FormHelper.unchangeTab) FormHepler.unchangeTab.call(this, tab);
            }
        });
    } else {
        if (FormHelper.changeTab) FormHelper.changeTab.call(this, tab);
    }
};

FormHelper.confirmSearchOperation = function (args) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this, args)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'ok' && searchFunction) searchFunction.call(this, args);
            }
        });
    } else {
        if (searchFunction) searchFunction.call(this, args);
    }
};

FormHelper.confirmCancelWindows = function (args) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this, args)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'cancel' && saveFunction) {
                	saveFunction.call(this, args);
                }
            }
        });
    } 
};

FormHelper.preventCleanSave = function (args) {
    if (!FormHelper.isPageDirty || FormHelper.isPageDirty.call(this, args)) {
        saveFunction.call(this, args);
    } else {
        Ext.Msg.show({
            title: __commonMessages['Information'],
            msg: __commonMessages['There are no changed data.'],
            buttons: Ext.Msg.OK
        });
    }
};

FormHelper.changeToLogoutPage = undefined;
FormHelper.unchangeToLogoutPage = undefined;

FormHelper.confirmLogout = function (args) {
    if (FormHelper.isPageDirty && FormHelper.isPageDirty.call(this, args)) {
        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['The modification is not yet saved. <br>All changes will be discarded. Confirm to continue ?'],
            buttons: {
            	ok: __commonMessages['modification.OK'],
            	cancel: __commonMessages['modification.Cancel']
            },
            fn: function (btn) {
                if (btn == 'ok' && FormHelper.changeToLogoutPage) { FormHelper.isUnLoadPage = false; FormHelper.changeToLogoutPage.call(this, args); }
                else if (FormHelper.unchangeToLogoutPage) { FormHelper.unchangeToLogoutPage.call(this, args); }
            }
        });
    } else {
        if (FormHelper.changeToLogoutPage) { FormHelper.isUnLoadPage = false; FormHelper.changeToLogoutPage.call(this, args); }
    }
};

FormHelper.doUnLoadPage = function(e) {
	if (!FormHelper.isUnLoadPage) {
        return;
    }
    return 'If you leave the page your data will be lost.'
};


//window.onbeforeunload = FormHelper.doUnLoadPage;
