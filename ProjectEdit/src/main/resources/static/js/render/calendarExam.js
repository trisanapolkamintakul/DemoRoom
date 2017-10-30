var calendar = {};
calendar.url = application.contextPath +'/calendarExam.html';


calendar.build = function(){
	
	
}


Ext.onReady(function () {
	
	calendar.store = new Ext.data.JsonStore({
		   removeAndSave: false,
		   storeId: 'gridStore',
		   idProperty: 'hyPeriodId',
		   url: calendar.url,
		   fields: [ {name: 'hyPeriodId'}
		   			, {name: 'hyPeriodName', allowBlank: false}
		   			, {name: 'hyPeriodDate', allowBlank: false, format: application.formatDate}
		   			, {name: 'hyPeriodPrice2'}
		   			, {name: 'hyPeriodPrice3'}]
		});
	
	calendar.calendar = new Ext.calendar.CalendarPanel({
		id : 'calendar',
		fieldLabel: 'calendar',
		eventStore: calendar.store
	});

	calendar.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [calendar.calendar]
    });
	
	calendar.formPanel = new Ext.form.FormPanel({
        url: calendar.url,
        items: [calendar.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
});
