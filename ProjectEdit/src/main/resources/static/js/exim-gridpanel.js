var EXIMGridPanel = function () {

	return {
		getCutoffForTemplate: function (id, config) {
			var cutoff = {};
			cutoff.orderable = new Ext.ss.grid.CheckColumn({
				header: __messages['label.orderableFlag'],
				dataIndex: 'orderable',
				align: 'center',
				width: 150
			});

			cutoff.sm = new Ext.ss.grid.CheckboxSelectionModel({
				hidden: true,
				onEnterHorizontal:true
			});

			cutoff.columns = [cutoff.sm, {
				header: __messages['label.division'],
				dataIndex: 'divisionCode',
				align: 'center',
				width: 100
			},{
				header: __messages['label.promotionEstimatedSalesEventStartDate'],
				dataIndex: 'promotionEstimatedSalesEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.breakDownDuration'],
				dataIndex: 'breakDownDuration',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.startFeedbackDateFlathFeedbackDuration'],
				dataIndex: 'startFeedbackDateFlathFeedbackDuration',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.deliveryDateEventStartDate'],
				dataIndex: 'deliveryDateEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.assortmentListEventStartDate'],
				dataIndex: 'assortmentListEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.priceEventStartDate'],
				dataIndex: 'priceEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},cutoff.orderable];
			
			cutoff.store = new Ext.data.JsonStore({
				storeId: 'cutoffStore',
				idProperty: 'divisionCode',
				fields: [
				    {name:'divisionCode'},
				    {name:'promotionEstimatedSalesEventStartDate', allowBlank: false},
				    {name:'deliveryDateEventStartDate', allowBlank: false},
				    {name:'breakDownDuration', allowBlank: false},
				    {name:'assortmentListEventStartDate', allowBlank: false},
				    {name:'startFeedbackDateFlathFeedbackDuration', allowBlank: false},
				    {name:'priceEventStartDate', allowBlank: false},
				    {name:'orderable', allowBlank: false}
				],
				url: application.contextPath + '/gridpanel.html',
				baseParams: {
					method: 'cutoffForTemplate'
				}
			});
			
			cutoff.grid = new Ext.ss.grid.EditorGridPanel({
				store: cutoff.store,
				columns: cutoff.columns,
				sm : cutoff.sm,
				height: 215,
				plugins:[cutoff.orderable],
				viewConfig: {
					forceFit: true
				}
			});
			
			return cutoff.grid;
		},
		getCutoffForEvent: function (id, config) {
			var cutoff = {};
			cutoff.orderable = new Ext.ss.grid.CheckColumn({
				header: __messages['label.orderableFlag'],
				dataIndex: 'orderable',
				align: 'center',
				width: 150
			});

			cutoff.sm = new Ext.ss.grid.CheckboxSelectionModel({
				hidden: true,
				onEnterHorizontal:true
			});

			cutoff.columns = [cutoff.sm, {
				header: __messages['label.division'],
				dataIndex: 'divisionCode',
				align: 'center',
				width: 100
			},{
				header: __messages['label.promotionEstimatedSalesEventStartDate'],
				dataIndex: 'promotionEstimatedSalesEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.breakDownDuration'],
				dataIndex: 'breakDownDuration',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.startFeedbackDateFlathFeedbackDuration'],
				dataIndex: 'startFeedbackDateFlathFeedbackDuration',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.deliveryDateEventStartDate'],
				dataIndex: 'deliveryDateEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.assortmentListEventStartDate'],
				dataIndex: 'assortmentListEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},{
				header: __messages['label.priceEventStartDate'],
				dataIndex: 'priceEventStartDate',
				align: 'right',
				width: 200,
				renderer: Ext.util.Format.numberRenderer('0,0.00'),
				editor: {
					xtype:'ss-numberfield',
					integerPrecision: 5,
					decimalPrecision: 2,
					allowNegative: false
				}
			},cutoff.orderable];
			
			cutoff.store = new Ext.data.JsonStore({
				storeId: 'cutoffStore',
				idProperty: 'divisionCode',
				fields: [
				    {name:'divisionCode'},
				    {name:'promotionEstimatedSalesEventStartDate', allowBlank: false},
				    {name:'deliveryDateEventStartDate', allowBlank: false},
				    {name:'breakDownDuration', allowBlank: false},
				    {name:'assortmentListEventStartDate', allowBlank: false},
				    {name:'startFeedbackDateFlathFeedbackDuration', allowBlank: false},
				    {name:'priceEventStartDate', allowBlank: false},
				    {name:'orderable', allowBlank: false}
				],
				url: application.contextPath + '/gridpanel.html',
				baseParams: {
					method: 'cutoffForEvent'
				}
			});
			
			cutoff.grid = new Ext.ss.grid.EditorGridPanel({
				store: cutoff.store,
				columns: cutoff.columns,
				sm : cutoff.sm,
				height: 215,
				plugins:[cutoff.orderable],
				viewConfig: {
					forceFit: true
				}
			});
			
			return cutoff.grid;
		}
	};
}();