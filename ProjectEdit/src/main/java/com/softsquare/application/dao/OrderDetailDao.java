package com.softsquare.application.dao;

import java.util.ArrayList;

import com.softsquare.application.domain.OrderDetailMapping;
import com.softsquare.application.entity.OrderDetail;

public interface OrderDetailDao {
	public ArrayList<OrderDetail> search(OrderDetailMapping orderDetailMapping)  throws Exception;
	public Integer pagingTotalRecord(OrderDetailMapping orderDetailMapping)  throws Exception;
	public void orderDetailSave(OrderDetail orderDetail) throws Exception;
	public void orderDetailUpdate(OrderDetail orderDetail) throws Exception;
	public void orderDetailDelete(OrderDetail orderDetail) throws Exception;
	public OrderDetailMapping orderDetailSumPrice(Integer ordHeaderId) throws Exception;
}
