var DEFAULT_CONFIG = {
    ROOT: 'records',
    RECORD_DIRTY: '__dirty',
    RECORD_PHANTOM: '__phantom',
    RECORD_MODIFIED: '__modified',
    RECORD_ID: '__recordId',
    DESC: '-disp'
};

Ext.data.Api.actions['save'] = 'save';
Ext.data.Api.restActions['save'] = 'POST';

Ext.LoadMask = function (el, config) {
    this.el = Ext.get(el);
    Ext.apply(this, config);
    if (this.store) {
        this.store.on({
            scope: this,
            beforeload: this.onBeforeLoad,
            load: this.onLoad,
            exception: this.onLoad,
            beforesave: this.onBeforeSave,
            save: this.onSave
        });
        this.removeMask = Ext.value(this.removeMask, false);
    } else {
        var um = this.el.getUpdater();
        um.showLoadIndicator = false; // disable the default indicator
        um.on({
            scope: this,
            beforeupdate: this.onBeforeLoad,
            update: this.onLoad,
            failure: this.onLoad
        });
        this.removeMask = Ext.value(this.removeMask, true);
    }
};

Ext.LoadMask.prototype = {
    msg: __commonMessages['Loading...'],
    msgCls: 'x-mask-loading',
    disabled: false,
    disable: function () {
        this.disabled = true;
    },
    enable: function () {
        this.disabled = false;
    },
    onLoad: function () {
        this.el.unmask(this.removeMask);
    },
    onBeforeLoad: function () {
        if (!this.disabled) {
            this.el.mask(this.msg, this.msgCls);
        }
    },
    onSave: function () {
        this.el.unmask(this.removeMask);
    },
    onBeforeSave: function () {
        if (!this.disabled) {
            this.el.mask(this.msg, this.msgCls);
        }
    },
    show: function () {
        this.onBeforeLoad();
    },
    hide: function () {
        this.onLoad();
    },
    destroy: function () {
        if (this.store) {
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('beforesave', this.onBeforeSave, this);
            this.store.un('save', this.onSave, this);
            this.store.un('exception', this.onLoad, this);
        } else {
            var um = this.el.getUpdater();
            um.un('beforeupdate', this.onBeforeLoad, this);
            um.un('update', this.onLoad, this);
            um.un('failure', this.onLoad, this);
        }
    }
};

Ext.override(Ext.Component, {
    getAutoCreate: function () {
        var cfg = Ext.isObject(this.autoCreate) ? this.autoCreate : Ext.apply({}, this.defaultAutoCreate);
        if (this.id && !cfg.id) {
            cfg.id = this.id;
        }
        if (this.maxLength && this.maxLength != Number.MAX_VALUE) {
            cfg.size = this.maxLength + '';
            cfg.maxLength = this.maxLength + '';
        } else if (this.size) {
            cfg.size = this.size + '';
        }
        return cfg;
    }
});

Ext.override(Ext.layout.FormLayout, {
    getTemplateArgs: function (field) {
        var noLabelSep = !field.fieldLabel || field.hideLabel;
        return {
            id: field.id,
            label: field.fieldLabel + '<span id="form-required-field-' + field.id + '" style="display:' + ((field.allowBlank == false) ? 'inline' : 'none') + '" class="required">&nbsp;*</span>',
            itemCls: (field.itemCls || this.container.itemCls || '') + (field.hideLabel ? ' x-hide-label' : ''),
            clearCls: field.clearCls || 'x-form-clear-left',
            labelStyle: this.getLabelStyle(field.labelStyle),
            elementStyle: this.elementStyle || '',
            labelSeparator: noLabelSep ? '' : (Ext.isDefined(field.labelSeparator) ? field.labelSeparator : this.labelSeparator)
        };
    }
});

Ext.override(Ext.form.Field, {
    labelSeparator: ' ',
    setReadOnly: function (readOnly) {
        if (this.rendered) {
            this.el.dom.readOnly = readOnly;
            if (readOnly === true) {
                this.el.addClass('readOnly');
            } else {
                this.el.removeClass('readOnly');
            }
        }
        this.readOnly = readOnly;
    },
    setRequiredField: function (required) {
        var requiredField = Ext.get('form-required-field-' + this.id);
        if (requiredField) {
            if (required === true) {
                this.allowBlank = false;
                requiredField.setDisplayed('inline');
            } else {
                this.allowBlank = true;
                requiredField.setDisplayed('none');
                this.clearInvalid();
            }
        }
    },
    initValue : function(){
        if(this.value !== undefined){
            this.setValue(this.value);
        }else if(this.el && this.el.dom && !Ext.isEmpty(this.el.dom.value) && this.el.dom.value != this.emptyText){
            this.setValue(this.el.dom.value);
        }
        this.originalValue = this.getValue();
    }
});

Ext.override(Ext.form.FormPanel, {
    id: 'formPanel',
    renderTo: 'content',
    border: false,
    monitorResize: true,
    labelSeparator: ' ',
    labelAlign: 'right',
    labelWidth: 150,
    trackResetOnLoad: true,
    listeners : {
    	'afterrender' : function(form) {
    		form.doLayout();
    	}
    }
});

Ext.override(Ext.Button, {
    minWidth: 75
});

