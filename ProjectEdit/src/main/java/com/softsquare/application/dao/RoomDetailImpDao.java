package com.softsquare.application.dao;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Component;

import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.RoomDetail;

@Component
public class RoomDetailImpDao extends AbstractDao<Integer,com.softsquare.application.entity.RoomDetail> implements  RoomDetailDao{


	
	@Override
	public void RMSave(com.softsquare.application.entity.RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		save(roomdetail);
	}
	
	@Override
	public void RMDelete(RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		delete(roomdetail);
		
	}

	@Override
	public void RMUpdate(RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		merge(roomdetail);
		
	}

	@Override
	public void RMSearch(RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		
	}

	@Override
	public List<Map<String, Object>> RMSearch(RoomDetailMapping roomDetail) {
		Criteria criteria = getSession().createCriteria(RoomDetail.class, "ca");	
		 ProjectionList projections = Projections.projectionList()
				 .add(Projections.property("ca.rmCode"), "rmCode")
				 .add(Projections.property("ca.rmType"), "rmType")
				 .add(Projections.property("ca.rmName"), "rmName")
				 .add(Projections.property("ca.rmDetail"), "rmDetail")
		 		 .add(Projections.property("ca.rmLocation"), "rmLocation")
		 		 .add(Projections.property("ca.rmAmount"), "rmAmount")
		 		 .add(Projections.property("ca.id"), "id");
		 criteria.setProjection(projections);
		 criteria.add(Restrictions.like("ca.rmName", "%"+roomDetail.getSearch()+"%"));		
		 //criteria.add(Restrictions.eq("ca.id", 3));
		 // where เงื่อนไขในการค้นหา
		 criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 List<Map<String, Object>> loadgrid = criteria.list();
		 return loadgrid;
	}
	
	@Override
	public List<Map<String, Object>> RMSearchall(RoomDetailMapping roomDetail) {
		Criteria criteria = getSession().createCriteria(RoomDetail.class, "ca");	
		 ProjectionList projections = Projections.projectionList()
				 .add(Projections.property("ca.rmCode"), "rmCode")
				 .add(Projections.property("ca.rmType"), "rmType")
				 .add(Projections.property("ca.rmName"), "rmName")
				 .add(Projections.property("ca.rmDetail"), "rmDetail")
		 		 .add(Projections.property("ca.rmLocation"), "rmLocation")
		 		 .add(Projections.property("ca.rmAmount"), "rmAmount")
		 		 .add(Projections.property("ca.id"), "id");
		 criteria.setProjection(projections);
		 //criteria.add(Restrictions.eq("ca.id", 3));
		 // where เงื่อนไขในการค้นหา
		 criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 List<Map<String, Object>> loadgrid = criteria.list();
		 return loadgrid;
	}

	@Override
	public void savegrid(RoomDetail roomDetail) {
		getSession().update(roomDetail);
		
	}

