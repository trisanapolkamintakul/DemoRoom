package com.softsquare.application.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import com.softsquare.application.domain.ReservationMapping;
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.Reservation;

public interface ReservationService {

	public Reservation RSVSave( ReservationMapping reservation ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RSVDelete(ReservationMapping reservation) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RSVUpdate(ReservationMapping reservation ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public List<Map<String, Object>> RSVSearch(ReservationMapping reservation ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	//void savegrid1(RoomDetailMapping[] roomgrid);
	//public void removeRoom(Integer deletes);
	List<Map<String, Object>> meetingRoom();
	
//	public List<Map<String, Object>> DateSearch(String grid);
	void savegrid1(ReservationMapping[] reservationgrid);
	public void updategrid(ReservationMapping[] reservationgrid);
	public void removeReservation(Integer deletes);
	List<Map<String, Object>> getreportUser();
	
}