Ext.override(Ext.form.BasicForm, {
    trackResetOnLoad: true,
    setValues: function (values) {
        if (Ext.isArray(values)) {
            for (var i = 0, len = values.length; i < len; i++) {
                var v = values[i];
                var f = this.findField(v.id);
                if (f) {
                    f.setValue(v.value);
                    if (this.trackResetOnLoad) {
                        f.originalValue = f.getValue();
                    }
                }
            }
        } else {
            var field;
            for (var id in values) {
                if (!Ext.isFunction(values[id]) && (field = this.findField(id))) {
                    if (Ext.isFunction(field.isXType) && field.isXType('combo')) {
                        if (field.mode === 'remote') {
                        	var store = field.store;
                            var index = store.findExact(field.valueField, values[id]);
                            if (index <= -1) {
                            	var data = {};
                            	var keys = store.fields.keys;
                            	for(var i=0;i<keys.length;i++) {
                            		data[keys[i]] = (values[keys[i]])?values[keys[i]]:values[id + '-' + keys[i]];
                            	}
                            	data[field.valueField] = values[id];
                                var r = new store.recordType(data);
                                store.removeAll();
                                store.add(r);
                                delete field.lastQuery;
                            }
                        }
                    }
                    field.setValue(values[id]);
                    if (this.trackResetOnLoad) {
                    	if(field.isXType('checkboxgroup')) {
                    		field.eachItem(function(f){
                    			f.originalValue = f.getValue();
                    		})
                    	} else {
                    		field.originalValue = field.getValue();
                    	}
                    }
                }
            }
        }
        return this;
    },
    getFieldValues: function (dirtyOnly) {
        var o = {},
        n,
        key,
        val;
        this.items.each(function (f) {
            if (!f.disabled && (dirtyOnly !== true || f.isDirty())) {
                n = f.getName();
                key = o[n];
                val = f.getValue();

                if (Ext.isDefined(key)) {
                    if (Ext.isArray(key)) {
                        o[n].push(val);
                    } else {
                        o[n] = [key, val];
                    }
                } else {
                    o[n] = val;
                }

                if (Ext.isFunction(f.isXType) && f.isXType('combo')) {
                    var r = f.findRecord(f.valueField, val);
                    if (r) {
                        if (!Ext.isEmpty(f.displayField)) {
                            key = o[f.displayField];
                            val = r.data[f.displayField];

                            if (!Ext.isDefined(key)) {
                                o[f.displayField] = val;
                            }
                        }

                        if (!Ext.isEmpty(f.descriptionField)) {
                            key = o[f.descriptionField];
                            val = r.data[f.descriptionField];

                            if (!Ext.isDefined(key)) {
                                o[f.descriptionField] = val;
                            }
                        }
                    }
                } else if (Ext.isFunction(f.isXType) && f.isXType('datefield')) {
                    if (!Ext.isEmpty(f.value)) {
                        key = f.id;
                        val = f.value;
                        o[key] = f.formatDate(f.parseDate(val));
                    }
                }
            }
        });
        return o;
    }
});

Ext.override(Ext.form.FieldSet, {
    labelAlign: 'right',
    labelSeparator: ' ',
    labelWidth: 150
});

Ext.override(Ext.data.Record, {
    set: function (name, value, fast) {
        var encode = Ext.isPrimitive(value) ? String : Ext.encode;
        if (encode(this.data[name]) == encode(value)) {
            return;
        }
        this.dirty = true;
        if (!this.modified) {
            this.modified = {};
        }
        if (this.modified[name] === undefined) {
            this.modified[name] = this.data[name];
        }
        this.data[name] = value;
        if (!this.editing) {
            this.afterEdit(fast);
        }
    },
    afterEdit: function (fast) {
        if (this.store != undefined && typeof this.store.afterEdit == "function") {
            this.store.afterEdit(this, fast);
        }
    },
    isValid: function (grid) {
        var record = this;
        return this.fields.find(function (f) {
            var invalid = (f.allowBlank === false && Ext.isEmpty(this.data[f.name])) ? true : false;
            if (invalid) {
                if (grid) {
                    Ext.Msg.alert(__commonMessages['Information'], __commonMessages['Mandatory field(s) is required.'], function () {
                        if (grid.getSelectionModel().highlightRecord) {
                            grid.getSelectionModel().highlightRecord(record, false, true);
                        }
                    });
                }
            } else if (Ext.isFunction(f.validate)) {
                invalid = !f.validate(record, grid);
            }
            return invalid;
        }, this) ? false : true;
    }
});


Ext.override(Ext.form.DateField, {
    format: application.formatDate,
    minValue: application.originSystemDate,
    maxValue: application.lastSystemDate,
    listeners: {
        'blur': function (datefield) {
            if (Ext.isEmpty(datefield.getRawValue())) {
                datefield.reset();
            }
        }
    }
});

Ext.override(Ext.form.TimeField, {
    initDate: application.originSystemDate,
    initDateFormat: application.formatDate
});

Ext.override(Ext.form.TriggerField, {
    setReadOnly: function (readOnly) {
    	if (readOnly != this.readOnly) {
            this.readOnly = readOnly;
            this.updateEditState();
        }
    	if(this.rendered){
	        if (readOnly == true) {
	            this.el.addClass('readOnly');
	        } else {
	            this.el.removeClass('readOnly');
	        }
    	}
    }
});

Ext.override(Ext.grid.GridPanel, {
    enableHdMenu: false,
    columnLines: true,
    enableColumnMove: false,
    loadMask: true,
    stripeRows: true,
    initEvents: function () {
        Ext.grid.GridPanel.superclass.initEvents.call(this);
        if (this.loadMask) {
            this.loadMask = new Ext.LoadMask(Ext.getBody(),
            Ext.apply({
                store: this.store
            }, this.loadMask));
        }
    },
    reconfigure: function (store, colModel) {
        var rendered = this.rendered;
        if (rendered) {
            if (this.loadMask) {
                this.loadMask.destroy();
                this.loadMask = new Ext.LoadMask(Ext.getBody(),
                Ext.apply({}, {
                    store: store
                }, this.initialConfig.loadMask));
            }
        }
        if (this.view) {
            this.view.initData(store, colModel);
        }
        this.store = store;
        this.colModel = colModel;
        if (rendered) {
            this.view.refresh(true);
        }
        this.fireEvent('reconfigure', this, store, colModel);
    }
});

Ext.override(Ext.grid.EditorGridPanel, {
    clicksToEdit: 1
});

Ext.override(Ext.grid.GridView, {
    renderHeaders: function () {
        var cm = this.cm,
            fields = this.ds.fields,
            ts = this.templates,
            ct = ts.hcell,
            cb = [],
            p = {},
            len = cm.getColumnCount(),
            last = len - 1;

        for (var i = 0; i < len; i++) {
            p.id = cm.getColumnId(i);
            var field = fields.key(cm.getDataIndex(i));
            p.value = (cm.getColumnHeader(i) || '') + ((field && field.allowBlank == false) ? '<span class="required"> *</span>' : '');
            p.style = this.getColumnStyle(i, true) + ' text-align:center;';
            p.tooltip = this.getColumnTooltip(i);
            p.css = i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');

            if (cm.config[i].align == 'right') {
                p.istyle = 'padding-right:16px';
            } else {
                delete p.istyle;
            }
            cb[cb.length] = ct.apply(p);
        }
        return ts.header.apply({
            cells: cb.join(''),
            tstyle: 'width:' + this.getTotalWidth() + ';'
        });
    }
});

