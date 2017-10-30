package com.softsquare.application.dao;

import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.Transformers;
import org.jfree.chart.title.Title;
import org.springframework.stereotype.Component;

import com.softsquare.application.common.util.LoginUtils;
import com.softsquare.application.domain.ReservationMapping;

import com.softsquare.application.entity.Reservation;
import com.softsquare.application.entity.RoomDetail;


import groovy.sql.Sql;

@Component
public class ReservationImpDao extends AbstractDao<Integer, com.softsquare.application.entity.Reservation>
		implements ReservationDao {
	public void RSVSave(com.softsquare.application.entity.Reservation reservation) throws NoSuchMethodException,
			SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
//		System.out.println("-----------------------"+reservation.getRSVSTATUS());
		save(reservation);
	}

	public void RSVDelete(Reservation reservation) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		delete(reservation);

	}

	public void RSVUpdate(Reservation reservation) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		RSVUpdate(reservation);

	}

	@Override
	public List<Map<String, Object>> RSVSearch(ReservationMapping reservation) {
		Criteria criteria = getSession().createCriteria(Reservation.class, "ca");	
		 ProjectionList projections = Projections.projectionList()
				.add(Projections.property("ca.rsvRoom"), "room") 
		 		.add(Projections.property("ca.rsvRoomAvailable"), "rsvRoomAvailable")
		 		.add(Projections.property("ca.rsvDateAvailable"), "dateavailable")
		 		.add(Projections.property("ca.rsvStartID"), "startID")
		 		.add(Projections.property("ca.rsvEndTime"), "endtime")
		 		.add(Projections.property("ca.RSVSTATUS"), "RSVSTATUS")
		 		.add(Projections.property("ca.RSVTOPIC"), "RSVTOPIC")
		        .add(Projections.property("ca.id"), "id");
		      //  .add(Projections.property("ca.RSVTOPIC"), "RSVTOPIC");
		 		 
		 criteria.setProjection(projections);
		 if(!LoginUtils.getRole().equals("admin")){
			 criteria.add(Restrictions.eq("ca.createUser", LoginUtils.getUsername()));
		 }
		 criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> loadgrid = criteria.list();
		return loadgrid;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> meetingRoom() {
		DetachedCriteria criteria = DetachedCriteria.forClass(RoomDetail.class, "room");

		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.property("room.id"), "code");
		projectionList.add(Projections.property("room.rmName"), "desc");
		projectionList.add(Projections.property("room.rmType"), "type");

		criteria.setProjection(projectionList);

		System.out.println(criteria);

		criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return (List<Map<String, Object>>) createCriteriaList(criteria);

	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> meetingroom() {
		DetachedCriteria criteria = DetachedCriteria.forClass(RoomDetail.class, "room");

		ProjectionList projectionList = Projections.projectionList();
		//projectionList.add(Projections.property("room.id"), "code");
		projectionList.add(Projections.property("room.rmName"), "desc");

		criteria.setProjection(projectionList);

		System.out.println(criteria);

		criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return (List<Map<String, Object>>) createCriteriaList(criteria);

	}

	

	@Override
	public void savegrid(Reservation reservation1) {
		getSession().update(reservation1);
		
	}

	@Override
	public void updategrid(Reservation reservation1) {
		getSession().merge(reservation1);
		
	}

	@Override
	public void deleteReservation(Reservation reser) {
		getSession().delete(reser);
		
	}
	
	@Override
	public List<Map<String, Object>> getreportUser() {
		Criteria criteria = getSession().createCriteria(Reservation.class, "ca");	
		 ProjectionList projections = Projections.projectionList()
				 .add(Projections.property("ca.id"), "RSVID")
				 .add(Projections.property("ca.rsvRoom"), "RSVROOM")
				 .add(Projections.property("ca.rsvDateAvailable"), "RSVDATEAVAILABLE");
		 criteria.setProjection(projections);
		 criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 List<Map<String, Object>> loadgrid = criteria.list();
		 return loadgrid;
	}

/*	@Override
	public List<Map<String, Object>> datesearch(String grid) {
		DetachedCriteria criteria = DetachedCriteria.forClass(RoomDetail.class, "date");

		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.property("date.id"), "code");
		projectionList.add(Projections.property("date.rmName"), "desc");

		criteria.setProjection(projectionList);
//		criteria.add(Restrictions.eq("login.username", username));
		System.out.println(criteria);

		criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return (List<Map<String, Object>>) createCriteriaList(criteria);

	}
*/
/*	private List<Map<String, Object>> test() {

		String testSql = "SELECT roomdetail.RMNAME as namese" + ",reservation.RSVSTARTID as dates"
				+ ",reservation.RSVENDTime as datesms" + " FROM roomdetail "
				+ " join reservation on reservation.RSVID = roomdetail.RMID "
				+ " where roomdetail.CREATE_DATE = '2015-11-11 17:00:37.118127' ";
		SQLQuery sql = getSession().createSQLQuery(testSql);
		sql.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE);
		List<Map<String, Object>> list = sql.list();
		return list;
	}
*/

}
