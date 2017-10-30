var EXIMComboBox = function () {
    var resolveConfig = function (defaultConfig, config) {
        if (config) {
            if (config.store) {
                if (config.store.baseParams) {
                    Ext.apply(defaultConfig.store.baseParams,
                    config.store.baseParams);
                    delete config.store.baseParams;
                }
                Ext.apply(defaultConfig.store, config.store);
                delete config.store;
            }

            if (config.listeners) {
                if (!defaultConfig.listeners) {
                    defaultConfig.listeners = {};
                }

                for (var p in config.listeners) {
                    if (p) {
                        if (Ext.isFunction(defaultConfig.listeners[p]) && Ext.isFunction(config.listeners[p])) {
                            defaultConfig.listeners[p] = defaultConfig.listeners[p]
                                .createSequence(config.listeners[p]);
                        } else {
                            defaultConfig.listeners[p] = config.listeners[p];
                        }
                    }
                }

                delete config.listeners;
            }

            Ext.apply(defaultConfig, config);
        }
        return defaultConfig;
    };

    var getMessageConfig = function (id, config, valueField, displayField,
    method) {
        var defaultConfig = {
            id: id,
            mode: 'remote',
            valueField: valueField,
            displayField: displayField,
            triggerAction: 'all',
            minChars: 0,
            forceSelection: true,
            useOriginalTpl: true,
            showDescription: false,
            store: {
                xtype: 'jsonstore',
                storeId: id + '-store',
                idProperty: valueField,
                fields: [valueField, displayField],
                url: application.contextPath + '/combobox.html',
                baseParams: {
                    method: method
                }
            }
        };
        return resolveConfig(defaultConfig, config);
    };

    var template = {
        tpl1: function (header, detail1, detail2, detail3) {
            return new Ext.XTemplate('<tpl for="."><div class="search-item">',
                '<div class="borderCombo">', '<h3><span>' + header + '</span></h3>', '<br>' + detail1, '<br>' + detail2, '<br>' + detail3, '</div></div></tpl>');
        }
    };

    return {
        getMessageType: function (id, config) {
            return new Ext.ss.form.ComboBox(getMessageConfig(id, config, 'code', 'desc', 'messageType'));
        },
        getTdExternalCourseStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdExternalCourseStatusId',
                displayField: 'tdExternalCourseStatusDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdExternalCourseStatusId',
                    fields: ['tdExternalCourseStatusId',
                            'tdExternalCourseStatusDesc'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdExternalCourseStatusComboBox'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdTrainingResult: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdTrainingResultId',
                displayField: 'tdTrainingResultDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdTrainingResultId',
                    fields: ['tdTrainingResultId', 'tdTrainingResultDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdTrainingResult'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCommonYear: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                width: 70,
                forceSelection: true,
                valueField: 'year',
                displayField: 'yearDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                value: application.currentFullYear,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'year',
                    fields: ['year', 'yearDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'commonYear'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCommonStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                width: 70,
                forceSelection: true,
                valueField: 'statusId',
                displayField: 'statusDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'statusId',
                    fields: ['statusId', 'statusDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'commonStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEvaluationLineStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                width: 70,
                forceSelection: true,
                valueField: 'statusId',
                displayField: 'statusDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'statusId',
                    fields: ['statusId', 'statusDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'evaluationLineStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEvaluationLine: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'evaluationLineId',
                displayField: 'evaluationLineName',
                descriptionField: 'evaluationLineName',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'evaluationLineId',
                    fields: ['evaluationLineId', 'evaluationLineName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'evaluationLine'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
     // หน่วยงาน
        getTdDivisionExpend: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'divisionId',
                displayField: 'divisionDesc',
                descriptionField: 'divisionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{divisionId}" class="x-combo-list-item">{divisionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'divisionId',
                    fields: ['divisionId', 'divisionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdDivisionExpend'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        // หน่วยงาน
        getDivision: function (id, config, subDivisionId) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                subDivisionId: subDivisionId,
                mode: 'remote',
                valueField: 'divisionId',
                displayField: 'divisionDesc',
                descriptionField: 'divisionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{divisionId}" class="x-combo-list-item">{divisionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'divisionId',
                    fields: ['divisionId', 'divisionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'division'
                    }
                },
                listeners: {
                    'select': function (combo, record, index) {
                        var subDivisionId = combo.subDivisionId;
                        if (Ext.isString(subDivisionId)) {
                            var subDivisionId = Ext.getCmp(subDivisionId);
                            subDivisionId.clearValue();
                        }
                    },
                    'change': function (combo, newValue, oldValue) {
                        var subDivisionId = combo.subDivisionId;
                        if (Ext.isString(subDivisionId)) {
                            var subDivisionId = Ext.getCmp(subDivisionId);
                            subDivisionId.clearValue();
                        }
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDivisionFrom: function (id, config, divisionToId) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                divisionToId: divisionToId,
                mode: 'remote',
                valueField: 'divisionId',
                displayField: 'divisionDesc',
                descriptionField: 'divisionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{divisionId}" class="x-combo-list-item">{divisionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'divisionId',
                    fields: ['divisionId', 'divisionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'divisionFrom'
                    }
                },
                listeners: {
                	'beforequery': function (qe) {
                        var params = {};
                        var divisionToId = qe.combo.divisionToId;
                        if (Ext.isString(divisionToId)) {
                            var divisionTo = Ext.getCmp(divisionToId);
                            Ext.apply(params, {
                            	divisionTo: divisionTo.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDivisionTo: function (id, config, divisionFromId) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                divisionFromId: divisionFromId,
                mode: 'remote',
                valueField: 'divisionId',
                displayField: 'divisionDesc',
                descriptionField: 'divisionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{divisionId}" class="x-combo-list-item">{divisionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'divisionId',
                    fields: ['divisionId', 'divisionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'divisionTo'
                    }
                },
                listeners: {
                	'beforequery': function (qe) {
                        var params = {};
                        var divisionFromId = qe.combo.divisionFromId;
                        if (Ext.isString(divisionFromId)) {
                            var divisionFrom = Ext.getCmp(divisionFromId);
                            Ext.apply(params, {
                            	divisionFrom: divisionFrom.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        // ส่วนงาน
        getSubDivision: function (id, config, divisionId) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                divisionId: divisionId,
                forceSelection: true,
                mode: 'remote',
                valueField: 'subDivisionId',
                displayField: 'subDivisionDesc',
                descriptionField: 'subDivisionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{subDivisionId}" class="x-combo-list-item">{subDivisionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'subDivisionId',
                    fields: ['subDivisionId', 'subDivisionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'subDivision'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var divisionId = qe.combo.divisionId;
                        if (Ext.isString(divisionId)) {
                            var division = Ext.getCmp(divisionId);
                            if (!division.isValid() || Ext.isEmpty(division.getValue())) {
                                Ext.Msg.alert(__commonMessages['Warning'], __commonMessages['message.pleaseInputDivision'], function () {
                                    division.focus();
                                });
                                return false;
                            }
                            Ext.apply(params, {
                                division: division.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPositionGroup: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'positionGroupCode',
                displayField: 'positionGroupName',
                descriptionField: 'positionGroupName',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{positionGroupCode}" class="x-combo-list-item">{positionGroupName}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'positionGroupCode',
                    fields: ['positionGroupCode', 'positionGroupName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'positionGroup'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPositionGroupFrom: function (id, config, positionGroupTo) {
            var defaultConfig = {
                id: id,
                positionGroupTo: positionGroupTo,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'positionGroupCodeFrom',
                displayField: 'positionGroupNameFrom',
                descriptionField: 'positionGroupNameFrom',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{positionGroupCodeFrom}" class="x-combo-list-item">{positionGroupNameFrom}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'positionGroupCodeFrom',
                    fields: ['positionGroupCodeFrom', 'positionGroupNameFrom'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'positionGroupFrom'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var positionGroupTo = qe.combo.positionGroupTo;
                        if (Ext.isString(positionGroupTo)) {
                            var positionGroupTo = Ext.getCmp(positionGroupTo);

                            Ext.apply(params, {
                                positionGroupCodeTo: positionGroupTo.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPositionGroupTo: function (id, config, positionGroupFrom) {
            var defaultConfig = {
                id: id,
                positionGroupFrom: positionGroupFrom,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'positionGroupCodeTo',
                displayField: 'positionGroupNameTo',
                descriptionField: 'positionGroupNameTo',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{positionGroupCodeTo}" class="x-combo-list-item">{positionGroupNameTo}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'positionGroupCodeTo',
                    fields: ['positionGroupCodeTo', 'positionGroupNameTo'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'positionGroupTo'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var positionGroupFrom = qe.combo.positionGroupFrom;
                        if (Ext.isString(positionGroupFrom)) {
                            var positionGroupFrom = Ext.getCmp(positionGroupFrom);

                            Ext.apply(params, {
                                positionGroupCodeFrom: positionGroupFrom.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCaSpecialGrade: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'gradeCode',
                displayField: 'gradeCode',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{gradeDesc}" class="x-combo-list-item">{gradeCode}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'gradeCode',
                    fields: ['gradeCode', 'gradeDesc', 'gradePoint'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'caSpecialGrade'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCaGrade: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'gradeCode',
                displayField: 'gradeCode',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{gradeDesc}" class="x-combo-list-item">{gradeCode}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'gradeCode',
                    fields: ['gradeCode', 'gradeDesc', 'gradePoint'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'caGrade'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPosition: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'positionId',
                displayField: 'positionDesc',
                descriptionField: 'positionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{positionId}" class="x-combo-list-item">{positionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'positionId',
                    fields: ['positionId', 'positionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'position'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPositionFrom: function (id, config, positionToId) {
            var defaultConfig = {
                id: id,
                positionToId: positionToId,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'positionId',
                displayField: 'positionDesc',
                descriptionField: 'positionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{positionId}" class="x-combo-list-item">{positionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'positionId',
                    fields: ['positionId', 'positionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'positionFrom'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var positionToId = qe.combo.positionToId
                        if (Ext.isString(positionToId)) {
                            var positionTo = Ext.getCmp(positionToId);

                            Ext.apply(params, {
                            	positionTo: positionTo.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPositionTo: function (id, config, positionFromId) {
            var defaultConfig = {
                id: id,
                positionFromId: positionFromId,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'positionId',
                displayField: 'positionDesc',
                descriptionField: 'positionDesc',
                showDescription: false,
                useOriginalTpl: true,
                tpl: '<tpl for="."><div ext:qtip="{positionId}" class="x-combo-list-item">{positionDesc}</div></tpl>',
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'positionId',
                    fields: ['positionId', 'positionDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'positionTo'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var positionFromId = qe.combo.positionFromId
                        if (Ext.isString(positionFromId)) {
                            var positionFrom = Ext.getCmp(positionFromId);

                            Ext.apply(params, {
                            	positionFrom: positionFrom.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCaChapter: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'caChapterId',
                displayField: 'caChapterDesc',
                descriptionField: 'caChapterDesc',
                showDescription: true,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'caChapterId',
                    fields: ['caChapterId', 'caChapterDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'caChapter'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEmployee: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                pageSize: 25,
                listWidth: 330,
                forceSelection: true,
                mode: 'remote',
                valueField: 'empId',
                displayField: 'tNameConcat',
                descriptionField: 'tFirstName',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'empId',
                    fields: ['empId', 'tFirstName', 'tLastName', 'divName', 'divCode',
                            'subDivName', 'subDivId', 'positionName',
                            'positionLevelName', 'positionLevelId',
                            'tNameConcat', 'positionId', 'positionGroup',
                            'positionGroupId','emailAddress','ouCode'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'employee'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEmployeeFrom: function (id, config, employeeToId) {
            var defaultConfig = {
                id: id,
                employeeToId: employeeToId,
                triggerAction: 'all',
                minChars: 0,
                pageSize: 25,
                forceSelection: true,
                mode: 'remote',
                valueField: 'empId',
                displayField: 'tNameConcat',
                descriptionField: 'tFirstName',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'empId',
                    fields: ['empId', 'tFirstName', 'divName', 'divCode',
                            'subDivName', 'subDivId', 'positionName',
                            'positionLevelName', 'positionLevelId',
                            'tNameConcat', 'positionId', 'positionGroup',
                            'positionGroupId'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'employeeFrom'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var employeeToId = qe.combo.employeeToId;
                        if (Ext.isString(employeeToId)) {
                            var employeeTo = Ext.getCmp(employeeToId);

                            Ext.apply(params, {
                                employeeTo: employeeTo.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEmployeeTo: function (id, config, employeeFromId) {
            var defaultConfig = {
                id: id,
                employeeFromId: employeeFromId,
                triggerAction: 'all',
                minChars: 0,
                pageSize: 25,
                forceSelection: true,
                mode: 'remote',
                valueField: 'empId',
                displayField: 'tNameConcat',
                descriptionField: 'tFirstName',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'empId',
                    fields: ['empId', 'tFirstName', 'divName', 'divCode',
                            'subDivName', 'subDivId', 'positionName',
                            'positionLevelName', 'positionLevelId',
                            'tNameConcat', 'positionId', 'positionGroup',
                            'positionGroupId'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'employeeTo'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var employeeFromId = qe.combo.employeeFromId;
                        if (Ext.isString(employeeFromId)) {
                            var employeeFrom = Ext.getCmp(employeeFromId);

                            Ext.apply(params, {
                                employeeFrom: employeeFrom.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeFromYear: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'peFromYearId',
                displayField: 'peFromYearDesc',
                descriptionField: 'peFromYearDesc',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'peFromYearId',
                    fields: ['peFromYearId', 'peFromYearDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peFromYear'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeOperationPlan: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'peOperationPlanId',
                displayField: 'peOperationPlanDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'peOperationPlanId',
                    fields: ['peOperationPlanId', 'peOperationPlanDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peOperationPlan'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        // กลุ่ม
        getTdCourseType: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'tdCourseTypeId',
                displayField: 'tdCourseType',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCourseTypeId',
                    fields: ['tdCourseTypeId', 'tdCourseType'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCourseType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        // หมวด
        getTdCourseGroup: function (id, config, courseTypeId) {
            var defaultConfig = {
                id: id,
                courseTypeId: courseTypeId,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'tdCourseGroupId',
                displayField: 'tdCourseGroup',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCourseGroupId',
                    fields: ['tdCourseGroupId', 'tdCourseGroup'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCourseGroup'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var courseTypeId = qe.combo.courseTypeId
                        if (Ext.isString(courseTypeId)) {
                            var courseType = Ext.getCmp(courseTypeId);

                            if (Ext.isEmpty(courseType.getValue())) {
                                return false;
                            }

                            Ext.apply(params, {
                                tdCourseType: courseType.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        // ประเภท
        getTdCourseCatagory: function (id, config, courseGroupId) {
            var defaultConfig = {
                id: id,
                courseGroupId: courseGroupId,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'tdCourseCatagorieId',
                displayField: 'tdCourseCatagorie',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCourseCatagorieId',
                    fields: ['tdCourseCatagorieId', 'tdCourseCatagorie'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCourseCatagorie'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var courseGroupId = qe.combo.courseGroupId
                        if (Ext.isString(courseGroupId)) {
                            var courseGroup = Ext.getCmp(courseGroupId);

                            if (Ext.isEmpty(courseGroup.getValue())) {
                                return false;
                            }

                            Ext.apply(params, {
                                tdCourseGroup: courseGroup.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeFormStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'local',
                valueField: 'peFormStatusId',
                displayField: 'peFormStatus',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'peFormStatusId',
                    fields: ['peFormStatusId', 'peFormStatus'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peFormStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getAndOr: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdAndOrStatusPropertiesId',
                displayField: 'tdAndOrStatusPropertiesDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdAndOrStatusPropertiesId',
                    fields: ['tdAndOrStatusPropertiesId',
                            'tdAndOrStatusPropertiesDesc'
                    ],
                    baseParams: {
                        method: 'andOr'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEverNeverStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdEverNeverStatusPropertiesId',
                displayField: 'tdEverNeverStatusPropertiesDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdEverNeverStatusPropertiesId',
                    fields: ['tdEverNeverStatusPropertiesId',
                            'tdEverNeverStatusPropertiesDesc'
                    ],
                    baseParams: {

                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdCourseStandardOrNormal: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'local',
                valueField: 'tdCourseStandardOrNormalId',
                displayField: 'tdCourseStandardOrNormal',
                descriptionField: 'tdCourseStandardOrNormal',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCourseStandardOrNormalId',
                    fields: ['tdCourseStandardOrNormalId',
                            'tdCourseStandardOrNormal'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCourseStandardOrNormal'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMajorMinor: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'majorOrMinorPropertiesId',
                displayField: 'majorOrMinorPropertiesDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'majorOrMinorPropertiesId',
                    fields: [
                            'majorOrMinorPropertiesId',
                            'majorOrMinorPropertiesDesc'
                    ]
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdBudget: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdBudgetId',
                displayField: 'tdBudgetAccName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdBudgetId',
                    fields: ['tdBudgetId', 'tdBudgetAccName',
                            'defaultBudgetCost'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdBudget'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeEvaluationTpl: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'evaluationTplId',
                displayField: 'tplName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'evaluationTplId',
                    fields: ['evaluationTplId', 'tplName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peEvaluationTpl'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeCopyEvaluationTpl: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'evaluationTplId',
                displayField: 'tplName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'evaluationTplId',
                    fields: ['evaluationTplId', 'tplName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peCopyEvaluationTpl'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeStrategy: function (id, config, operationPlanId) {
            var defaultConfig = {
                id: id,
                operationPlanId: operationPlanId,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'strategyId',
                displayField: 'strategyName',
                descriptionField: 'strategyName',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'strategyId',
                    fields: ['strategyId', 'strategyNo', 'strategyName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peStrategy'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var operationPlanId = qe.combo.operationPlanId;
                        if (Ext.isString(operationPlanId)) {
                            var operationPlan = Ext.getCmp(operationPlanId);

                            Ext.apply(params, {
                                operationPlanId: operationPlan.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeFramework: function (id, config, strategyId) {
            var defaultConfig = {
                id: id,
                strategyId: strategyId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'frameworkId',
                displayField: 'frameworkName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'frameworkId',
                    fields: ['frameworkId', 'frameworkName', 'frameworkNo'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peFramework'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var strategyId = qe.combo.strategyId;
                        if (Ext.isString(strategyId)) {
                            var strategy = Ext.getCmp(strategyId);

                            Ext.apply(params, {
                                strategyId: strategy.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeFrameworkIndicator: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'frameworkIndicatorId',
                displayField: 'indicatorName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'frameworkId',
                    fields: ['frameworkIndicatorId', 'indicatorName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peFrameworkIndicator'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeEvaluationFormPart2: function (id, config, evaluationTplId) {
            var defaultConfig = {
                id: id,
                evaluationTplId: evaluationTplId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'sectionNo',
                displayField: 'sectionNo',
                descriptionField: 'sectionName',
                showDescription: true,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'sectionNo',
                    fields: ['sectionNo', 'sectionName',
                            'evaluationTplIdSction2', 'addable', 'weightSum', 'ordinal'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peEvaluationFormPart2'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var evaluationTplId = qe.combo.evaluationTplId;
                        if (Ext.isString(evaluationTplId)) {
                            var evaluationTpl = Ext.getCmp(evaluationTplId);

                            Ext.apply(params, {
                            	evaluationTplId: evaluationTpl.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeEvaluationFormPart3: function (id, config, evaluationTplId) {
            var defaultConfig = {
                id: id,
                evaluationTplId: evaluationTplId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'sectionNo',
                displayField: 'sectionNo',
                descriptionField: 'sectionName',
                showDescription: true,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'sectionNo',
                    fields: ['sectionNo', 'sectionName',
                            'evaluationTplIdSction3'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peEvaluationFormPart3'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var evaluationTplId = qe.combo.evaluationTplId;
                        if (Ext.isString(evaluationTplId)) {
                            var evaluationTpl = Ext.getCmp(evaluationTplId);

                            Ext.apply(params, {
                            	evaluationTplId: evaluationTpl.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIndicatorStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'indicatorStatusId',
                displayField: 'indicatorStatusDesc',
                descriptionField: 'indicatorStatusDesc',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'indicatorStatusId',
                    fields: ['indicatorStatusId', 'indicatorStatusDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'indicatorStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));

        },
        getInternalCourse: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'courseCode',
                displayField: 'courseCode',
                descriptionField: 'courseName',
                showDescription: true,
                // useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'courseCode',
                    fields: ['courseCode','courseName','courseStructure','courseObjective'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'internalCourse'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getInternalCourseFrom: function (id, config, InternalCourseToId) {
            var defaultConfig = {
                id: id,
                InternalCourseToId: InternalCourseToId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'courseCode',
                displayField: 'courseCode',
                descriptionField: 'courseName',
                showDescription: true,
                // useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'courseCode',
                    fields: ['courseCode', 'courseName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'internalCourseFrom'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var InternalCourseToId = qe.combo.InternalCourseToId;
                        if (Ext.isString(InternalCourseToId)) {
                            var InternalCourseTo = Ext.getCmp(InternalCourseToId);

                            Ext.apply(params, {
                                InternalCourseTo: InternalCourseTo.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getInternalCourseTo: function (id, config, InternalCourseFromId) {
            var defaultConfig = {
                id: id,
                InternalCourseFromId: InternalCourseFromId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'courseCode',
                displayField: 'courseCode',
                descriptionField: 'courseName',
                showDescription: true,
                // useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'courseCode',
                    fields: ['courseCode', 'courseName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'internalCourseTo'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var InternalCourseFromId = qe.combo.InternalCourseFromId;
                        if (Ext.isString(InternalCourseFromId)) {
                            var InternalCourseFrom = Ext.getCmp(InternalCourseFromId);

                            Ext.apply(params, {
                                InternalCourseFrom: InternalCourseFrom.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdBatch: function (id, config, courseCodeId, yearId) {
            var defaultConfig = {
                id: id,
                courseCodeId: courseCodeId,
                yearId: yearId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'batchId',
                displayField: 'batchDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'batchId',
                    fields: ['batchId', 'batchDesc', 'amountPerson',
                            'trainingStartDate', 'trainingEndDate', 'ouCode'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdBatch'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var courseCodeId = qe.combo.courseCodeId;
                        if (Ext.isString(courseCodeId)) {
                            var courseCode = Ext.getCmp(courseCodeId);

                            if (Ext.isEmpty(courseCode.getValue())) {
                                qe.combo.clearValue();
                                return false;
                            }

                            Ext.apply(params, {
                                courseCode: courseCode.getValue()
                            });
                        }
                        
                        var yearId = qe.combo.yearId;
                        if (Ext.isString(yearId)) {
                            var year = Ext.getCmp(yearId);

                            if (Ext.isEmpty(year.getValue())) {
                                qe.combo.clearValue();
                                return false;
                            }

                            Ext.apply(params, {
                            	year: year.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdBatchFrom: function (id, config, batchToId, courseCodeId) {
            var defaultConfig = {
                id: id,
                batchToId: batchToId,
                courseCodeId: courseCodeId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'batchId',
                displayField: 'batchDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'batchId',
                    fields: ['batchId', 'batchDesc', 'amountPerson',
                            'trainingStartDate', 'trainingEndDate', 'ouCode'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdBatchFrom'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var batchToId = qe.combo.batchToId;
                        if (Ext.isString(batchToId)) {
                            var batchTo = Ext.getCmp(batchToId);

                            Ext.apply(params, {
                                batchTo: batchTo.getValue()
                            });
                        }

                        var courseCodeId = qe.combo.courseCodeId;
                        if (Ext.isString(courseCodeId)) {
                            var courseCode = Ext.getCmp(courseCodeId);

                            if (Ext.isEmpty(courseCode.getValue())) {
                                qe.combo.clearValue();
                                return false;
                            }

                            Ext.apply(params, {
                                courseCode: courseCode.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdBatchTo: function (id, config, batchFromId, courseCodeId) {
            var defaultConfig = {
                id: id,
                batchFromId: batchFromId,
                courseCodeId: courseCodeId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'batchId',
                displayField: 'batchDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'batchId',
                    fields: ['batchId', 'batchDesc', 'amountPerson',
                            'trainingStartDate', 'trainingEndDate', 'ouCode'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdBatchTo'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var batchFromId = qe.combo.batchFromId;
                        if (Ext.isString(batchFromId)) {
                            var batchFrom = Ext.getCmp(batchFromId);

                            Ext.apply(params, {
                                batchFrom: batchFrom.getValue()
                            });
                        }

                        var courseCodeId = qe.combo.courseCodeId;
                        if (Ext.isString(courseCodeId)) {
                            var courseCode = Ext.getCmp(courseCodeId);

                            if (Ext.isEmpty(courseCode.getValue())) {
                                qe.combo.clearValue();
                                return false;
                            }

                            Ext.apply(params, {
                                courseCode: courseCode.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCaFormStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'local',
                valueField: 'caFormStatusId',
                displayField: 'caFormStatusDesc',
                descriptionField: 'caFormStatusDesc',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'caFormStatusId',
                    fields: ['caFormStatusId', 'caFormStatusDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'caFormStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getQuarter: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'quarter',
                displayField: 'quarterField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'quarter',
                    fields: ['quarter', 'quarterField']

                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCaEvaluationTemplate: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'caEvaluationTemplateId',
                displayField: 'caEvaluationTemplateDesc',
                descriptionField: 'caEvaluationTemplateDesc',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'caEvaluationTemplateId',
                    fields: ['caEvaluationTemplateId',
                            'caEvaluationTemplateDesc'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'caEvaluationTemplate'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIdDevelopMethodProperties: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'idDevelopmehtodId',
                displayField: 'idDevelopmehtodDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'idDevelopmehtodId',
                    fields: ['idDevelopmehtodId', 'idDevelopmehtodDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'idDevelopmehtod'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIdHaveBudgetProperties: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'idHaveBudgetId',
                displayField: 'idHaveBudgetDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'idHaveBudgetId',
                    fields: ['idHaveBudgetId', 'idHaveBudgetDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'idHaveBudget'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdInternalStandardCourseComboBox: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'courseCode',
                displayField: 'courseName',
                descriptionField: 'courseName',
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'courseCode',
                    fields: ['courseCode',
                            'courseName', 'typeClassCode',
                            'groupClassCode', 'categoryClassCode',
                            'evaluateMethod', 'courseObjective',
                            'courseStructure'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdInternalStandardCourseComboBox'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMonthly: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'monthly',
                displayField: 'monthlyField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'monthly',
                    fields: ['monthly', 'monthlyField']
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdInternalStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdInternalStatusId',
                displayField: 'tdInternalStatus',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdInternalStatusId',
                    fields: ['tdInternalStatusId', 'tdInternalStatus'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdInternalStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdHourTime: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'hourTimeId',
                displayField: 'hourTimeName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'hourTimdId',
                    fields: ['hourTimeId', 'hourTimeName', 'amountHour'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdHourTime'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdExpendType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'expendTypeId',
                displayField: 'typeName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'expendTypeId',
                    fields: ['expendTypeId', 'typeName', 'cutOffAccount'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdExpendType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdExpend: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'expendId',
                displayField: 'expendName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'expendId',
                    fields: ['expendId', 'expendName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdExpend'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdRoiType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'typeId',
                displayField: 'typeName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'typeId',
                    fields: ['typeId', 'typeName', 'otherType'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdRoiType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIdFormStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'local',
                valueField: 'idFormStatusId',
                displayField: 'idFormStatus',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'idFormStatusId',
                    fields: ['idFormStatusId', 'idFormStatus'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'idFormStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdTrainingType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdTrainingTypeId',
                displayField: 'tdTrainingTypeDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdTrainingTypeId',
                    fields: ['tdTrainingTypeId', 'tdTrainingTypeDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdTrainingType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdCutOffAccount: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdCutOffAccountId',
                displayField: 'tdCutOffAccountDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCutOffAccountId',
                    fields: ['tdCutOffAccountId', 'tdCutOffAccountDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCutOffAccount'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdWorkPeriod: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'local',
                valueField: 'workPeriodId',
                displayField: 'workPeriodName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'workPeriodId',
                    fields: ['workPeriodId', 'workPeriodName','yearFrom', 'yearTo'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'workPeriod'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getStatusCheck: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'statusCheckField',
                displayField: 'statusCheckField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'statusCheck',
                    fields: ['statusCheckField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'statusCheck'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIdFormYear: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'yearField',
                displayField: 'yearDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'yearField',
                    fields: ['yearField', 'yearDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'idFormYear'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIdDevelopFactorDevelopCompetencyComboBox: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'developFactorId',
                displayField: 'developFactorCode',
                descriptionField: 'developFactorName',
                showDescription: false,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'developFactorId',
                    fields: ['developFactorId', 'developFactorCode', 'developFactorName',
                            'evaluationFormDetailId'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'idDevelopFactorDevelopCompetencyComboBox'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIdDevelopFactorMoreCompetencyComboBox: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'developFactorId',
                displayField: 'developFactorCode',
                descriptionField: 'developFactorName',
                showDescription: false,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'developFactorId',
                    fields: ['developFactorId', 'developFactorCode', 'developFactorName','evaluationTplId','chapterCode','topicCode'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'idDevelopFactorMoreCompetencyComboBox'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdBatchYear: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'tdBatchYearValue',
                displayField: 'tdBatchYearDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdBatchYearValue',
                    fields: ['tdBatchYearValue', 'tdBatchYearDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdBatchYearComboBox'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdBudgetDivision: function (id, config, budgetId) {
            var defaultConfig = {
                id: id,
                budgetId: budgetId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'divisionCode',
                displayField: 'budgetDivisionName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'divisionCode',
                    fields: ['budgetDivisionName', 'divisionCode'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'budgetDivision'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var budgetId = qe.combo.budgetId
                        if (Ext.isString(budgetId)) {
                            var budget = Ext.getCmp(budgetId);
                            Ext.apply(params, {
                            	budgetId: budget.getValue()
                            });
                        }
                        
                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdEvaluationForm: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'tdEvaluationFormId',
                displayField: 'formCode',
                descriptionField: 'formName',
                showDescription: true,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdEvaluationFormId',
                    fields: ['tdEvaluationFormId', 'formCode', 'formName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdEvaluationForm'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdCoreCourse: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdCoreCourseId',
                displayField: 'tdCoreCourseDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCoreCourseId',
                    fields: ['tdCoreCourseId', 'tdCoreCourseDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCoreCourse'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getGbWorkLine: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'lineId',
                displayField: 'lineName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'lineId',
                    fields: ['lineId', 'lineName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'gbWorkLine'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getBfhHospital: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                width : 100,
                forceSelection: false,
                valueField: 'hospitalId',
                displayField: 'hospitalDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth : 230,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'hospitalId',
                    fields: ['hospitalId', 'hospitalDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'bfhHospital'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getBfhIdpAndDentalListType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'idpAndDentalListTypeId',
                displayField: 'idpAndDentalListTypeDescAndUnit',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth : 650,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'idpAndDentalListTypeId',
                    fields: ['idpAndDentalListTypeId', 'idpAndDentalListTypeDesc','type','moneyWithdrawRights','unit','idpAndDentalListTypeDescAndUnit'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'bfhIdpAndDentalListType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdLecturerType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdLecturerTypeId',
                displayField: 'tdLecturerTypeDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdLecturerTypeId',
                    fields: ['tdLecturerTypeId', 'tdLecturerTypeDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'lecturerType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdCourseInternalActive: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'tdCourseInternalActiveId',
                displayField: 'tdCourseInternalActiveDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'tdCourseInternalActiveId',
                    fields: ['tdCourseInternalActiveId',
                            'tdCourseInternalActiveDesc'
                    ],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdCourseInternalActive'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTdPresentationMethod: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'presentationMethodId',
                displayField: 'presentationMethodName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'presentationMethodId',
                    fields: ['presentationMethodId', 'presentationMethodName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'tdPresentationMethod'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEmailStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'emailStatusId',
                displayField: 'emailStatusField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'emailStatusId',
                    fields: ['emailStatusId', 'emailStatusField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'emailStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeObjectiveStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'peObjectiveStatusId',
                displayField: 'peObjectiveStatusField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'peObjectiveStatusId',
                    fields: ['peObjectiveStatusId', 'peObjectiveStatusField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'peObjectiveStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getGap: function (id, config, yearId) {
            var defaultConfig = {
                id: id,
                yearId: yearId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'gapValue',
                displayField: 'gapDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'gapValue',
                    fields: ['gapValue', 'gapDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'gap'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var yearId = qe.combo.yearId
                        if (Ext.isString(yearId)) {
                            var year = Ext.getCmp(yearId);
                            Ext.apply(params, {
                                year: year.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getGapFrom: function (id, config, yearId, gapToId) {
            var defaultConfig = {
                id: id,
                yearId: yearId,
                gapToId: gapToId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'gapValue',
                displayField: 'gapDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'gapValue',
                    fields: ['gapValue', 'gapDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'gapFrom'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var yearId = qe.combo.yearId
                        if (Ext.isString(yearId)) {
                            var year = Ext.getCmp(yearId);
                            Ext.apply(params, {
                                year: year.getValue()
                            });
                        }
                        
                        var gapToId = qe.combo.gapToId
                        if (Ext.isString(gapToId)) {
                            var gapTo = Ext.getCmp(gapToId);
                            Ext.apply(params, {
                            	gapTo: gapTo.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getGapTo: function (id, config, yearId, gapFromId) {
            var defaultConfig = {
                id: id,
                yearId: yearId,
                gapFromId: gapFromId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'gapValue',
                displayField: 'gapDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'gapValue',
                    fields: ['gapValue', 'gapDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'gapTo'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};

                        var yearId = qe.combo.yearId
                        if (Ext.isString(yearId)) {
                            var year = Ext.getCmp(yearId);
                            Ext.apply(params, {
                                year: year.getValue()
                            });
                        }
                        
                        var gapFromId = qe.combo.gapFromId
                        if (Ext.isString(gapFromId)) {
                            var gapFrom = Ext.getCmp(gapFromId);
                            Ext.apply(params, {
                            	gapFrom: gapFrom.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getAttachment: function (id, config, system, refId) {
            var defaultConfig = {
                id: id,
                system: system,
                refId: refId,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'attachmentId',
                displayField: 'attachmentName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'attachmentId',
                    fields: ['attachmentId', 'attachmentName', 'attachmentRawId'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'attachment'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {
                            system: qe.combo.system
                        };

                        var refId = qe.combo.refId
                        if (Ext.isString(refId)) {
                            var ref = Ext.getCmp(refId);
                            Ext.apply(params, {
                                ref: ref.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getStatusCommander: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'statusCommander',
                displayField: 'statusCommanderField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'statusCommander',
                    fields: ['statusCommander', 'statusCommanderField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'statusCommander'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEvaluableStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                mode: 'remote',
                valueField: 'evaluableStatus',
                displayField: 'evaluableStatusField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'evaluableStatus',
                    fields: ['evaluableStatus', 'evaluableStatusField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'evaluableStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getApprovalResult: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'approvalResultId',
                displayField: 'approvalResultField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'approvalResultId',
                    fields: ['approvalResultId', 'approvalResultField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'approval'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPreName: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'preNameId',
                displayField: 'preNameDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'preNameId',
                    fields: ['preNameId', 'preNameDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'preName'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPastConscription: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'pastConscriptionId',
                displayField: 'pastConscriptionField',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'nameTitleId',
                    fields: ['pastConscriptionId', 'pastConscriptionField'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'pastConscription'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getLoanType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'loanTypeId',
                displayField: 'loanTypeId',
                descriptionField: 'loanTypeName',
                showDescription: true,
                useOriginalTpl: false,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'loanTypeId',
                    fields: ['loanTypeId', 'loanTypeName' , 'mainTypeId', 'rate', 'maxAmount', 'minAmount',
                             'loanPeriod', 'loanYear', 'loanAmountLimited', 'loanMaxAmount', 'ageWorkMin'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'loanType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getTaxStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'taxStatusDisplay',
                displayField: 'taxStatusDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'taxStatusDisplay',
                    fields: ['taxStatus', 'taxStatusDisplay' ,'requestId', 'requestDate'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'taxStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getChildSequence: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'childSequence',
                displayField: 'childSequenceDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'childSequence',
                    fields: ['childSequence', 'childSequenceDisplay', 'name', 'degreeId'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'childSequence'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getchildSequenceFamilyType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'childSequenceFamilyType',
                displayField: 'childSequenceFamilyTypeDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'childSequenceFamilyType',
                    fields: ['childSequenceFamilyType', 'childSequenceFamilyTypeDisplay', 'name'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'childSequenceFamilyType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getWithdrawType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'withdrawType',
                displayField: 'withdrawTypeDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth : 100,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'withdrawType',
                    fields: ['withdrawType', 'withdrawTypeDisplay' , 'creditAmt' , 'sumAmt', 'approveAmt' , 'drawerOriginal','withdrawDrawerId','withdrawEmpId','withdrawOuCode'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'withdrawType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDiseaseGroup: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'diseaseGroup',
                displayField: 'diseaseGroupDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth : 200,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'diseaseGroup',
                    fields: ['diseaseGroup', 'diseaseGroupDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'diseaseGroup'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMarriageStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'marriageStatus',
                displayField: 'marriageStatusDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'marriageStatus',
                    fields: ['marriageStatus', 'marriageStatusDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'marriageStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getGender: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'gender',
                displayField: 'genderDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'gender',
                    fields: ['gender', 'genderDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'gender'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEducationGrade: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'educationGrade',
                displayField: 'educationGradeDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth : 230,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'educationGrade',
                    fields: ['educationGrade', 'educationGradeDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'educationGrade'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        }, 
        getSubEducationGrade: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'subEducationGrade',
                displayField: 'subEducationGradeDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'subEducationGrade',
                    fields: ['subEducationGrade', 'subEducationGradeDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'subEducationGrade'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDrawer: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'drawer',
                displayField: 'drawerDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'drawer',
                    fields: ['drawer', 'drawerDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'drawer'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEducationType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'educationType',
                displayField: 'educationTypeDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'educationType',
                    fields: ['educationType', 'educationTypeDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'educationType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getEducation: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'education',
                displayField: 'educationDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'education',
                    fields: ['education', 'educationDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'education'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getChildTuition: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'childTuition',
                displayField: 'childTuitionDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'childTuition',
                    fields: ['childTuition', 'childTuitionDisplay', 'drawAmt', 'drawCondition', 'drawRight'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'childTuition'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getAccept: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'accept',
                displayField: 'acceptDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'accept',
                    fields: ['accept', 'acceptDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'accept'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDistrict: function (id, config, provinceId) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                provinceId: provinceId,
                forceSelection: true,
                valueField: 'district',
                displayField: 'districtDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'district',
                    fields: ['district', 'districtDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'district'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var provinceId = qe.combo.provinceId;
                        if (Ext.isString(provinceId)) {
                            var province = Ext.getCmp(provinceId);
                            if (!province.isValid() || Ext.isEmpty(province.getValue())) {
                                Ext.Msg.alert(__commonMessages['Warning'], '[Please Select Province]', function () {
                                	province.focus();
                                });
                                return false;
                            }
                            Ext.apply(params, {
                            	province: province.getValue()
                            });
                        }

                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getSubDistrict: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'subDistrict',
                displayField: 'subDistrictDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'subDistrict',
                    fields: ['subDistrict', 'subDistrictDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'subDistrict'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getProvince: function (id, config, districtId) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                districtId: districtId,
                forceSelection: true,
                valueField: 'province',
                displayField: 'provinceDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'province',
                    fields: ['province', 'provinceDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'province'
                    }
                },
                listeners: {
                    'select': function (combo, record, index) {
                        var districtId = combo.districtId;
                        if (Ext.isString(districtId)) {
                            var districtId = Ext.getCmp(districtId);
                            districtId.clearValue();
                        }
                    },
                    'change': function (combo, newValue, oldValue) {
                        var districtId = combo.districtId;
                        if (Ext.isString(districtId)) {
                            var districtId = Ext.getCmp(districtId);
                            districtId.clearValue();
                        }
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPostcode: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'postcode',
                displayField: 'postcodeDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'postcode',
                    fields: ['postcode', 'postcodeDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'postcode'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPetitionType: function (id, config, requestStatusId) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                requestStatusId: requestStatusId,
                valueField: 'requestTypeId',
                displayField: 'requestTypeName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'requestTypeId',
                    fields: ['requestTypeId', 'requestTypeName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'petitionType'
                    }
                },
                listeners: {
                    'select': function (combo, record, index) {
                        var requestStatusId = combo.requestStatusId;
                        if (Ext.isString(requestStatusId)) {
                            var requestStatusId = Ext.getCmp(requestStatusId);
                            requestStatusId.clearValue();
                        }
                    },
                    'change': function (combo, newValue, oldValue) {
                        var requestStatusId = combo.requestStatusId;
                        if (Ext.isString(requestStatusId)) {
                            var requestStatusId = Ext.getCmp(requestStatusId);
                            requestStatusId.clearValue();
                        }
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPetitionStatus: function (id, config, requestTypeId) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                requestTypeId: requestTypeId,
                valueField: 'requestStatusId',
                displayField: 'requestStatusName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'IsRequestStatusId',
                    fields: ['requestStatusId', 'requestStatusName', 'requestTypeId'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'petitionStatus'
                    }
                },
                listeners: {
                    'beforequery': function (qe) {
                        var params = {};
                        var requestTypeId = qe.combo.requestTypeId;
                        if (Ext.isString(requestTypeId)) {
                            var requestType = Ext.getCmp(requestTypeId);
                            if (!requestType.isValid() || Ext.isEmpty(requestType.getValue())) {
                                Ext.Msg.alert(__commonMessages['Warning'], 'กรุณาเลือกประเภทคำร้อง', function () {
                                	requestType.focus();
                                });
                                return false;
                            }
                            Ext.apply(params, {
                            	requestTypeP: requestType.getValue()
                            });
                        }
                        Ext.apply(qe.combo.store.baseParams, params);
                        delete qe.combo.lastQuery;
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getCountry: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'countryId',
                displayField: 'countryName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'countryId',
                    fields: ['countryId', 'countryName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'country'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMonth: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'month',
                displayField: 'monthDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'month',
                    fields: ['month', 'monthDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'month'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getWorkHour: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: false,
                valueField: 'isTaffId',
                displayField: 'isWorkTime',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'isTaffId',
                    fields: ['isTaffId', 'isWorkTime','timeIn','timeOut'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'workHour'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getVacationPeriod: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'vacationPeriod',
                displayField: 'vacationPeriodDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'vacationPeriod',
                    fields: ['vacationPeriod', 'vacationPeriodDisplay','timeToleave'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'vacationPeriod'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getVacationType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'vacationType',
                displayField: 'vacationTypeDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'vacationType',
                    fields: ['vacationType', 'vacationTypeDisplay','countLeave','methodLeave','flagLeaveRange'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'vacationType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDeputy: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'deputy',
                displayField: 'deputyDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'deputy',
                    fields: ['deputy', 'deputyDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'deputy'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMajorEducation: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'majorEducation',
                displayField: 'majorEducationDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'deputy',
                    fields: ['majorEducation', 'majorEducationDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'majorEducation'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getInstituteEducation: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'instituteEducation',
                displayField: 'instituteEducationDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'deputy',
                    fields: ['instituteEducation', 'instituteEducationDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'instituteEducation'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getFacultyEducation: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'facultyEducation',
                displayField: 'facultyEducationDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'deputy',
                    fields: ['facultyEducation', 'facultyEducationDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'facultyEducation'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getWithdrawAndRelationshipName: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'withdrawAndRelationshipId',
                displayField: 'withdrawAndRelationshipDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'withdrawAndRelationshipId',
                    fields: ['withdrawAndRelationshipId', 'withdrawAndRelationshipDesc' ,'drawerId' , 'nameEmp' , 'nameFamily' , 'drawerOriginal'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'withdrawAndRelationship'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getAssignee: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'assignee',
                displayField: 'assigneeDisp',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'assignee',
                    fields: ['assignee', 'assigneeDisp'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'assignee'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getIsCurrency: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'currencyId',
                displayField: 'currencyName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth:170,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'currencyId',
                    fields: ['currencyId', 'currencyName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'isCurrency'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getNation: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'nation',
                displayField: 'nationDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'nation',
                    fields: ['nation', 'nationDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'nation'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getInstituteType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'instituteType',
                displayField: 'instituteTypeName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'instituteType',
                    fields: ['instituteType', 'instituteTypeName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'instituteType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getContractNumber: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'contractNumber',
                displayField: 'contractNumber',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'contractNumber',
                    fields: ['contractNumber'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'contractNumber'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getSemester: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'semester',
                displayField: 'semesterDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'semester',
                    fields: ['semester', 'semesterDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'semester'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getchildStatus: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remove',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'childStatusId',
                displayField: 'childStatusName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'childStatusId',
                    fields: ['childStatusId', 'childStatusName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'childStatus'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getDistrictGrid: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'district',
                displayField: 'districtDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'district',
                    fields: ['district', 'districtDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'district'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getRequestOt: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'requestValue',
                displayField: 'requestDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'requestValue',
                    fields: ['requestValue', 'requestDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'requestOt'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getChangeType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'changeType',
                displayField: 'changeTypeDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'requestValue',
                    fields: ['changeType', 'changeTypeDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'changeType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getRequestDateOt: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'requestOtDate',
                displayField: 'requestOtDate',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'requestValue',
                    fields: ['requestValue', 'requestDesc','requestOtDate'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'requestOtDate'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMainType: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'mainType',
                displayField: 'mainTypeDesc',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                listWidth : 250,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'mainType',
                    fields: ['mainType', 'mainTypeDesc'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'mainType'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getNationality: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'remote',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'nationality',
                displayField: 'nationalityDisplay',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'nationality',
                    fields: ['nationality', 'nationalityDisplay'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'nationality'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getMeetingRoom: function (id, config) {
            var defaultConfig = {
                id: id,
                mode: 'local',
                triggerAction: 'all',
                minChars: 0,
                forceSelection: true,
                valueField: 'IsMeetingRoomCode',
                displayField: 'IsMeetingRoomName',
                descriptionField: undefined,
                showDescription: false,
                useOriginalTpl: true,
                store: {
                    xtype: 'jsonstore',
                    storeId: id + '-store',
                    idProperty: 'mainType',
                    fields: ['IsMeetingRoomCode', 'IsMeetingRoomName'],
                    url: application.contextPath + '/combobox.html',
                    baseParams: {
                        method: 'meetingRoom'
                    }
                }
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        }
    };

}();