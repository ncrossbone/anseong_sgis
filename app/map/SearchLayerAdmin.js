Ext.define('asSgis.map.SearchLayerAdmin', {
	map:null, 
	id: "searchLayer",
	layer:null,
	layers:[],
	constructor: function(map) {
        var me = this;
        me.map = map;
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(_API.searchLayer);
		me.layer.id = "SearchLayer";
		me.map.addLayer(me.layer);
		me.layer.setVisibleLayers([]);
		me.layer.visible = true;
		
		//dynamiclayer on/off fire Event
		asSgis.getApplication().addListener('searchLayerOnOff', me.searchLayerOnOffHandler, me);
		
    },
    
    searchLayerOnOffHandler: function(selectInfo){
    	var me = this;
    	var idIdx = me.layers.map(function(layer){
    		return layer.toString();
    	}).indexOf(selectInfo.data.id);
    	
    	if(idIdx == -1){
    		me.layers.push(parseInt(selectInfo.data.id));
    	}else{
    		me.layers.splice(idIdx,1);
    	}
		me.layer.setVisibleLayers(me.layers);
		
		if(me.layers.length == 0){
			_saveMapPoint = undefined;
			Ext.getCmp("searchResultWindow").close();
			Ext.getCmp("PollutionDetailPop").close();
		}
    }
});