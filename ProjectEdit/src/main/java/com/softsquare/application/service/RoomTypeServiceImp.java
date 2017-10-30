package com.softsquare.application.service;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.softsquare.application.dao.RoomTypeDao;
import com.softsquare.application.entity.RoomType;

@Service
public class RoomTypeServiceImp implements RoomTypeService{
	
	@Autowired
	private RoomTypeDao roomtypeDao;
	
	@Override
	public ArrayList<RoomType> getRoomType() {
		return roomtypeDao.getRoomType();
	}
	
}