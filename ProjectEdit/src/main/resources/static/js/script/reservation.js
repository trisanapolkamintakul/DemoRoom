/*pareDate = function(date){
	var date = new Date(date);
	var dateString = date.getDate();
	var monthString = date.getMonth();
	var yearString = date.getFullYear();
	var fullDateString = dateString+'-'+monthString+'-'+yearString;
	return fullDateString;
}*/

checkEdit = function(e) {
	var rw = e.row;
	if ((reser.grid.store.data.itemAt(rw).data.RSVSTATUS == "Not Approved") || (reser.grid.store.data.itemAt(rw).data.RSVSTATUS == "Approved")) {
		$.each(reser.grid.store.data.items,
			function(i) {
					$.each(reser.grid.store.data.items[i].data,
						function(key, val) {
						reser.grid.getColumnModel().setEditable('1', false);
						reser.grid.getColumnModel().setEditable('2', false);
						reser.grid.getColumnModel().setEditable('3', false);
						reser.grid.getColumnModel().setEditable('4', false);
						reser.grid.getColumnModel().setEditable('5', false);
						});
			});
	} 
//	if (reser.grid.store.data.itemAt(rw).data.RSVSTATUS == "Wait") {
//		$.each(reser.grid.store.data.items,
//			function(i) {
//					$.each(reser.grid.store.data.items[i].data,
//						function(key, val) {
//						reser.grid.getColumnModel().setEditable('1', true);
//						reser.grid.getColumnModel().setEditable('2', true);
//						reser.grid.getColumnModel().setEditable('3', true);
//						reser.grid.getColumnModel().setEditable('4', true);
//						reser.grid.getColumnModel().setEditable('5', true);
//						});
//			});
//	} 
}



saveFunction = function() {
	console.log(reser.Date.getValue());
	var date = new Date(reser.Date.getValue()).format("Y-m-d")
	console.log(date);
	var params = {
		method : 'save',

		// id : reser.id.getValue(),
		room : reser.MeetingRoom.getValue(),
		// roomavailable : reser.getValue(roomavailable)
		
		
		dateavailable : reser.Date.getRawValue(),	
		startID : reser.startID.getValue(),
		endtime : reser.endTime.getValue(),
		RSVTOPIC : reser.RSVTOPIC.getValue(),

	};
	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : reser.url,
		success : function(response) {
			alert('Save Success');
			searchFunction();
			location.reload();
		},
		failure : function(response) {
			alert('Save failure');
		}
	});

}

updateFunction = function() {

	var selected = reser.store.data.items;
	var Excerpt = [];
	Ext.each(selected, function(item) {
		var Obj = {
			id : item.get('id'),
			dateavailable : item.get('dateavailable'),
			room : item.get('room'),
			startID : item.get('startID'),
			endtime : item.get('endtime'),
			userName : item.get('userName'),
			RSVTOPIC : item.get('RSVTOPIC'),
			RSVSTATUS : item.get('RSVSTATUS')
		};
		Excerpt.push(Obj);
	}, this);
	//console.log('update');
	//console.log(Excerpt);
	var params = {
			
		savegrid1 : Ext.encode(Excerpt),
		method : 'update'
	};
	Ext.Ajax.request({
		params : params,
		url : reser.url,
		Success : function(response, opts) {
			location.reload();
		},
		Failure : function(response, opts) {
		}
	});

}

searchFunction = function() {
	var params = {
		method : 'search'
//		search : reser.search.getValue(),

	};

	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : reser.url,
		success : function(response, opts) {
			var json = Ext.util.JSON.decode(response.responseText);
			// alert('search Success');

			reser.grid.store.loadData(json)
		},
		failure : function(response, opts) {
			alert('Search Failure');			
		}
	});
}

savegrid1Function = function() {

	var selected = reser.store.data.items;
	var Excerpt = [];
	Ext.each(selected, function(item) {
		var Obj = {
				id : item.get('id'),
				dateavailable : item.get('dateavailable'),
				room : item.get('room'),
				startID : item.get('startID'),
				endtime : item.get('endtime'),
				userName : item.get('userName'),
				RSVTOPIC : item.get('RSVTOPIC'),
				RSVSTATUS : item.get('RSVSTATUS')

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
		url : reser.url,
		success : function(response) {
			alert('Update Success');
			searchFunction();
		},
		failure : function(response) {
			alert('Update Failure');
		}
	});
}
removeReservation = function() {// Delete

	Ext.Msg.confirm("Confirmation", "Confirm delete?", function(btnText) {
		if (btnText === "no") {
		} else if (btnText === "yes") {
			var selects = reser.grid.getSelectionModel().getSelections();
			var count = selects.length;
			var id = new Array();

			for (var i = 0; i < count; i++) {

				id[i] = selects[i].data.id;

				reser.grid.getStore().remove(selects[i]);

			}
			var code = new Array();
			code = id;

			var params = {
				code : id,
				method : 'removeReservation'
			};
			Ext.Ajax.request({
				method : 'POST',
				params : params,
				url : reser.url,
				success : function(response) {
					location.reload();
					// equiDtl.loadMask.hide();
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
});
