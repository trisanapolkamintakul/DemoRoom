package com.softsquare.application.dao;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.RoomDetail;

public interface RoomDetailDao   {
	
	public void RMSave (com.softsquare.application.entity.RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RMDelete(com.softsquare.application.entity.RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RMUpdate(com.softsquare.application.entity.RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public void RMSearch(com.softsquare.application.entity.RoomDetail roomdetail) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	public List<Map<String, Object>> RMSearch(RoomDetailMapping roomDetail);
	public void savegrid(RoomDetail roomDetail);
	public void deleteRoom(RoomDetail room);
	List<Map<String, Object>> RMSearchall(RoomDetailMapping roomDetail);
//	List<Map<String, Object>> meetingRoom(String roomdate);
//	List<Map<String, Object>> meetingroom(String roomdate);
	ArrayList<RoomDetail> getRoom();
	List<Map<String, Object>> meetingRoom(String roomdate, String starttime, String endtime);
	List<Map<String, Object>> meetingroom(String roomdate, String starttime, String endtime);
	
	
}
