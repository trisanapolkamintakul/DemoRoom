package com.softsquare.application.service;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.dao.RoomDetailDao;
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.RoomDetail;

@Service
public class RoomDetailServiceImp implements RoomDetailService {

	@Autowired
	RoomDetailDao roomDetailDao;

	@Override
	public void RMSave(RoomDetailMapping roomDetail) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		RoomDetail detail = new RoomDetail();
		detail.setId(roomDetail.getId());
		detail.setRmCode(roomDetail.getCode());
		detail.setRmType(roomDetail.getType());
		detail.setRmName(roomDetail.getName());
		detail.setRmDetail(roomDetail.getDetail());
		detail.setRmLocation(roomDetail.getLocation());
		detail.setRmAmount(roomDetail.getAmount());
		roomDetailDao.RMSave(detail);
	}

	@Override
	public void RMDelete(RoomDetailMapping roomDetail) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		RoomDetail detail = new RoomDetail();
		detail.setId(roomDetail.getId());
		detail.setRmCode(roomDetail.getCode());
		detail.setRmType(roomDetail.getType());
		detail.setRmName(roomDetail.getName());
		detail.setRmDetail(roomDetail.getDetail());
		detail.setRmLocation(roomDetail.getLocation());
		detail.setRmAmount(roomDetail.getAmount());
		roomDetailDao.RMDelete(detail);

	}

	@Override
	public void RMUpdate(RoomDetailMapping roomDetail) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		RoomDetail detail = new RoomDetail();
		detail.setId(roomDetail.getId());
		detail.setRmCode(roomDetail.getCode());
		detail.setRmType(roomDetail.getType());
		detail.setRmName(roomDetail.getName());
		detail.setRmDetail(roomDetail.getDetail());
		detail.setRmLocation(roomDetail.getLocation());
		detail.setRmAmount(roomDetail.getAmount());
		roomDetailDao.RMUpdate(detail);

	}

	@Override
	public List<Map<String, Object>> RMSearch(RoomDetailMapping roomDetail) throws NoSuchMethodException,
			SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		 return roomDetailDao.RMSearch(roomDetail);
	}

	@Override
	public void savegrid1(RoomDetailMapping[] room) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {// วนแยกข้อมูลsetๆๆ
		for (RoomDetailMapping roomDetailMapping : room) {
			if (BeanUtils.isNotNull(roomDetailMapping.getId())) {
				RoomDetail roomDetail = new RoomDetail();
				roomDetail.setId(roomDetailMapping.getId());// ต้องมีไอดีทุกอัน
				roomDetail.setRmCode(roomDetailMapping.getCode());
				roomDetail.setRmType(roomDetailMapping.getType());
				roomDetail.setRmName(roomDetailMapping.getName());
				roomDetail.setRmDetail(roomDetailMapping.getDetail());
				roomDetail.setRmLocation(roomDetailMapping.getLocation());
				roomDetail.setRmAmount(roomDetailMapping.getAmount());
				roomDetailDao.RMUpdate(roomDetail);// มันคือUpdateส่งmethodไปที่DaoImp
			} else {
				RoomDetail roomDetail = new RoomDetail();
				roomDetail.setRmCode(roomDetailMapping.getCode());
				roomDetail.setRmType(roomDetailMapping.getType());
				roomDetail.setRmName(roomDetailMapping.getName());
				roomDetail.setRmDetail(roomDetailMapping.getDetail());
				roomDetail.setRmLocation(roomDetailMapping.getLocation());
				roomDetail.setRmAmount(roomDetailMapping.getAmount());
				try {
					roomDetailDao.RMSave(roomDetail);
				} catch (NoSuchMethodException e) {
					e.printStackTrace();
				} catch (SecurityException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void removeRoom(Integer deletes) {
		RoomDetail room = new RoomDetail();
		room.setId(deletes);
		roomDetailDao.deleteRoom(room);

	}

	@Override
	public List<Map<String, Object>> RMSearchall(RoomDetailMapping roomDetail) {
		return roomDetailDao.RMSearchall(roomDetail);
	}

	@Override
	public List<Map<String, Object>> meetingRoom(String roomdate, String starttime, String endtime) {
		return roomDetailDao.meetingRoom(roomdate,starttime,endtime);
	}

	@Override
	public List<Map<String, Object>> meetingroom(String roomdate, String starttime, String endtime) {
		return roomDetailDao.meetingroom(roomdate,starttime,endtime);
	}
	
	@Override
	public ArrayList<RoomDetail> getRoom() {
		return roomDetailDao.getRoom();
	}
}
