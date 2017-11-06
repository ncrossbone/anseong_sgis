Ext.define("asSgis.store.map.getClickPnu", {
	extend: "Ext.data.Store",
	remoteSort: true,
	autoload: true,
	storeId: "northDongStore",
	listeners:{
		load: function(store) {
			Ext.defer(function() {
				console.info(store);
				console.info(store.layerId);
				var queryTask = new esri.tasks.QueryTask("http://112.217.167.123:23002/arcgis/rest/services/SOIL_ANSUNG/MapServer/" + store.layerId);
				console.info(queryTask);
				var query = new esri.tasks.Query();
				query.geometry = store.evt.mapPoint;
				query.outFields = ["*"];
				queryTask.execute(query,  function(results){
					console.info(results);
					if(results.features.length > 0){
						console.info(results);
					}
				});
				dojo.connect(queryTask, "onError", function(err) {
					alert(err);
				});
			}, 1, this);
		}
	},
	
	initComponent: function(){
		this.callParent();
	}
});