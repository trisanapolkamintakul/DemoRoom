package com.softsquare.application.service;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softsquare.application.dao.RoleDao;
import com.softsquare.application.entity.Role;


@Service
public class RoleServiceImp implements RoleService{
	
	@Autowired
	private RoleDao roleDao;
	
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Override
	public ArrayList<Role> getRole() {
		return roleDao.getRole();
	}
	
}