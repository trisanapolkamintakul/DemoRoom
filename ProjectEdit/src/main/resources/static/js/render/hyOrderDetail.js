var orderDetail = {};
orderDetail.defaultUrl = 'orderDetail.html';
orderDetail.url = application.contextPath +'/orderDetail.html';

if (!orderDetail.loadMask) {
	orderDetail.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

orderDetail.buildHeader = function(){
	
	orderDetail.orderhId = new Ext.form.TextField({
		id : 'orderhId',
		hidden: true
	});
	
	orderDetail.orderName = new Ext.form.TextField({
		id : 'orderName',
		fieldLabel: 'Order Name',
		allowBlank: false
	});
	
	orderDetail.orderTotalPrice = new Ext.ss.form.NumberField({
		id : 'orderTotalPrice',
		fieldLabel: 'Total Price',
		readOnly: true,
		integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
	});
	
	orderDetail.hyPeriodPrice2 = new Ext.ss.form.NumberField({
		id : 'hyPeriodPrice2',
		fieldLabel: 'Max Price 2 Digit(Bath)',
		readOnly: true,
		integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
	});
	
	orderDetail.hyPeriodPrice3 = new Ext.ss.form.NumberField({
		id : 'hyPeriodPrice3',
		fieldLabel: 'Max Price 3 Digit(Bath)',
		readOnly: true,
		integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
	});
	
	orderDetail.sumTopPrice = new Ext.ss.form.NumberField({
		id : 'sumTopPrice',
		fieldLabel: 'Summary top price(Bath)',
		readOnly: true,
		integerPrecision: 10,
        decimalPrecision: 2
	});
	
	orderDetail.sumReversePrice = new Ext.ss.form.NumberField({
		id : 'sumReversePrice',
		fieldLabel: 'Summary reverse price(Bath)',
		readOnly: true,
		integerPrecision: 10,
        decimalPrecision: 2
	});
	
	orderDetail.sumUnderPrice = new Ext.ss.form.NumberField({
		id : 'sumUnderPrice',
		fieldLabel: 'Summary under price(Bath)',
		readOnly: true,
		integerPrecision: 10,
        decimalPrecision: 2
	});
	
	orderDetail.periodDateComboBox = new BaseComboBox.getPeriodDate('periodCombobox', {
		 listeners: {
	        	'change' : function(combo, newValue, oldValue){
	        		var rec = combo.store.getById(newValue);
	        		orderDetail.hyPeriodPrice2.setValue(rec.data.valueBigDecimal1);
	        		orderDetail.hyPeriodPrice3.setValue(rec.data.valueBigDecimal2);
	        	}
	        }
	});
	
	orderDetail.orderDetailPriceContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [orderDetail.hyPeriodPrice2]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [orderDetail.hyPeriodPrice3]
            }
        ]
    });
	
	orderDetail.orderDetailContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.4,
                items: [orderDetail.orderName, orderDetail.periodDateComboBox, orderDetail.orderhId]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.6,
                items: [orderDetail.orderTotalPrice, orderDetail.orderDetailPriceContainer]
            }
        ]
    });
	
	orderDetail.orderDetailFieldSet = new Ext.form.FieldSet({
	    title: 'Order Header',
	    items: [orderDetail.orderDetailContainer]
	});
	
}

orderDetail.buildGrid = function(){
	
	orderDetail.addButton = new Ext.Button({
	    iconCls:'add',
	    handler: function () {
	    	orderDetail.addGrid();
	    }
	});
	
	orderDetail.removeButton = new Ext.Button({
	    iconCls:'remove',
	    handler: function () {
	    	orderDetail.grid.remove({}, function(){});
	    }
	});
	
	orderDetail.hyOrddLottery = new Ext.form.TextField({
		id : 'hyOrddLottery',
		maskRe: /[0-9]/,
		maxLength: 3,
		minLength: 0
	});
	
	orderDetail.hyOrddTop = new Ext.ss.form.NumberField({
        integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
    });
	
	orderDetail.hyOrddReverse = new Ext.ss.form.NumberField({
        integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
    });
	
	orderDetail.hyOrddUnder = new Ext.ss.form.NumberField({
        integerPrecision: 10,
        decimalPrecision: 2,
        allowNegative: false
    });
	
	orderDetail.sm = new Ext.ss.grid.CheckboxSelectionModel({});

	orderDetail.columns = [orderDetail.sm, {
		   header: 'Lottery',
	       dataIndex: 'hyOrddLottery',
	       align: 'left',
		   editor: orderDetail.hyOrddLottery
	   	},{
	       header: 'Top(Bath)',
	       dataIndex: 'hyOrddTop',
	       align: 'right',
	       renderer: Ext.util.Format.numberRenderer('0,0.00'),
		   editor: orderDetail.hyOrddTop
	    },{
		   header: 'Reverse(Bath)',
	       dataIndex: 'hyOrddReverse',
	       align: 'right',
	       renderer: Ext.util.Format.numberRenderer('0,0.00'),
		   editor: orderDetail.hyOrddReverse
		}
	    ,{
	       header: 'Under(Bath)',
	       dataIndex: 'hyOrddUnder',
           align: 'right',
 	       renderer: Ext.util.Format.numberRenderer('0,0.00'),
		   editor: orderDetail.hyOrddUnder
		}
	];
	 
	orderDetail.store = new Ext.data.JsonStore({
	   removeAndSave: false,
	   storeId: 'gridStore',
	   idProperty: 'hyOrddId',
	   url: orderDetail.url,
	   fields: [ {name: 'hyOrddId'}
	   			, {name: 'hyOrdhId'}
	   			, {name: 'hyOrddLottery', allowBlank: false}
	   			, {name: 'hyOrddTop'}
	   			, {name: 'hyOrddReverse'}
	   			, {name: 'hyOrddUnder'}]
	});
	
	
	orderDetail.grid = new Ext.ss.grid.EditorGridPanel({
	    store: orderDetail.store,
	    columns: orderDetail.columns,
	    sm: orderDetail.sm,
	    tbar: [orderDetail.addButton, orderDetail.removeButton],
	    bbar: new Ext.PagingToolbar({
	        pageSize: 10,
	        store: orderDetail.store
	    }),
	    viewConfig: {
	        forceFit: true
	    },
	    height: 300,
	    listeners: {
	    	'afterEdit' : function(e){
	    		checkValueGrid(e);
	    	}
	    }
	});
	
	orderDetail.gridFieldSet = new Ext.form.FieldSet({
	    title: 'Order Detail List',
	    items: [orderDetail.grid]
	});
	
}

	
Ext.onReady(function () {
	
	orderDetail.buildHeader();
	orderDetail.buildGrid();

	orderDetail.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [orderDetail.orderDetailFieldSet
	                , orderDetail.gridFieldSet]
    });
	
	orderDetail.formPanel = new Ext.form.FormPanel({
        url: orderDetail.url,
        items: [orderDetail.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
	    });
		
});

