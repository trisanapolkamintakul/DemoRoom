package com.softsquare.application.domain.grid;

import com.softsquare.application.domain.PagingMaping;


public class GridRecord extends PagingMaping{

	private  String gridStore_jsonCreateRecords;
	private  String gridStore_jsonDestroyRecords;
	private  String gridStore_jsonUpdateRecords;
	
	public String getGridStore_jsonCreateRecords() {
		return gridStore_jsonCreateRecords;
	}
	public void setGridStore_jsonCreateRecords(String gridStore_jsonCreateRecords) {
		this.gridStore_jsonCreateRecords = gridStore_jsonCreateRecords;
	}
	public String getGridStore_jsonDestroyRecords() {
		return gridStore_jsonDestroyRecords;
	}
	public void setGridStore_jsonDestroyRecords(String gridStore_jsonDestroyRecords) {
		this.gridStore_jsonDestroyRecords = gridStore_jsonDestroyRecords;
	}
	public String getGridStore_jsonUpdateRecords() {
		return gridStore_jsonUpdateRecords;
	}
	public void setGridStore_jsonUpdateRecords(String gridStore_jsonUpdateRecords) {
		this.gridStore_jsonUpdateRecords = gridStore_jsonUpdateRecords;
	}
	
}
