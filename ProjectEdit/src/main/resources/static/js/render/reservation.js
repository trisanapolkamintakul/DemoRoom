var reser = {};
reser.url = application.contextPath + '/reservation.html';

reser.reserCompo = function() {
//	console.log(new Date());

	reser.Date = new Ext.form.DateField({
		id : 'Date',
		fieldLabel : "วัน/เดือน/ปี",
		minValue : new Date()
	// format:'d/m/Y',
	// listeners : {
	// searchdateFunction();
	// }

	});

	reser.MeetingRoom = new Ext.ss.form.ComboBox({

		width : 150,
		id : 'meetingRoom',
		fieldLabel : "ห้อง",

		store : {
			xtype : 'jsonstore',
			storeId : 'type-store',
			// root : 'records',
			idProperty : 'name',
			fields : [ 'name','code','type' ],
			url : reser.url,

			baseParams : {
				method : 'meetingRoom'
			}
		},
		labelSeparator : ' ',
		triggerAction : 'all',
		emptyText : '',
		mode : 'remote',
		displayField : 'name',
		descriptionField : 'type',
		showDescription: false,
        useOriginalTpl: false,
		// forceSelection : true,
		valueField : 'name',
		//xtype : 'ss-combobox',
		listeners : {
			'beforequery' : function(queryEvent) {
				queryEvent.combo.store.baseParams.roomdate = reser.Date.getRawValue();
				queryEvent.combo.store.baseParams.starttime = reser.startID.getRawValue();
				queryEvent.combo.store.baseParams.endtime = reser.endTime.getRawValue();
				delete reser.MeetingRoom.lastQuery;

			}
		},
		criterionField : true

	});

	reser.roomName = new Ext.form.ComboBox({
		// width : 100,
		id : 'roomName',
		fieldLabel : "ห้อง",
		showDescription : false,
		store : {
			xtype : 'jsonstore',
			storeId : 'type-store',
			// root : 'records',
			idProperty : 'name',
			fields : [ 'name' ],
			url : reser.url,

			baseParams : {
				method : 'meetingroom'

			}

		},
		labelSeparator : ' ',
		triggerAction : 'all',
		emptyText : '',
		mode : 'remote',
		displayField : 'name',
		descriptionField : 'name',
		// forceSelection : true,
		valueField : 'name',
		xtype : 'ss-combobox',
		listeners : {
			'beforequery' : function(queryEvent) {
				queryEvent.combo.store.baseParams.roomdate = reser.Date.getRawValue();
				queryEvent.combo.store.baseParams.starttime = reser.startTime.getRawValue();
				queryEvent.combo.store.baseParams.endtime = reser.endID.getRawValue();
				delete reser.roomName.lastQuery;

			}
		},
		criterionField : true

	});

	reser.startID = new Ext.form.TimeField({
		id : 'startID',
		fieldLabel : "เวลาเริ่ม",
		minValue : '8:00',
		maxValue : '18:00',
		increment : 60,
		format : 'H:i',
		width : 80,
	});

	reser.startTime = new Ext.form.TimeField({
		id : 'startTime',
		fieldLabel : "เวลาเริ่ม",
		minValue : '8:00',
		maxValue : '18:00',
		increment : 60,
		format : 'H:i',
		anchor : '1'
	});

	reser.endTime = new Ext.form.TimeField({
		id : 'endTime',
		fieldLabel : "ถึง",
		minValue : '8:00',
		maxValue : '18:00',
		increment : 60,
		format : 'H:i',
		width : 80,
	});

	reser.endID = new Ext.form.TimeField({
		id : 'endID',
		fieldLabel : "ถึง",
		minValue : '8:00',
		maxValue : '18:00',
		increment : 60,
		format : 'H:i',
		anchor : '1'

	});

	reser.RSVTOPIC = new Ext.form.TextField({
		fieldLabel : "เรื่อง",
		width : 300,
		id : 'RSVTOPIC',

	});
	
	reser.SearchStatus = new Ext.ss.form.ComboBox({
			id : 'SearchStatus',
			fieldLabel : "ค้นหาสถานะ",
			mode : 'local',
			width : 148,
			triggerAction : 'all',
			minChars : 0,
			forceSelection : true,
			valueField : 'RSVSTATUS',
			displayField : 'RSVSTATUS',
			showDescription : false,
			width : 265,
			store: new Ext.data.ArrayStore({
		        id: 0,
		        fields: [
		            'StatusID',
		            'RSVSTATUS'
		        ],
		        data: [[1, 'Not Approved'], [2, 'Approved'], [3, 'Wait']]
		    })
		});
	
	reser.container1 = new Ext.Container({
		layout :'column',
		items:[{
			xtype:'container',
			layout:'form',
			columnWidth:'1',
			labelWidth:0,
			items:[reser.RSVTOPIC ]
		
		}]
	});

	reser.container2 = new Ext.Container({
		layout : 'column',
		items : [

		{
			xtype : 'container',
			layout : 'form',
			columnWidth : 0.2,
			labelWidth:100,
			items : [ reser.Date ]

		}, {
			xtype : 'container',
			layout : 'form',
			columnWidth : 0.15,
			labelWidth:100,
			items : [ reser.startID ]

		}, {
			xtype : 'container',
			layout : 'form',
			columnWidth : 0.15,
			labelWidth:100,                 
			items : [ reser.endTime ]

		}, {
			xtype : 'container',
			layout : 'form',
			columnWidth : 0.2,
			labelWidth:100,
			items : [ reser.MeetingRoom ]

		} ]

	});
	
	reser.FieldSet = new Ext.form.FieldSet({
		title : 'การจอง',
		items : [ reser.container2, reser.container1 ]
	});
	
	reser.saveFunction = new Ext.Button({
		iconCls : 'save',
		handler : function() {
			savegrid1Function();
		}
	});

	// reser.search = new Ext.form.TextField({
	// id : 'search',
	// });

	reser.sm = new Ext.ss.grid.CheckboxSelectionModel({});
	reser.columns = [ reser.sm, {
		header : "วันที่",
		dataIndex : 'dateavailable',
		align : 'center',
		editor : reser.date
	}, {
		header : "เวลาเริ่ม",
		dataIndex : 'startID',
		align : 'center',
		editor : reser.startTime
	}, {
		header : "ถึง",
		dataIndex : 'endtime',
		align : 'center',
		editor : reser.endID
	}, {
		header : "ห้อง",
		dataIndex : 'room',
		align : 'center',
		editor : reser.roomName
	},  {
		header : "สถานะ",
		dataIndex : 'RSVSTATUS',
		align : 'center',
		editor : reser.SearchStatus
	} ];

	reser.removeButton = new Ext.Button({// button
		iconCls : 'remove',
		handler : function() {
			removeReservation();

		}
	});

	reser.store = new Ext.data.JsonStore({// เก็บข้อมูลในตาราง
		removeAndSave : true,
		storeId : 'gridStore',
		idProperty : 'itemCd',
		url : reser.url,
		fields : [ {
			name : 'dateavailable'
		}, {
			name : 'room'
		}, {
			name : 'startID'
		}, {
			name : 'endtime'
		},  {
			name : 'id'
		}, {
			name : 'RSVTOPIC'
		}, {
			name : 'RSVSTATUS'
		} ]
	});

	reser.grid = new Ext.ss.grid.EditorGridPanel({// กำหนดขนาดของตาราง
		// บอกชื่อของตาราง
		id : 'gridId',
		store : reser.store,
		columns : reser.columns,
		sm : reser.sm,
		frame : false,
		stripeRows : true,
		enableColumnMove : false,
		columnLines : true,
		enableHdMenu : false,
		tbar : [ "ข้อมูนการจอง", reser.removeButton, "Update =",
				reser.saveFunction ],
		viewConfig : {
			forceFit : true
		},

		listeners: {
			beforeedit: function (e) {
	            checkEdit(e);
	          },
	          cellclick: function(grid, rowIndex, columnIndex, e){
	        	    reser.grid.getColumnModel().setEditable('1', true);
					reser.grid.getColumnModel().setEditable('2', true);
					reser.grid.getColumnModel().setEditable('3', true);
					reser.grid.getColumnModel().setEditable('4', true);
					reser.grid.getColumnModel().setEditable('5', true);
	          }
	        },
		height : 250

	});

}

