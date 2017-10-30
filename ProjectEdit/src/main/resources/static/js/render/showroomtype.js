var showroomtype = {};
showroomtype.url = application.contextPath + '/showroomtype.html';
showroomtype.urlRoomType = application.contextPath + '/equipmentfix.html';

showroomtype.showroomtypeCompo = function() {
	
	showroomtype.code = new Ext.form.TextField({
		id : 'code',

	});
	
	showroomtype.type = new Ext.form.TextField({
		id : 'type',

	});
	
	showroomtype.name = new Ext.form.TextField({
		id : 'name',

	});

	showroomtype.detail = new Ext.form.TextField({
		id : 'detail',

	});
	
	showroomtype.location = new Ext.form.TextField({
		id : 'location',

	});
	
	showroomtype.amount = new Ext.form.TextField({
		id : 'amount',

	});
	
	showroomtype.search = new Ext.form.TextField({
		id : 'dataSearch'
			
	});

	showroomtype.sm = new Ext.ss.grid.CheckboxSelectionModel({});
	showroomtype.columns = [ {	
		header : "รหัส",
		dataIndex : 'rmCode',
		align : 'center',
	}, {	
		header : "ประเภท",
		dataIndex : 'rmType',
		align : 'center',
	}, {
		header : "ชื่อห้อง",
		dataIndex : 'rmName',
		align : 'center',

	}, {
		header : "รายละเอียดห้อง",
		dataIndex : 'rmDetail',
		align : 'center',
	}, {
		header : "สถานที่",
		dataIndex : 'rmLocation',
		align : 'center',
	}, {
		header : "จำนวนที่นั่ง",
		dataIndex : 'rmAmount',
		align : 'center',
	}, {		
		header : "ห้อง",
		dataIndex : 'id',
		align : 'center',
		renderer : renderInstall
	}  ];
	
	showroomtype.store = new Ext.data.JsonStore({// เก็บข้อมูลในตาราง
		removeAndSave : true,
		storeId : 'gridStore',
		idProperty : 'itemCd',
		url : showroomtype.url,
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

	showroomtype.grid = new Ext.ss.grid.EditorGridPanel({// กำหนดขนาดของตาราง
		// บอกชื่อของตาราง
		id : 'gridId',
		store : showroomtype.store,
		columns : showroomtype.columns,
		sm : showroomtype.sm,
		frame : false,
		stripeRows : true,
		enableColumnMove : false,
		columnLines : true,
		enableHdMenu : false,
		tbar : [ ]

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
		height : 200

	});
}
Ext.onReady(function() {
	showroomtype.showroomtypeCompo();

	showroomtype.allFieldSet = new Ext.form.FieldSet({
		title : 'Rooms',
		items : [ showroomtype.grid ]
	});

	showroomtype.formPanel = new Ext.form.FormPanel({
		url : showroomtype.url,
		items : [ showroomtype.allFieldSet ],
		plugins : [ new Ext.ux.FitToParent({
			fitHeight : false
		}) ],
		renderTo : 'renderDiv'
	});
});