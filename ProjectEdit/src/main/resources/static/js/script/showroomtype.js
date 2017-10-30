searchFunction = function() {
	var params = {
		method : 'search',
		search : showroomtype.search.getValue()

	};

	Ext.Ajax.request({
		method : 'POST',
		params : params,
		url : showroomtype.url,
		success : function(response, opts) {
			var json = Ext.util.JSON.decode(response.responseText);// รับค่าresponseมาใส่ในjson
			// alert('search Success');

			showroomtype.grid.store.loadData(json)// โหลดข้อมูลโชว์ในตาราง
		},
		failure : function(response, opts) {
			alert('Search Failure');
		}
	});
}

function renderInstall(value, metaData, record, row, col, store, gridView) {
	return ('<a href="' + showroomtype.urlRoomType + '?RMID='
			+ record.data.id + '" class="btn btn-primary btn-xs" >อุปกรณ์ภายในห้อง</a>');
}

Ext.onReady(function() {
	searchFunction();
});