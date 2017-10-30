package com.softsquare.application.common.util.configurer;

import java.text.NumberFormat;
import java.util.Locale;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import com.softsquare.application.common.util.NumberUtils;

@Component
public class NumberUtilsConfigurer implements InitializingBean {
	private Locale defaultLocale;
//	private NumberFormat defaultNumberFormat;

	public NumberUtilsConfigurer() {
		defaultLocale = Locale.US;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
//		defaultNumberFormat = NumberFormat.getNumberInstance(defaultLocale);
		NumberUtils.setNumberUtilsConfigurer(this);
	}

	public NumberFormat getDefaultNumberFormat() {
		return NumberFormat.getNumberInstance(defaultLocale);
	}

	public void setDefaultLocale(Locale defaultLocale) {
		this.defaultLocale = defaultLocale;
	}
}
