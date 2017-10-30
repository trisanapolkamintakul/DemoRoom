package com.softsquare.application.dao;

import java.util.ArrayList;
import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;
import com.softsquare.application.entity.RoomType;

@Component
public class RoomTypeDaoImp extends AbstractDao<Integer, RoomType> implements RoomTypeDao{
	
	@SuppressWarnings("unchecked")
	@Override
	public ArrayList<RoomType> getRoomType() {
		 Criteria criteria = getSession().createCriteria(RoomType.class, "pr");
		 ProjectionList projections = Projections.projectionList()
		            .add(Projections.property("pr.RTID").as("RTID"))
		            .add(Projections.property("pr.RTNAME").as("RTNAME"));
		 criteria.setProjection(projections);
		 criteria.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
		 ArrayList<RoomType> provinceList = (ArrayList<RoomType>) criteria.list();
		return provinceList;
	}

}