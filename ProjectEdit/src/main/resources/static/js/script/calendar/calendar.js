var CalendarRender = {};
CalendarRender.method = '';
CalendarRender.xaction = '';
CalendarRender.url = '';

if (!CalendarRender.loadMask) {
	CalendarRender.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

CalendarRender.component = function(){
	
	CalendarRender.idCalendar = new Ext.form.TextField({
		id : 'idCalendar',
		hidden: true
	});
	
	CalendarRender.dateCalendar = new Ext.ss.form.DateField({
		id : 'dateCalendar',
		hidden: true
	});
	
}


CalendarRender.setParams = function(params){
	
	if(BeanUtils.isNotEmpty(CalendarRender.method)){
		params.method = CalendarRender.method;
	}else{
		if(BeanUtils.isEmpty(params.method)){
			params.method = 'searchCalendar';
			CalendarRender.method = 'searchCalendar';
		}else{
			CalendarRender.method = params.method;
		}
	}
	
	if(BeanUtils.isNotEmpty(CalendarRender.xaction)){
		params.xaction = CalendarRender.xaction;
	}else{
		if(BeanUtils.isEmpty(params.xaction)){
			params.xaction = 'read';
			CalendarRender.xaction = 'read';
		}else{
			CalendarRender.xaction = params.xaction;
		}
	}
	
	if(BeanUtils.isNotEmpty(CalendarRender.url)){
		params.url = CalendarRender.url;
	}else{
		if(BeanUtils.isEmpty(params.url)){
			params.url = 'calendarController.html';
			CalendarRender.url = 'calendarController.html';
		}else{
			CalendarRender.url = params.url;
		}
	}
	
	return params;
}

CalendarRender.render = function(params, win, cmp, callBack){
	params = CalendarRender.setParams(params);
	this.query(params, win, cmp, callBack);
}

CalendarRender.query = function(params, win, cmp, callBack){
	CalendarRender.loadMask.show();
	
	$.ajax({
	    type: 'POST',
	    url: params.url,
	    data: params,
	    success: function(response){
	    	var json = Ext.decode(response);
	    	CalendarRender.build(json.records, params, win, cmp, callBack);
	    	CalendarRender.loadMask.hide();
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

CalendarRender.getTodayDate = function(){
	var todayDate = application.todayDate.split("/");
	var rs = todayDate[2]+'-'+todayDate[1]+'-'+todayDate[0];
	return rs;
}

CalendarRender.build = function(jsonData, params, win, cmp, callBack){
	CalendarRender.component();
	$('#calendarDiv').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek'//,agendaDay'
		},
		defaultDate: CalendarRender.getTodayDate(),
		businessHours: true, // display business hours
		editable: true,
		eventLimit: true,
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			CalendarRender.dateCalendar.setValue(null);
			CalendarRender.idCalendar.setValue(null);
			if(BeanUtils.isFunction(callBack)){
				callBack(CalendarRender.idCalendar.getValue());
			}
			
			if(BeanUtils.isNotEmpty(start._d)){
				CalendarRender.dateCalendar.setValue(start._d);
				if(BeanUtils.isNotEmpty(cmp)){
					cmp.timeFrom.setValue('');
					cmp.dateFrom.setValue(new Date(start._d));
					if(!BeanUtils.equals(start._d.getUTCHours(), 0)){
						if(BeanUtils.equals(start._d.getUTCMinutes(), 0)){
							cmp.timeFrom.setValue(start._d.getUTCHours());
						}else{
							cmp.timeFrom.setValue(start._d.getUTCHours()+''+start._d.getUTCMinutes());
						}
					}
				}
//				window.open('http://'+ipDomainSystem+'/'+window.location.pathname.split('/')[1]+'/'+params.url+
//					'?selectDate='+DateUtils.convertDateFormatYYYYMMDD(start._d)+'', 'gcalevent', 'width=850,height=600');
			}
			win.show();
		},
		eventClick: function(event) {
			// opens events in a popup window
			CalendarRender.dateCalendar.setValue(null);
			CalendarRender.idCalendar.setValue(null);
			if(BeanUtils.isNotEmpty(event.id)){
				CalendarRender.idCalendar.setValue(event.id);
				if(BeanUtils.isNotEmpty(cmp)){
					cmp.dateFrom.setValue(new Date(event.start._i));
					if(BeanUtils.isFunction(callBack)){
						callBack(CalendarRender.idCalendar.getValue());
					}
					
					if(!BeanUtils.equals(event.start._i.split('T')[1].split(':')[0]*1, 0)){
						if(BeanUtils.equals(event.start._i.split('T')[1].split(':')[1]*1, 0)){
							cmp.timeFrom.setValue(event.start._i.split('T')[1].split(':')[0]);
						}else{
							cmp.timeFrom.setValue(event.start._i.split('T')[1].split(':')[0]+''+event.start._i.split('T')[1].split(':')[1]);
						}
					}
					
				}
//				window.open('http://'+ipDomainSystem+'/'+window.location.pathname.split('/')[1]+'/'+params.url+
//						'?id='+event.id+'', 'gcalevent', 'width=850,height=600');
			}
			win.show();
			return false;
		},
		events: jsonData
//		[
//			{
//				id: 13,
//				title: 'Meeting',
//				start: '2016-08-04T13:00:00',
//				end: '2016-08-04T14:00:00',
////				url: 'http://'+ipDomainSystem+'/hymanage/orderHeader.html',
//				url: CalendarRender.getTodayDate(),
//				constraint: 'availableForMeeting',
//				color: '#de4342'
//			},{
//				title: 'Meeting',
//				start: '2016-08-05T14:00:00',
//				end: '2016-08-05T16:00:00',
//				constraint: 'availableForMeeting', // defined below
//				color: '#257e4a'
//			}
//		]
	});
}