Ext.override(Ext.PagingToolbar, {
    displayInfo: true,
    doLoad: function (start, options) {
        var o = {}, pn = this.getParams(),
            store = this.store,
            data = {}, len = 0,
            opts = {};
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        o[store.getLoadedParam()] = Ext.value(store.isLoaded, false);

        if (store.removeAndSave === true) {
            if (store.removeRecords && store.removeRecords.length) {
                data['destroy'] = store.removeRecords;
                len++;
            }
        } else {
            if (store.removed.length) {
                data['destroy'] = store.removed;
                len++;
            }
        }
        var rs = [].concat(store.getModifiedRecords());
        if (rs.length) {
            var phantoms = [];
            for (var i = rs.length - 1; i >= 0; i--) {
                if (rs[i].phantom === true) {
                    var rec = rs.splice(i, 1).shift();
                    phantoms.push(rec);
                }
            }
            if (phantoms.length) {
                data['create'] = phantoms;
                len++;
            }
            if (rs.length) {
                data['update'] = rs;
                len++;
            }
        }
        if (len > 0) {
            store.writer.apply(o, store.baseParams, '', data);
        }
        if (this.fireEvent('beforechange', this, o) !== false) {
            opts = {
                params: o
            };
            if (options) {
                opts.params[store.getRemoveAndSaveParam()] = options[store.getRemoveAndSaveParam()];
                Ext.applyIf(opts, options);
                Ext.apply(opts.params, options.params);
            }
            this.store.load(opts);
            return;
        } else {
            return false;
        }
    },
    getParams: function () {
        var params = {};
        Ext.apply(params, this.paramNames || this.store.paramNames);
        Ext.apply(params, {
            start: this.store.storeId + '_' + params.start,
            limit: this.store.storeId + '_' + params.limit
        });
        return params;
    },
    doRefreshOnRemove: function (length, options) {
        var store = this.store,
            pageData = this.getPageData(),
            cursor = this.cursor;
        if (pageData.activePage == pageData.pages) {
            var total = pageData.total - length,
                extra = total % this.pageSize;
            cursor = Math.max(0, extra ? (total - extra) : total - this.pageSize);
        }
        this.doLoad(cursor, options);
    }
});

Ext.override(Ext.data.JsonReader, {
    extractData: function (root, returnRecords) {
        var __extractData = function (rawName, root, returnRecords) {
            if (this.isData(root) && !(this instanceof Ext.data.XmlReader)) {
                root = [root];
            } else if(Ext.isString(root)) {
            	return root;
            }
            var f = this.recordType.prototype.fields,
                fi = f.items,
                fl = f.length,
                rs = [];
            if (returnRecords === true) {
                var Record = this.recordType;
                for (var i = 0; i < root.length; i++) {
                    var n = root[i],
                        id = Ext.value(n[DEFAULT_CONFIG.RECORD_ID], this.getId(n));
                    var record = new Record(this.extractValues(n, fi, fl), id);
                    record[rawName] = n; // <-- There's implementation of ugly bit, setting the raw record-data.
                    rs.push(record);
                }
            } else {
                for (var i = 0; i < root.length; i++) {
                    var data = this.extractValues(root[i], fi, fl);
                    data[this.meta.idProperty] = this.getId(root[i]);
                    rs.push(data);
                }
            }
            return rs;
        };

        var rawName = (this instanceof Ext.data.JsonReader) ? 'json' : 'node';

        if (root && Ext.isObject(root) && (Ext.isDefined(root.createRecords) || Ext.isDefined(root.updateRecords) || Ext.isDefined(root.destroyRecords))) {
            var saveData = {};
            for (var key in root) {
                if (key) {
                    saveData[key] = __extractData.call(this, rawName, root[key], returnRecords);
                }
            }
            return saveData;
        } else {
            return __extractData.call(this, rawName, root, returnRecords);
        }
    },
    realize: function(rs, data){
        if (Ext.isArray(rs)) {
            for (var i = rs.length - 1; i >= 0; i--) {
                // recurse
                if (Ext.isArray(data)) {
                    this.realize(rs.splice(i,1).shift(), data.splice(i,1).shift());
                }
                else {
                    this.realize(rs.splice(i,1).shift(), data);
                }
            }
        }
        else {
            if (Ext.isArray(data) && data.length == 1) {
                data = data.shift();
            }
            if (!this.isData(data)) {
                throw new Ext.data.DataReader.Error('realize', rs);
            }
            rs.phantom = false; // <-- That's what it's all about
            rs._phid = rs.id;  // <-- copy phantom-id -> _phid, so we can remap in Store#onCreateRecords
            rs.id = this.getId(data);
            rs.data = data;

            rs.commit();
            if(rs.store) { /* Fix for adding record in paging.*/
            	rs.store.reMap(rs);
            }
        }
    }
});

