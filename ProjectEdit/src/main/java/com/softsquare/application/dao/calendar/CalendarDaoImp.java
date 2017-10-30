package com.softsquare.application.dao.calendar;

import java.util.ArrayList;

import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Component;

import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.dao.AbstractDao;
import com.softsquare.application.domain.CalendarMapping;
import com.softsquare.application.entity.Calendar;

@Component
public class CalendarDaoImp extends AbstractDao<Integer, Calendar> implements CalendarDao{

	@Override
	public ArrayList<CalendarMapping> calendarQuery() {
		Criteria criteria = getSession().createCriteria(Calendar.class, "calendar");
		 ProjectionList projections = Projections.projectionList()
				 	.add(Projections.property("calendar.cId").as("id"))
		            .add(Projections.property("calendar.cTitle").as("title"))
		            .add(Projections.property("calendar.cStartDate").as("startDate"))
		            .add(Projections.property("calendar.cStartTime").as("startTime"))
		            .add(Projections.property("calendar.cEndDate").as("endDate"))
		            .add(Projections.property("calendar.cEndTime").as("endTime"))
		            .add(Projections.property("calendar.TOPIC").as("TOPIC"));
		 criteria.setProjection(projections);
		 criteria.setResultTransformer(Transformers.aliasToBean(CalendarMapping.class));
		 @SuppressWarnings("unchecked")
		ArrayList<CalendarMapping> rsl =  (ArrayList<CalendarMapping>)criteria.list();
		return rsl;
	}

	@Override
	public ArrayList<CalendarMapping> calendarEdit(CalendarMapping calendarMapping) {
		Criteria criteria = getSession().createCriteria(Calendar.class, "calendar");
		 ProjectionList projections = Projections.projectionList()
				 	.add(Projections.property("calendar.cId").as("id"))
		            .add(Projections.property("calendar.cTitle").as("title"))
		            .add(Projections.property("calendar.cStartDate").as("startDate"))
		            .add(Projections.property("calendar.cStartTime").as("startTime"))
		            .add(Projections.property("calendar.cEndDate").as("endDate"))
		            .add(Projections.property("calendar.cEndTime").as("endTime"))
		            .add(Projections.property("calendar.TOPIC").as("TOPIC"));
		 criteria.setProjection(projections);
		 if(!BeanUtils.isEmpty(calendarMapping.getId())){
			 criteria.add(Restrictions.eq("calendar.cId", calendarMapping.getId()));
		 }
		 criteria.setResultTransformer(Transformers.aliasToBean(CalendarMapping.class));
		 @SuppressWarnings("unchecked")
		ArrayList<CalendarMapping> rsl =  (ArrayList<CalendarMapping>)criteria.list();
		return rsl;
	}

	@Override
	public void SaveCalendar(Calendar detail)throws Exception {
		save(detail);
		
	}

}
