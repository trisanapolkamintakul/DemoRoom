package com.softsquare.application.dao;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.softsquare.application.entity.Login;

@Repository()
@Component
public class LoginDaoImp extends AbstractDao<Integer, Login> implements LoginDao  {

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> findByUsername(String userName) {
		 Criteria criteria = getSession().createCriteria(Login.class, "login");
		 criteria.createAlias("login.role", "role");
		 ProjectionList projections = Projections.projectionList()
		            .add(Projections.property("login.username").as("username"))
		            .add(Projections.property("login.password").as("password"))
		            .add(Projections.property("role.roleCode").as("roleCode"));
		 criteria.setProjection(projections);
		 criteria.add(Restrictions.eq("login.username", userName));
		 criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 List<Map<String, Object>> loginList =  criteria.list();
		return loginList;
	}

	@Override
	public void saveUser(Login user) throws Exception {
		save(user);
	}

	@Override
	public void updateUser(Login user) throws Exception {
		merge(user);		
	}

	@Override
	public void deleteUser(Login user) {
		delete(user);
	}
	
}
