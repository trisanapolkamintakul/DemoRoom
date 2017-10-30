package com.softsquare.application.dao;

import java.util.ArrayList;

import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;

import com.softsquare.application.entity.Role;

public class RoleDaolmp extends AbstractDao<Integer, Role> implements RoleDao{
	
	@Override
	public ArrayList<Role> getRole() {
		 Criteria criteria = getSession().createCriteria(Role.class, "role");
		 ProjectionList projections = Projections.projectionList()
		            .add(Projections.property("role.roleId").as("roleId"))
		            .add(Projections.property("role.roleCode").as("roleCode"))
		            .add(Projections.property("role.roleName").as("roleName"));
		 criteria.setProjection(projections);
		 criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 ArrayList<Role> roleList = (ArrayList<Role>) criteria.list();
		return roleList;
	}

}
