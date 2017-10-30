searchFunction = function(){
	
	  period.grid.load({
          xaction: 'read',
          method: 'periodGrid',
          periodName  : period.periodName.getValue(),
//          periodDate  : (BeanUtils.isNotEmpty(period.periodDate.getValue()) ? period.periodDate.getValue().dateFormat(application.formatDate) : "")
          periodDate  : period.periodDate.getRawValue()
	  }, function () {});
	
}

period.save = function(){
	if(period.grid.getStore().isValid()){
		if(!!period.grid.isDirty()){
			GridConvert.save(period.grid, {
				 method: 'periodGrid',
				 xaction: 'save'
			},function(){
				searchFunction();
			});
		}	
	}else{
		Ext.Msg.alert(__messages['title.warning'], __messages['message.manadatoryFieldIsRequired']);
	}
}