Ext.override(Ext.data.JsonWriter, {
    writeAllFields: true,
    encodeDelete: true,
    listful: true,
    root: DEFAULT_CONFIG.ROOT,
    messageProperty: 'message',
    apply: function (params, baseParams, action, rs) {
        var data = {};
        for (var key in rs) {
            if (key) {
                var record = [],
                    renderer = key + 'Record';
                if (Ext.isArray(rs[key])) {
                    Ext.each(rs[key], function (rec) {
                        record.push(this[renderer](rec));
                    }, this);
                } else if (rs[key] instanceof Ext.data.Record) {
                    record = this[renderer](rs[key]);
                }
                data[key] = record;
            }
        }
        this.render(params, baseParams, data);
    },
    render: function (params, baseParams, data) {
        var storeId = this.meta.storeId || this.storeId;
        if (this.encode === true) {
            Ext.apply(params, baseParams);
            for (var key in data) {
                if (key) {
                    var p = storeId + '_json' + Ext.util.Format.capitalize(key) + 'Records';
                    params[p] = Ext.encode(data[key]);
                }
            }
        } else {
            var jdata = Ext.apply({}, baseParams);
            for (var key in data) {
                if (key) {
                    var p = storeId + '_json' + Ext.util.Format.capitalize(key) + 'Records';
                    jdata[p] = data[key];
                }
            }
            params.jsonData = jdata;
        }
    },
    createRecord: function (rec) {
        return this.toHashForCreate(rec);
    },
    toHashForCreate: function (rec, config) {
        var map = rec.fields.map,
            data = {},
            raw = (this.writeAllFields === false && rec.phantom === false) ? rec.getChanges() : rec.data,
            m;
        Ext.iterate(raw, function (prop, value) {
            if ((m = map[prop])) {
                data[m.mapping ? m.mapping : m.name] = Ext.isDate(value) ? Ext.util.Format.date(value, application.formatDate) : value;
            }
            data[DEFAULT_CONFIG.RECORD_ID] = rec.id;
        });
        if (rec.phantom) {
            if (rec.fields.containsKey(this.meta.idProperty) && Ext.isEmpty(rec.data[this.meta.idProperty])) {
                delete data[this.meta.idProperty];
            }
        } else {
            data[this.meta.idProperty] = rec.id;
        }
        return data;
    },
    toHash: function (rec, config) {
        var map = rec.fields.map,
            data = {},
            raw = (this.writeAllFields === false && rec.phantom === false) ? rec.getChanges() : rec.data,
            m;
        Ext.iterate(raw, function (prop, value) {
            if ((m = map[prop])) {
                data[m.mapping ? m.mapping : m.name] = Ext.isDate(value) ? Ext.util.Format.date(value, application.formatDate) : value;
            }
        });
        // we don't want to write Ext auto-generated id to hash.  Careful not to remove it on Models not having auto-increment pk though.
        // We can tell its not auto-increment if the user defined a DataReader field for it *and* that field's value is non-empty.
        // we could also do a RegExp here for the Ext.data.Record AUTO_ID prefix.
        if (rec.phantom) {
            if (rec.fields.containsKey(this.meta.idProperty) && Ext.isEmpty(rec.data[this.meta.idProperty])) {
                delete data[this.meta.idProperty];
            }
        } else {
            data[this.meta.idProperty] = rec.id;
        }
        return data;
    },
    destroyRecord: function (rec) {
        if (this.encodeDelete) {
            return this.toHash(rec);
        } else {
            return rec.id;
        }
    }
});

