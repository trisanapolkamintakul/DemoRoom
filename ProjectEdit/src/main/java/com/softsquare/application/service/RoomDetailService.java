package com.softsquare.application.service;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.RoomDetail;

public interface RoomDetailService {
	
	public void RMSave(RoomDetailMapping roomDetail ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RMDelete(RoomDetailMapping roomDetail ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RMUpdate(RoomDetailMapping roomDetail ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public List<Map<String, Object>> RMSearch(RoomDetailMapping roomDetail ) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	void savegrid1(RoomDetailMapping[] roomgrid) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void removeRoom(Integer deletes);
	List<Map<String, Object>> RMSearchall(RoomDetailMapping roomDetail);
//	List<Map<String, Object>> meetingRoom(String roomdate);
//  List<Map<String, Object>> meetingroom(String roomdate);
	ArrayList<RoomDetail> getRoom();
	List<Map<String, Object>> meetingRoom(String roomdate, String starttime, String endtime);
	List<Map<String, Object>> meetingroom(String roomdate, String starttime, String endtime);

}
