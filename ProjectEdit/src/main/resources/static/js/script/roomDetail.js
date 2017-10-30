saveFunction = function() {
	var params = {
		method : 'save',
		code : roomDtl.code.getValue(),
		type : roomDtl.type.getValue(),
		name : roomDtl.name.getValue(),
		detail : roomDtl.detail.getValue(),
		location : roomDtl.location.getValue(),
		amount : roomDtl.amount.getValue()
	};
	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : roomDtl.url,
		success : function(response) {
			alert('save Success');
		},
		failure : function(response) {
			alert('save failure');
		}
	});

}

deleteFunction = function() {
	var params = {
		method : 'delete',
		code : roomDtl.code.getValue(),
		type : roomDtl.type.getValue(),
		name : roomDtl.name.getValue(),
		detail : roomDtl.detail.getValue(),
		location : roomDtl.location.getValue(),
		amount : roomDtl.amount.getValue()
	};
	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : roomDtl.url,
		success : function(response) {
			alert('delete Success');
		},
		failure : function(response) {
			alert('delete failure');
		}
	});

}

updateFunction = function() {
	var params = {
		method : 'update',
		code : roomDtl.code.getValue(),
		type : roomDtl.type.getValue(),
		name : roomDtl.name.getValue(),
		detail : roomDtl.detail.getValue(),
		location : roomDtl.location.getValue(),
		amount : roomDtl.amount.getValue()
	};

	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : roomDtl.url,
		success : function(response) {
			alert('update Success');
		},
		failure : function(response) {
			alert('update failure');
		}
	});

}

searchFunction = function() {
	var params = {
		method : 'search',
		search : roomDtl.search.getValue()

	};

	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : roomDtl.url,
		success : function(response, opts) {
			var json = Ext.util.JSON.decode(response.responseText);// รับค่าresponseมาใส่ในjson
			// alert('search Success');

			roomDtl.grid.store.loadData(json)// โหลดข้อมูลโชว์ในตาราง
		},
		failure : function(response, opts) {
			alert('Search Failure');
		}
	});
}

searchallFunction = function() {
	// alert("cccc");
	var params = {
		method : 'searchall'

	};

	Ext.Ajax.request({
		method : 'POST',
		params : params,		url : roomDtl.url,
		success : function(response, opts) {
			var json = Ext.util.JSON.decode(response.responseText);// รับค่าresponseมาใส่ในjson
			// alert('Search Success');

			roomDtl.grid.store.loadData(json)// โหลดข้อมูลโชว์ในตาราง
		},
		failure : function(response, opts) {
			alert('Search failure');
	
		}
	});
}

//searchallFunction2 = function() {
	 //alert("cccc");
//	var params = {
//		method : 'searchall2'

//	};

//	Ext.Ajax.request({
//		method : 'POST',
//		params : params,
//		url : roomDtl.url,
//		success : function(response, opts) {
//			var json = Ext.util.JSON.decode(response.responseText);// รับค่าresponseมาใส่ในjson
			// alert('Search Success');

//			equiDtl.grid.store.loadData(json)// โหลดข้อมูลโชว์ในตาราง
//		},
//		failure : function(response, opts) {
//			alert('Search failure');
//		}
//	});
//}

savegrid1Function = function() {// edit ข้อมูลในตาราง

	var selected = roomDtl.store.data.items;
	var Excerpt = [];
	Ext.each(selected, function(item) {
		var Obj = {
			id : item.get('id'),
			name : item.get('rmName'),
			type : item.get('rmType'),
			detail : item.get('rmDetail'),
			location : item.get('rmLocation'),
			code : item.get('rmCode'),
			amount : item.get('rmAmount'),
			active : item.get('rmActive'),
		// ต้องตรงกับหน้าMapping
		};
		Excerpt.push(Obj);// วนหาobject
	}, this);

	var params = {

		savegrid1 : Ext.encode(Excerpt),
		method : 'savegrid1'
	};
	Ext.Ajax.request({
		params : params,
		url : roomDtl.url,
		success : function(response, opts) {
			alert('Save Successful');
			location.reload();
		},
		failure : function(response, opts) {
			alert('Save Failure');
		}
	});
}
removeRoomDetail = function() {

	Ext.Msg.confirm("Confirmation", "Confirm delete?", function(btnText) {
		if (btnText === "no") {
		} else if (btnText === "yes") {
			var selects = roomDtl.grid.getSelectionModel().getSelections();
			var count = selects.length;
			var id = new Array();

			for (var i = 0; i < count; i++) {

				id[i] = selects[i].data.id;

				roomDtl.grid.getStore().remove(selects[i]);

			}
			var code = new Array();
			code = id;

			var params = {
				code : id,
				method : 'removeRoom'
			};
			Ext.Ajax.request({
				method : 'POST',
				params : params,
				url : roomDtl.url,
				
				success : function(response) {
					location.reload();
//					roomDtl.loadMask.hide();
					var json = Ext.decode(response.responseText);

				},
				failure : function(response) {

					ST001.loadMask.hide();

				}
			});
		}

	}, this);

};



Ext.onReady(function() {
	searchFunction();
	if (roleUserSystem == "user") {
		searchallFunction();
	}
});
