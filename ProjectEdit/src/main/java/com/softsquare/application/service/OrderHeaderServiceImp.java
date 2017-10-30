package com.softsquare.application.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.dao.OrderHeaderDao;
import com.softsquare.application.domain.OrderHeaderMapping;
import com.softsquare.application.entity.OrderHeader;

@Service
public class OrderHeaderServiceImp implements OrderHeaderService {

	@Autowired
	private OrderHeaderDao orderHeaderDao;
	@Autowired
	private OrderDetailService OrderDetailService;
	
	@Override
	public ArrayList<OrderHeaderMapping> search(OrderHeaderMapping orderHeaderMapping) throws Exception {
		return orderHeaderDao.search(orderHeaderMapping);
	}

	@Override
	public Integer saveAndEdit(OrderHeaderMapping orderHeaderMapping)
			throws Exception {
		Integer headerId = null;
		if(BeanUtils.isEmpty(orderHeaderMapping.getHyOrdhId())){
			OrderHeader orderHeader = new OrderHeader();
			orderHeader.setHyOrdhName(orderHeaderMapping.getHyOrdhName());
			orderHeader.setHyPeriodId(orderHeaderMapping.getHyPeriodId());
			orderHeader.setHyOrdhToltalPrice(orderHeaderMapping.getHyOrdhToltalPrice());
			orderHeaderDao.orderHeaderSave(orderHeader);
			headerId = orderHeader.getHyOrdhId();
		}else{
			OrderHeader orderHeader = new OrderHeader();
			orderHeader.setHyOrdhId(orderHeaderMapping.getHyOrdhId());
			orderHeader.setHyOrdhName(orderHeaderMapping.getHyOrdhName());
			orderHeader.setHyPeriodId(orderHeaderMapping.getHyPeriodId());
			orderHeader.setHyOrdhToltalPrice(orderHeaderMapping.getHyOrdhToltalPrice());
			orderHeaderDao.orderHeaderEdit(orderHeader);
			headerId = orderHeader.getHyOrdhId();
		}
		return headerId;
	}

	@Override
	public void delete(OrderHeaderMapping orderHeaderMapping) throws Exception {
		Gson gson = new Gson();
		if(BeanUtils.isNotEmpty(orderHeaderMapping.getGridStore_jsonDestroyRecords())){
			OrderHeader[] orderHeaderArray = gson.fromJson(orderHeaderMapping.getGridStore_jsonDestroyRecords(), OrderHeader[].class);
			for (OrderHeader orderHeader : orderHeaderArray) {
				OrderDetailService.removeByHeaderId(orderHeader.getHyOrdhId());
				orderHeaderDao.orderHeaderRemove(orderHeader);
			}
		}		
	}

	@Override
	public Integer pagingTotalRecord(OrderHeaderMapping orderHeaderMapping) throws Exception {
		return orderHeaderDao.pagingTotalRecord(orderHeaderMapping);
	}

}
