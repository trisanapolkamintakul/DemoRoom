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
import com.softsquare.application.domain.PeriodMapping;
import com.softsquare.application.entity.Period;

@Repository()
@Component
public class PeriodDaoImp extends AbstractDao<Integer, Period> implements PeriodDao {

	@Override
	@SuppressWarnings("unchecked")
	public ArrayList<Period> findPeriod(PeriodMapping periodMapping) throws Exception {
		Criteria criteria = getSession().createCriteria(Period.class, "period");
		 ProjectionList projections = Projections.projectionList()
		            .add(Projections.property("period.hyPeriodId").as("hyPeriodId"))
		            .add(Projections.property("period.hyPeriodName").as("hyPeriodName"))
		            .add(Projections.property("period.hyPeriodDate").as("hyPeriodDate"))
		            .add(Projections.property("period.hyPeriodPrice2").as("hyPeriodPrice2"))
		            .add(Projections.property("period.hyPeriodPrice3").as("hyPeriodPrice3"));
		 criteria.setProjection(projections);
		
		 if(!BeanUtils.isEmpty(periodMapping.getPeriodId())){
			 criteria.add(Restrictions.eq("period.hyPeriodId", periodMapping.getPeriodId()));
		 }
		 if(!BeanUtils.isEmpty(periodMapping.getPeriodName())){
			 criteria.add(Restrictions.ilike("period.hyPeriodName", "%"+periodMapping.getPeriodName()+"%"));
		 }
		 if(!BeanUtils.isNull(periodMapping.getPeriodDate())){
			 criteria.add(Restrictions.eq("period.hyPeriodDate", periodMapping.getPeriodDate() ));
		 }
		 
		 //Start Enable Paging
		 if(BeanUtils.isNotNull(periodMapping.getGridStore_start()) || BeanUtils.isNotNull(periodMapping.getGridStore_limit())){
			 criteria.setFirstResult(periodMapping.getGridStore_start()).setMaxResults(periodMapping.getGridStore_limit());
		 }
		 //End Enable Paging
		 
		 criteria.addOrder(Order.asc("hyPeriodDate")); 
		 criteria.setResultTransformer(Transformers.aliasToBean(Period.class));
		 
		 ArrayList<Period> roleList =  (ArrayList<Period>)criteria.list();
		 
		 for (Period period : roleList) {
			if(BeanUtils.isNull(period.getHyPeriodPrice2())){
				period.setHyPeriodPrice2(new BigDecimal(0));
			}
			if(BeanUtils.isNull(period.getHyPeriodPrice3())){
				period.setHyPeriodPrice3(new BigDecimal(0));
			}
		}
		 
		return roleList;
	}

	@Override
	public void periodSave(Period period) throws Exception {
		save(period);
	}

	@Override
	public void periodEdit(Period period) throws Exception {
		merge(period);
	}
	
	@Override
	public void periodDelete(Period period) throws Exception {
		delete(period);
	}

	@Override
	public Integer findPeriodPagingTotalRecord(PeriodMapping periodMapping) throws Exception {
		Criteria criteria = getSession().createCriteria(Period.class, "period");
		 if(!BeanUtils.isEmpty(periodMapping.getPeriodId())){
			 criteria.add(Restrictions.eq("period.hyPeriodId", periodMapping.getPeriodId()));
		 }
		 if(!BeanUtils.isEmpty(periodMapping.getPeriodName())){
			 criteria.add(Restrictions.ilike("period.hyPeriodName", "%"+periodMapping.getPeriodName()+"%"));
		 }
		 if(!BeanUtils.isNull(periodMapping.getPeriodDate())){
			 criteria.add(Restrictions.eq("period.hyPeriodDate", periodMapping.getPeriodDate() ));
		 }
    	return Integer.parseInt(criteria.setProjection(Projections.rowCount()).uniqueResult().toString());
	}

}