Ext.override(Ext.data.Store, {
    autoSave: false,
    remoteSort: true,
    removeAndSave: false,
    getLoadedParam: function () {
        return this.storeId + '_isLoaded';
    },
    getRemoveAndSaveParam: function () {
        return this.storeId + '_isRemoveAndSave';
    },
    load: function (options) {
        options = Ext.apply({}, options);
        if (this.sortInfo && this.remoteSort) {
            var pn = this.paramNames;
            options.params = Ext.apply({}, options.params);
            options.params[this.storeId + '_' + pn.sort] = this.sortInfo.field;
            options.params[this.storeId + '_' + pn.dir] = this.sortInfo.direction;
        }
        this.storeOptions(options);
        try {
            return this.execute('read', null, options); // <-- null represents rs.  No rs for load actions.
        } catch (e) {
            this.handleException(e);
            return false;
        }
    },
    isValid: function (all, grid) {
        var records = (all) ? this.getRange() : this.getModifiedRecords(),
            i;
        if (records && records.length > 0) {
            for (i = 0; i < records.length; i++) {
                if (records[i].isValid(grid) === false) {
                    return false;
                }
            }
            if (Ext.isFunction(this.validate)) {
                return this.validate(records, grid) ? true : false;
            }
        }
        return true;
    },
    createRemoveRecordParameters: function (grid) {
        if (!this.writer) {
            throw new Ext.data.Store.Error('writer-undefined');
        }
        var data = {};
        Ext.apply(data, {
            'destroy': [],
            'create': [],
            'update': []
        });


        if (this.removeAndSave === true) {
            if (this.removeRecords && this.removeRecords.length) {
                data['destroy'] = this.removeRecords;
            }
        } else {
            if (this.removed.length) {
                data['destroy'] = this.removed;
            }
        }

        return data;
    },
    createRecordParameters: function (grid) {
        var data = this.createRemoveRecordParameters(grid);
        var rs = [].concat(this.getModifiedRecords());
        if (rs.length) {
            var valid = this.isValid(false, grid);
            if (valid === false) {
                if (grid) {
                    var e = {
                        grid: this
                    };
                    grid.fireEvent('saveRowDataNoComplete', e);
                }
                return -1;
            }

            var phantoms = [];
            for (var i = rs.length - 1; i >= 0; i--) {
                if (rs[i].phantom === true) {
                    var rec = rs.splice(i, 1).shift();
                    phantoms.push(rec);
                }
            }
            if (phantoms.length) {
                data['create'] = phantoms;
            }
            if (rs.length) {
                data['update'] = rs;
            }
        }
        return data;
    },
    save: function (grid, noRequest) {
        var data = this.createRecordParameters(grid);
        if (data !== -1) {
            var batch = ++this.batchCounter;
            if (this.fireEvent('beforesave', this, data) !== false) {
                var object = this.doTransaction('save', data, batch, noRequest);
                if (noRequest === true) {
                    return object;
                }
                return batch;
            }
        }
        return -1;
    },
    saveOnlyRemoveRecords: function (grid, noRequest) {
        var data = this.createRemoveRecordParameters(grid);
        if (data !== -1) {
            var batch = ++this.batchCounter;
            if (this.fireEvent('beforesave', this, data) !== false) {
                var object = this.doTransaction('save', data, batch, noRequest);
                if (noRequest === true) {
                    return object;
                }
                return batch;
            }
        }
        return -1;
    },
    doTransaction: function (action, rs, batch, noRequest) {
        function transaction(records) {
            var object = undefined;
            try {
                object = this.execute(action, records, undefined, batch, noRequest);
            } catch (e) {
                this.handleException(e);
            }
            return object;
        }
        return transaction.call(this, rs);
    },
    execute: function (action, rs, options, /* private */ batch, noRequest) {
        if (!Ext.data.Api.isAction(action)) {
            throw new Ext.data.Api.Error('execute', action);
        }
        options = Ext.applyIf(options || {}, {
            params: {}
        });
        if (batch !== undefined) {
            this.addToBatch(batch);
        }
        var doRequest = true;

        if (action === 'read') {
            doRequest = this.fireEvent('beforeload', this, options);
            Ext.applyIf(options.params, this.baseParams);
        } else {
            for (var key in rs) {
                if (key) {
                    if (this.writer.listful === true && this.restful !== true) {
                        rs[key] = (Ext.isArray(rs[key])) ? rs[key] : [rs[key]];
                    } else if (Ext.isArray(rs[key]) && rs[key].length == 1) {
                        rs[key] = rs[key].shift();
                    }
                }
            }

            if ((doRequest = this.fireEvent('beforewrite', this, action, rs, options)) !== false) {
                this.writer.apply(options.params, this.baseParams, action, rs);
            }
        }
        if (doRequest !== false) {
            if (this.writer && this.proxy.url && !this.proxy.restful && !Ext.data.Api.hasUniqueUrl(this.proxy, action)) {
                if (!options.params.xaction) {
                    options.params.xaction = action;
                }
            }
            if (noRequest === true) {
                return {
                    params: options.params,
                    rs: rs,
                    batch: batch,
                    action: action,
                    scope: this,
                    reader: this.reader,
                    options: options
                };
            }
            this.proxy.request(Ext.data.Api.actions[action], rs, options.params, this.reader, this.createCallback(action, rs, batch), this, options);
        }
        return doRequest;
    },
    removeFromBatch: function (batch, action, data, success) {
        var b = this.batches,
            key = this.batchKey + batch,
            o = b[key],
            arr;


        if (o) {
            arr = o.data[action] || [];
            o.data[action] = arr.concat(data);
            if (o.count === 1) {
                data = o.data;
                delete b[key];
                this.fireEvent('save', this, batch, data, success);
            } else {
                --o.count;
            }
        }
    },
    createCallback: function (action, rs, batch) {
        var actions = Ext.data.Api.actions;
        return (action == 'read') ? this.loadRecords : function (data, response, success) {
            var d = {};
            if (Ext.isArray(data)) {
                d = [].concat(data);
            } else {
                for (var key in data) {
                    if (key) {
                        d[key] = [].concat(data[key]);
                    }
                }
            }
            this['on' + Ext.util.Format.capitalize(action) + 'Records'](success, rs, d);
            if (success === true) {
                this.fireEvent('write', this, action, data, response, rs);
            }
            this.removeFromBatch(batch, action, data, success);
        };
    },
    onSaveRecords: function (success, rs, data) {
        for (var key in rs) {
            if (key) {
                this['on' + Ext.util.Format.capitalize(key) + 'Records'](success, rs[key], [].concat(data[key + 'Records']));
            }
        }
    },
    afterEdit: function (record, fast) {
        if (this.modified.indexOf(record) == -1) {
            this.modified.push(record);
        }
        if (fast != true) {
            this.fireEvent('update', this, record, Ext.data.Record.EDIT);
        } else if (this.writer) {
            this.updateRecord(this, record, Ext.data.Record.EDIT);
        }
    },
    remove: function (record, fast) {
        if (Ext.isArray(record)) {
            Ext.each(record, function (r) {
                this.remove(r, fast);
            }, this);
        }
        var index = this.data.indexOf(record);
        if (index > -1) {
            record.join(null);
            this.data.removeAt(index);
        }
        if (this.pruneModifiedRecords) {
            this.modified.remove(record);
        }
        if (this.snapshot) {
            this.snapshot.remove(record);
        }

        if (index > -1) {
            if (fast != true) {
                this.fireEvent('remove', this, record, index);
            } else if (this.writer) {
                this.destroyRecord(this, record, index);
            }
        }
    },
    add: function (records, fast) {
        var i, record, index;
        records = [].concat(records);
        if (records.length < 1) {
            return;
        }
        for (i = 0, len = records.length; i < len; i++) {
            record = records[i];
            record.join(this);
            if (record.dirty || record.phantom) {
                this.modified.push(record);
            }
        }
        index = this.data.length;
        this.data.addAll(records);
        if (this.snapshot) {
            this.snapshot.addAll(records);
        }
        if (fast != true) {
            this.fireEvent('add', this, records, index);
        } else if (this.writer) {
            this.createRecords(this, records, index);
        }
    },
    insert: function (index, records, fast) {
        var i, record;
        records = [].concat(records);
        for (i = 0, len = records.length; i < len; i++) {
            record = records[i];

            this.data.insert(index + i, record);
            record.join(this);

            if (record.dirty || record.phantom) {
                this.modified.push(record);
            }
        }

        if (this.snapshot) {
            this.snapshot.addAll(records);
        }
        if (fast != true) {
            this.fireEvent('add', this, records, index);
        } else if (this.writer) {
            this.createRecords(this, records, index);
        }
    },
    doUpdate: function (rec, fast) {
        this.data.replace(rec.id, rec);
        if (this.snapshot) {
            this.snapshot.replace(rec.id, rec);
        }
        if (fast != true) {
            this.fireEvent('update', this, rec, Ext.data.Record.COMMIT);
        } else if (this.writer) {
            this.updateRecord(this, record, Ext.data.Record.EDIT);
        }
    },
    loadRecords: function (o, options, success) {
        var i;
        if (this.isDestroyed === true) {
            return;
        }
        if (!o || success === false) {
            if (success !== false) {
                this.fireEvent('load', this, [], options);
            }
            if (options.callback) {
                options.callback.call(options.scope || this, [], options, false, o);
            }
            return;
        }
        var r = o.records,
            t = o.totalRecords || r.length;
        if (!options || options.add !== true) {
            if (this.pruneModifiedRecords) {
                this.modified = [];
            }
            this.clearData();
            var modified = {};
            for (i = 0; i < this.modified.length; i++) {
                modified[this.modified[i].id] = this.modified[i];
            }
            for (i = 0, len = r.length; i < len; i++) {
                if (modified[r[i].id] instanceof Ext.data.Record) {
                    r[i] = modified[r[i].id];
                }
                r[i].join(this);
            }
            if (this.snapshot) {
                this.data = this.snapshot;
                delete this.snapshot;
            }
            this.data.addAll(r);
            this.totalLength = t;
            this.applySort();
            this.fireEvent('datachanged', this);
        } else {
            var toAdd = [],
                rec,
                cnt = 0;
            var modified = {};
            for (i = 0; i < this.modified.length; i++) {
                modified[this.modified[i].id] = this.modified[i];
            }
            for (i = 0, len = r.length; i < len; ++i) {
                if (modified[r[i].id] instanceof Ext.data.Record) {
                    r[i] = modified[r[i].id];
                }
                rec = r[i];
                if (this.indexOfId(rec.id) > -1) {
                    this.doUpdate(rec);
                } else {
                    toAdd.push(rec);
                    ++cnt;
                }
            }
            this.totalLength = Math.max(t, this.data.length + cnt);
            this.add(toAdd);
        }
        this.fireEvent('load', this, r, options);
        if (options.callback) {
            options.callback.call(options.scope || this, r, options, true);
        }
    },
    createRecords: function (store, records, index) {
        var modified = this.modified,
            length = records.length,
            record, i;
        for (i = 0; i < length; i++) {
            record = records[i];
            if (record.phantom) {
                record.markDirty();
                if (modified.indexOf(record) == -1) {
                    modified.push(record);
                }
            } else {
                // Remove if record is phantom == false.
                this.removed.splice(this.removed.indexOf(record), 1);
            }
        }
        if (this.autoSave === true) {
            this.save(store.grid);
        }
    },
    updateRecord: function (store, record, action) {
        if (action == Ext.data.Record.EDIT && this.autoSave === true && (!record.phantom || (record.phantom && record.isValid()))) {
            this.save(store.grid);
        }
    },
    destroyRecord: function (store, record, index) {
        if (this.modified.indexOf(record) != -1) { // <-- handled already if @cfg pruneModifiedRecords == true
            this.modified.remove(record);
        }
        if (!record.phantom) {
            this.removed.push(record);

            // since the record has already been removed from the store but the server request has not yet been executed,
            // must keep track of the last known index this record existed.  If a server error occurs, the record can be
            // put back into the store.  @see Store#createCallback where the record is returned when response status === false
            record.lastIndex = index;

            if (this.autoSave === true) {
                this.save(store.grid);
            }
        }
    },
    onCreateRecords: function (success, rs, data) {
        if (success === true) {
            try {
                var r = [].concat(rs);
                this.reader.realize(r, data);
                this.reMap(rs);
            } catch (e) {
                this.handleException(e);
                if (Ext.isArray(rs)) {
                    this.onCreateRecords(success, rs, data);
                }
            }
        }
    },
    onUpdateRecords: function (success, rs, data) {
        if (success === true) {
            try {
                var r = [].concat(rs);
                this.reader.update(r, data);
            } catch (e) {
                this.handleException(e);
                if (Ext.isArray(rs)) {
                    this.onUpdateRecords(success, rs, data);
                }
            }
        }
    },
    onDestroyRecords: function (success, rs, data) {
        // splice each rec out of this.removed
        rs = (rs instanceof Ext.data.Record) ? [rs] : [].concat(rs);
        for (var i = 0, len = rs.length; i < len; i++) {
            this.removed.splice(this.removed.indexOf(rs[i]), 1);
        }
        if (success === false) {
            // put records back into store if remote destroy fails.
            // @TODO: Might want to let developer decide.
            for (i = rs.length - 1; i >= 0; i--) {
                this.insert(rs[i].lastIndex, rs[i]); // <-- lastIndex set in Store#destroyRecord
            }
        }
    }
});

