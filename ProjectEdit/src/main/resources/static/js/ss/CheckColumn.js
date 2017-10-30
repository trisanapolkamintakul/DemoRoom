Ext.namespace('Ext.ss.grid');

Ext.ss.grid.CheckColumn = Ext.extend(Ext.ux.grid.CheckColumn,
{
	checkedValue:true,
	uncheckedValue:false,
	disabled:false,
	locked:false,
	columnLocked:false,
	processEvent : function(name, e, grid, rowIndex, colIndex){
        if (name == 'mousedown') {
	        if(this.isLocked() || this.isDisabled()) { return false; }
        	if(Ext.fly(e.getTarget()).hasClass(this.createId())) {
	            var record = grid.store.getAt(rowIndex);
	            if(this.isRowDisabled(record)){
	            	return false;
	            }
	            var value = record.data[this.dataIndex];
	            var event = {
	            	checkColumn: this,
	            	grid: grid,
	            	store: grid.store,
	                record: record,
	                field: this.dataIndex,
	                originalValue: value,
	                value: (value===this.checkedValue)?this.uncheckedValue:this.checkedValue,
	                row: rowIndex,
	                column: colIndex,
	                cancel:false
	            };
	            if(this.beforeCheck(event) !== false && !event.cancel) {
	            	var checked = !(value===this.checkedValue);
		            if(checked) {
		            	record.set(this.dataIndex, this.checkedValue);
		            }
		            else {
		            	record.set(this.dataIndex, this.uncheckedValue);
		            }
		            this.afterCheck(event);
	            }
        	}
            return true;
        } else {
            return Ext.grid.ActionColumn.superclass.processEvent.apply(this, arguments);
        }
    },
	beforeCheck : function(e) {},
	afterCheck : function(e) {},
	createId : function() {
		return this.dataIndex + '-column';	
	},
	disableField: undefined,
	disableValue: true,
	isRowDisabled:function(record) {
		return (this.disableField && (this.disableValue === record.get(this.disableField)));	
	},
	renderer : function(v, p, record){
        p.css += ' x-grid3-check-col-td';
        return String.format('<div class="x-grid3-check-ss-col{0}{1} {2}">&#160;</div>', (v===this.checkedValue) ? '-on' : '',(this.disabled || this.isRowDisabled(record))?'-disabled':'' , this.createId());
    },
    setDisabled : function(disabled) {
    	if(disabled && this.disabled!==disabled) {
	    	this.disabled = disabled;
	    	if(this.grid) { 
	    		this.grid.getView().refresh(false);
	    	}
    	}
    },
    isDisabled : function() {
    	return this.disabled;
    },
    lock : function() {
    	this.locked = true;
    },
    unlock : function() {
    	this.locked = false;
    },
    isLocked : function() {
    	return this.locked;	
    }
});

//Ext.reg('ss-checkcolumn', Ext.ss.grid.CheckColumn);
