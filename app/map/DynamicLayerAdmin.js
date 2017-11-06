Ext.define('asSgis.map.DynamicLayerAdmin', {
	map:null, 
	id: "dynamicLayer",
	layer:null,
	layers:[],
	constructor: function(map) {
        var me = this;
        me.map = map;
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(_API.dynamicLayer);
		me.layer.id = "DynamicLayer";
		me.map.addLayer(me.layer);
		me.layer.setVisibleLayers([]);
		me.layer.visible = true;
		
		//dynamiclayer on/off fire Event
		asSgis.getApplication().addListener('dynamicLayerOnOff', me.dynamicLayerOnOffHandler, me);
		
    },
    
    dynamicLayerOnOffHandler: function(selectInfo){
    	var me = this;
    	
    	console.info(selectInfo);
    	console.info(me.map);
    	var idIdx = me.layers.map(function(layer){
    		return layer.toString();
    	}).indexOf(selectInfo.data.id);
    	
    	if(idIdx == -1){
    		me.layers.push(parseInt(selectInfo.data.id));
    	}else{
    		me.layers.splice(idIdx,1);
    	}
		me.layer.setVisibleLayers(me.layers);
		//me.layer.setVisibleLayers([18]);
    }
});