	@Override
	public void deleteRoom(RoomDetail room) {
		getSession().delete(room);
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> meetingRoom(String roomdate, String starttime, String endtime) {
		System.out.println(roomdate);
		System.out.println(starttime);
		System.out.println(endtime);
		
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT room.RMID AS code,room.RMName AS name,room.RMType As type  ");
		sql.append(" FROM room ");
		sql.append(" WHERE room.RMName NOT IN ( ");
		sql.append("	SELECT reservation.RSVROOM ");
		sql.append("    FROM reservation ");
		sql.append("	WHERE ");
		sql.append("   (( STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVSTARTID), '%d/%m/%Y %H:%i')  ");
		sql.append("    > STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("  AND STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVSTARTID), '%d/%m/%Y %H:%i') ");
		sql.append("	< STR_TO_DATE(?, '%d/%m/%Y %H:%i')) ");
		sql.append("  OR  ");
		sql.append("	( STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVENDTime), '%d/%m/%Y %H:%i')  ");
		sql.append("	> STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("  AND STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVENDTime), '%d/%m/%Y %H:%i') ");
		sql.append("	< STR_TO_DATE(?, '%d/%m/%Y %H:%i')) ");
		sql.append("	) UNION  ");
		sql.append("	SELECT reservation.RSVROOM ");
		sql.append("	FROM reservation ");
		sql.append("	WHERE ");
		sql.append("	 ( STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("    >= STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVSTARTID), '%d/%m/%Y %H:%i')  ");
		sql.append("  AND  STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("	<= STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVENDTime), '%d/%m/%Y %H:%i')) ");
		sql.append("	         );  ");
        	                         
		SQLQuery query  = getSession().createSQLQuery(sql.toString());
		query.setParameter(0, roomdate+" "+starttime);
		query.setParameter(1, roomdate+" "+endtime);
		query.setParameter(2, roomdate+" "+starttime);
		query.setParameter(3, roomdate+" "+endtime);
		query.setParameter(4, roomdate+" "+starttime);
		query.setParameter(5, roomdate+" "+endtime);
		query.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE);
		List<Map<String, Object>> list = query.list();
		return list;

	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> meetingroom(String roomdate, String starttime, String endtime) {
		System.out.println(roomdate);
		System.out.println(starttime);
		System.out.println(endtime);
		
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT room.RMID AS code,room.RMName AS name,room.RMType As type ");
		sql.append(" FROM room ");
		sql.append(" WHERE room.RMName NOT IN ( ");
		sql.append("	SELECT reservation.RSVROOM ");
		sql.append("    FROM reservation ");
		sql.append("	WHERE ");
		sql.append("   (( STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVSTARTID), '%d/%m/%Y %H:%i')  ");
		sql.append("    > STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("  AND STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVSTARTID), '%d/%m/%Y %H:%i') ");
		sql.append("	< STR_TO_DATE(?, '%d/%m/%Y %H:%i')) ");
		sql.append("  OR  ");
		sql.append("	( STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVENDTime), '%d/%m/%Y %H:%i')  ");
		sql.append("	> STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("  AND STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVENDTime), '%d/%m/%Y %H:%i') ");
		sql.append("	< STR_TO_DATE(?, '%d/%m/%Y %H:%i')) ");
		sql.append("	) UNION  ");
		sql.append("	SELECT reservation.RSVROOM ");
		sql.append("	FROM reservation ");
		sql.append("	WHERE ");
		sql.append("	 ( STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("    >= STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVSTARTID), '%d/%m/%Y %H:%i')  ");
		sql.append("  AND  STR_TO_DATE(?, '%d/%m/%Y %H:%i') ");
		sql.append("	<= STR_TO_DATE(CONCAT(RSVDATEAVAILABLE, ' ', RSVENDTime), '%d/%m/%Y %H:%i')) ");
		sql.append("	         );  ");
        
		SQLQuery query  = getSession().createSQLQuery(sql.toString());
		query.setParameter(0, roomdate+" "+starttime);
		query.setParameter(1, roomdate+" "+endtime);
		query.setParameter(2, roomdate+" "+starttime);
		query.setParameter(3, roomdate+" "+endtime);
		query.setParameter(4, roomdate+" "+starttime);
		query.setParameter(5, roomdate+" "+endtime);
		query.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE);
		List<Map<String, Object>> list = query.list();
		return list;

	}
	
	@SuppressWarnings("unchecked")
	@Override
	public ArrayList<RoomDetail> getRoom() {
		Criteria criteria = getSession().createCriteria(RoomDetail.class, "rd");
		ProjectionList projections = Projections.projectionList()
				.add(Projections.property("rd.id").as("id"))
				.add(Projections.property("rd.rmName").as("name"));
		criteria.setProjection(projections);
		criteria.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
		ArrayList<RoomDetail> projectList = (ArrayList<RoomDetail>) criteria.list();
		return projectList;
	}
	
}

//SELECT roomdetail.RMNAME,CAST(reservation.RSVSTARTID AS TIME) 
//,CAST(reservation.RSVENDTime AS TIME)- CAST(reservation.RSVSTARTID AS TIME)
//,IFNULL(CAST(CAST(reservation.RSVENDTime AS TIME)- CAST(reservation.RSVSTARTID AS TIME) AS TIME),'0000-00-00 00:00:00'-INTERVAL 30 MINUTE)
//                         FROM roomdetail 
//                         join reservation on reservation.RSVROOM = roomdetail.RMNAME 
//                                         
