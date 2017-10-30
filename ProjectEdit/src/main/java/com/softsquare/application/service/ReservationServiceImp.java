package com.softsquare.application.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.common.util.DateUtils;
import com.softsquare.application.common.util.LoginUtils;

import com.softsquare.application.dao.ReservationDao;
import com.softsquare.application.dao.RoomDetailDao;
import com.softsquare.application.domain.ReservationMapping;
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.Reservation;
import com.softsquare.application.entity.RoomDetail;

@Service
public class ReservationServiceImp implements ReservationService{
	
	@Autowired
	ReservationDao reservationDao;
	
	@Autowired
	RoomDetailDao roomDetailDao;

	@Override
	public Reservation RSVSave(ReservationMapping reservation) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
			Reservation detail = new Reservation();
			detail.setRsvRoom(reservation.getRoom());
			detail.setRsvDateAvailable(reservation.getDateavailable());
			detail.setRsvRoomAvailable(reservation.getRoomavailable());
			detail.setRsvStartID(reservation.getStartID());
			detail.setRsvEndTime(reservation.getEndtime());
			detail.setRSVTOPIC(reservation.getRSVTOPIC());
			detail.setRSVSTATUS("Wait");
			detail.setUsername(LoginUtils.getUsername());
			 reservationDao.RSVSave(detail);
//			 System.out.println(reservation.getDateavailable()+"5555555555555555555555555");
//			 System.out.println(reservation.getEndtime()+"777777777777777777777777777");
			return detail; 
	}

	@Override
	public void RSVDelete(ReservationMapping reservation) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Reservation detail = new Reservation();
		detail.setRsvDateAvailable(reservation.getDateavailable());
		detail.setRsvDateAvailable(reservation.getDateavailable());
		detail.setRsvStartID(reservation.getStartID());
		detail.setRsvEndTime(reservation.getEndtime());
		detail.setRSVTOPIC(reservation.getRSVTOPIC());
		reservationDao.RSVDelete(detail);
		
	}

	@Override
	public void RSVUpdate(ReservationMapping reservation) throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Reservation detail = new Reservation();
		detail.setRsvDateAvailable(reservation.getDateavailable());
		detail.setRsvStartID(reservation.getStartID());
		detail.setRsvEndTime(reservation.getEndtime());
		detail.setRSVTOPIC(reservation.getRSVTOPIC());
		detail.setId(reservation.getId());
		reservationDao.RSVUpdate(detail);
		
	}
	
	@Override
	public List<Map<String, Object>> RSVSearch(ReservationMapping reservationMap) throws NoSuchMethodException,
			SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		return reservationDao.RSVSearch(reservationMap);
	}

	@Override
	public List<Map<String, Object>> meetingRoom() {
		return reservationDao.meetingRoom();
	}


	@Override
	public void savegrid1(ReservationMapping[] reservation) {
		for (ReservationMapping reservationMapping : reservation) {
			if (BeanUtils.isNotNull(reservationMapping.getId())) {
				Reservation reservation1 = new Reservation();
				reservation1.setId(reservationMapping.getId());// ต้องมีไอดีทุกอัน
				reservation1.setRsvDateAvailable(reservationMapping.getDateavailable());
				reservation1.setRsvRoom(reservationMapping.getRoom());
				reservation1.setRsvStartID(reservationMapping.getStartID());
				reservation1.setRsvEndTime(reservationMapping.getEndtime());
				reservation1.setRSVTOPIC(reservationMapping.getRSVTOPIC());
				reservation1.setRSVSTATUS(reservationMapping.getRSVSTATUS());
				reservation1.setUsername(LoginUtils.getUsername());
				reservationDao.savegrid(reservation1);// มันคือUpdateส่งmethodไปที่DaoImp
				System.out.println("save");
			} else {
				Reservation reservation1 = new Reservation();
				reservation1.setId(reservationMapping.getId());// ต้องมีไอดีทุกอัน
				reservation1.setRsvDateAvailable(reservationMapping.getDateavailable());
				reservation1.setRsvRoom(reservationMapping.getRoom());
				reservation1.setRsvStartID(reservationMapping.getStartID());
				reservation1.setRsvEndTime(reservationMapping.getEndtime());
				reservation1.setRSVTOPIC(reservationMapping.getRSVTOPIC());
				reservation1.setRSVSTATUS(reservationMapping.getRSVSTATUS());
                System.out.println("update");
				try {
					reservationDao.RSVSave(reservation1);
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

			// if (roomDetailMapping.getId() == null) {
			// } else {
			// roomDetail.setId(roomDetailMapping.getId());
			// roomDetailDao.updategrid2(roomDetail);
			// }
			//
		}
		
	}

	@Override
	public void updategrid(ReservationMapping[] reservationgrid) {
		for (ReservationMapping reservationMapping : reservationgrid) {
		Reservation reservation1 = new Reservation();
		System.out.println(reservationMapping.getRSVTOPIC()+"------Topic-------");
		reservation1.setId(reservationMapping.getId());// ต้องมีไอดีทุกอัน
		reservation1.setRsvDateAvailable(reservationMapping.getDateavailable());
		reservation1.setRsvRoom(reservationMapping.getRoom());
		reservation1.setRsvStartID(reservationMapping.getStartID());
		reservation1.setRsvEndTime(reservationMapping.getEndtime());
		reservation1.setUsername(reservationMapping.getUserName());
		reservation1.setRSVTOPIC(reservationMapping.getRSVTOPIC());
		reservation1.setRSVSTATUS(reservationMapping.getRSVSTATUS());
		reservationDao.updategrid(reservation1);
//		System.out.println("---------------------------------------------");
		}
		
	}

	@Override
	public void removeReservation(Integer deletes) {
		Reservation reser = new Reservation();
		reser.setId(deletes);
		reservationDao.deleteReservation(reser);
	}
	
	@Override
	public List<Map<String, Object>> getreportUser() {
		return reservationDao.getreportUser();
	}
}
