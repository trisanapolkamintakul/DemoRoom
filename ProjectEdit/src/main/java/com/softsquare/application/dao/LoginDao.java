package com.softsquare.application.dao;

import java.util.List;
import java.util.Map;

import com.softsquare.application.entity.Login;

public interface LoginDao {

	public List<Map<String, Object>> findByUsername(String userName);
	public void saveUser(Login user) throws Exception;
	public void updateUser(Login user) throws Exception;
	public void deleteUser(Login user);

}
