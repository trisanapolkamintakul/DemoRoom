package com.softsquare.application.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.softsquare.application.common.util.LoginUtils;
import com.softsquare.application.dao.LoginDao;
import com.softsquare.application.domain.LoginMapping;
import com.softsquare.application.entity.Login;


@Service
public class LoginServiceImp implements LoginService{
	
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private LoginDao loginDao;
	
	@Override
	public LoginMapping getUser(String userName) {
		List<Map<String, Object>> login = loginDao.findByUsername(userName);
		LoginMapping loginMapping = new LoginMapping();
		loginMapping.setUserName(login.get(0).get("username").toString());
		loginMapping.setPassword(new BCryptPasswordEncoder().encode(login.get(0).get("password").toString()));
		loginMapping.setRole(login.get(0).get("roleCode").toString());
		return loginMapping;
	}

	@Override
	public List<Login> findAllUser() {
		return null;
	}

	@Override
	public void saveUser(LoginMapping user) throws Exception {
		
//		System.out.println("Ser----------------------------"+user.getUsfname());
		Login login = new Login();
		login.setUsername(user.getUserName());
		login.setPassword(user.getPassword());
		login.setRoleId(user.getRoleId());
		login.setUsfname(user.getUsfname());
		login.setUslname(user.getUslname());
		login.setUsemail(user.getUsemail());
		login.setUsphone(user.getUsphone());
		login.setUsorganization(user.getUsorganization());
		login.setUsaddress(user.getUsaddress());
		
		loginDao.saveUser(login);		
	}

	@Override
	public void removeUser(LoginMapping user) {
		
	}

	@Override
	public void updateUser(LoginMapping user) {
		
	}

}