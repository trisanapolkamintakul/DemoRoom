Ext.namespace('Ext.ss.form');

Ext.ss.form.DateField = Ext.extend(Ext.form.DateField, {
	format : 'd/m/Y'
	,altFormats: "d/m/Y|d/m/y|j/n/Y|j/n/y|dmY|dmy"
	,formatLength : {'d':2,'D':3,'j':2,'m':2,'M':3,'n':2,'y':2,'Y':4}
	,oldValue:''
	,fromDateFieldId : undefined
	,toDateFieldId : undefined
	,initComponent: function() {
		this.maxLength = this.getMaxLength();
		Ext.ss.form.DateField.superclass.initComponent.call(this);
	}
	,initEvents: function () {
		var dateSeparator = String(this.format).replace(/[a-z|0-9]/gi,'');
		var allowed = '^[0-9'+dateSeparator+']*$';				
        this.maskRe = new RegExp(allowed);
        Ext.ss.form.DateField.superclass.initEvents.call(this);
	}
	,filterKeys : function(e) {
		if(this.readOnly){e.stopEvent(); return;}
		if(e.ctrlKey){ return; }
        var k = e.getKey();
        if(Ext.isGecko && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))){ return; }
        var cc = String.fromCharCode(e.getCharCode());
        if(!Ext.isGecko && e.isSpecialKey() && !cc){ return; }
        
        var value = this.getRawValue();
        this.el.focus();
        var selectionStart = this.getSelectionStart()
        	, selectionEnd = this.getSelectionEnd();
        	
        var f = value.substring(0,selectionStart)
        	, b = value.substring(selectionEnd,value.length);
        
        var result = f+cc+b;
        
        if(result.length>this.maxLength || !this.maskRe.test(cc)){
 			e.stopEvent();
        }
	}
	,beforeBlur: function () {
		if(this.maskRe.test(this.getRawValue())) {
			if (this.isValid()) {
	            var v = this.parseDate(this.getRawValue());
	            if (v) {
	                this.setValue(v);
	                return;
	            }
	        }
		}

        this.setValue(this.oldValue);
    }
    ,safeParse : function(value, format) {
        if (/[gGhH]/.test(format.replace(/(\\.)/g, ''))) {
            return Date.parseDate(value, format);
        } else {
            var parsedDate = Date.parseDate(value + ' ' + this.initTime, format + ' ' + this.initTimeFormat, true);
            if (parsedDate) return parsedDate.clearTime();
        }
    }
	,getValue : function() {
		var value = Ext.ss.form.DateField.superclass.getValue.call(this);
		this.oldValue = Ext.isEmpty(value)?'':this.oldValue;
		return value;
	}
	,getRawValue: function() {
    	var  value = Ext.ss.form.DateField.superclass.getRawValue.call(this);
    	this.oldValue = (value=='')?'':this.oldValue;    	
    	return value;
    }
	,preFocus: function() {
    	this.oldValue = this.getRawValue();
    	this.setRawValue(this.oldValue);
    }
	,onTriggerClick : function() {
		this.getValue = this.getValue;
		Ext.ss.form.DateField.superclass.onTriggerClick.call(this);
		this.getValue = this.getValueBackup;
    }
    , getValueBackup : function() {
    	var value = Ext.ss.form.DateField.superclass.getValue.call(this);
		this.oldValue = Ext.isEmpty(value)?'':this.oldValue;
		return value;
    }
    ,getMaxLength : function() {
    	var maxLength = 0;
    	var formatArray = this.format.split('');
    	for(var i=0;i<formatArray.length;i++) {
    		if(this.formatLength[formatArray[i]]) {
    			maxLength += this.formatLength[formatArray[i]];
    		} else {
    			maxLength += 1;
    		}
    	}
    	return maxLength;
    }
    ,getSelectionStart : function() {
    	var selectionStart = -1;
    	var d = this.el.dom;
    	if(typeof d.selectionStart != 'undefined') {
    		var d = this.el.dom;
    		selectionStart = d.selectionStart;
    	} else if(document.selection) {
    		selectionStart = document.selection.createRange().moveStart('character', -10000000)*-1;
    	}
    	return selectionStart;
    }
    ,getSelectionEnd : function() {
    	var selectionEnd = -1;
    	var d = this.el.dom;
    	if(typeof d.selectionEnd != 'undefined') {
    		var d = this.el.dom;
    		selectionEnd = d.selectionEnd;
    	} else if(document.selection) {
    		selectionEnd = document.selection.createRange().moveEnd('character', -10000000)*-1;
    	}
    	return selectionEnd;
    }
    ,setValue : function( date ) {
    	if(this.toDateFieldId != undefined) {
    		Ext.getCmp(this.toDateFieldId).setMinValue(date);
    	}
    	if(this.fromDateFieldId != undefined) {
    		Ext.getCmp(this.fromDateFieldId).setMaxValue(date);
    	}
    	return Ext.ss.form.DateField.superclass.setValue.call(this, date);
    }
});
Ext.reg('ss-datefield', Ext.ss.form.DateField);