package com.softsquare.application.dao;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
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
import com.softsquare.application.domain.OrderHeaderMapping;
import com.softsquare.application.entity.OrderHeader;

@Repository()
@Component
public class OrderHeaderDaoImp extends AbstractDao<Integer, OrderHeader> implements OrderHeaderDao  {

	@SuppressWarnings("unchecked")
	@Override
	public ArrayList<OrderHeaderMapping> search(OrderHeaderMapping orderHeaderMapping)throws Exception {
		Criteria criteria = getSession().createCriteria(OrderHeader.class, "orderHeader");
		criteria.createAlias("orderHeader.period", "period");
		ProjectionList projections = Projections.projectionList()
		            .add(Projections.property("orderHeader.hyOrdhId").as("hyOrdhId"))
		            .add(Projections.property("orderHeader.hyOrdhName").as("hyOrdhName"))
		            .add(Projections.property("orderHeader.HyOrdhToltalPrice").as("HyOrdhToltalPrice"))
		            .add(Projections.property("period.hyPeriodId").as("hyPeriodId"))
		            .add(Projections.property("period.hyPeriodName").as("hyPeriodName"))
		            .add(Projections.property("period.hyPeriodDate").as("hyPeriodDate"))
		            .add(Projections.property("period.hyPeriodPrice2").as("hyPeriodPrice2"))
		            .add(Projections.property("period.hyPeriodPrice3").as("hyPeriodPrice3"));
		 criteria.setProjection(projections);
		 
		 if(BeanUtils.isNotNull(orderHeaderMapping.getHyOrdhId())){
			 criteria.add(Restrictions.eq("orderHeader.hyOrdhId", orderHeaderMapping.getHyOrdhId()));
		 }
		 if(BeanUtils.isNotEmpty(orderHeaderMapping.getHyOrdhName())){
			 criteria.add(Restrictions.ilike("orderHeader.hyOrdhName", "%"+orderHeaderMapping.getHyOrdhName()+"%"));
		 }
		 if(BeanUtils.isNotNull(orderHeaderMapping.getHyPeriodId())){
			 criteria.add(Restrictions.eq("period.hyPeriodId", orderHeaderMapping.getHyPeriodId()));
		 }
		
		 //Start Enable Paging
		 if(BeanUtils.isNotNull(orderHeaderMapping.getGridStore_start()) && BeanUtils.isNotNull(orderHeaderMapping.getGridStore_limit())){
			 criteria.setFirstResult(orderHeaderMapping.getGridStore_start()).setMaxResults(orderHeaderMapping.getGridStore_limit());
		 }
		 //End Enable Paging
		 
		 criteria.addOrder(Order.asc("period.hyPeriodDate")); 
		 criteria.setResultTransformer(Transformers.aliasToBean(OrderHeaderMapping.class));
		 ArrayList<OrderHeaderMapping> resultList =  (ArrayList<OrderHeaderMapping>) criteria.list();
		 SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		 for (OrderHeaderMapping orderHeader : resultList) {
				if(BeanUtils.isNull(orderHeader.getHyOrdhToltalPrice())){
					orderHeader.setHyOrdhToltalPrice(new BigDecimal(0));
				}
				if(BeanUtils.isNull(orderHeader.getHyPeriodPrice2())){
					orderHeader.setHyPeriodPrice2(new BigDecimal(0));
				}
				if(BeanUtils.isNull(orderHeader.getHyPeriodPrice3())){
					orderHeader.setHyPeriodPrice3(new BigDecimal(0));
				}
				if(BeanUtils.isNotEmpty(orderHeader.getHyPeriodDate())){
					orderHeader.setHyPeriodDateString(dateFormat.format(orderHeader.getHyPeriodDate()));
				}
			}
		 
		return resultList;
	}

	@Override
	public void orderHeaderSave(OrderHeader orderHeader) throws Exception {
		save(orderHeader);
	}

	@Override
	public void orderHeaderEdit(OrderHeader orderHeader) throws Exception {
		merge(orderHeader);
	}

	@Override
	public void orderHeaderRemove(OrderHeader orderHeader) throws Exception {
		delete(orderHeader);
	}

	@Override
	public Integer pagingTotalRecord(OrderHeaderMapping orderHeaderMapping)
			throws Exception {
		Criteria criteria = getSession().createCriteria(OrderHeader.class, "orderHeader");
		criteria.createAlias("orderHeader.period", "period");
		 if(BeanUtils.isNotNull(orderHeaderMapping.getHyOrdhId())){
			 criteria.add(Restrictions.eq("orderHeader.hyOrdhId", orderHeaderMapping.getHyOrdhId()));
		 }
		 if(BeanUtils.isNotEmpty(orderHeaderMapping.getHyOrdhName())){
			 criteria.add(Restrictions.ilike("orderHeader.hyOrdhName", "%"+orderHeaderMapping.getHyOrdhName()+"%"));
		 }
		 if(BeanUtils.isNotNull(orderHeaderMapping.getHyPeriodId())){
			 criteria.add(Restrictions.eq("period.hyPeriodId", orderHeaderMapping.getHyPeriodId()));
		 }
		return Integer.parseInt(criteria.setProjection(Projections.rowCount()).uniqueResult().toString());
	}

}