Ext.data.JsonStore = Ext.extend(Ext.data.Store, {
    constructor: function (config) {
        Ext.applyIf(config, {
            root: DEFAULT_CONFIG.ROOT,
            messageProperty: 'message'
        });
        Ext.data.JsonStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.JsonReader(config),
            writer: new Ext.data.JsonWriter(config)
        }));
        this.pruneModifiedRecords = false;
        this.isLoaded = false;
    }
});
Ext.reg('jsonstore', Ext.data.JsonStore);

Ext.override(Ext.data.JsonStore, {

});

Ext.data.GroupingStore = Ext.extend(Ext.data.Store, {
    constructor: function (config) {
        config = config || {};
        this.hasMultiSort = true;
        this.multiSortInfo = this.multiSortInfo || {
            sorters: []
        };
        var sorters = this.multiSortInfo.sorters,
            groupField = config.groupField || this.groupField,
            sortInfo = config.sortInfo || this.sortInfo,
            groupDir = config.groupDir || this.groupDir;
        if (groupField) {
            sorters.push({
                field: groupField,
                direction: groupDir
            });
        }
        if (sortInfo) {
            sorters.push(sortInfo);
        }
        if (config.reader) {
            var meta = Ext.applyIf(config.reader.meta, {
                root: DEFAULT_CONFIG.ROOT,
                messageProperty: 'message'
            });

            if (Ext.isFunction(config.reader.onMetaChange)) {
                config.reader.onMetaChange(meta);
            }
        }
        Ext.data.GroupingStore.superclass.constructor.call(this, Ext.apply(config, {
            writer: new Ext.data.JsonWriter(config)
        }));
        this.addEvents('groupchange');
        this.applyGroupField();
    },
    remoteGroup: false,
    groupOnSort: false,
    groupDir: 'ASC',
    clearGrouping: function () {
        this.groupField = false;
        if (this.remoteGroup) {
            if (this.baseParams) {
                delete this.baseParams.groupBy;
                delete this.baseParams.groupDir;
            }
            var lo = this.lastOptions;
            if (lo && lo.params) {
                delete lo.params.groupBy;
                delete lo.params.groupDir;
            }
            this.reload();
        } else {
            this.sort();
            this.fireEvent('datachanged', this);
        }
    },
    groupBy: function (field, forceRegroup, direction) {
        direction = direction ? (String(direction).toUpperCase() == 'DESC' ? 'DESC' : 'ASC') : this.groupDir;
        if (this.groupField == field && this.groupDir == direction && !forceRegroup) {
            return; // already grouped by this field
        }
        var sorters = this.multiSortInfo.sorters;
        if (sorters.length > 0 && sorters[0].field == this.groupField) {
            sorters.shift();
        }
        this.groupField = field;
        this.groupDir = direction;
        this.applyGroupField();
        var fireGroupEvent = function () {
            this.fireEvent('groupchange', this, this.getGroupState());
        };
        if (this.groupOnSort) {
            this.sort(field, direction);
            fireGroupEvent.call(this);
            return;
        }
        if (this.remoteGroup) {
            this.on('load', fireGroupEvent, this, {
                single: true
            });
            this.reload();
        } else {
            this.sort(sorters);
            fireGroupEvent.call(this);
        }
    },
    sort: function (fieldName, dir) {
        if (this.remoteSort) {
            return Ext.data.GroupingStore.superclass.sort.call(this, fieldName, dir);
        }
        var sorters = [];
        if (Ext.isArray(arguments[0])) {
            sorters = arguments[0];
        } else if (fieldName == undefined) {
            sorters = this.sortInfo ? [this.sortInfo] : [];
        } else {
            var field = this.fields.get(fieldName);
            if (!field) return false;
            var name = field.name,
                sortInfo = this.sortInfo || null,
                sortToggle = this.sortToggle ? this.sortToggle[name] : null;
            if (!dir) {
                if (sortInfo && sortInfo.field == name) { // toggle sort dir
                    dir = (sortToggle || 'ASC').toggle('ASC', 'DESC');
                } else {
                    dir = field.sortDir;
                }
            }
            this.sortToggle[name] = dir;
            this.sortInfo = {
                field: name,
                direction: dir
            };
            sorters = [this.sortInfo];
        }
        if (this.groupField) {
            sorters.unshift({
                direction: this.groupDir,
                field: this.groupField
            });
        }
        return this.multiSort.call(this, sorters, dir);
    },
    applyGroupField: function () {
        if (this.remoteGroup) {
            if (!this.baseParams) {
                this.baseParams = {};
            }
            Ext.apply(this.baseParams, {
                groupBy: this.groupField,
                groupDir: this.groupDir
            });
            var lo = this.lastOptions;
            if (lo && lo.params) {
                lo.params.groupDir = this.groupDir;
                delete lo.params.groupBy;
            }
        }
    },
    applyGrouping: function (alwaysFireChange) {
        if (this.groupField !== false) {
            this.groupBy(this.groupField, true, this.groupDir);
            return true;
        } else {
            if (alwaysFireChange === true) {
                this.fireEvent('datachanged', this);
            }
            return false;
        }
    },
    getGroupState: function () {
        return this.groupOnSort && this.groupField !== false ? (this.sortInfo ? this.sortInfo.field : undefined) : this.groupField;
    }
});
Ext.reg('groupingstore', Ext.data.GroupingStore);

