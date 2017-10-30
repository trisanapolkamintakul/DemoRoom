package com.softsquare.application.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.dao.OrderDetailDao;
import com.softsquare.application.domain.OrderDetailMapping;
import com.softsquare.application.entity.OrderDetail;

@Service
public class OrderDetailServiceImp implements OrderDetailService{
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Override
	public ArrayList<OrderDetail> search(OrderDetailMapping orderDetailMapping)  throws Exception {
		return orderDetailDao.search(orderDetailMapping);
	}

	@Override
	public void save(OrderDetailMapping orderDetailMapping, Integer headerId)  throws Exception {
		Gson gson = new Gson();
		if(BeanUtils.isNotEmpty(orderDetailMapping.getGridStore_jsonCreateRecords()) && BeanUtils.isNotNull(headerId)){
			OrderDetail[] orderDetailArray = gson.fromJson(orderDetailMapping.getGridStore_jsonCreateRecords(), OrderDetail[].class);
			for (OrderDetail orderDetail : orderDetailArray) {
				orderDetail.setHyOrdhId(headerId);
				orderDetailDao.orderDetailSave(orderDetail);
			}
		}
		
		if(BeanUtils.isNotEmpty(orderDetailMapping.getGridStore_jsonUpdateRecords()) && BeanUtils.isNotNull(headerId)){
			OrderDetail[] orderDetailArray = gson.fromJson(orderDetailMapping.getGridStore_jsonUpdateRecords(), OrderDetail[].class);
			for (OrderDetail orderDetail : orderDetailArray) {
				orderDetailDao.orderDetailUpdate(orderDetail);
			}
		}
		
		if(BeanUtils.isNotEmpty(orderDetailMapping.getGridStore_jsonDestroyRecords())){
			OrderDetail[] orderDetailArray = gson.fromJson(orderDetailMapping.getGridStore_jsonDestroyRecords(), OrderDetail[].class);
			for (OrderDetail orderDetail : orderDetailArray) {
				orderDetailDao.orderDetailDelete(orderDetail);
			}
		}
	}

	@Override
	public void removeByHeaderId(Integer ordHeaderId) throws Exception {
		OrderDetailMapping orderDetailMapping = new OrderDetailMapping();
		orderDetailMapping.setHyOrdhId(ordHeaderId);
		ArrayList<OrderDetail> resultQuery  = orderDetailDao.search(orderDetailMapping);
		for (OrderDetail orderDetail : resultQuery) {
			orderDetailDao.orderDetailDelete(orderDetail);
		}
	}

	@Override
	public Integer pagingTotalRecord(OrderDetailMapping orderDetailMapping)throws Exception {
		return orderDetailDao.pagingTotalRecord(orderDetailMapping);
	}

	@Override
	public OrderDetailMapping orderDetailSumPrice(Integer ordHeaderId) throws Exception {
		return orderDetailDao.orderDetailSumPrice(ordHeaderId);
	}
	
}
