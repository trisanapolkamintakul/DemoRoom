home.render = function(){
	home.field();
	var params = {method: 'searchCalendar', url: 'calendarController.html'};
	var cmp = {dateFrom: home.dateFromCalendar, timeFrom: home.timeFromField};
	//prm 1: query Calendar data, 2: add cmp window, 3: cmp dateFrom and timeFrom, 4: search Function edit time.
	CalendarRender.render(params, home.addFormWindow, cmp, home.search); 
}

home.save = function(){
	params= {};
	params.url = 'calendarController.html';
	params.xaction = 'save';
	params.method = 'saveCalendar';
	params.id = CalendarRender.idCalendar.getValue();
	params.start = (BeanUtils.isNotEmpty(CalendarRender.dateCalendar.getValue()) ? DateUtils.convertDateFormatYYYYMMDD(CalendarRender.dateCalendar.getValue()) : '');
	$.ajax({
	    type: 'POST',
	    url: params.url,
	    data: params,
	    success: function(response){
	    	var json = Ext.decode(response);
	    	window.location.reload();
	    },
	    error: function (jqXHR, textStatus, errorThrown){
//	    	var messErr = 'Error System';
//	    	if(BeanUtils.isNull(params.messageError)){
//	    		messErr = params.messageError;
//	    	}
//	    	SSJs.component.MessageBox.alert('Error',messErr);
	    	CalendarRender.loadMask.hide();
	    }
	});
}

home.search = function(idCalendar){
	home.clearValue();
	params= {};
	params.url = 'calendarController.html';
	params.xaction = 'read';
	params.method = 'searchCalendar';
	params.id = idCalendar;
	
	if(BeanUtils.isNotEmpty(idCalendar)){
		$.ajax({
		    type: 'POST',
		    url: params.url,
		    data: params,
		    success: function(response){
		    	var json = Ext.decode(response);
		    	home.code.setValue(json.records[0].title);
		    	home.desc.setValue(json.records[0].TOPIC);
		    	home.dateFromCalendar.setValue(new Date(json.records[0].startDate));
		    	home.timeFromField.setValue(json.records[0].startTime.split(':')[0]+''+json.records[0].startTime.split(':')[1]);
		    	home.dateToCalendar.setValue(new Date(json.records[0].endDate));
		    	home.timeToField.setValue(json.records[0].endTime.split(':')[0]+''+json.records[0].endTime.split(':')[1]);
		    },
		    error: function (jqXHR, textStatus, errorThrown){
	//	    	var messErr = 'Error System';
	//	    	if(BeanUtils.isNull(params.messageError)){
	//	    		messErr = params.messageError;
	//	    	}
	//	    	SSJs.component.MessageBox.alert('Error',messErr);
		    	CalendarRender.loadMask.hide();
		    }
		});
	}
	
}

home.exit = function(){
	home.addFormWindow.hide();
}

home.clearValue = function(){
	home.code.reset();
	home.desc.reset();
	home.dateFromCalendar.reset();
	home.timeFromField.reset();
	home.dateToCalendar.reset();
	home.timeToField.reset();
}