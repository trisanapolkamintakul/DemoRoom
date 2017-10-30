package com.softsquare.application.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class BaseEntity {
	
	@Column(name = "CREATE_USER", updatable = false)
	public String createUser;
	
	@Column(name = "UPDATE_USER")
	public String updateUser;
	
	@Column(name = "CREATE_DATE", updatable = false)
	public Date createDate;
	
	@Column(name = "UPDATE_DATE")
	public Date updateDate;

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
	
	
}