Ext.override(Ext.layout.AnchorLayout, {
    onLayout: function (container, target) {
        Ext.layout.AnchorLayout.superclass.onLayout.call(this, container, target);

        var size = this.getLayoutTargetSize(),
            containerWidth = size.width,
            containerHeight = size.height,
            overflow = target.getStyle('overflow'),
            components = this.getRenderedItems(container),
            len = components.length,
            boxes = [],
            box,
            anchorWidth,
            anchorHeight = 0,
            component,
            anchorSpec,
            calcWidth,
            calcHeight,
            anchorsArray,
            totalHeight = 0,
            i,
            el;

        if (containerWidth < 20 && containerHeight < 20) {
            return;
        }

        if (container.anchorSize) {
            if (typeof container.anchorSize == 'number') {
                anchorWidth = container.anchorSize;
            } else {
                anchorWidth = container.anchorSize.width;
                anchorHeight = container.anchorSize.height;
            }
        } else {
            anchorWidth = container.initialConfig.width;
            anchorHeight = container.initialConfig.height;
        }

        for (i = 0; i < len; i++) {
            component = components[i];
            el = component.getPositionEl();

            // If a child container item has no anchor and no specific width, set the child to the default anchor size
            if (!component.anchor && component.items && !Ext.isNumber(component.width) && !(Ext.isIE6 && Ext.isStrict)) {
                component.anchor = this.defaultAnchor;
            }

            if (component.anchor) {
                anchorSpec = component.anchorSpec;
                // cache all anchor values
                if (!anchorSpec) {
                    anchorsArray = component.anchor.split(' ');
                    component.anchorSpec = anchorSpec = {
                        right: this.parseAnchor(anchorsArray[0], component.initialConfig.width, anchorWidth),
                        bottom: this.parseAnchor(anchorsArray[1], component.initialConfig.height, anchorHeight)
                    };
                }
                calcWidth = anchorSpec.right ? this.adjustWidthAnchor(anchorSpec.right(containerWidth) - el.getMargins('lr'), component) : undefined;
                calcHeight = anchorSpec.bottom ? this.adjustHeightAnchor(anchorSpec.bottom(containerHeight) - el.getMargins('tb'), component) : undefined;

                if (calcWidth || calcHeight) {
                    boxes.push({
                        component: component,
                        width: calcWidth || undefined,
                        height: calcHeight || undefined
                    });
                }
            } else {
                boxes.push({
                    component: component,
                    width: component.getWidth() || undefined,
                    height: component.getHeight() || undefined
                });
            }
        }
        for (i = 0, len = boxes.length; i < len; i++) {
            box = boxes[i];
            box.component.setSize(box.width, box.height);
        }

        if (overflow && overflow != 'hidden' && !this.adjustmentPass) {
            var newTargetSize = this.getLayoutTargetSize();
            if (newTargetSize.width != size.width || newTargetSize.height != size.height) {
                this.adjustmentPass = true;
                this.onLayout(container, target);
            }
        }

        delete this.adjustmentPass;
    }
});

