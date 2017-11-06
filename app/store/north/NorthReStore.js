Ext.define("asSgis.store.north.NorthReStore", {
	extend: "Ext.data.Store",
	remoteSort: true,
	autoload: true,
	fields: ['id', 'name','geometry'],
	listeners:{
		load: function(store) {
			Ext.defer(function() {
				var queryTask = new esri.tasks.QueryTask(_API.anseongRe);
				var query = new esri.tasks.Query();
				query.returnGeometry = true;
				console.info(store.admCd);
				query.where = "ADM_CD LIKE '"+store.admCd+"%'";
				query.outFields = ['ADM_CD', 'RI_NM'];
				queryTask.execute(query,  function(results){
					var data = results.features;
					var receiveData = [];
					Ext.each(data, function(media, index) {
						receiveData.push({id:media.attributes.ADM_CD, name:media.attributes.RI_NM, geometry:media.geometry})
					});
					store.setData(receiveData);
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