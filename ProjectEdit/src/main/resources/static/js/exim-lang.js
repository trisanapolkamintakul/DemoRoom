
if(Ext.MessageBox){
  Ext.MessageBox.buttonText = {
    ok     : "ตกลง",
    cancel : "ยกเลิก",
    yes    : "ใช่",
    no     : "ไม่ใช่"
  };
}

if(Ext.util.Format){
  Ext.util.Format.date = function(v, format){
    if(!v) return "";
    if(!(v instanceof Date)) v = new Date(Date.parse(v));
    return v.dateFormat(format || "d/m/Y");
  };
}

if(Ext.DatePicker){
  Ext.apply(Ext.DatePicker.prototype, {
    todayText         : "วันนี้",
    minText           : "วันนี้อยู่ก่อนวันที่ระบบรองรับ",
    maxText           : "วันนี้อยู่หลังวันที่ระบบรองรับ",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames        : Date.monthNames,
    dayNames          : Date.dayNames,
    nextText          : 'เดือนถัดไป (Control+Right)',
    prevText          : 'เดือนก่อนหน้า (Control+Left)',
    monthYearText     : 'เลือกเดือน (Control+Up/Down เพื่อเปลี่ยนปี)',
    todayTip          : "{0} (Spacebar)",
    format            : "d/m/Y",
    okText            : "&#160;ตกลง&#160;",
    cancelText        : "ยกเลิก",
    startDay          : 0
  });
}

if(Ext.PagingToolbar){
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : "หน้า",
    afterPageText  : "จาก {0}",
    firstText      : "หน้าแรก",
    prevText       : "หน้าก่อน",
    nextText       : "หน้าถัดไป",
    lastText       : "หน้าสุดท้าย",
    refreshText    : "Refresh",
    displayMsg     : "แสดง {0} - {1} จาก {2}",
    emptyMsg       : 'ไม่มีข้อมูลแสดง'
  });
}

if(Ext.form.BasicForm){
    Ext.form.BasicForm.prototype.waitTitle = "โปรด รอ..."
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = "ค่าในฟิลด์นี้ไม่ถูกต้อง";
}

if(Ext.form.TextField){
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : "ความยาวอย่างน้อยคือ {0}",
    maxLengthText : "ความยาวอย่างมากคือ {0}",
    blankText     : "ฟิลด์นี้เป็นฟิลด์บังคับกรอก",
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField){
  Ext.apply(Ext.form.NumberField.prototype, {
    decimalSeparator : ".",
    decimalPrecision : 2,
    minText : "ค่าน้อยสุดคือ {0}",
    maxText : "ค่่ามากสุดคือ {0}",
    nanText : "{0} ไม่ได้เป็นตัวเลขที่ถูกต้อง"
  });
}

if(Ext.form.DateField){
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : "Disabled",
    disabledDatesText : "Disabled",
    minText           : "ต้องเลือกวันที่หลังจาก {0}",
    maxText           : "ต้องเลือกวันที่ก่อน {0}",
    invalidText       : "{0} ไม่ได้เป็นวันที่ที่ถูกต้อง - ต้องอยูในรูปแบบ {1}",
    format            : "d/m/y",
    altFormats        : "d/m/Y|d/m/y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d",
    startDay          : 0
  });
}

if(Ext.form.ComboBox){
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : "กำลังโหลด...",
    valueNotFoundText : undefined
  });
}

if(Ext.form.TimeField){
  Ext.apply(Ext.form.TimeField.prototype, {
    minText : "ต้องเลือกเวลาเท่ากับหรือหลังจาก {0}",
    maxText : "ต้องเลือกเวลาเท่ากับหรือก่อน {0}",
    invalidText : "{0} ไม่ได้เป็นเวลาที่ถูกต้อง",
    format : "g:i A",
    altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
  });
}

if(Ext.form.CheckboxGroup){
  Ext.apply(Ext.form.CheckboxGroup.prototype, {
    blankText : "คุณต้องเลือกอย่างน้อยหนึ่งรายการ"
  });
}

if(Ext.form.RadioGroup){
  Ext.apply(Ext.form.RadioGroup.prototype, {
    blankText : "คุณต้องเลือกหนึ่งรายการ"
  });
}
