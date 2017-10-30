var period = {};
period.url = application.contextPath +'/period.html';

if (!period.loadMask) {
	period.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

period.buildHeader = function(){
	
	period.periodName = new Ext.form.TextField({
		id : 'periodName',
		fieldLabel: 'periodName'
		
	});
	
	period.periodDate = new Ext.ss.form.DateField({
	    id: 'periodDate',
	    format: application.formatDate,
	    fieldLabel: 'periodDate'
	});
	
	period.periodContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.4,
                items: [period.periodName]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.4,
                items: [period.periodDate]
            }
        ]

    });
	
	period.periodFieldSet = new Ext.form.FieldSet({
	    title: 'Period Header',
	    items: [period.periodContainer]
	});
}

period.buildPeriodDetail = function(){
	
	period.periodNameGrid = new Ext.form.TextField({
		maxLength: 255,
	    allowBlank: false
	});
	
	period.periodDateGrid = new Ext.ss.form.DateField({
    	allowBlank: false,
    	format: application.formatDate
    });
	
	period.hyPeriodPrice2 = new Ext.ss.form.NumberField({
        integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
    });
	
	period.hyPeriodPrice3 = new Ext.ss.form.NumberField({
        integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
    });
	
	period.addButton = new Ext.Button({
	    iconCls:'add',
	    handler: function () {
	    	period.grid.add({}, function(){});
	    }
	});

	period.removeButton = new Ext.Button({
	    iconCls:'remove',
	    handler: function () {
	    	period.grid.remove({}, function(){});
	    }
	});
	
	period.saveButton = new Ext.Button({
	    iconCls:'save',
	    handler: function () {
	    	period.save();
	    }
	});
	
	period.testComboBox = new BaseComboBox.getPeriodDate2('periodDateComboBox', {});
	
	period.sm = new Ext.ss.grid.CheckboxSelectionModel({});

	period.columns = [period.sm, {
		   header: 'Period Name',
	       dataIndex: 'hyPeriodName',
	       align: 'left',
		   editor: period.periodNameGrid
	   	},{
	       header: 'Period Date',
	       dataIndex: 'hyPeriodDate',
	       align: 'center',
	       renderer: Ext.util.Format.dateRenderer(application.formatDate),
		   editor: period.periodDateGrid
	    },{
		   header: 'Max Price 2 Digit(Bath)',
	       dataIndex: 'hyPeriodPrice2',
	       align: 'right',
	       renderer: Ext.util.Format.numberRenderer('0,0.00'),
		   editor: period.hyPeriodPrice2
		},{
		   header: 'Max Price 3 Digit(Bath)',
	       dataIndex: 'hyPeriodPrice3',
	       align: 'right',
	       renderer: Ext.util.Format.numberRenderer('0,0.00'),
		   editor: period.hyPeriodPrice3
		}
		,{
		   header: 'testComboBox',
	       dataIndex: 'hyPeriodId',
		   editor: period.testComboBox,
		   renderer: Ext.util.Format.comboRenderer(period.testComboBox)
		}
	];
	
	period.store = new Ext.data.JsonStore({
	   removeAndSave: false,
	   storeId: 'gridStore',
	   idProperty: 'hyPeriodId',
	   url: period.url,
	   fields: [ {name: 'hyPeriodId'}
	   			, {name: 'hyPeriodName', allowBlank: false}
	   			, {name: 'hyPeriodDate', allowBlank: false, format: application.formatDate}
	   			, {name: 'hyPeriodPrice2'}
	   			, {name: 'hyPeriodPrice3'}]
	});
	
	period.grid = new Ext.ss.grid.EditorGridPanel({
	    store: period.store,
	    columns: period.columns,
	    sm: period.sm,
	    tbar: [period.saveButton, period.addButton, period.removeButton],
//	    bbar: new Ext.PagingToolbar({
//	        pageSize: 1,
//	        store: period.store
//	    }),
	    viewConfig: {
	        forceFit: true
	    },
	    height: 300,
	    listeners: {
            'afterEdit': function (e) {
//            	if(BeanUtils.equals(e.field, 'hyPeriodDate')){
//            		if(e.value.getFullYear() < 2200){
//            			e.value.setFullYear(e.value.getFullYear()+543);
//            		}
//            		e.value = e.value.dateFormat(application.formatDate);
//            		e.record.data.hyPeriodDate = e.value;
//            	}
            	
            	if(BeanUtils.equals(e.field, 'hyPeriodDate')){
            		e.value = DateUtils.convertSaveGridData(e.value)
            		e.record.data.hyPeriodDate = e.value;
            	}
            	
            }
        }
	});
	
	period.gridFieldSet = new Ext.form.FieldSet({
	    title: 'Period Detail',
	    items: [period.grid]
	});
	
}

Ext.onReady(function () {
	
	period.buildHeader();
	period.buildPeriodDetail();

	period.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [period.periodFieldSet
                , period.gridFieldSet]
    });
	
	period.formPanel = new Ext.form.FormPanel({
        url: period.url,
        items: [period.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
});
