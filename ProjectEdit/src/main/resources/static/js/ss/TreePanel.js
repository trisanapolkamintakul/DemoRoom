Ext.namespace('Ext.ss.tree');

Ext.ss.tree.TreeLoader = Ext.extend(Ext.tree.TreeLoader, {
    load: function (node, callback, scope) {
        if (this.doPreload(node)) { // preloaded json children
            this.runCallback(callback, scope || node, [node]);
        } else if (this.directFn || this.dataUrl || this.url) {
            this.requestData(node, callback, scope || node);
        }
    },
    processResponse: function (response, node, callback, scope) {
        var json = response.responseText;
        try {
            if (this.clearOnLoad) {
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
            }

            var o = response.responseData || Ext.decode(json);
            node.beginUpdate();
            for (var i = 0, len = o.length; i < len; i++) {
                var n = this.createNode(o[i]);
                if (n) {
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            this.runCallback(callback, scope || node, [node]);
        } catch (e) {
            this.handleFailure(response);
        }
    }
});

Ext.ss.tree.TreePanel = Ext.extend(Ext.tree.TreePanel, {
    dirtyFlag: false,
    saveAndLoad: false,
    initComponent: function () {
        Ext.tree.TreePanel.superclass.initComponent.call(this);

        if (!this.eventModel) {
            this.eventModel = new Ext.tree.TreeEventModel(this);
        }

        var l = this.loader;
        if (!l) {
            l = new Ext.ss.tree.TreeLoader({
                dataUrl: this.dataUrl,
                requestMethod: this.requestMethod
            });
        } else if (Ext.isObject(l) && !l.load) {
            l = new Ext.ss.tree.TreeLoader(l);
        }
        this.loader = l;

        this.nodeHash = {};

        if (this.root) {
            var r = this.root;
            delete this.root;
            this.setRootNode(r);
        }


        this.addEvents(
            'append',
            'remove',
            'movenode',
            'insert',
            'beforeappend',
            'beforeremove',
            'beforemovenode',
            'beforeinsert',
            'beforeload',
            'load',
            'textchange',
            'beforeexpandnode',
            'beforecollapsenode',
            'expandnode',
            'disabledchange',
            'collapsenode',
            'beforeclick',
            'click',
            'containerclick',
            'checkchange',
            'beforedblclick',
            'dblclick',
            'containerdblclick',
            'contextmenu',
            'containercontextmenu',
            'beforechildrenrendered',
            'startdrag',
            'enddrag',
            'dragdrop',
            'beforenodedrop',
            'nodedrop',
            'nodedragover');
        if (this.singleExpand) {
            this.on('beforeexpandnode', this.restrictExpand, this);
        }

        this.on('checkchange', this.manageCheckChange, this);
        this.loadMaskTree = new Ext.LoadMask(Ext.getBody());
    },
    manageCheckChange: function (node, checked) {
        this.dirtyFlag = true;
    },
    processEachRecord: function (node) {
        var attributes = Ext.apply({}, node.attributes);
        delete attributes.children;
        delete attributes.loader;
        return attributes;
    },
    createRecordParameters: function () {
        var nodes = this.getChecked(),
            records = [];
        if (nodes && nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                var record = this.processEachRecord(nodes[i]);
                if (record) {
                    records.push(record);
                }
            }
        }
        return Ext.encode(records);
    },
    checkedNoFire: function (node, checked) {
        var nodeUi = node.getUI();
        var cb = nodeUi.checkbox;
        if (cb) {
            cb.checked = checked;
            cb.defaultChecked = cb.checked;
            cb.attributes.checked = cb.checked;
        }
    },
    isDirty: function () {
        return this.dirtyFlag;
    },
    isChecked: function () {
        return (this.getChecked()) ? this.getChecked().length > 0 : false;
    },
    clearDirty: function () {
        this.dirtyFlag = false;
    },
    save: function (parameters, callback, errorHandler) {
        var treePanel = this;

        var params = Ext.apply({}, treePanel.loader.baseParams);
        params[treePanel.id + '_jsonCheckRecords'] = treePanel.createRecordParameters();
        params[treePanel.id + '_saveAndLoad'] = treePanel.saveAndLoad;
        params = Ext.apply(params, parameters);

        treePanel.loadMaskTree.show();

        if (this.saveAndLoad === true) {
            Ext.apply(treePanel.loader.baseParams, params);
            var objectFn = {};

            objectFn.loadFn = function (tree, node, response) {
                root.expand(false);
                if (Ext.isFunction(callback)) {
                    callback.call(treePanel, node);
                } else {
                    Ext.Msg.alert(__commonMessages['Information'], __commonMessages['Save successfully']);
                }
                treePanel.loadMaskTree.hide();
                treePanel.clearDirty();
                delete treePanel.loader.baseParams[treePanel.id + '_jsonCheckRecords'];
                delete treePanel.loader.baseParams[treePanel.id + '_saveAndLoad'];
                treePanel.loader.removeListener('loadexception', objectFn.loadExceptionFn, treePanel);
            };

            objectFn.loadExceptionFn = function (tree, node, response) {
                var obj = Ext.decode(response.responseText);

                if (Ext.isFunction(errorHandler)) {
                    errorHandler.call(treePanel, response, opts);
                } else {
                    Ext.Msg.alert(obj.title, obj.message);
                }
                treePanel.loadMaskTree.hide();
                delete treePanel.loader.baseParams[treePanel.id + '_jsonCheckRecords'];
                delete treePanel.loader.baseParams[treePanel.id + '_saveAndLoad'];
                treePanel.loader.removeListener('load', objectFn.loadFn, treePanel);
            };

            treePanel.loader.addListener('loadexception', objectFn.loadExceptionFn, treePanel, {
                single: true
            });

            var root = treePanel.getRootNode();
            treePanel.loader.addListener('load', objectFn.loadFn, treePanel, {
                single: true
            });

            treePanel.loader.load(root);
        } else {
            Ext.Ajax.request({
                url: treePanel.loader.url,
                params: params,
                timeout: treePanel.loader.timeout,
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    if (Ext.isFunction(callback)) {
                        callback.call(treePanel, obj, opts);
                    } else {
                        Ext.Msg.alert(__commonMessages['Information'], __commonMessages['Save successfully']);
                    }
                    treePanel.loadMaskTree.hide();
                    treePanel.clearDirty();
                },
                failure: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    if (Ext.isFunction(errorHandler)) {
                        errorHandler.call(treePanel, response, opts);
                    } else {
                        Ext.Msg.alert(obj.title, obj.message);
                    }
                    treePanel.loadMaskTree.hide();
                }
            });
        }
    }
});

Ext.reg('ss-treepanel', Ext.ss.tree.TreePanel);