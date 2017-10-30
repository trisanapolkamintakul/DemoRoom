package com.softsquare.application.dao;

import java.math.BigDecimal;
import java.util.ArrayList;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.domain.OrderDetailMapping;
import com.softsquare.application.entity.OrderDetail;

@Repository()
@Component
public class OrderDetailDaoImp extends AbstractDao<Integer, OrderDetail> implements OrderDetailDao{

	@SuppressWarnings("unchecked")
	@Override
	public ArrayList<OrderDetail> search(OrderDetailMapping orderDetailMapping) throws Exception {

		Criteria criteria = getSession().createCriteria(OrderDetail.class, "orderDetail");
		criteria.createAlias("orderDetail.orderHeader", "orderHeader");
		ProjectionList projections = Projections.projectionList()
		            .add(Projections.property("orderDetail.hyOrddId").as("hyOrddId"))
		            .add(Projections.property("orderDetail.hyOrdhId").as("hyOrdhId"))
		            .add(Projections.property("orderDetail.hyOrddLottery").as("hyOrddLottery"))
		            .add(Projections.property("orderDetail.hyOrddTop").as("hyOrddTop"))
		            .add(Projections.property("orderDetail.hyOrddReverse").as("hyOrddReverse"))
		            .add(Projections.property("orderDetail.hyOrddUnder").as("hyOrddUnder"));
		 criteria.setProjection(projections);
		 
		 if(BeanUtils.isNotNull(orderDetailMapping.getHyOrdhId())){
			 criteria.add(Restrictions.eq("orderHeader.hyOrdhId", orderDetailMapping.getHyOrdhId()));
		 }
		 
		//Start Enable Paging
		 if(BeanUtils.isNotNull(orderDetailMapping.getGridStore_start()) || BeanUtils.isNotNull(orderDetailMapping.getGridStore_limit())){
			 criteria.setFirstResult(orderDetailMapping.getGridStore_start()).setMaxResults(orderDetailMapping.getGridStore_limit());
		 }
		 //End Enable Paging
		 
		 criteria.addOrder(Order.asc("orderDetail.hyOrddLottery")); 
		 criteria.setResultTransformer(Transformers.aliasToBean(OrderDetail.class));
		 ArrayList<OrderDetail> resultList =  (ArrayList<OrderDetail>) criteria.list();
		 
		 for (OrderDetail orderDetail : resultList) {
				if(BeanUtils.isNull(orderDetail.getHyOrddTop())){
					orderDetail.setHyOrddTop(new BigDecimal(0));
				}
				if(BeanUtils.isNull(orderDetail.getHyOrddReverse())){
					orderDetail.setHyOrddReverse(new BigDecimal(0));
				}
				if(BeanUtils.isNull(orderDetail.getHyOrddUnder())){
					orderDetail.setHyOrddUnder(new BigDecimal(0));
				}
			}
		 
		return resultList;
	}

	@Override
	public void orderDetailSave(OrderDetail orderDetail) throws Exception {
		save(orderDetail);
	}

	@Override
	public void orderDetailUpdate(OrderDetail orderDetail) throws Exception {
		merge(orderDetail);
	}

	@Override
	public void orderDetailDelete(OrderDetail orderDetail) throws Exception {
		delete(orderDetail);
	}

	@Override
	public Integer pagingTotalRecord(OrderDetailMapping orderDetailMapping) throws Exception {
		Criteria criteria = getSession().createCriteria(OrderDetail.class, "orderDetail");
		criteria.createAlias("orderDetail.orderHeader", "orderHeader");
		 if(BeanUtils.isNotNull(orderDetailMapping.getHyOrdhId())){
			 criteria.add(Restrictions.eq("orderHeader.hyOrdhId", orderDetailMapping.getHyOrdhId()));
		 }
	   return Integer.parseInt(criteria.setProjection(Projections.rowCount()).uniqueResult().toString());
	}

	@Override
	public OrderDetailMapping orderDetailSumPrice(Integer ordHeaderId) throws Exception {
		Criteria criteria = getSession().createCriteria(OrderDetail.class, "orderDetail");
		ProjectionList projections = Projections.projectionList()
	            .add(Projections.sum("orderDetail.hyOrddTop").as("hyOrddTopSum"))
	            .add(Projections.sum("orderDetail.hyOrddReverse").as("hyOrddReverseSum"))
	            .add(Projections.sum("orderDetail.hyOrddUnder").as("hyOrddUnderSum"));
		 criteria.setProjection(projections);
		 
		 if(BeanUtils.isNotNull(ordHeaderId)){
			 criteria.add(Restrictions.eq("orderDetail.hyOrdhId", ordHeaderId));
		 }
			
		 criteria.setResultTransformer(Transformers.aliasToBean(OrderDetailMapping.class));
		 OrderDetailMapping resultList =  (OrderDetailMapping) criteria.uniqueResult();
	 
		return resultList;
	}

}