Ext.override(Ext.Editor, {
    onSpecialKey: function (field, e) {
        var key = e.getKey(),
            complete = this.completeOnEnter && key == e.ENTER,
            cancel = this.cancelOnEsc && key == e.ESC;
        if (complete || cancel) {
            e.stopEvent();
            if (complete) {
                if (this.editing && this.field.assertValue && this.field.isXType('ss-combobox')) {
                    this.field.assertValue({
                        callback: function () {
                            this.completeEdit();
                            if (field.triggerBlur) {
                                field.triggerBlur();
                            }
                            this.fireEvent('specialkey', field, e);
                        },
                        scope: this
                    });
                    return;
                }
                this.completeEdit();
            } else {
                this.cancelEdit();
            }
            if (field.triggerBlur) {
                field.triggerBlur();
            }
        }
        this.fireEvent('specialkey', field, e);
    },
    startEdit: function (el, value) {
        function processStartEdit(el, value) {
            this.boundEl = Ext.get(el);
            var v = value !== undefined ? value : this.boundEl.dom.innerHTML;
            if (!this.rendered) {
                this.render(this.parentEl || document.body);
            }
            if (this.fireEvent("beforestartedit", this, this.boundEl, v) !== false) {
                this.startValue = v;
                this.field.reset();
                this.field.setValue(v);
                this.realign(true);
                this.editing = true;
                this.show();
            }
        }

        if (this.editing && this.field.assertValue && this.field.isXType('ss-combobox')) {
            this.field.assertValue({
                callback: function () {
                    this.completeEdit();
                    processStartEdit.call(el, value);
                },
                scope: this
            });
            return;
        }
        this.completeEdit();
        processStartEdit.call(this, el, value);
    },
    onBlur: function () {
        // selectSameEditor flag allows the same editor to be started without onBlur firing on itself
        if (this.allowBlur === true && this.editing && this.selectSameEditor !== true) {
            if (this.editing && this.field.assertValue && this.field.isXType('ss-combobox')) {
                this.field.assertValue({
                    callback: function () {
                        this.completeEdit();
                    },
                    scope: this
                });
                return;
            }
            this.completeEdit();
        }
    },
    onHide: function () {
        if (this.editing) {
            if (this.editing && this.field.assertValue && this.field.isXType('ss-combobox')) {
                this.field.assertValue({
                    callback: function () {
                        this.completeEdit();
                    },
                    scope: this
                });
                return;
            }
            this.completeEdit();
            return;
        }
        this.field.blur();
        if (this.field.collapse) {
            this.field.collapse();
        }
        this.el.hide();
        if (this.hideEl !== false) {
            this.boundEl.show();
        }
    }
});

Ext.util.Format.comboRenderer = function (combo, customDisplayField) {
    return function (value, metaData, record, rowIndex, colIndex, store) {
        var r = combo.findRecord(combo.valueField, value),
            v = undefined,
            descProperty = this.dataIndex + DEFAULT_CONFIG.DESC;

        if (r) {
            v = r.get(combo.displayField);
        }

        if (Ext.isEmpty(v) && record) {
            var json = ((record.json) ? record.json : ((record.data) ? record.data : undefined));

            if (json) {
                var comboStore = combo.getStore(), defaultData = {};
                defaultData[combo.valueField] = value;

                var displayField = (!Ext.isEmpty(customDisplayField)) ? customDisplayField : combo.displayField;

                if (!Ext.isEmpty(json[descProperty])) {
                    defaultData[combo.displayField] = json[descProperty];
                    v = json[descProperty];
                } else if (combo.valueField == combo.displayField) {
                    v = json[combo.valueField];
                } else if(!Ext.isEmpty(record.data[displayField])) {
                	defaultData[combo.displayField] = record.data[displayField];
                    v = record.data[displayField];
                } else if (!Ext.isEmpty(json[combo.displayField])) {
                    defaultData[combo.displayField] = json[combo.displayField];
                    v = json[combo.displayField];
                }

                if (!Ext.isEmpty(defaultData[combo.valueField]) && !Ext.isEmpty(defaultData[combo.displayField])) {
                    comboStore.add(new comboStore.recordType(defaultData));
                    delete combo.lastQuery;
                }
            }
        }

        if (record && record.json) {
            record.json[descProperty] = undefined;
            record.json[combo.displayField] = undefined;
        }

        return (!Ext.isEmpty(v)) ? v : combo.valueNotFoundText;
    };
};

/*********************************************************************************/
var GridUtils = {};
/* Use Response.combineResponse() */
GridUtils.save = function (gridPanels, parameters, callback, errorHandler) {
    parameters = Ext.value(parameters, {});
    var o = [],
        url = undefined,
        isGridNotEmpty = !Ext.isEmpty(gridPanels);
    if (isGridNotEmpty) {
        for (var i = 0; i < gridPanels.length; i++) {
            var store = gridPanels[i].getStore();
            o[i] = store.save(gridPanels[i], true);
            if(o[i] === -1) {
            	gridPanels[i].loadMask.hide();
            	return;
            }
            Ext.applyIf(parameters, o[i].params);
        }
    }

    if (isGridNotEmpty) {
        url = gridPanels[0].getStore().url;
    }
    url = Ext.value(parameters.url, url);

    parameters.xaction = Ext.value(parameters.xaction, 'save');

    if (Ext.isEmpty(url)) {
        Ext.Msg.alert(__commonMessages['Error'], 'Please config url for ajax request.!');
        return;
    }

    var loadMask = new Ext.LoadMask(Ext.getBody(), {
    	msg: __commonMessages['Saving...']
    });
    loadMask.show();

    Ext.Ajax.request({
        url: url,
        params: parameters,
        success: function (response, opts) {
            var obj = Ext.decode(response.responseText);
            if (!obj.success) {
                if (isGridNotEmpty) {
                    for (var i = 0; i < gridPanels.length; i++) {
                        var store = gridPanels[i].getStore();
                        store.proxy.fireEvent('exception', store.proxy, 'response', o[i].action, undefined, response);
                        store.createCallback(o[i].action, o[i].rs, o[i].batch).call(o[i].scope, null, o[i].rs, false);
                    }
                }
                if (Ext.isFunction(errorHandler)) {
                    errorHandler.call(this, response, opts);
                } else {
                    Ext.Msg.alert(obj.title, obj.message);
                }
            } else {
                if (isGridNotEmpty) {
                    for (var i = 0; i < gridPanels.length; i++) {
                        var store = gridPanels[i].getStore();
                        store.proxy.fireEvent('write', store.proxy, o[i].action, obj.records, obj, o[i].rs, o[i].options);
                        var data = store.reader.extractData(obj.records[store.storeId], false);
                        store.createCallback(o[i].action, o[i].rs, o[i].batch).call(o[i].scope, data || obj.records, o[i].rs, true);
                    }
                }
                if (Ext.isFunction(callback)) {
                    callback.call(this, 'save', o, obj);
                } else {
                    Ext.Msg.alert(__commonMessages['Information'], __commonMessages['Save successfully']);
                }
            }
            loadMask.hide();
        },
        failure: function (response, opts) {
            var obj = Ext.decode(response.responseText);
            if (isGridNotEmpty) {
                for (var i = 0; i < gridPanels.length; i++) {
                    var store = gridPanels[i].getStore();
                    store.fireEvent('exception', store, 'response', 'save', undefined, response);
                }
            }
            if (Ext.isFunction(errorHandler)) {
                errorHandler.call(this, response, opts);
            } else {
                Ext.Msg.alert(obj.title, obj.message);
            }
            loadMask.hide();
        }
    });
};

/*********************************************************************************/