package com.softsquare.application.service;

import java.util.List;

import com.softsquare.application.domain.LoginMapping;
import com.softsquare.application.entity.Login;


public interface LoginService {
	
	public LoginMapping getUser(String userName);
	public List<Login> findAllUser(); 
	public void saveUser(LoginMapping user) throws Exception;
	public void removeUser(LoginMapping user);
	public void updateUser(LoginMapping user);
	
}
