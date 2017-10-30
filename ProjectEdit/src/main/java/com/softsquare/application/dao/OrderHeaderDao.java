package com.softsquare.application.dao;

import java.util.ArrayList;

import com.softsquare.application.domain.OrderHeaderMapping;
import com.softsquare.application.entity.OrderHeader;

public interface OrderHeaderDao {
	public ArrayList<OrderHeaderMapping> search(OrderHeaderMapping orderHeaderMapping) throws Exception;
	public Integer pagingTotalRecord(OrderHeaderMapping orderHeaderMapping) throws Exception;
	public void orderHeaderSave(OrderHeader orderHeader) throws Exception;
	public void orderHeaderEdit(OrderHeader orderHeader) throws Exception;
	public void orderHeaderRemove(OrderHeader orderHeader) throws Exception;
}
