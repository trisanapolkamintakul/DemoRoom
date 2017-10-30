var home ={};
home.url = application.contextPath +'/home.html';

home.field = function(){
	
	home.code = new Ext.form.TextField({
		id : 'code',
		fieldLabel: 'Room',
		readOnly: true		
	});
	
	home.desc = new Ext.form.TextField({
		id : 'desc',
		fieldLabel: 'About',
		readOnly: true
	});
	
	home.dateFromCalendar = new Ext.ss.form.DateField({
		id : 'dateFromCalendar',
		fieldLabel: 'Date From',
		readOnly: true
	});
	
	home.dateToCalendar = new Ext.ss.form.DateField({
		id : 'dateToCalendar',
		fieldLabel: 'Date To',
		readOnly: true
	});
	
	home.saveButton = new Ext.Button({
		text: 'Save',
		cls: 'x-btn-left',
	    handler: function () {
	    	home.save();
	    }
	});
	
	home.exitButton = new Ext.Button({
		text: 'exit',
	    handler: function () {
	    	home.exit();
	    }
	});
	
	home.timeFromField = new Ext.form.TimeField({
		id : 'timeFromField',
		fieldLabel: 'Time From',
	    minValue: '9:00 AM',
	    maxValue: '6:00 PM',
	    increment: 30,
	    readOnly: true
	});
	
	home.timeToField = new Ext.form.TimeField({
		id : 'timeToField',
		fieldLabel: 'Time To',
	    minValue: '9:00 AM',
	    maxValue: '6:00 PM',
	    increment: 30,
	    readOnly: true
	});
	
	home.container = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [home.dateFromCalendar, home.timeFromField, home.code]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [ home.dateToCalendar, home.timeToField, home.desc]
            }
        ]
    });
	
	
	home.fieldSet = new Ext.form.FieldSet({
	    title: 'Data Area',
        anchor: '100',
        border: false,
        height:300,
	    items: [home.container]
	});
	
	home.addFormWindow = new Ext.Window({
        id: 'addFormWindow',
        title: 'Window',
        closeAction: 'hide',
        closable: false,
        autoDestroy: false,
        width: 800,
        height: 300,
        buttons: [home.exitButton],
        items: [home.fieldSet]
    });
	
}

Ext.onReady(function () { 
	home.render();
});