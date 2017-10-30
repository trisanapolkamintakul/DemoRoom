  
	checkFormValid = function(){
		return !!register.formPanel.getForm().isValid();
	}

	saveFunction = function(){
		
		if(checkFormValid()){
			var userPassword = register.userPassword.getValue();
			var userPasswordConfirm = register.userPasswordConfirm.getValue();
			
			if(BeanUtils.equals(userPassword, userPasswordConfirm)){
				register.loadMask.show();
				 var params = {
						  method: 'save'
					      , userName: register.userName.getValue()
						  , password: userPassword
						  , roleId: register.roleCombobox.getValue()
						  , usfname: register.userFName.getValue()
						  , uslname: register.userLName.getValue()
						  , usemail: register.userEmail.getValue()
						  , usphone: register.userPhone.getValue()
						  , usorganization: register.userOrganization.getValue()
						  , usaddress: register.userAddress.getValue()
						  
				 };
				 
				 Ext.Ajax.request({
				        method: 'POST',
				        params: params,
				        url: register.url,
				        success: function (response) {
				        	register.loadMask.hide();
				            var json = Ext.decode(response.responseText);
//					            ext.grid.store.loadData(json)
				            Ext.Msg.alert(__messages['title.information'], __messages['message.saveSuccessfully']);
				        },
				        failure: function (response) {
				        	register.loadMask.hide();
//					            var json = Ext.decode(response.responseText);
//					            Ext.Msg.alert(json.title, json.message);
//					            if (errorHandler && Ext.isFunction(errorHandler)) {
//					                errorHandler.call(this, json);
//					            }
				        }
				    });
			}else{
				Ext.Msg.alert(__messages['title.warning'], __messages['message.checkPassWord']);
			}
		}else{
			Ext.Msg.alert(__messages['title.information'], __messages['message.manadatoryFieldIsRequired']);
		}
		
		
		
		
	}