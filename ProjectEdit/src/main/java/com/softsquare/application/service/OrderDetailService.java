package com.softsquare.application.service;

import java.util.ArrayList;

import com.softsquare.application.domain.OrderDetailMapping;
import com.softsquare.application.entity.OrderDetail;

public interface OrderDetailService {
	public ArrayList<OrderDetail> search(OrderDetailMapping orderDetailMapping)  throws Exception;
	public Integer pagingTotalRecord(OrderDetailMapping orderDetailMapping)  throws Exception;
	public void save(OrderDetailMapping orderDetailMapping, Integer headerId)  throws Exception;
	public void removeByHeaderId(Integer ordHeaderId) throws Exception;
	public OrderDetailMapping orderDetailSumPrice(Integer ordHeaderId) throws Exception;
}
