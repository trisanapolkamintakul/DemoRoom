package com.softsquare.application.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.domain.OrderDetailMapping;
import com.softsquare.application.domain.OrderHeaderMapping;
import com.softsquare.application.domain.grid.GridMapping;
import com.softsquare.application.entity.OrderDetail;
import com.softsquare.application.service.OrderDetailService;
import com.softsquare.application.service.OrderHeaderService;

@RestController
@RequestMapping("/orderDetail.html")
@Configurable
public class OrderDetailController {

	@Autowired
	private OrderHeaderService orderHeaderService;
	
	@Autowired
	private OrderDetailService orderDetailService;
	
	@RequestMapping(method=RequestMethod.GET)
    public ModelAndView page(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderDetailMapping orderDetailMapping){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("hyOrderDetail");
    	if(BeanUtils.isNotNull(orderDetailMapping.getHyOrdhId())){
    		mav.addObject("headerId", orderDetailMapping.getHyOrdhId());
    	}
    	return ControllerDefault.DefaultModelAndView(mav, request);
    }
	 
	@RequestMapping(params =  {"method=orderDetailSumPrice", "xaction=read"} , method=RequestMethod.POST)
    public void orderDetailSumPrice(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderDetailMapping orderDetailMapping) throws Throwable{
	 Gson gson = new Gson();
	 String  json = gson.toJson(orderDetailService.orderDetailSumPrice(orderDetailMapping.getHyOrdhId()));
	 response.getWriter().write(json);
	}
	
	@RequestMapping(params =  {"method=orderDetail", "xaction=read"} , method=RequestMethod.POST)
    public void searchHeader(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderHeaderMapping orderHeaderMapping) throws Throwable{
	 Gson gson = new Gson();
	 String  json = gson.toJson(orderHeaderService.search(orderHeaderMapping));
	 response.getWriter().write("{records:"+json+"}");
	}
	
	
//	@RequestMapping(params =  {"method=orderDetailGrid", "xaction=read"} , method=RequestMethod.POST)
//    public void addDetail(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderDetailMapping orderDetailMapping) throws Throwable{
//	 Gson gson = new Gson();
//	 ArrayList<OrderDetail> result =  orderDetailService.search(orderDetailMapping);
////	 if(BeanUtils.isNotEmpty(orderDetailMapping.getGridStore_jsonCreateRecords())){
//		 OrderDetail[] orderDetailArray = gson.fromJson(orderDetailMapping.getGridStore_jsonCreateRecords(), OrderDetail[].class);
//		 ArrayList<OrderDetail> orderDetailArrayList = new ArrayList<OrderDetail>((Collection<? extends OrderDetail>) Arrays.asList(orderDetailArray));
//		 result.addAll(orderDetailArrayList);
////	 }
//	 String  json = gson.toJson(result);
//	 Integer totalRecord = orderDetailService.pagingTotalRecord(orderDetailMapping);
//	 Integer sizeRecord = totalRecord+orderDetailArrayList.size();
//	 response.getWriter().write("{records:"+json+", total:"+sizeRecord+"}");
//	}
	
	@RequestMapping(params =  {"method=orderDetailGrid", "xaction=search"} , method=RequestMethod.POST)
    public void searchDetail(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderDetailMapping orderDetailMapping) throws Throwable{
	 Gson gson = new Gson();
	 ArrayList<OrderDetail> result =  orderDetailService.search(orderDetailMapping);
	 String  json = gson.toJson(result);
	 Integer totalRecord = orderDetailService.pagingTotalRecord(orderDetailMapping);
	 response.getWriter().write("{records:"+json+", total:"+totalRecord+"}");
	}
	 
	@Transactional
	@RequestMapping(params =  {"method=orderDetailGrid", "xaction=save"}  , method=RequestMethod.POST)
    public void save(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderDetailMapping orderDetailMapping
    		, @ModelAttribute OrderHeaderMapping orderHeaderMapping) throws Throwable{
		Gson gson = new Gson();
		Integer headerId = orderHeaderService.saveAndEdit(orderHeaderMapping);
		orderDetailService.save(orderDetailMapping, headerId);
		
		//update Toltal price
		OrderDetailMapping OrderDetailMapping2 = orderDetailService.orderDetailSumPrice(headerId);
		orderHeaderMapping.setHyOrdhId(headerId);
		orderHeaderMapping.setHyOrdhToltalPrice(OrderDetailMapping2.getHyOrddReverseSum().add(OrderDetailMapping2.getHyOrddTopSum()).add(OrderDetailMapping2.getHyOrddUnderSum()));
		orderHeaderService.saveAndEdit(orderHeaderMapping);
		
		GridMapping gridMapping = new GridMapping();
		gridMapping.setValueInteger1(headerId);
		String  json = gson.toJson(gridMapping);
		response.getWriter().write("{records:"+json+"}");
	}
	
}
