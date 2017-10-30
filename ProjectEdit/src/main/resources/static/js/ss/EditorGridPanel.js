Ext.namespace('Ext.ss.grid');

Ext.ss.grid.EditorGridPanel = function (config) {
    this.addEvents({
        "noSelectRow": true,
        "newRowDataNoComplete": true,
        "saveRowDataNoComplete": true
    });
    Ext.ss.grid.EditorGridPanel.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ss.grid.EditorGridPanel, Ext.grid.EditorGridPanel, {
    lastAutoAddedRecord: undefined,
    initComponent: function () {
        Ext.ss.grid.EditorGridPanel.superclass.initComponent.call(this);
        this.store.grid = this;
    },
    initEvents: function () {
        Ext.ss.grid.EditorGridPanel.superclass.initEvents.call(this);
    },
    getLoadSuccessFn: function (grid, callback, defaultCallback) {
        var successFn = undefined;
        if (Ext.isFunction(callback)) {
            successFn = function (store, records, options) {
                callback.call(grid, store, records, options);
            };
        } else {
            successFn = Ext.isFunction(defaultCallback) ? defaultCallback : Ext.emptyFn;
        }
        return successFn;
    },
    getSaveSuccessFn: function (grid, callback, defaultCallback) {
        var successFn = undefined;
        if (Ext.isFunction(callback)) {
            successFn = function (store, action, result, response, record) {
                callback.call(grid, store, action, result, response, record);
            };
        } else {
            successFn = Ext.isFunction(defaultCallback) ? defaultCallback : Ext.emptyFn;
        }
        return successFn;
    },
    getErrorFn: function (grid, store, errorHandler) {
        var errorFn = undefined;
        if (Ext.isFunction(errorHandler)) {
            errorFn = function (proxy, type, action, options, response, e) {
                if (type == 'response') {
                    response = (response.responseText) ? Ext.decode(response.responseText) : response;
                    errorHandler.call(grid, store, response, options, e);
                } else if (type == 'remote') {
                    errorHandler.call(grid, store, response, options);
                }
            };
        } else {
            errorFn = function (proxy, type, action, options, response, e) {
                if (type == 'response') {
                    response = (response.responseText) ? Ext.decode(response.responseText) : response;
                }
                if(!Ext.isEmpty(response.message)) {
                	Ext.Msg.alert(response.title, response.message);
                } else {
                	Ext.Msg.alert(__commonMessages['Error'], response.statusText);
                }
            };
        }
        return errorFn;
    },
    getDefaultLoadSuccessFn: function (store, records, options) {
        if (records && records.length == 0) {
            Ext.Msg.alert(__commonMessages['Information'], __commonMessages['No data found']);
        }
    },
    getDefaultSaveSuccessFn: function (callback) {
        Ext.Msg.alert(__commonMessages['Information'], __commonMessages['Save successfully'], callback);
    },
    getDefaultRemoveSuccessFn: function (callback) {
        Ext.Msg.alert(__commonMessages['Information'], __commonMessages['Delete successfully'], callback);
    },
    isDirty: function () {
        var store = this.getStore();
        var records = store.getModifiedRecords();
        var selectionModel = this.getSelectionModel();
        if (selectionModel.autoAddRecord === true) {
            var lastRecord = this.lastAutoAddedRecord;
            if (lastRecord && lastRecord.phantom === true) {
                var isAllUndefined = true;
                Ext.iterate(lastRecord.data, function (key, value, obj) {
                    if (!Ext.isEmpty(value) && value != selectionModel.defaultAddRecord[key]) {
                        isAllUndefined = false;
                        return true;
                    }
                });
                if (isAllUndefined) {
                    for (var i = 0; i < records.length; i++) {
                        if (records[i] == lastRecord) {
                            records.splice(i, 1);
                        }
                    }
                }
            }
        }
        var dirty = (records && records.length > 0) ? true : false;
        dirty = dirty || (store.removed && store.removed.length > 0) ? true : false;
        return dirty;
    },
    getPagingToolbar: function () {
        var bbar = this.getBottomToolbar();
        if (bbar) {
            if (bbar.isXType('paging', true)) {
                return bbar;
            } else {
                var paging = bbar.findByType('paging', true)[0];
                if (paging) {
                    return paging;
                }
            }
        }
        return undefined;
    },
    checkRowDataNoComplete: function (store, record, eventName) {
        if (Ext.isFunction(store.isValid)) {
            var valid = store.isValid(false, this);
            if (valid === false) {
                var e = {
                    grid: this
                };
                this.fireEvent(eventName, e);
                return true;
            }
            return false;
        }
        return true;
    },
    processActiveFirstCell: function (newIndex) {
        var grid = this;
        var sm = grid.getSelectionModel();
        var newCell = grid.walkCells(newIndex, 0, 1, sm.acceptsNav, sm);
        if (newCell) {
            var r = newCell[0],
                c = newCell[1],
                ae;
            sm.onEditorSelect(r, -1);
            if (grid.isEditor && grid.editing) {
                ae = grid.activeEditor;
                if (ae && ae.field.triggerBlur) {
                    ae.field.triggerBlur();
                }
            }
            grid.startEditing(r, c, true);
        }
    },
    processActiveLastCell: function (newIndex) {
        var grid = this;
        var sm = grid.getSelectionModel();
        var columns = grid.getColumnModel().getColumnCount(true);
        var newCell = grid.walkCells(newIndex, columns - 1, -1, sm.acceptsNav, sm);
        if (newCell) {
            var r = newCell[0],
                c = newCell[1],
                ae;
            sm.onEditorSelect(r, -1);
            if (grid.isEditor && grid.editing) {
                ae = grid.activeEditor;
                if (ae && ae.field.triggerBlur) {
                    ae.field.triggerBlur();
                }
            }
            grid.startEditing(r, c, true);
        }
    },
    add: function (records, callback) {
        var grid = this,
            store = grid.getStore(),
            defaultValue = {}, paging = grid.getPagingToolbar(),
            isPaging = (paging instanceof Ext.PagingToolbar),
            sm = grid.getSelectionModel();

        if (grid.checkRowDataNoComplete(store, records, 'newRowDataNoComplete')) {
            return;
        }

        if (Ext.isEmpty(records)) {
            records = [{}];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        var checkField = store.fields.items;
        for (var i = 0; i < checkField.length; i++) {
            defaultValue[checkField[i].name] = null;
        }

        for (var i = 0; i < records.length; i++) {
            records[i] = Ext.value(records[i], {});
            Ext.applyIf(records[i], defaultValue);
            records[i] = new store.recordType(records[i]);
        }
        if (sm.autoAddRecord === true && records.length === 1) {
            grid.lastAutoAddedRecord = records[0];
        }
        store.add(records, isPaging);

//        if (isPaging) {
//        	var total = grid.store.getTotalCount() + records.length,
//                extra = total % paging.pageSize,
//                cursor = extra ? (total - extra) : total - paging.pageSize;
////            var prmXaction = grid.store.baseParams.xaction;
////                grid.store.baseParams.xaction = 'read';
//            paging.doLoad(cursor, {
//                callback: function () {
//                    grid.processActiveFirstCell(grid.store.getCount() - 1);
//                    if (Ext.isFunction(callback)) {
//                        callback.call(this);
//                    }
////                	 grid.store.baseParams.xaction = prmXaction;
//                },
//                scope: this
//            });
//            return;
        
        grid.getView().refresh(false);
        
        grid.processActiveFirstCell(grid.store.getCount() - 1);
        if (Ext.isFunction(callback)) {
            callback.call(this);
        }
    },
    insert: function (index, records, callback) {
        var grid = this,
            store = grid.getStore(),
            defaultValue = {}, paging = grid.getPagingToolbar(),
            isPaging = (paging instanceof Ext.PagingToolbar),
            sm = grid.getSelectionModel();

        if (grid.checkRowDataNoComplete(store, records, 'newRowDataNoComplete')) {
            return;
        }

        if (Ext.isEmpty(records)) {
            records = [{}];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        var checkField = store.fields.items;
        for (var i = 0; i < checkField.length; i++) {
            defaultValue[checkField[i].name] = '';
        }

        for (var i = 0; i < records.length; i++) {
            records[i] = Ext.value(records[i], {});
            Ext.applyIf(records[i], defaultValue);
            records[i] = new store.recordType(records[i]);
        }

        store.insert(index, records, isPaging);

        if (isPaging) {
            var total = index,
                extra = total % paging.pageSize,
                cursor = extra ? (total - extra) : total - paging.pageSize;
            paging.doLoad(cursor, {
                callback: function () {
                    grid.processActiveFirstCell(index);
                    if (Ext.isFunction(callback)) {
                        callback.call(this);
                    }
                },
                scope: this
            });
            return;
        } else {
            grid.getView().refresh(false);
        }

        grid.processActiveFirstCell(index);
        if (Ext.isFunction(callback)) {
            callback.call(this);
        }
    },
    isLoaded: function () {
        return !!this.getStore().isLoaded;
    },
    load: function (parameters, callback, errorHandler) {
        var grid = this,
            store = grid.getStore(),
            params = {};
        if (parameters && parameters[store.getLoadedParam()] === false) {
            return;
        }

        store.rejectChanges();
        store.isLoaded = true;
        params[store.getLoadedParam()] = store.isLoaded;
        Ext.apply(params, parameters);
        Ext.apply(store.baseParams, params);

        var successFn = grid.getLoadSuccessFn(grid, callback, grid.getDefaultLoadSuccessFn);
        store.addListener('load', successFn);
        var errorFn = grid.getErrorFn(grid, store, errorHandler);
        store.addListener('exception', errorFn);

        var storeLoad = function (r, options, success) {
            store.removeListener('load', successFn);
            delete successFn;
            store.removeListener('exception', errorFn);
            delete errorFn;
        };

        var paging = grid.getPagingToolbar();
        if (paging) {
            var p = paging.getParams();
            if (Ext.isEmpty(params[p.start]) || Ext.isEmpty(params[p.limit])) {
                paging.doLoad(0, {
                    callback: storeLoad,
                    scope: this
                });
                return;
            }
        }

        store.load({
            params: params,
            callback: storeLoad
        });
    },
    save: function (parameters, callback, errorHandler) {
        var grid = this,
            store = grid.getStore(),
            params = {};
        Ext.apply(params, parameters);
        Ext.apply(store.baseParams, params);
        var selectionModel = this.getSelectionModel();
        if (selectionModel.autoAddRecord === true) {
            var lastRecord = grid.lastAutoAddedRecord;
            if (lastRecord && lastRecord.phantom === true) {
                var isAllUndefined = true;
                Ext.iterate(lastRecord.data, function (key, value, obj) {
                    if (!Ext.isEmpty(value) && value != selectionModel.defaultAddRecord[key]) {
                        isAllUndefined = false;
                        return true;
                    }
                });
                if (isAllUndefined) {
                    store.remove(lastRecord);
                }
            }
        }

        var successFn = grid.getSaveSuccessFn(grid, callback, grid.getDefaultSaveSuccessFn);
        var errorFn = grid.getErrorFn(grid, store, errorHandler);

        store.addListener('write', successFn);
        store.addListener('exception', errorFn);

        var saveFn = function (store, batch, data) {
            store.removeListener('write', successFn);
            delete successFn;
            store.removeListener('exception', errorFn);
            delete errorFn;
            store.removeListener('save', saveFn);
            delete saveFn;
        };
        store.addListener('save', saveFn);
        store.save(grid);
    },
    remove: function (parameters, callback, errorHandler) {
        var grid = this,
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            records = undefined;
        if (sm.hasSelection()) {
            records = sm.getSelections();
        } else {
            if (grid.hasListener('noSelectRow')) {
                var e = {
                    grid: grid,
                    cancel: false
                };
                grid.fireEvent('noSelectRow', e);
            } else {
                Ext.Msg.show({
                    title: __commonMessages['Warning'],
                    msg: __commonMessages['Please select at least one record.'],
                    buttons: Ext.Msg.OK
                });
            }
            return;
        }

        Ext.Msg.show({
            title: __commonMessages['Confirm'],
            msg: __commonMessages['Confirm to delete ?'],
            buttons: Ext.Msg.OKCANCEL,
            fn: function (btn) {
                if (btn == 'ok') {
                    try {
                        var length = 1;
                        if (Ext.isArray(records)) {
                            length = records.length;
                        } else {
                            records = [records];
                        }

                        var paging = grid.getPagingToolbar();

                        if (store.removeAndSave === true) {
                            store.removeRecords = [];
                            for (var i = 0; i < records.length; i++) {
                                if (!records[i].phantom) {
                                    store.removeRecords.push(records[i]);
                                } else {
                                    store.remove(records, true);
                                }
                            }
                        } else {
                            store.remove(records, true);
                        }

//                        if (paging) {
//                            var successFn = grid.getLoadSuccessFn(grid, callback, (store.removeAndSave) ? grid.getDefaultRemoveSuccessFn : undefined);
//                            store.addListener('load', successFn);
//                            var errorFn = grid.getErrorFn(grid, store, errorHandler);
//                            store.addListener('exception', errorFn);
//
//                            var options = {
//                                params: Ext.apply({xaction:'read'}, parameters),
//                                callback: function (r, options, success) {
//                                    store.removeListener('load', successFn);
//                                    delete successFn;
//                                    store.removeListener('exception', errorFn);
//                                    delete errorFn;
//                                    if (store.removeAndSave === true) {
//                                        if (success === true) {
//                                            if (Ext.isArray(store.removeRecords)) {
//                                                for (var i = 0; i < store.removeRecords.length; i++) {
//                                                    if (store.modified.indexOf(store.removeRecords[i]) != -1) {
//                                                        store.modified.remove(store.removeRecords[i]);
//                                                    }
//                                                }
//                                                store.removeRecords.splice(0, store.removeRecords.length);
//                                                store.lastOptions.params[store.getRemoveAndSaveParam()] = undefined;
//                                                var p = store.storeId + '_json' + Ext.util.Format.capitalize('destroy') + 'Records';
//                                                store.lastOptions.params[p] = undefined;
//                                            }
//                                        }
//                                    }
//                                }
//                            };
//
//                            options[store.getRemoveAndSaveParam()] = Ext.value(store.removeAndSave, false);
//                            paging.doRefreshOnRemove(length, options);
//                        } else {
                            var oldXaction = store.baseParams.xaction;
                            Ext.apply(store.baseParams, parameters);
                            if (store.removeAndSave === true) {
                                var successFn = grid.getSaveSuccessFn(grid, callback, grid.getDefaultRemoveSuccessFn);
                                var errorFn = grid.getErrorFn(grid, store, errorHandler);

                                store.addListener('write', successFn);
                                store.addListener('exception', errorFn);

                                var saveFn = function (store, batch, data, success) {
                                    store.removeListener('write', successFn);
                                    delete successFn;
                                    store.removeListener('exception', errorFn);
                                    delete errorFn;
                                    store.removeListener('save', saveFn);
                                    delete saveFn;
                                    if (success == true) {
                                        if (Ext.isArray(store.removeRecords)) {
                                            for (var i = 0; i < store.removeRecords.length; i++) {
                                                if (store.modified.indexOf(store.removeRecords[i]) != -1) {
                                                    store.modified.remove(store.removeRecords[i]);
                                                }
                                            }
                                            store.removeRecords.splice(0, store.removeRecords.length);
                                            store.lastOptions.params[store.getRemoveAndSaveParam()] = undefined;
                                            var p = store.storeId + '_json' + Ext.util.Format.capitalize('destroy') + 'Records';
                                            store.lastOptions.params[p] = undefined;
                                        }

                                        store.remove(records, true);
                                        store.removed = [];
                                        store.baseParams.xaction = oldXaction;
                                        grid.getView().refresh(false);
                                    }
                                };
                                store.addListener('save', saveFn);
                                delete store.baseParams.xaction;
                                store.saveOnlyRemoveRecords(grid);
                            } else {
                                grid.getView().refresh(false);
                                if (Ext.isFunction(callback)) {
                                    callback.call(grid, store, records);
                                }
                            }
//                        }
                    } catch (e) {
                        if (Ext.isFunction(errorHandler)) {
                            errorHandler.call(grid, store, records, undefined, e);
                        } else {
                            Ext.Msg.alert(__commonMessages['Error'], e);
                        }
                    }
                }
            }
        });
    },
    clear: function () {
    	var sm = this.getSelectionModel();
    	if(sm) {
    		if(Ext.isFunction(sm.clearSelections)) {
    			sm.clearSelections();
    		}
    		if(Ext.isFunction(sm.clearHighlightSelections)) {
    			sm.clearHighlightSelections();
    		}
    	}
    	this.getStore().rejectChanges();
        this.getStore().loadData({
            records: [],
            success: true,
            total: 0
        });
    },
    startEditing: function (row, col, doNotFireBeforeEdit) {
        this.stopEditing();
        if (this.colModel.isCellEditable(col, row)) {
            this.view.ensureVisible(row, col, true);
            var r = this.store.getAt(row),
                field = this.colModel.getDataIndex(col),
                e = {
                    grid: this,
                    record: r,
                    field: field,
                    value: r.data[field],
                    row: row,
                    column: col,
                    cancel: false
                }, process = true;
            if (doNotFireBeforeEdit !== true) {
                process = (this.fireEvent("beforeedit", e) !== false && !e.cancel);
            }

            if (process) {
                this.editing = true;
                var ed = this.colModel.getCellEditor(col, row);
                if (!ed) {
                    return;
                }
                if (!ed.rendered) {
                    ed.parentEl = this.view.getEditorParent(ed);
                    ed.on({
                        scope: this,
                        render: {
                            fn: function (c) {
                                c.field.focus(false, true);
                            },
                            single: true,
                            scope: this
                        },
                        specialkey: function (field, e) {
                            this.getSelectionModel().onEditorKey(field, e);
                        },
                        complete: this.onEditComplete,
                        canceledit: this.stopEditing.createDelegate(this, [true])
                    });
                }
                Ext.apply(ed, {
                    row: row,
                    col: col,
                    record: r
                });
                this.lastEdit = {
                    row: row,
                    col: col
                };
                this.activeEditor = ed;
                // Set the selectSameEditor flag if we are reusing the same editor again and
                // need to prevent the editor from firing onBlur on itself.
                ed.selectSameEditor = (this.activeEditor == this.lastActiveEditor);
                var v = this.preEditValue(r, field);

                if (ed.field.isXType('ss-combobox')) {
                    var combo = ed.field;
                    var rc = combo.findRecord(combo.valueField, v);
                    if (!rc) {
                        var value = r.get(combo.valueField);
                        var display = r.get(combo.displayField);
                        var description = r.get(combo.descriptionField);
                        if (!Ext.isEmpty(value) && !Ext.isEmpty(display) && !Ext.isEmpty(description)) {
                            var store = combo.getStore();
                            store.add(new store.recordType(r.data));
                            delete combo.lastQuery;
                        }
                    }
                }

                ed.startEdit(this.view.getCell(row, col).firstChild, Ext.isDefined(v) ? v : '');

                // Clear the selectSameEditor flag
                (function () {
                    delete ed.selectSameEditor;
                }).defer(50);
            }
        }
    }
});
Ext.reg('ss-editorgrid', Ext.ss.grid.EditorGridPanel);