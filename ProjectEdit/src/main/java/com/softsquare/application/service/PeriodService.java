package com.softsquare.application.service;

import java.util.ArrayList;

import com.softsquare.application.domain.PeriodMapping;
import com.softsquare.application.entity.Period;

public interface PeriodService {
	
	public ArrayList<Period> findPeriod(PeriodMapping periodMapping) throws Exception; 
	public void periodSave(PeriodMapping periodMapping) throws Exception;
	public Integer findPeriodPagingTotalRecord(PeriodMapping periodMapping) throws Exception;
	
}
