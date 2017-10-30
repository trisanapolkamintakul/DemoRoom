Ext.util.Format.dateRenderer = function(format) {
    return function(v) {
    	if (!v) {
            return "";
        }
        if (!Ext.isDate(v)) {
            v = new Date(Date.parse(v));
        }
        var year = v.getFullYear();
        if(year < 2200) {
        	v = v.add(Date.YEAR, 543);
        }
        return Ext.util.Format.date(v, format);
    };
};

Ext.override(Ext.ss.form.DateField, {
	setValue : function( date ) {
    	if(this.toDateFieldId != undefined) {
    		Ext.getCmp(this.toDateFieldId).setMinValue(date);
    	}
    	if(this.fromDateFieldId != undefined) {
    		Ext.getCmp(this.fromDateFieldId).setMaxValue(date);
    	}

    	// DateField
    	var v = this.formatBuddhistDate(date);    	
    	
    	// TextField
    	if(this.emptyText && this.el && !Ext.isEmpty(v)){
            this.el.removeClass(this.emptyClass);
        }
        
    	// Field
    	this.value = date;
        if(this.rendered){
            this.el.dom.value = (Ext.isEmpty(v) ? '' : v);
            this.validate();
        }
    	
        this.applyEmptyText();
        this.autoSize();
        return this;
    },
    getValueBackup : function() {
    	var date = Ext.ss.form.DateField.superclass.getValue.call(this);
		this.oldValue = Ext.isEmpty(date)?'':this.oldValue;
		if(Ext.isDate(date)) {
	    	var year = date.getFullYear();
	        if(year >= 2200) {
	        	date = date.add(Date.YEAR, -543);
	        }
    	}
		return date;
    },
    getValue : function() {
    	var date = Ext.ss.form.DateField.superclass.getValue.call(this);
		this.oldValue = Ext.isEmpty(date)?'':this.oldValue;
		if(Ext.isDate(date)) {
	    	var year = date.getFullYear();
	        if(year >= 2200) {
	        	date = date.add(Date.YEAR, -543);
	        }
    	}
		return date;
	},
	beforeBlur: function () {
    	var value = this.processValue(this.getRawValue());
		if(this.maskRe.test(value)) {
			if (this.isValid()) {
	            var v = this.parseDate(value);
	            if (v) {
	                this.setValue(v);
	                return;
	            }
	        }
		}

        this.setValue(this.oldValue);
    },
    preFocus: function() {
    	var rawValue = this.getRawValue();
    	this.setRawValue(rawValue);
    	this.oldValue = this.processValue(rawValue);
    },
    processValue : function(value) {
    	var date = this.parseDate(value) || "";
    	if(Ext.isDate(date)) {
	    	var year = date.getFullYear();
	        if(year >= 2200) {
	        	date = date.add(Date.YEAR, -543);
	        }
    	}
    	return Ext.util.Format.date(date, this.format);
    },
    onTriggerClick : function() {
		this.getValue = this.getValue;
		if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Ext.menu.DateMenu({
                hideOnClick: false,
                focusOnSelect: false
            });
        }
        this.onFocus();
        Ext.apply(this.menu.picker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.disabledDatesRE,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            showToday : this.showToday,
            startDay: this.startDay,
            minText : String.format(this.minText, this.formatBuddhistDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatBuddhistDate(this.maxValue))
        });
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tl-bl?");
        this.menuEvents('on');
		this.getValue = this.getValueBackup;
    },
    getErrors: function(value) {
        var errors = Ext.form.DateField.superclass.getErrors.apply(this, arguments);

        value = this.formatDate(value || this.processValue(this.getRawValue()));

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        var svalue = value;
        value = this.parseDate(value);
        if (!value) {
            errors.push(String.format(this.invalidText, svalue, this.format));
            return errors;
        }

        var time = value.getTime();
        if (this.minValue && time < this.minValue.clearTime().getTime()) {
            errors.push(String.format(this.minText, this.formatBuddhistDate(this.minValue)));
        }

        if (this.maxValue && time > this.maxValue.clearTime().getTime()) {
            errors.push(String.format(this.maxText, this.formatBuddhistDate(this.maxValue)));
        }

        if (this.disabledDays) {
            var day = value.getDay();

            for(var i = 0; i < this.disabledDays.length; i++) {
                if (day === this.disabledDays[i]) {
                    errors.push(this.disabledDaysText);
                    break;
                }
            }
        }

        var fvalue = this.formatDate(value);
        if (this.disabledDatesRE && this.disabledDatesRE.test(fvalue)) {
            errors.push(String.format(this.disabledDatesText, fvalue));
        }

        return errors;
    },
    formatBuddhistDate: function(date) {
    	var value = date;
    	if(!Ext.isDate(date)) {
    		value = this.parseDate(date); 
		}

    	if(Ext.isDate(value)) {
	    	var year = value.getFullYear();
	        if(year < 2200) {
	        	value = value.add(Date.YEAR, 543);
	        }
    	}
    	return this.formatDate(value);    
    }
});

