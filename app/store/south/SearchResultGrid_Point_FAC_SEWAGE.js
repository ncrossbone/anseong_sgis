Ext.define('asSgis.store.south.SearchResultGrid_Point_FAC_SEWAGE', {
    extend : 'Ext.data.Store',
    //autoLoad: true,
    pageSize: 100,
    fields: [
    	'CO_NM'
    	,'CO_ORG'
    	,'CO_CATEGORY2'
    	,'CO_ID'
    	,'CO_YEAR'
    	,'OPER_YN'
    	,'AMT_CAP'
    	,'PHY_CAP'
    	,'CHEM_CAP'
    	,'HIGH_CAP'
    	,'PROC_HEAD'
    	,'PROC_1ST'
    	,'PROC_2ST'
    	,'PROC_3ST'
    	,'OPER_STAR_DATE'
    	,'OPER_RATE'
    ],
	listeners: {
		load: function(store) {
			Ext.defer(function() {
				var queryTask = new esri.tasks.QueryTask(_API.searchLayer+"/"+store.layerId);
				var query = new esri.tasks.Query();
				query.returnGeometry = false;
				query.where = "UID = '" + store.UID + "'";
				query.outFields = ['*'];
				query.format = "JSON";
				queryTask.execute(query,  function(results){
					
					var jsonData = "";
					var string = "[";
					if(results.features.length > 0){
						for(var i = 0 ; i < results.features.length; i++){
							if(i == results.features.length-1){
								string += JSON.stringify(results.features[i].attributes);
							}else{
								string += JSON.stringify(results.features[i].attributes);
								string += ",";
							}
						}
						string += ']';
						jsonData = Ext.util.JSON.decode(string);
						
						store.setData(jsonData);
						var serachReultGrid = Ext.getCmp("serachReultGrid_Point_"+store.gridName);
						serachReultGrid.setStore(store);
						
						
						
					}
					
					var tabInfo = Ext.getCmp("tab_"+store.gridName);
					tabInfo.totalCnt = store.getCount();
					tabInfo.setTitle(tabInfo.title + "("+store.getCount()+")");
					
				});
				dojo.connect(queryTask, "onError", function(err) {
					alert(err);
				});
			}, 1, this);
		}
    }
});