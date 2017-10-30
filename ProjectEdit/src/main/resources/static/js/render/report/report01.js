var report01 = {};
report01.url = application.contextPath +'/report01.html';

if (!report01.loadMask) {
	report01.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

report01.buildReport01 = function () {
	
	report01.orderListComboBox = new BaseComboBox.getOrderList('orderListComboBox', {});
	
	report01.orderListContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [report01.orderListComboBox]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: []
            }
        ]
    });
	
	report01.fieldSet = new Ext.form.FieldSet({
		title : 'บันทึกการช่อม',
	    items: [report01.orderListContainer]
	});
	
}

Ext.onReady(function () {
	
	report01.buildReport01();

	report01.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [report01.fieldSet]
    });
	
	report01.formPanel = new Ext.form.FormPanel({
        url: report01.url,
        items: [report01.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
});




