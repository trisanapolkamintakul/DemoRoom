var BaseComboBox = function () { 
    var resolveConfig = function (defaultConfig, config) {
    	if(!defaultConfig.store.listeners){
    		defaultConfig.store.listeners = {};
    	}
    	defaultConfig.store.listeners.beforeload  = function(value, options){
      		options.params.gridStore_start = options.params[defaultConfig.id+"-store_start"];
      		options.params.gridStore_limit = options.params[defaultConfig.id+"-store_limit"];
      	};
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
    
    
    return { getPeriodDate: function (id, config) {
            var defaultConfig = {
              id: id,
              fieldLabel: 'Period',
              mode: 'remote',
              width: 148,
              triggerAction: 'all',
              minChars: 0,
              forceSelection: true,
              valueField: 'valueField',
              displayField: 'displayField',
              descriptionField: 'descriptionField',
              showDescription: true,
              pageSize: 7,
              useOriginalTpl: false,
              store: {
                  xtype: 'jsonstore',
                  storeId: id + '-store',
                  idProperty: 'valueField',
                  fields: ['valueField', 'displayField', 'descriptionField', 'valueBigDecimal1', 'valueBigDecimal2'],
                  url: application.contextPath + '/combobox.html',
                  baseParams: {
                      method: 'period'
                  }
            	}
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        getPeriodDate2: function (id, config) {
            var defaultConfig = {
                    id: id,
                    fieldLabel: 'Period',
                    mode: 'remote',
                    width: 148,
                    triggerAction: 'all',
                    minChars: 0,
                    forceSelection: true,
                    valueField: 'hyPeriodId',
                    displayField: 'hyPeriodName',
                    descriptionField: 'hyPeriodDate',
                    showDescription: true,
                    pageSize: 7,
                    useOriginalTpl: false,
                    store: {
                        xtype: 'jsonstore',
                        storeId: id + '-store',
                        idProperty: 'hyPeriodId',
                        fields: ['hyPeriodId', 'hyPeriodName', 'hyPeriodDate'],
                        url: application.contextPath + '/combobox.html',
                        baseParams: {
                            method: 'period2'
                        }
                  	}
                  };
                  return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
              },
              
        getOrderList: function (id, config) {
            var defaultConfig = {
              id: id,
              allowBlank: false,
              fieldLabel: 'ห้อง',
              mode: 'remote',
              width: 148,
              triggerAction: 'all',
              minChars: 0,
              forceSelection: true,
              valueField: 'MAID',
              displayField: 'MANAME',
              descriptionField: 'MADATE',
              showDescription: true,
              pageSize: 7,
              useOriginalTpl: false,
              store: {
                  xtype: 'jsonstore',
                  storeId: id + '-store',
                  idProperty: 'MAID',
                  fields: [ 'MAID', 'MANAME', 'MADATE' ],
                  url: application.contextPath + '/combobox.html',
                  baseParams: {
                      method: 'orderList'
                  }
            	}
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        
        getOrderListUser: function (id, config) {
            var defaultConfig = {
              id: id,
              allowBlank: false,
              fieldLabel: 'ประวัตการจอง',
              mode: 'remote',
              width: 148,
              triggerAction: 'all',
              minChars: 0,
              forceSelection: true,
              valueField: 'RSVID',
              displayField: 'RSVROOM',
              descriptionField: 'RSVDATEAVAILABLE',
              showDescription: true,
              pageSize: 7,
              useOriginalTpl: false,
              store: {
                  xtype: 'jsonstore',
                  storeId: id + '-store',
                  idProperty: 'RSVID',
                  fields: [ 'RSVID', 'RSVROOM', 'RSVDATEAVAILABLE' ],
                  url: application.contextPath + '/combobox.html',
                  baseParams: {
                      method: 'orderListUser'
                  }
            	}
            };
            return new Ext.ss.form.ComboBox(resolveConfig(defaultConfig, config));
        },
        
        getRoomTypeCombobox : function(id, config) {
			var defaultConfig = {
				id : 'roomtypeCombobox',
				allowBlank : false,
				mode : 'remote',
				width : 350,
				triggerAction : 'all',
				minChars : 0,
				forceSelection : true,
				valueField : 'RTNAME',
				displayField : 'RTNAME',
				showDescription : false,
				// useOriginalTpl: true,
				store : {
					xtype : 'jsonstore',
					storeId : id + '-store',
					idProperty : 'RTID',
					fields : [ 'RTID','RTNAME' ],
					url : application.contextPath + '/combobox.html',
					baseParams : {
						method : 'roomtype'
					}
				}
			};
			return new Ext.ss.form.ComboBox(
					resolveConfig(defaultConfig, config));
		},
		
		getRoomCombobox : function(id, config) {
			var defaultConfig = {
				id : 'equipmentname',
				allowBlank : false,
				mode : 'remote',
				width : 150,
				triggerAction : 'all',
				minChars : 0,
				forceSelection : true,
				valueField : 'name',
				displayField : 'name',
				showDescription : false,
				// useOriginalTpl: true,
				store : {
					xtype : 'jsonstore',
					storeId : id + '-store',
					idProperty : 'id',
					fields : [ 'id','name' ],
					url : application.contextPath + '/combobox.html',
					baseParams : {
						method : 'room'
					}
				}
			};
			return new Ext.ss.form.ComboBox(
					resolveConfig(defaultConfig, config));
		},
		
		getEquipmentFixCombobox : function(id, config) {
			var defaultConfig = {
				id : 'equipment',
				allowBlank : false,
				mode : 'remote',
				width : 150,
				triggerAction : 'all',
				minChars : 0,
				forceSelection : true,
				valueField : 'type',
				displayField : 'type',
				showDescription : false,
				// useOriginalTpl: true,
				store : {
					xtype : 'jsonstore',
					storeId : id + '-store',
					idProperty : 'id',
					fields : [ 'id','type' ],
					url : application.contextPath + '/combobox.html',
					baseParams : {
						method : 'equipmentfix'
					}
				}
			};
			return new Ext.ss.form.ComboBox(
					resolveConfig(defaultConfig, config));
		},
		
		getEquipmentAloneCombobox : function(id, config) {
			var defaultConfig = {
				id : 'equipment2',
				allowBlank : false,
				mode : 'remote',
				width : 150,
				triggerAction : 'all',
				minChars : 0,
				forceSelection : true,
				valueField : 'type',
				displayField : 'type',
				showDescription : false,
				// useOriginalTpl: true,
				store : {
					xtype : 'jsonstore',
					storeId : id + '-store',
					idProperty : 'id',
					fields : [ 'id','type' ],
					url : application.contextPath + '/combobox.html',
					baseParams : {
						method : 'equipmentalone'
					}
				}
			};
			return new Ext.ss.form.ComboBox(
					resolveConfig(defaultConfig, config));
		}
              
    };
	
}();