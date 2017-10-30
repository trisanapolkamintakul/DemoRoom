var ext = {};
ext.url = application.contextPath +'/pageTest.html';

ext.buildEmployeeDetail = function () {
	ext.textName = new Ext.form.TextField({
		id : 'textName',
		fieldLabel: __messages['label.name'],
	    allowBlank: false
	});

	ext.textLastName = new Ext.form.TextField({
		id : 'textLastName',
		fieldLabel: __messages['label.lastName'],
	    allowBlank: false
	});

	ext.employeeDayFrom = new Ext.ss.form.DateField({
	    id: 'employeeDayFrom',
	    toDateFieldId: 'employeeDayTo',
	    fieldLabel: __messages['label.employeeDayFrom']
	});
	
	ext.employeeDayTo = new Ext.ss.form.DateField({
	    id: 'employeeDayTo',
	    toDateFieldId: 'employeeDayFrom',
	    fieldLabel: __messages['label.employeeDayTo']
	});
	
	
	ext.employeePhone = new Ext.ss.form.NumberField({
        id: 'employeePhone',
        fieldLabel: __messages['label.employeePhone'],
        decimalPrecision: 2,
        anchor: '100%'
    });

	ext.empContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [ext.textName, ext.employeeDayTo]
            },
            {
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [ext.textLastName, ext.employeeDayFrom]
            }
        ]

    });
	
	ext.statusEmployee = new Ext.form.RadioGroup({
        fieldLabel: __messages['label.statusEmployee'] + ' : ',
        id: 'statusEmployee',
        columns: [100, 100, 100],
        items: [{
                boxLabel: __messages['label.single'],
                name: 'statusEmployee',
                inputValue: 'S'
            }, {
                boxLabel: __messages['label.married'],
                name: 'statusEmployee',
                inputValue: 'M'
            }, {
                boxLabel: __messages['label.divorce'],
                name: 'statusEmployee',
                inputValue: 'D'
            }
        ]
    });
	
	ext.CheckboxEmployee1 = new Ext.form.Checkbox({
        id: 'CheckboxEmployee1',
        boxLabel: 'employee1'
    });
	
	ext.CheckboxEmployee2 = new Ext.form.Checkbox({
        id: 'CheckboxEmployee2',
        boxLabel: 'employee2'
    });
	
	ext.CheckboxEmployeeGroup = new Ext.form.CheckboxGroup({
        id: 'CheckboxEmployeeGroup',
        fieldLabel:'CheckboxEmployeeGroup  : ',
        columns: [100, 100],
        items: [ext.CheckboxEmployee1, ext.CheckboxEmployee2]
    });
	
	ext.fieldSet = new Ext.form.FieldSet({
	    title: __messages['label.employee'],
	    items: [ext.empContainer
	            , ext.employeePhone
	            , ext.statusEmployee
	            , ext.CheckboxEmployeeGroup]
	});
}

ext.buildVendorDetail = function () {
	ext.textVendorName = new Ext.form.TextField({
		id : 'textVendorName',
		fieldLabel: __messages['label.name'],
	    allowBlank: false
	});

	ext.textVendorLastName = new Ext.form.TextField({
		id : 'textVendorLastName',
		fieldLabel: __messages['label.lastName'],
	    allowBlank: false
	});

	ext.fieldSetVendor = new Ext.form.FieldSet({
	    title: __messages['label.vendor'],
	    items: [ext.textVendorName
	            , ext.textVendorLastName]
	});
}

ext.buildItemDetail = function () {
	ext.addButton = new Ext.Button({
	    iconCls:'add',
	    handler: function () {
	    	ext.grid.add({});
	    }
	});

	ext.removeButton = new Ext.Button({
	    iconCls:'remove',
	    handler: function () {
	    	ext.grid.remove();
	    }
	});

//	ext.loadData = function(){
//		var param = {
//				'url' : 'ExtJs.html',
//				'method' : 'search',
//		};
//		
//		$.ajax({
//		    type: 'POST',
//		    data : param,
//		    success: function(response){
//		    	var json = JsonUtils.decode(response);
//		    	ext.grid.store.loadData(json);
////		    	console.log(json);
//		    },
//		    error: function (jqXHR, textStatus, errorThrown){
//		    	var messErr = 'Error System';
//		    	if(BeanUtils.isNull(param.messageError)){
//		    		messErr = param.messageError;
//		    	}
//		    	SSJs.component.MessageBox.alert('Error',messErr);
//		    }
//		});
//	};

	ext.itemCd = new Ext.form.TextField({
	    id: 'itemCd',
	    maxLength: 100
	});

	ext.itemName = new Ext.form.TextField({
	    id: 'itemName',
	    maxLength: 100
	});

	ext.sm = new Ext.ss.grid.CheckboxSelectionModel({
		header : '',
		dataIndex : 'estimate'
	});

	ext.columns = [ext.sm, {
		   header: __messages['label.itemCode'],
	       dataIndex: 'itemCd',
	       align: 'center',
	       editor: ext.itemCd
	   	},{
	       header: __messages['label.itemName'],
	       dataIndex: 'itemName',
	       align: 'center',
	       editor: ext.itemName
	    }
	];

	ext.store = new Ext.data.JsonStore({
		removeAndSave : true,
	   storeId: 'gridStore',
	   idProperty: 'itemCd',
	   url: ext.url,
	   fields: [ {name: 'itemCd'}, {name: 'itemName'}]
	});


	ext.grid = new Ext.ss.grid.EditorGridPanel({
	    store: ext.store,
	    columns: ext.columns,
	    sm: ext.sm,
//	    plugins : [ ext.sm],
	    tbar: [ext.addButton, ext.removeButton],
//	    bbar: new Ext.PagingToolbar({
//	        pageSize: 5,
//	        store: ext.store
//	    }),
	    viewConfig: {
	        forceFit: true
	    },
	    height: 150
	});


	ext.gridFieldSet = new Ext.form.FieldSet({
	    title: __messages['label.grid'],
	    items: [ext.grid]
	});
}

Ext.onReady(function () {
	ext.buildEmployeeDetail();
	ext.buildVendorDetail();
	ext.buildItemDetail();
	
	ext.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [ext.fieldSet, ext.fieldSetVendor, ext.gridFieldSet]
    });
	
	ext.formPanel = new Ext.form.FormPanel({
        url: ext.url,
        items: [ext.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
	
});
