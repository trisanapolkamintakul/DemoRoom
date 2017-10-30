var orderHeader = {};
orderHeader.url = application.contextPath +'/orderHeader.html';
orderHeader.urlOrderDetail = application.contextPath +'/orderDetail.html';

if (!orderHeader.loadMask) {
	orderHeader.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

orderHeader.buildHeader = function(){
	
	orderHeader.orderHeaderName = new Ext.form.TextField({
		id : 'orderHeaderName',
		fieldLabel: 'Order name'
	});
	
	orderHeader.periodDateComboBox = new BaseComboBox.getPeriodDate('periodCombobox', {});
	
	orderHeader.orderHeaderContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.4,
                items: [orderHeader.orderHeaderName]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.4,
                items: [orderHeader.periodDateComboBox]
            }
        ]

    });
	
	orderHeader.orderHeaderFieldSet = new Ext.form.FieldSet({
	    title: 'orderHeader Header',
	    items: [orderHeader.orderHeaderContainer]
	});
}


orderHeader.buildGrid = function(){
	
	orderHeader.saveButton = new Ext.Button({
	    iconCls:'save',
	    handler: function () {
	    	orderHeader.save();
	    }
	});
	
	orderHeader.removeButton = new Ext.Button({
	    iconCls:'remove',
	    handler: function () {
	    	orderHeader.grid.remove({}, function(){});
	    }
	});
	
	orderHeader.sm = new Ext.ss.grid.CheckboxSelectionModel({});

	orderHeader.columns = [orderHeader.sm, {
		   header: 'Order Name',
	       dataIndex: 'hyOrdhName',
	       align: 'left'
	   	},{
	       header: 'Period Name',
	       dataIndex: 'hyPeriodName',
	       align: 'left'
	    },{
	       header: 'Period Date',
	       dataIndex: 'hyPeriodDate',
	       align: 'center',
	       renderer: Ext.util.Format.dateRenderer(application.formatDate)
	    },{
		   header: 'Total Price',
	       dataIndex: 'hyOrdhToltalPrice',
	       align: 'right',
	       renderer: Ext.util.Format.numberRenderer('0,0.00')
		}
	    ,{
	    	header: 'Edit',
            align: 'center',
            renderer: renderInstall
		}
	];
	 
	orderHeader.store = new Ext.data.JsonStore({
	   removeAndSave: false,
	   storeId: 'gridStore',
	   idProperty: 'hyOrdhId',
	   url: orderHeader.url,
	   fields: [ {name: 'hyOrdhId'}
	   			, {name: 'hyOrdhName'}
	   			, {name: 'hyOrdhToltalPrice'}
	   			, {name: 'hyPeriodId'}
	   			, {name: 'hyPeriodName'}
	   			, {name: 'hyPeriodDate', format: application.formatDate}]
	});
	
	
	orderHeader.grid = new Ext.ss.grid.EditorGridPanel({
	    store: orderHeader.store,
	    columns: orderHeader.columns,
	    sm: orderHeader.sm,
	    tbar: [orderHeader.saveButton, orderHeader.removeButton],
	    bbar: new Ext.PagingToolbar({
	        pageSize: 10,
	        store: orderHeader.store
	    }),
	    viewConfig: {
	        forceFit: true
	    },
	    height: 300,
	    listeners: {}
	});
	
	orderHeader.gridFieldSet = new Ext.form.FieldSet({
	    title: 'Order List',
	    items: [orderHeader.grid]
	});
 }


Ext.onReady(function () {
	
	orderHeader.buildHeader();
	orderHeader.buildGrid();

	orderHeader.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [orderHeader.orderHeaderFieldSet
                , orderHeader.gridFieldSet
                ]
    });
	
	orderHeader.formPanel = new Ext.form.FormPanel({
        url: orderHeader.url,
        items: [orderHeader.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
});