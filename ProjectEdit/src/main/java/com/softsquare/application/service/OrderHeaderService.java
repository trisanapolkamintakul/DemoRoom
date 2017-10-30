package com.softsquare.application.service;

import java.util.ArrayList;

import com.softsquare.application.domain.OrderHeaderMapping;

public interface OrderHeaderService {
	public ArrayList<OrderHeaderMapping> search(OrderHeaderMapping orderHeaderMapping) throws Exception;
	public Integer pagingTotalRecord(OrderHeaderMapping orderHeaderMapping) throws Exception;
	public Integer saveAndEdit(OrderHeaderMapping orderHeaderMapping) throws Exception;
	public void delete(OrderHeaderMapping orderHeaderMapping) throws Exception;
}
