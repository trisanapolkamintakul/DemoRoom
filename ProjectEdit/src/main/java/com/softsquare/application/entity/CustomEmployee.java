package com.softsquare.application.entity;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import com.softsquare.application.domain.LoginMapping;


public class CustomEmployee extends User{
	
	private static final long serialVersionUID = 4582361123611249394L;
	
	public CustomEmployee(LoginMapping login) {
		super(login.getUserName(), login.getPassword(), AuthorityUtils.createAuthorityList(login.getRole()));
	}
	
}
