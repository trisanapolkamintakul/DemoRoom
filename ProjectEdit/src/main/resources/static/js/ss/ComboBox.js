Ext.namespace('Ext.ss.form');
Ext.QuickTips.init();
Ext.ss.form.ComboBox = Ext.extend(Ext.form.ComboBox, {
    descriptionWidth: undefined,
    showDescription: true,
    descriptionField: undefined,
    descriptionId: undefined,
    descriptionName: undefined,
    descriptionStyle: undefined,
    headerCode: __commonMessages['Code'],
    headerDescription: __commonMessages['Description'],
    listWidth: undefined,
    useOriginalTpl: false,
    cacheSizes: false,
    descriptionReadOnly: true,
    descriptionAllowBlank: true,
    triggerAction: 'all',
    onRender: function (ct, position) {
        this.displayField = Ext.value(this.displayField, this.valueField);
        this.descriptionField = Ext.value(this.descriptionField, this.displayField);

        Ext.form.ComboBox.superclass.onRender.call(this, ct, position);

        if (this.hiddenName && !Ext.isDefined(this.submitValue)) {
            this.submitValue = false;
        }

        if (this.hiddenName) {
            this.hiddenField = this.el.insertSibling({
                tag: 'input',
                type: 'hidden',
                name: this.hiddenName,
                id: (this.hiddenId || this.id())
            }, 'before', true);
        }
        if (Ext.isGecko) {
            this.el.dom.setAttribute('autocomplete', 'off');
        }
        if (this.showDescription) {
            this.descriptionId = Ext.value(this.descriptionId, this.id + '-combobox-descfield');
            this.descriptionName = Ext.value(this.descriptionName, this.descriptionId);

            this.defaultDescriptionConfig = {
                renderTo: this.wrap.id,
                id: this.descriptionId,
                hideLabel: true,
                labelWidth: 0,
                name: this.descriptionName,
                style: this.descriptionStyle,
                width: this.descriptionWidth,
                readOnly: this.descriptionReadOnly,
                allowBlank: this.descriptionAllowBlank
            };

            if (this.descriptionReadOnly) {
                Ext.apply(this.defaultDescriptionConfig, {
                    tabIndex: -1
                });
            }

            Ext.apply(this.defaultDescriptionConfig, this.descriptionConfig);

            this.defaultDescriptionConfig.style = this.defaultDescriptionConfig.style || {};
            if (typeof this.defaultDescriptionConfig.style === "string") {
                var cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
                    matches;
                while ((matches = cssRe.exec(styles))) {
                    this.defaultDescriptionConfig.style[matches[1]] = matches[2];
                }
            }
            Ext.applyIf(this.defaultDescriptionConfig.style, {
                'margin-left': '20px'
            });

            if (!this.defaultDescriptionConfig.width) {
                Ext.apply(this.defaultDescriptionConfig, {
                    anchor: '100%'
                });
            }

            this.description = new Ext.form.TextField(this.defaultDescriptionConfig);
        }

        this.initTpl();

        if (!this.lazyInit) {
            this.initList();
        } else {
            this.on('focus', this.initList, this, {
                single: true
            });
        }
    },
    updateEditState: function () {
        if (this.rendered) {
            if (this.readOnly) {
                this.el.dom.readOnly = true;
                this.el.addClass('x-trigger-noedit');
                this.mun(this.el, 'click', this.onTriggerClick, this);
                this.trigger.setDisplayed(!this.hideTrigger);
            } else {
                if (!this.editable) {
                    this.el.dom.readOnly = true;
                    this.el.addClass('x-trigger-noedit');
                    this.mon(this.el, 'click', this.onTriggerClick, this);
                } else {
                    this.el.dom.readOnly = false;
                    this.el.removeClass('x-trigger-noedit');
                    this.mun(this.el, 'click', this.onTriggerClick, this);
                }
                this.trigger.setDisplayed(!this.hideTrigger);
            }
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    onResize: function (w, h) {
        Ext.ss.form.ComboBox.superclass.onResize.call(this, w, h);

        var listWidth = 0;

        if (this.showDescription) {
            var ct = this.container,
                marginLeft = this.description.el.getMargins('l'),
                triggerWidth = this.getTriggerWidth(),
                length = ct.getWidth() - ct.getPadding('l') - (w - triggerWidth),
                descriptionWidth = length - marginLeft + this.el.getMargins('l');

            this.description.setSize(descriptionWidth, h);

            listWidth = (w - triggerWidth) + marginLeft + this.description.getWidth();
        }

        if (!isNaN(listWidth) && this.isVisible() && this.list) {
            this.doResize(listWidth);
        } else {
            this.bufferSize = listWidth;
        }
    },
    initTpl: function () {
        if (this.useOriginalTpl) {
            var cls = 'x-combo-list';
            if(!this.tpl) {
            	this.tpl = new Ext.XTemplate('<tpl for="."><div class="' + cls + '-item">{' + this.displayField + '}</div></tpl>');
            }
        } else {
            /**var TextMetricsUtils = Ext.util.TextMetrics.createInstance(Ext.getBody());      
	        var descListWidth = Math.floor(this.listWidth * 0.7);**/
            if (!this.tpl) {
                this.title = this.title ||
                    '<table cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;">' +
                    '<tr style="height:15px;">' +
                    '<th style="width:30%;"><div class="x-grid3-cell-inner combo-list-hd" style="padding:0; font-weight:bold; text-align:center;">' + this.headerCode + '</div></th>' +
                    '<th style="width:70%;"><div class="x-grid3-cell-inner combo-list-hd" style="padding:0; font-weight:bold; text-align:center;">' + this.headerDescription + '</div></th>' +
                    '</tr>' +
                    '</table>';

                this.autoTpl = true;
                this.tpl = new Ext.XTemplate(
                    '<div style="width:100%;">',
                    '<tpl for=".">',
                    '<div class="x-combo-list-item" ext:qtip="{' + this.descriptionField + '}">',
                    '<table cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;">',
                    '<tr>',
                    '<td style="width:30%"><div class="x-grid3-cell-inner combo-list-item" style="padding:0">{' + this.displayField + '}</div></td>',
                    '<td style="width:5%"></td>',
                    '<td style="width:65%"><div class="x-grid3-cell-inner combo-list-item" style="padding:0">{' + this.descriptionField + '}</div></td>',
                    '</tr>',
                    '</table>',
                    '</div>',
                    '</tpl>',
                    '</div>', {
                    compiled: true,
                    disableFormats: true
                });
                /**
		        this.tpl = new Ext.XTemplate(
					'<div style="width:100%;">',
		  				'<tpl for=".">',
		  					'<tpl if="this.getTextWidth('+this.descriptionField+') &lt; '+(descListWidth)+'">',
		      					'<div class="x-combo-list-item">',
			      					'<table cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;">',
			            				'<tr>',
				            				'<td style="width:30%"><div class="x-grid3-cell-inner" style="padding:0">{' + this.displayField + '}</div></td>',
				            				'<td style="width:70%"><div class="x-grid3-cell-inner" style="padding:0">{' + this.descriptionField + '}</div></td>',
										'</tr>',
									'</table>',
								'</div>',
							'</tpl>',
							'<tpl if="this.getTextWidth('+this.descriptionField+') &gt;= '+(descListWidth)+'">',
								'<div class="x-combo-list-item" ext:qtip="{'+this.descriptionField+'}">',
			      					'<table cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;">',
			            				'<tr>',
				            				'<td style="width:30%"><div class="x-grid3-cell-inner" style="padding:0">{' + this.displayField + '}</div></td>',
				            				'<td style="width:65%"><div class="x-grid3-cell-inner" style="padding:0">{' + this.descriptionField + '}</div></td>',
				            				'<td style="width:10px;padding:0 0 0 2px;"><div>...</div></span>',
										'</tr>',
									'</table>',
								'</div>',
							'</tpl>',
						'</tpl>',
					'</div>', {
		                compiled: true,
		                disableFormats: true,
		                getTextWidth: function(text){
		                    return TextMetricsUtils.getWidth(text);
		                }
		            }
		        );
		        */
            }
        }
    },
    clearValue: function () {
        Ext.ss.form.ComboBox.superclass.clearValue.call(this);
        if (this.showDescription) {
            this.description.setValue('');
        }
    },
    getDescriptionTextField: function () {
        return this.description;
    },
    setValueDescriptionField: function (desc) {
        if (this.showDescription) {
            this.description.setValue(desc);
        }
        return this;
    },
    setValue: function (v) {
        var text = v,
            desc = '';

        function processSetValue(v, text, desc) {
            this.lastSelectionText = text;
            if (this.hiddenField) {
                this.hiddenField.value = Ext.value(v, '');
            }
            Ext.form.ComboBox.superclass.setValue.call(this, text);
            this.value = v;
            this.setValueDescriptionField(desc);
        }

        if (this.valueField) {
            var r = this.findRecord(this.valueField, v);
            if (r) {
                text = r.data[this.displayField];
                desc = r.data[this.descriptionField];
            } else {
                if (!Ext.isEmpty(v)) {
                    if (this.value !== v) {
                        this.value = v;
                        this.doLoadValue({
                            value: v
                        }, function (records, options, success) {
                            r = Ext.isArray(records) ? records[0] : records;
                            if (!r) {
                                if (Ext.isDefined(this.valueNotFoundText)) {
                                    text = this.valueNotFoundText;
                                }
                            } else {
                                text = r.data[this.displayField];
                                desc = r.data[this.descriptionField];
                            }
                            processSetValue.call(this, v, text, desc);
                            return this;
                        });
                    }
                } else {
                    if (Ext.isDefined(this.valueNotFoundText)) {
                        text = this.valueNotFoundText;
                    }
                    processSetValue.call(this, v, text, desc);
                    return this;
                }
            }
        }

        processSetValue.call(this, v, text, desc);
        return this;
    },
    getValueDescriptionField: function () {
        if (this.showDescription) {
            return this.description.getValue();
        }
        return '';
    },
    assertValue: function (options) {
        var val = this.getRawValue(),
            rec = undefined;

        function processAssertValue(val, rec) {
            if (!rec && this.forceSelection) {
                if (val.length > 0 && val != this.emptyText) {
                    this.el.dom.value = Ext.value(this.lastSelectionText, '');
                    this.applyEmptyText();
                } else {
                    this.clearValue();
                }
            } else {
                if (rec && this.valueField) {
                    if (this.value == val) {
                        if (options && Ext.isFunction(options.callback)) {
                            options.callback.call(options.scope || this);
                        }
                        return;
                    }
                    val = rec.get(this.valueField || this.displayField);
                }
                this.setValue(val);
            }

            if (options && Ext.isFunction(options.callback)) {
                options.callback.call(options.scope || this);
            }
        }

        if (this.valueField && Ext.isDefined(this.value)) {
            rec = this.findRecord(this.valueField, this.value);
        }

        if (!rec && !Ext.isEmpty(this.value)) {
            if (this.value !== val) {
                this.doLoadValue({
                    value: this.value
                }, function (records, options, success) {
                    rec = Ext.isArray(records) ? records[0] : records;
                    if (!rec || rec.get(this.displayField) != val) {
                        rec = this.findRecord(this.displayField, val);
                    }

                    if (!rec) {
                        this.doLoadValue({
                            display: val
                        }, function (records, options, success) {
                            rec = Ext.isArray(records) ? records[0] : records;
                            processAssertValue.call(this, val, rec);
                        });
                        return;
                    }

                    processAssertValue.call(this, val, rec);
                });
                return;
            }
        }

        if (!rec || rec.get(this.displayField) != val) {
            rec = this.findRecord(this.displayField, val);
        }

        if (!rec && !Ext.isEmpty(val)) {
            if (this.value !== val) {
                this.doLoadValue({
                    display: val
                }, function (records, options, success) {
                    rec = Ext.isArray(records) ? records[0] : records;
                    processAssertValue.call(this, val, rec);
                });
                return;
            }
        }

        processAssertValue.call(this, val, rec);
    },
    doLoadValue: function (params, callback) {
        if (this.mode === 'remote') {
            var qe = {
                query: '',
                forceAll: false,
                combo: this,
                cancel: false
            };
            this.fireEvent('beforequery', qe);
            this.getStore().load({
                params: Ext.apply(this.getParams('', 1), params),
                callback: callback,
                scope: this
            });
        } else {
            callback.call(this, [], undefined, true);
        }
    },
    onEnable: function () {
        Ext.ss.form.ComboBox.superclass.onEnable.apply(this, arguments);
        if (this.showDescription) {
            this.description.setDisabled(false);
        }
    },
    onDisable: function () {
        Ext.ss.form.ComboBox.superclass.onDisable.apply(this, arguments);
        if (this.showDescription) {
            this.description.setDisabled(true);
        }
    },
    isDirty: function () {
        var v = Ext.ss.form.ComboBox.superclass.isDirty.apply(this, arguments);
        return v && ((this.showDescription) ? this.description.isDirty(arguments) : true);
    },
    isValid: function (preventMark) {
        var v = Ext.ss.form.ComboBox.superclass.isValid.apply(this, arguments);
        return v && ((this.showDescription) ? this.description.isValid(preventMark) : true);
    },
    validate: function () {
        var v = Ext.ss.form.ComboBox.superclass.validate.apply(this, arguments);
        return v && ((this.showDescription) ? this.description.validate(arguments) : true);
    },
    doQuery: function (q, forceAll) {
        q = Ext.isEmpty(q) ? '' : q;
        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel: false
        };
        if (this.fireEvent('beforequery', qe) === false || qe.cancel) {
            return false;
        }
        q = qe.query;
        forceAll = qe.forceAll;
        if (forceAll === true || (q.length >= this.minChars)) {
            if (this.lastQuery !== q) {
                this.lastQuery = q;
                if (this.mode === 'local') {
                    this.selectedIndex = -1;
                    if (forceAll) {
                        this.store.clearFilter();
                    } else {
                        this.store.filter(this.displayField, q);
                    }
                    this.onLoad();
                } else {
                    this.store.baseParams[this.queryParam] = q;

                    var paging = this.pageTb;
                    if (paging) {
                        this.store.isLoaded = true;
                        this.store.baseParams['__storeId'] = this.store.storeId;

                        if (paging.doLoad(0) !== false) {
                            this.expand();
                        }
                        return;
                    }
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            } else {
                this.selectedIndex = -1;
                this.onLoad();
            }
        }
    },
    /*beforeBlur : function(){
		this.assertValue();
	},
	onBlur : function(options){
        this.assertValue({
        	callback : function() {
        		if(this.focusClass){
		            this.el.removeClass(this.focusClass);
		        }
		        this.hasFocus = false;
		        if(this.validationEvent !== false && (this.validateOnBlur || this.validationEvent == 'blur')){
		            this.validate();
		        }
		        var v = this.getValue();
		        if(String(v) !== String(this.startValue)){
		            this.fireEvent('change', this, v, this.startValue);
		        }
		        this.fireEvent('blur', this);
		        this.postBlur();

		        if(options && Ext.isFunction(options.callback)) {
		        	options.callback.call(options.scope||this);
		        }
        	},
        	scope:this
        });
    },
    triggerBlur : function(options){
        this.mimicing = false;
        this.doc.un('mousedown', this.mimicBlur, this);
        if(this.monitorTab && this.el){
            this.un('specialkey', this.checkTab, this);
        }
        this.onBlur({
        	callback : function() {
        		if(this.wrap){
        			this.wrap.removeClass(this.wrapFocusClass);
		        }
		        if(options && Ext.isFunction(options.callback)) {
		        	options.callback.call(options.scope||this);
		        }
        	},
        	scope:this
        });
    },*/
    getParams: function (q, pageSize) {
        var params = {},
        paramNames = this.store.paramNames;
        if (this.pageSize) {
            params[paramNames.start] = 0;
            params[paramNames.limit] = Ext.value(pageSize, this.pageSize);
        }
        return params;
    },
    // private
    findRecord: function (prop, value) {
        var ds = this.store,
            idx = ds.findExact(prop, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    }
});
Ext.reg('ss-combobox', Ext.ss.form.ComboBox);