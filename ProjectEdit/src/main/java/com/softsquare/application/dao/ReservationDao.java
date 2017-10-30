package com.softsquare.application.dao;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import com.softsquare.application.domain.ReservationMapping;
import com.softsquare.application.entity.Reservation;
public interface ReservationDao {
	public void RSVSave (com.softsquare.application.entity.Reservation reservation) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RSVDelete(com.softsquare.application.entity.Reservation reservation) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RSVUpdate(com.softsquare.application.entity.Reservation reservation) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
//	public void RSVSearch(com.softsquare.application.entity.Reservation reservation) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	List<Map<String, Object>> meetingRoom();
	
//	public List<Map<String, Object>> datesearch(String grid);
	public List<Map<String, Object>> RSVSearch(ReservationMapping reservation);
	List<Map<String, Object>> meetingroom();
	
	public void savegrid(Reservation reservation1);
	public void updategrid(Reservation reservation1);
	public void deleteReservation(Reservation reser);
	List<Map<String, Object>> getreportUser();

}
