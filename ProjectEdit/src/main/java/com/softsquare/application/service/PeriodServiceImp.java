package com.softsquare.application.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.dao.PeriodDao;
import com.softsquare.application.domain.PeriodMapping;
import com.softsquare.application.entity.Period;

@Service
public class PeriodServiceImp implements PeriodService {

	@Autowired
	private PeriodDao periodDao;
	
	@Override
	public ArrayList<Period> findPeriod(PeriodMapping periodMapping) throws Exception {
		return periodDao.findPeriod(periodMapping);
	}
	
	@Override
	public Integer findPeriodPagingTotalRecord(PeriodMapping periodMapping) throws Exception {
		return periodDao.findPeriodPagingTotalRecord(periodMapping);
	}
	
	@Override
	public void periodSave(PeriodMapping periodMapping) throws Exception {
		Gson gson = new Gson();
		if(BeanUtils.isNotNull(periodMapping.getGridStore_jsonDestroyRecords())){
			Period[] periodArray = gson.fromJson(periodMapping.getGridStore_jsonDestroyRecords(), Period[].class);
			for (Period period : periodArray) {
				periodDao.periodDelete(period);
			}
		}
		
		if(BeanUtils.isNotNull(periodMapping.getGridStore_jsonUpdateRecords())){
			Period[] periodArray = gson.fromJson(periodMapping.getGridStore_jsonUpdateRecords(), Period[].class);
			for (Period period : periodArray) {
				periodDao.periodEdit(period);
			}
		}
		
		if(BeanUtils.isNotNull(periodMapping.getGridStore_jsonCreateRecords())){
			Period[] periodArray = gson.fromJson(periodMapping.getGridStore_jsonCreateRecords(), Period[].class);
			for (Period period : periodArray) {
				periodDao.periodSave(period);
			}
		}
	}

}
