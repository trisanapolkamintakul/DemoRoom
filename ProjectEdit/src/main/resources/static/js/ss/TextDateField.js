Ext.namespace('Ext.ss.form');

Ext.ss.form.TextDateField = Ext.extend(Ext.ss.form.DateField, {
	getValue : function() {
		var value = Ext.ss.form.DateField.superclass.getValue.call(this);
		this.oldValue = Ext.isEmpty(value)?'':this.oldValue;
		return this.formatDate(this.parseDate(value));
	}
});
Ext.reg('ss-textdatefield', Ext.ss.form.TextDateField);