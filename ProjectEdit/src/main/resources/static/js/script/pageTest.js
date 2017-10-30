
  if (!ext.loadMask) {
	  ext.loadMask = new Ext.LoadMask(Ext.getBody(), {
	        msg: __messages['message.processing']
	    });
  }

searchFunction = function(){
	 ext.loadMask.show();
	 var params = {
			  method: 'search'
		      ,name: 'BOY'
	 };
	 
	 Ext.Ajax.request({
	        method: 'POST',
	        params: params,
	        url: ext.url,
	        success: function (response) {
	        	ext.loadMask.hide();
	            var json = Ext.decode(response.responseText);
	            console.log(json);
//	            ext.grid.store.loadData(json)
	        },
	        failure: function (response) {
	        	ext.loadMask.hide();
//	            var json = Ext.decode(response.responseText);
//	            Ext.Msg.alert(json.title, json.message);
//	            if (errorHandler && Ext.isFunction(errorHandler)) {
//	                errorHandler.call(this, json);
//	            }
	        }
	    });
}

saveFunction = function(){
	console.log('saveFunction');
}

//Ext.onReady(function(){
//	console.log(Ext.getCmp('textName'));
//});