Ext.onReady(function() {

	reser.reserCompo();


	if (roleUserSystem == "admin") {
		
		reser.allFieldSet = new Ext.form.FieldSet({
			title : 'การจองห้อง',
			items : [ reser.FieldSet , reser.grid ]
		});
		
		reser.FieldSet.destroy()
//		reser.grid.topToolbar.destroy()
		
//		reser.grid.getColumnModel().setEditable('1', false);
//		reser.grid.getColumnModel().setEditable('2', false);
//		reser.grid.getColumnModel().setEditable('3', false);
//		reser.grid.getColumnModel().setEditable('4', false);
//		reser.grid.getColumnModel().setEditable('5', false);
//		reser.grid.getColumnModel().setHidden(0, true);
		
		application.toolbar.button.saveButton.destroy();
	}
	
	if (roleUserSystem == "user") {
		
		reser.allFieldSet = new Ext.form.FieldSet({
			title : 'ห้อง',
			items : [ reser.FieldSet , reser.grid ]
		});
		
		reser.grid.topToolbar.destroy()
		
//		reser.grid.getColumnModel().setEditable('1', false);
//		reser.grid.getColumnModel().setEditable('2', false);
//		reser.grid.getColumnModel().setEditable('3', false);
//		reser.grid.getColumnModel().setEditable('4', false);
		
//		reser.grid.getColumnModel().setEditable('6', false);
//		reser.grid.getColumnModel().setHidden(0, true);
		
//		application.toolbar.button.saveButton.destroy();
	}

	reser.formPanel = new Ext.form.FormPanel({
		url : reser.url,
		items : [ reser.allFieldSet ],
		plugins : [ new Ext.ux.FitToParent({
			fitHeight : false
		}) ],
		renderTo : 'renderDiv'
	});
});
