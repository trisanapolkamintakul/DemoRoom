Ext.data.DWRProxy = function(dwrCall, pagingAndSort){
  Ext.data.DWRProxy.superclass.constructor.call(this);
  this.dwrCall = dwrCall;
  //this.args = args;
  this.criteria = {};
  this.recordStore = {};
  this.save = false;
  this.init = false;
  this.update = false;
  this.deleted = false;
  this.fields = null;
  this.start = 0;
  this.limit = -1;
  this.recordSet = null;
  this.pagingAndSort = (pagingAndSort!=undefined ? pagingAndSort : true);
  this.message = null;
};

Ext.extend(Ext.data.DWRProxy, Ext.data.DataProxy, {
	load : function(params, reader, callback, scope, arg) {
		if(this.fireEvent("beforeload", this, params) !== false) {
			
			var delegate = {
					callback: this.loadResponse.createDelegate(this, [reader, callback, scope, arg], 1),
  					exceptionHandler:this.loadResponse.createDelegate(this, [reader, callback, scope, arg], 1)
				};
			var callParams = [];
			var upRec = null;
			//console.log("Before : "+this.fields);
			//console.log("Before : "+this.recordSet);      
			//if( this.fields != null && this.recordSet != null )
			if( scope && scope.fields &&  scope.data.items ){
				this.fields = scope.fields;
				upRec = this.getUpdateRecord(scope.data.items);
			}
				//upRec = this.getUpdateRecord(this.recordSet);
	  	  	
			 //else this.criteria ={}; 
			this.criteria = params.criteria || {};
			if(upRec)this.recordStore = upRec; else this.recordStore ={};
			if(params.init)this.init = params.init; else this.init = false; 			  
			if(params.save)this.save = params.save; else  this.save = false;
			if(params.update)this.update = params.update; else  this.update = false;
			if(params.deleted)this.deleted = params.deleted; else  this.deleted = false;
			if(params.start != undefined)this.start = params.start;
			if(params.limit != undefined)this.limit = params.limit;
			//if(params.init==false && this.save==false && this.update==false && this.deleted==false)
			
			for (var paramName in params) {
				if(paramName!=="caller"&&paramName!=="criteria"&&paramName!=="init"&&paramName!=="save"&&paramName!=="start"&&paramName!=="limit")
				{
					this.criteria[paramName]=params[paramName];
				}
			}

			//Check If Paging	
			if(this.pagingAndSort) {
				//this.criteria = callParams[0]; // Default Criteria is #0
				callParams.push(this.criteria);
			  	callParams.push(this.recordStore);
			  	callParams.push(this.init);
			  	callParams.push(this.save);		
		      	callParams.push(this.update);		
		      	callParams.push(this.deleted);		
		      	callParams.push(this.start);
		      	callParams.push(this.limit);
			}
			
			callParams.push(delegate);
			this.dwrCall.apply(this, callParams);
	    } else {
			callback.call(scope || this, null, arg, false);
	    }
	},

  loadResponse : function(listRange, reader, callback, scope, arg) {
    var result;
    try {
      	//Create Event For Change Record Type
	 this.fireEvent("loadsuccess", listRange, reader);
	  
	  
      result = reader.read(listRange);
      this.recordSet = result.records;
      this.fields = result.fields;
      /*
      for(var i = 0; i < this.recordSet.length; i++){
      	var r = this.recordSet[i];
  		for(var j = 0; j < this.fields.length; j++){
  		  
				 f = this.fields.items[j];	
				if(f.type === 'date' && r.data[f.name] !=''){
					//var gmtDate = Date.parse(r.data[f.name].toGMTString());					
					//var gmtDate =r.data[f.name].toGMTString();					
					//this.recordSet[i].data[f.name].setTime(gmtDate) ;
					
					//console.log('r.data[f.name]  '+r.data[f.name]);
					
					var offset = r.data[f.name].getTimezoneOffset();
					//alert(offset);
					offset = offset*60*1000;
					var temptime = r.data[f.name].getTime();
					temptime = temptime+offset;
					this.recordSet[i].data[f.name].setTime(temptime) ;
				}
				
    		}
    	}	*/
    		
     // console.log("After : "+this.fields);
     // console.log("After : "+this.recordSet);
    } catch(e) {
      arg.message = listRange;
      this.fireEvent("loadexception", this, null, null, listRange);
      if(arg.errorHandler)
      	arg.errorHandler(listRange);
      else callback.call(scope, null, arg, false);
      return;
    }
    arg.message = null;
    callback.call(scope, result, arg, true);
  },

  getUpdateRecord : function(data){
  	
  	var fields = this.fields;
  	var updateAr = {};
  	for(var i = 0; i < data.length; i++){
  		if(data[i].dirty && !data[i].isNew)
  		{ 
  			var updateObj = {};
  			
			for(var j = 0; j < fields.length; j++){
				f = fields.items[j];	
				if(f.type === 'date'){
					if(data[i].data[f.name]!==null && data[i].data[f.name]!=null && data[i].data[f.name] !== "" ){
						//updateObj[f.name] = (data[i].data[f.name]).getDate()+"/"+((data[i].data[f.name]).getMonth()+1)+"/"+(data[i].data[f.name]).getUTCFullYear();
						//alert(f.name+' '+(data[i].data[f.name]));
						var datEdited = (data[i].data[f.name]).getDate()+'';
						var monthEdited = (data[i].data[f.name]).getMonth()+1+'';						
						updateObj[f.name] = (datEdited.length==1?"0"+datEdited:datEdited)+"/"+
											(monthEdited.length==1?"0"+monthEdited:monthEdited)+"/"+
											(data[i].data[f.name]).getFullYear();
						
					}				
					}else{
					updateObj[f.name] = data[i].data[f.name];
				}
				
    		}
    		updateAr[updateObj[fields.items[0].name]]=(updateObj);
  		}    		
  		else if (data[i].isNew)
  		{
  			updateObj = {"id" : data[i].id};
    		for(var j = 0; j < fields.length; j++){
				f = fields.items[j];	
				if(data[i].data[f.name]!==null && data[i].data[f.name]!=null && data[i].data[f.name] !== "" ){
					updateObj[f.name] = data[i].data[f.name];
  				}
  			}
  			updateAr[updateObj[fields.items[0].name]]=(updateObj);
  		}
  	  }
  	return updateAr;
  },

  updateResponse : function(dataSet)
  {}
});

