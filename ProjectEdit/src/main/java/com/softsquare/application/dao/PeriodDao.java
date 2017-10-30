package com.softsquare.application.dao;

import java.util.ArrayList;

import com.softsquare.application.domain.PeriodMapping;
import com.softsquare.application.entity.Period;

public interface PeriodDao {

	public ArrayList<Period> findPeriod(PeriodMapping periodMapping) throws Exception; 
	public Integer findPeriodPagingTotalRecord(PeriodMapping periodMapping) throws Exception;
	public void periodSave(Period period) throws Exception;
	public void periodEdit(Period period) throws Exception;
	public void periodDelete(Period period) throws Exception;
}
