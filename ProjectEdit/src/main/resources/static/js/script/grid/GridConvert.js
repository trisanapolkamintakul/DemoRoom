var GridConvert = {};

if (!GridConvert.loadMask) {
	GridConvert.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

GridConvert.getRecordsDestroy = function(store){
	var arrayResult = [];
	$.each(store.createRecordParameters().destroy, function( key, value ) {
		arrayResult.push(value.data);
	});
	return arrayResult;
}

GridConvert.getRecordsCreate = function(store){
	var arrayResult = [];
	$.each(store.createRecordParameters().create, function( key, value ) {
		arrayResult.push(value.data);
	});
	return arrayResult;
}

GridConvert.getRecordsModify = function(store){
	var arrayResult = [];
	$.each(store.createRecordParameters().update, function( key, value ) {
		arrayResult.push(value.data);
	});
	return arrayResult;
}

GridConvert.save = function(grid, params, callback){
//	if(!!grid.isDirty()){
		GridConvert.loadMask.show();
		var store = grid.getStore();
		params.gridStore_jsonCreateRecords = JSON.stringify(GridConvert.getRecordsCreate(store));
		params.gridStore_jsonDestroyRecords = JSON.stringify(GridConvert.getRecordsDestroy(store));
		params.gridStore_jsonUpdateRecords = JSON.stringify(GridConvert.getRecordsModify(store));
		
		Ext.Ajax.request({
		     method: 'POST',
		     params: params,
		     url: store.url,
		     success: function (response) {
		    	GridConvert.loadMask.hide();
		    	var json = Ext.decode(response.responseText);
		    	if(BeanUtils.isEmpty(callback)){
		    		 Ext.Msg.alert(__messages['title.information'], __messages['message.saveSuccessfully']);
		 		}else{
		 			 Ext.Msg.alert(__messages['title.information'], __messages['message.saveSuccessfully'], function(){callback(json)});
		 		}
		     },
		     failure: function (response) {
		    	 GridConvert.loadMask.hide();
//		         var json = Ext.decode(response.responseText);
		         Ext.Msg.alert(__messages['title.information'], 'Please cotact admin.');
		     }
		});
//	}
}

GridConvert.add = function(grid){
	 if(!BeanUtils.isEmpty(grid.getPagingToolbar())){
     	if(!BeanUtils.equals(-1, grid.store.createRecordParameters())){
     		if(grid.store.createRecordParameters().create.length >= 1 || orderDetail.grid.store.createRecordParameters().destroy.length >= 1
     				|| orderDetail.grid.store.createRecordParameters().update.length >= 1){
     			grid.add({}, function(){});
     		}else{
     			if(BeanUtils.equals(0, orderDetail.grid.getPagingToolbar().store.getTotalCount())){
     				grid.add({}, function(){});
     			}else{
     				grid.getPagingToolbar().moveLast();
         			setTimeout(function(){
         				grid.add({}, function(){});
         			}, 1000);
     			}
     		}
     	}else{
     		grid.add({}, function(){});
     	}
     }else{
    	 grid.add({}, function(){});
     }
}