backFunction = function(){
	location.href = "orderHeader.html"
} 

application.toolbar.fn['Create Order'] = function(){
	   location.href = orderDetail.defaultUrl
}

orderDetail.addGrid = function(){
	
//	if(!BeanUtils.equals(-1, orderDetail.grid.store.createRecordParameters())){
//		if(orderDetail.grid.store.createRecordParameters().create.length >= 1){
//			orderDetail.grid.add({}, function(){});
//		}else{
//			orderDetail.grid.getPagingToolbar().moveLast();
//			setTimeout(function(){
//				orderDetail.grid.add({}, function(){});
//			}, 1000);
//		}
//	}else{
//		orderDetail.grid.add({}, function(){});
//	}
	GridConvert.add(orderDetail.grid);
//	orderDetail.grid.add({}, function(){});
}

saveFunction = function(){
		if(//orderDetail.grid.getStore().isValid() &&
				orderDetail.orderName.isValid() && orderDetail.periodDateComboBox.isValid()){
			if(orderDetail.grid.isDirty() ||
					orderDetail.orderName.isDirty() ||  orderDetail.periodDateComboBox.isDirty()){
				var prams = { method: 'orderDetailGrid', xaction: 'save'};
				prams.hyOrdhId = orderDetail.orderhId.getValue();
				prams.hyPeriodId = orderDetail.periodDateComboBox.getValue();
				prams.hyOrdhName = orderDetail.orderName.getValue();
				prams.HyOrdhToltalPrice = orderDetail.orderTotalPrice.getValue();
				GridConvert.save(orderDetail.grid, prams,function(value){
					if(!BeanUtils.isEmpty(value.records.valueInteger1)){
//						location.href = orderDetail.defaultUrl+"?hyOrdhId="+value.records.valueInteger1;
						 orderDetail.orderhId.setValue(value.records.valueInteger1);
						 orderDetail.periodDateComboBox.setDisabled(true);
						 searchFunction();
					}
				});
			}	
		}else{
			Ext.Msg.alert(__messages['title.warning'], __messages['message.manadatoryFieldIsRequired']);
		}
 }

searchFunction = function(){
	 searchHeader();
	 searchDetail();
}
 
 searchHeader = function(){
	 orderDetail.loadMask.show();
	 var params = {method:'orderDetail', xaction:'read'};
	 params.hyOrdhId = orderDetail.orderhId.getValue();
		Ext.Ajax.request({
		     method: 'POST',
		     params: params,
		     url: orderDetail.url,
		     success: function (response) {
		    	orderDetail.loadMask.hide();
		    	var json = Ext.decode(response.responseText);
		    	orderDetail.orderhId.setValue(json.records[0].hyOrdhId);
		    	orderDetail.orderName.setValue(json.records[0].hyOrdhName);
		    	orderDetail.orderName.originalValue = json.records[0].hyOrdhName;
		    	orderDetail.orderTotalPrice.setValue(json.records[0].hyOrdhToltalPrice);
		    	orderDetail.hyPeriodPrice2.setValue(json.records[0].hyPeriodPrice2);
		    	orderDetail.hyPeriodPrice3.setValue(json.records[0].hyPeriodPrice3);
		    	orderDetail.periodDateComboBox.value = json.records[0].hyPeriodId;
		    	orderDetail.periodDateComboBox.setRawValue(json.records[0].hyPeriodName);
		    	orderDetail.periodDateComboBox.setValueDescriptionField(DateUtils.convertDateFormatDDMMYYYY(json.records[0].hyPeriodDate));
		     },
		     failure: function (response) {
		    	 orderDetail.loadMask.hide();
//		         var json = Ext.decode(response.responseText);
		         Ext.Msg.alert(__messages['title.information'], 'Please cotact admin.');
		     }
		});
 }
 
 searchDetail = function(){
	 orderDetail.grid.load({
         xaction: 'search',
         method: 'orderDetailGrid',
         hyOrdhId  :  orderDetail.orderhId.getValue()
	  }, function () {});
 }
 
 checkValueGrid = function(e){
	 if(BeanUtils.equals(e.field, 'hyOrddLottery')){
		 if(!BeanUtils.equals(e.value, e.originalValue)){
			 e.record.set('hyOrddTop', 0);
			 e.record.set('hyOrddReverse', 0);
			 e.record.set('hyOrddUnder', 0);
		 }
	 }
	 
	 if(BeanUtils.equals(e.field, 'hyOrddTop') || BeanUtils.equals(e.field, 'hyOrddReverse') || BeanUtils.equals(e.field, 'hyOrddUnder')){
		 if(!BeanUtils.isNull(e.record.data.hyOrddLottery)){
			if(BeanUtils.equals(e.record.data.hyOrddLottery.length, 2)){
				if(e.value > orderDetail.hyPeriodPrice2.getValue()){
					Ext.Msg.alert(__messages['title.information'], 'Input price over than setup price.', function(){
						e.record.set(e.field, 0);
					});
				}
	 		}else if(BeanUtils.equals(e.record.data.hyOrddLottery.length, 3)){
	 			if(e.value > orderDetail.hyPeriodPrice3.getValue()){
					Ext.Msg.alert(__messages['title.information'], 'Input price over than setup price.', function(){
						e.record.set(e.field, 0);
					});
				}
	 		}
		 }else{
		 	Ext.Msg.alert(__messages['title.information'], 'Please input lottery number.');
		 }
	 }
 }
 
// sumTotalPrice = function(){
//	 var sumTopPrice = 0;
//	 var sumReversePrice = 0;
//	 var sumUnderPrice = 0;
//	 $.each( orderDetail.grid.store.data.items, function( key, value ) {
//		 sumTopPrice += value.data.hyOrddTop;
//		 sumReversePrice += value.data.hyOrddReverse;
//	     sumUnderPrice += value.data.hyOrddUnder;
//	 });
//	
//	 orderDetail.orderTotalPrice.setValue(sumTopPrice+sumReversePrice+sumUnderPrice);
// }
 
 queryTotalPrice = function(){
	 orderDetail.loadMask.show();
	 var params = {method:'orderDetailSumPrice', xaction:'read'};
	 params.hyOrdhId = orderDetail.orderhId.getValue();
		Ext.Ajax.request({
		     method: 'POST',
		     params: params,
		     url: orderDetail.url,
		     success: function (response) {
		    	orderDetail.loadMask.hide();
		    	var json = Ext.decode(response.responseText);
		    	 orderDetail.orderTotalPrice.setValue(json.hyOrddTopSum+json.hyOrddReverseSum+json.hyOrddUnderSum);
		     },
		     failure: function (response) {
		    	 orderDetail.loadMask.hide();
		         Ext.Msg.alert(__messages['title.information'], 'Please cotact admin.');
		     }
		});
 }
 
 Ext.onReady(function () { 
	 if(!BeanUtils.isEmpty(headerId)){
		 orderDetail.orderhId.setValue(headerId);
		 orderDetail.periodDateComboBox.setDisabled(true);
		 searchHeader();
		 searchDetail();
	 }
	
 });