Ext.data.ListRangeReader = function(meta, recordType){
    Ext.data.ListRangeReader.superclass.constructor.call(this, meta, recordType.prototype.fields);
    this.recordType = recordType;
};
Ext.extend(Ext.data.ListRangeReader, Ext.data.DataReader, {
  getJsonAccessor: function(){
      var re = /[.]/;
      return function(expr) {
          try {          	
          		return function(obj){ /*console.log("obj["+expr+"] :"+obj[expr]);*/return obj[expr]; };          		
          } catch(e){ alert(e);}
          return Ext.emptyFn;
      };
  }(),
	read : function(o){
		var recordType = this.recordType, fields = recordType.prototype.fields;
		
		
		//Generate extraction functions for the totalProperty, the root, the id, and for each field
		if (!this.ef) {
			if(this.meta.totalProperty) {
				this.getTotal = this.getJsonAccessor(this.meta.totalProperty);
			}
		
			if(this.meta.successProperty) {
				this.getSuccess = this.getJsonAccessor(this.meta.successProperty);
			}

			if (this.meta.id != null) {
				var g = this.getJsonAccessor(this.meta.id);     
				this.getId = function(rec) {
					var r = g(rec);
					r = r*1;
					return (r === undefined || r === "") ? null : r;
				};
			} else {
				this.getId = function(){return null;};
			}
			this.ef = [];
			for(var i = 0; i < fields.length; i++){
				f = fields.items[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}

	
	   	var records = [];
	   	var root = o.data;
	   	if (root == undefined) {
	   		throw (o);
	   	}
	   	//, c = root.length, totalRecords = c, ;
		var count=0;
		var min=Number.MAX_VALUE;
		var max=Number.MIN_VALUE;
		for(var em in root){
			// convert key of root array to integer
			em = parseInt(em, 10);
			count++;
			if(min > em){
				min = em;
			} 
			if(max < em){
				max = em;
			} 
		}
		c = count;
		//root.length
		totalRecords = c;
		success = true;
	   	if(this.meta.totalProperty){
		    var v = parseInt(this.getTotal(o), 10);
				if(!isNaN(v)){
					totalRecords = v;
				}
			}
	
			if(this.meta.successProperty){
				var v = this.getSuccess(o);
				if(v === false || v === 'false'){
					success = false;
				}
			}
	
			//for(var i = 0; i < c; i++){
			var no=0;
			//for(var i in root){
			for(var i =min;i<=max;i++){
				//Convert i to integer
		    	var n = root[i];
		      	var values = {};	
	      		var id = this.getId(n);
	      	
	      		for(var j = 0; j < fields.length; j++){
					f = fields.items[j];
	        		var v = this.ef[j](n);						
	        		values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue);
	      		}
	      		
	      		
	      		var record = new recordType(values, id);
	      		/*console.log("records["+i+"] =" +record);*/
	      		records[no++] = record;
			}
	    	//}
	
	    return {
	       success : success,
	       records : records,
	       fields : fields,
	       totalRecords : totalRecords
	    };
	}
});