Ext.override(Ext.DatePicker, {
	update : function(date, forceRefresh){
        if(this.rendered){
            var vd = this.activeDate, vis = this.isVisible();
            this.activeDate = date;
            if(!forceRefresh && vd && this.el){
                var t = date.getTime();
                if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                    this.cells.removeClass('x-date-selected');
                    this.cells.each(function(c){
                       if(c.dom.firstChild.dateValue == t){
                           c.addClass('x-date-selected');
                           if(vis && !this.cancelFocus){
                               Ext.fly(c.dom.firstChild).focus(50);
                           }
                           return false;
                       }
                    }, this);
                    return;
                }
            }
            var days = date.getDaysInMonth(),
                firstOfMonth = date.getFirstDateOfMonth(),
                startingPos = firstOfMonth.getDay()-this.startDay;

            if(startingPos < 0){
                startingPos += 7;
            }
            days += startingPos;

            var pm = date.add('mo', -1),
                prevStart = pm.getDaysInMonth()-startingPos,
                cells = this.cells.elements,
                textEls = this.textNodes,
                // convert everything to numbers so it's fast
                d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart, this.initHour)),
                today = new Date().clearTime().getTime(),
                sel = date.clearTime(true).getTime(),
                min = this.minDate ? this.minDate.clearTime(true) : Number.NEGATIVE_INFINITY,
                max = this.maxDate ? this.maxDate.clearTime(true) : Number.POSITIVE_INFINITY,
                ddMatch = this.disabledDatesRE,
                ddText = this.disabledDatesText,
                ddays = this.disabledDays ? this.disabledDays.join('') : false,
                ddaysText = this.disabledDaysText,
                format = this.format;

            if(this.showToday){
                var td = new Date().clearTime(),
                    disable = (td < min || td > max ||
                    (ddMatch && format && ddMatch.test(td.dateFormat(format))) ||
                    (ddays && ddays.indexOf(td.getDay()) != -1));

                if(!this.disabled){
                    this.todayBtn.setDisabled(disable);
                    this.todayKeyListener[disable ? 'disable' : 'enable']();
                }
            }

            var setCellClass = function(cal, cell){
                cell.title = '';
                var t = d.clearTime(true).getTime();
                cell.firstChild.dateValue = t;
                if(t == today){
                    cell.className += ' x-date-today';
                    cell.title = cal.todayText;
                }
                if(t == sel){
                    cell.className += ' x-date-selected';
                    if(vis){
                        Ext.fly(cell.firstChild).focus(50);
                    }
                }
                // disabling
                if(t < min) {
                    cell.className = ' x-date-disabled';
                    cell.title = cal.minText;
                    return;
                }
                if(t > max) {
                    cell.className = ' x-date-disabled';
                    cell.title = cal.maxText;
                    return;
                }
                if(ddays){
                    if(ddays.indexOf(d.getDay()) != -1){
                        cell.title = ddaysText;
                        cell.className = ' x-date-disabled';
                    }
                }
                if(ddMatch && format){
                    var fvalue = d.dateFormat(format);
                    if(ddMatch.test(fvalue)){
                        cell.title = ddText.replace('%0', fvalue);
                        cell.className = ' x-date-disabled';
                    }
                }
            };

            var i = 0;
            for(; i < startingPos; i++) {
                textEls[i].innerHTML = (++prevStart);
                d.setDate(d.getDate()+1);
                cells[i].className = 'x-date-prevday';
                setCellClass(this, cells[i]);
            }
            for(; i < days; i++){
                var intDay = i - startingPos + 1;
                textEls[i].innerHTML = (intDay);
                d.setDate(d.getDate()+1);
                cells[i].className = 'x-date-active';
                setCellClass(this, cells[i]);
            }
            var extraDays = 0;
            for(; i < 42; i++) {
                 textEls[i].innerHTML = (++extraDays);
                 d.setDate(d.getDate()+1);
                 cells[i].className = 'x-date-nextday';
                 setCellClass(this, cells[i]);
            }

            this.mbtn.setText(this.monthNames[date.getMonth()] + ' ' + (date.getFullYear() + 543));

            if(!this.internalRender){
                var main = this.el.dom.firstChild,
                    w = main.offsetWidth;
                this.el.setWidth(w + this.el.getBorderWidth('lr'));
                Ext.fly(main).setWidth(w);
                this.internalRender = true;
                // opera does not respect the auto grow header center column
                // then, after it gets a width opera refuses to recalculate
                // without a second pass
                if(Ext.isOpera && !this.secondPass){
                    main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + 'px';
                    this.secondPass = true;
                    this.update.defer(10, this, [date]);
                }
            }
        }
    },
    updateMPYear : function(y){
        this.mpyear = y;
        var ys = this.mpYears.elements;
        for(var i = 1; i <= 10; i++){
            var td = ys[i-1], y2;
            if((i%2) === 0){
                y2 = y + Math.round(i * 0.5);
                td.firstChild.innerHTML = y2 + 543;
                td.xyear = y2;
            }else{
                y2 = y - (5-Math.round(i * 0.5));
                td.firstChild.innerHTML = y2 + 543;
                td.xyear = y2;
            }
            this.mpYears.item(i-1)[y2 == this.mpSelYear ? 'addClass' : 'removeClass']('x-date-mp-sel');
        }
    },
    onRender : function(container, position){
        var m = [
             '<table cellspacing="0">',
                '<tr><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td></tr>',
                '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'],
                i;
        for(i = 0; i < 7; i++){
            var d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }
            m.push('<th><span>', Date.getShortDayName(d), '</span></th>');
        }
        m[m.length] = '</tr></thead><tbody><tr>';
        for(i = 0; i < 42; i++) {
            if(i % 7 === 0 && i !== 0){
                m[m.length] = '</tr><tr>';
            }
            m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }
        m.push('</tr></tbody></table></td></tr>',
                this.showToday ? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>' : '',
                '</table><div class="x-date-mp"></div>');

        var el = document.createElement('div');
        el.className = 'x-date-picker';
        el.innerHTML = m.join('');

        container.dom.insertBefore(el, position);

        this.el = Ext.get(el);
        this.eventEl = Ext.get(el.firstChild);

        this.prevRepeater = new Ext.util.ClickRepeater(this.el.child('td.x-date-left a'), {
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.nextRepeater = new Ext.util.ClickRepeater(this.el.child('td.x-date-right a'), {
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');

        this.keyNav = new Ext.KeyNav(this.eventEl, {
            'left' : function(e){
                if(e.ctrlKey){
                    this.showPrevMonth();
                }else{
                    this.update(this.activeDate.add('d', -1));
                }
            },

            'right' : function(e){
                if(e.ctrlKey){
                    this.showNextMonth();
                }else{
                    this.update(this.activeDate.add('d', 1));
                }
            },

            'up' : function(e){
                if(e.ctrlKey){
                    this.showNextYear();
                }else{
                    this.update(this.activeDate.add('d', -7));
                }
            },

            'down' : function(e){
                if(e.ctrlKey){
                    this.showPrevYear();
                }else{
                    this.update(this.activeDate.add('d', 7));
                }
            },

            'pageUp' : function(e){
                this.showNextMonth();
            },

            'pageDown' : function(e){
                this.showPrevMonth();
            },

            'enter' : function(e){
                e.stopPropagation();
                return true;
            },

            scope : this
        });

        this.el.unselectable();

        this.cells = this.el.select('table.x-date-inner tbody td');
        this.textNodes = this.el.query('table.x-date-inner tbody span');

        this.mbtn = new Ext.Button({
            text: '&#160;',
            tooltip: this.monthYearText,
            renderTo: this.el.child('td.x-date-middle', true)
        });
        this.mbtn.el.child('em').addClass('x-btn-arrow');

        if(this.showToday){
            this.todayKeyListener = this.eventEl.addKeyListener(Ext.EventObject.SPACE, this.selectToday,  this);
            var todayDate = new Date();
            todayDate = todayDate.add(Date.YEAR, 543);
            var today = (todayDate).dateFormat(this.format);
            this.todayBtn = new Ext.Button({
                renderTo: this.el.child('td.x-date-bottom', true),
                text: String.format(this.todayText, today),
                tooltip: String.format(this.todayTip, today),
                handler: this.selectToday,
                scope: this
            });
        }
        this.mon(this.eventEl, 'mousewheel', this.handleMouseWheel, this);
        this.mon(this.eventEl, 'click', this.handleDateClick,  this, {delegate: 'a.x-date-date'});
        this.mon(this.mbtn, 'click', this.showMonthPicker, this);
        this.onEnable(true);
    }
});

Date.monthNames = [
	"มกราคม", 
	"กุมภาพันธ์", 
	"มีนาคม", 
	"เมษายน", 
	"พฤษภาคม", 
	"มิถุนายน", 
	"กรกฎาคม", 
	"สิงหาคม", 
	"กันยายน", 
	"ตุลาคม", 
	"พฤจิกายน", 
	"ธันวาคม"
];

Date.shortMonthNames = [
	"ม.ค.",
	"ก.พ.",
	"มี.ค.",
	"เม.ย.",
	"พ.ค.",
	"ม.ย.",
	"ก.ค.",
	"ส.ค.",
	"ก.ย.",
	"ต.ค.",
	"พ.ย.",
	"ธ.ค."
];

Date.dayNames = [
	"อาทิตย์", 
	"จันทร์", 
	"อังคาร", 
	"พุธ", 
	"พฤหัสบดี", 
	"ศุกร์", 
	"เสาร์"
];

Date.shortDayNames = [
	"อ", 
	"จ", 
	"อ", 
	"พ", 
	"พฤ", 
	"ศ", 
	"ส"
];

Date.getShortMonthName = function(month) {
	return Date.shortMonthNames[month];
};

Date.getShortDayName = function(day) {
	return Date.shortDayNames[day];
}

if(Ext.DatePicker){
	Ext.apply(Ext.DatePicker.prototype, {
	    monthNames : Date.monthNames,
	    dayNames : Date.dayNames,
	    todayText : 'วันนี้',
	    okText : 'ตกลง',
	    cancelText : 'ยกเลิก'
	});
}
