var roomDtl = {};
roomDtl.url = application.contextPath + '/roomdetail.html';


roomDtl.roomDtlCompo = function() {
	
	roomDtl.code = new Ext.form.TextField({
		id : 'code',

	});
	
	roomDtl.type = new Ext.form.TextField({
		id : 'type',

	});
	
	roomDtl.name = new Ext.form.TextField({
		id : 'name',

	});

	roomDtl.detail = new Ext.form.TextField({
		id : 'detail',

	});
	
	roomDtl.location = new Ext.form.TextField({
		id : 'location',

	});
	
	roomDtl.amount = new Ext.form.TextField({
		id : 'amount',

	});

	roomDtl.search = new Ext.form.TextField({
		id : 'dataSearch',
		fieldLabel : "ค้นหาชื่อห้อง",
	});
	
	roomDtl.roomtypeCombobox = new BaseComboBox.getRoomTypeCombobox(
			'roomtypeCombobox', {});

	roomDtl.sm = new Ext.ss.grid.CheckboxSelectionModel({});
	roomDtl.columns = [ roomDtl.sm, {		
		header : "รหัส",
		dataIndex : 'rmCode',
		align : 'center',
		editor : roomDtl.code
	}, {	
		header : "ประเภท",
		dataIndex : 'rmType',
		align : 'center',
		editor : roomDtl.roomtypeCombobox
	}, {
		header : "ชื่อห้อง",
		dataIndex : 'rmName',
		align : 'center',
		editor : roomDtl.name

	}, {
		header : "รายละเอียดห้อง",
		dataIndex : 'rmDetail',
		align : 'center',
		editor : roomDtl.detail
	}, {
		header : "สถานที่",
		dataIndex : 'rmLocation',
		align : 'center',
		editor : roomDtl.location
	}, {
		header : "จำนวนที่นั่ง",
		dataIndex : 'rmAmount',
		align : 'center',
		editor : roomDtl.amount
	},  ];

	roomDtl.removeButton = new Ext.Button({// buttum
		iconCls : 'remove',
		handler : function() {
			removeRoomDetail();

		}
	});
	
	roomDtl.addButton = new Ext.Button({
		iconCls : 'add',
		handler : function() {
			roomDtl.grid.add({

			});
		}
	});

	roomDtl.saveFunction1 = new Ext.Button({
		iconCls : 'query',
		handler : function() {
			searchFunction();
		}
	});

	roomDtl.saveFunction = new Ext.Button({
		iconCls : 'save',
		handler : function() {
			savegrid1Function();
		}
	});
	
	roomDtl.store = new Ext.data.JsonStore({// เก็บข้อมูลในตาราง
		removeAndSave : true,
		storeId : 'gridStore',
		idProperty : 'itemCd',
		url : roomDtl.url,
		fields : [ {
			name : 'rmCode',
			allowBlank : false
		}, {
			name : 'rmType',
		    allowBlank : false
		},, {
			name : 'rmName',
		    allowBlank : false
		},, {
			name : 'rmDetail',
		}, {
			name : 'rmLocation',
		    allowBlank : false
		}, {
			name : 'rmAmount',
			allowBlank : false
		}, {
			name : 'id'
		} ]
	});

	roomDtl.grid = new Ext.ss.grid.EditorGridPanel({// กำหนดขนาดของตาราง
		// บอกชื่อของตาราง
		id : 'gridId',
		store : roomDtl.store,
		columns : roomDtl.columns,
		sm : roomDtl.sm,
		frame : false,
		stripeRows : true,
		enableColumnMove : false,
		columnLines : true,
		enableHdMenu : false,
		tbar : [ "แก้ไขข้อมูลห้อง", roomDtl.removeButton,
				roomDtl.addButton, roomDtl.saveFunction, "ค้นหาชื่อห้อง",
				roomDtl.search, roomDtl.saveFunction1 ]

		,
		viewConfig : {
			forceFit : true 
		},

		listeners : {
			'beforeedit' : function(e) {
			},
			'afteredit' : function(e) {
			}

		},
		height : 250

	});


}


	


Ext.onReady(function() {
	// searchallFunction();
	if (roleUserSystem == "user") {
		
		roomDtl.roomDtlCompo();
		
		
		roomDtl.grid.getColumnModel().setEditable('1', false);
		roomDtl.grid.getColumnModel().setEditable('2', false);
		roomDtl.grid.getColumnModel().setEditable('3', false);
		roomDtl.grid.getColumnModel().setEditable('4', false);
		roomDtl.grid.getColumnModel().setEditable('5', false);
		roomDtl.grid.getColumnModel().setEditable('6', false);
		roomDtl.grid.topToolbar.destroy()
		roomDtl.grid.getColumnModel().setHidden(0, true);
		
		
		
		roomDtl.allFieldSet = new Ext.form.FieldSet({
			title : 'ห้อง',
			items : [ roomDtl.grid ]
		});
		
		
		roomDtl.formPanel = new Ext.form.FormPanel({
			url : roomDtl.url,
			items : [ roomDtl.allFieldSet3 ],
			plugins : [ new Ext.ux.FitToParent({
				fitHeight : false
			}) ],
			renderTo : 'renderDiv'
		});
	}
	else {
		roomDtl.roomDtlCompo();
		
		roomDtl.allFieldSet = new Ext.form.FieldSet({
			title : 'ห้อง',
			items : [ roomDtl.grid ]
		});
		
		roomDtl.formPanel = new Ext.form.FormPanel({
			url : roomDtl.url,
			items : [ roomDtl.allFieldSet ],
			plugins : [ new Ext.ux.FitToParent({
				fitHeight : false
			}) ],
			renderTo : 'renderDiv'
		});
	}
});
