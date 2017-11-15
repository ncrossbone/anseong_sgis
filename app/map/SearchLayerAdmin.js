Ext.define('asSgis.map.SearchLayerAdmin', {
	map:null, 
	id: "searchLayer",
	layer:null,
	pointLayer:null,
	geometryService:null,
	layers:[],
	pointlayers:[],
	constructor: function(map, geometryService) {
        var me = this;
        me.map = map;
        me.geometryService = geometryService;
        
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(_API.searchLayer);
		me.layer.id = "SearchLayer";
		me.map.addLayer(me.layer);
		me.layer.setVisibleLayers([]);
		me.layer.visible = true;
		
		
		me.pointLayer = new esri.layers.ArcGISDynamicMapServiceLayer(_API.searchLayer);
		me.pointLayer.id = "SearchPointLayer";
		me.map.addLayer(me.pointLayer);
		me.pointLayer.setVisibleLayers([]);
		me.pointLayer.visible = true;
		
		
		me.symbol = new esri.symbol.PictureMarkerSymbol({
 		    "angle": 0,
 		    "yoffset": 22,
 		    "type": "esriPMS",
 		    "url": "./resources/images/symbol/spot.png",
 		    "contentType": "image/png",
 		    "width": 20,
 		    "height": 48
 		});
		
		me.symGrpLayer = new esri.layers.GraphicsLayer();
		me.symGrpLayer.id = "symGrpLayer";
		me.symGrpLayer.visible = true;
		me.map.addLayer(me.symGrpLayer);
		
		
		me.sourceGraphicLayer = new esri.layers.GraphicsLayer();
		me.sourceGraphicLayer.id="sourceGraphic";
		me.map.addLayer(me.sourceGraphicLayer);
		
		
		
		
		
		
		//me.simpleFillSymbol= new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, me.smpLineSymbol, new dojo.Color([0,0,255,0.1]));
		
		//dynamiclayer on/off fire Event
		asSgis.getApplication().addListener('searchLayerOnOff', me.searchLayerOnOffHandler, me);
		asSgis.getApplication().addListener('searchPointLayerOnOff', me.searchPointLayerOnOfffHandler, me);
		
		asSgis.getApplication().addListener('selectSymbol', me.selectSymbolHandler, me);
		//searchPointLayerOnOff
		asSgis.getApplication().addListener('bufferPoint', me.bufferPointHandler, me);
		//bufferPoint
		
    },
    
    bufferPointHandler: function(evt){
    	
    	var me = this;
    	
    	console.info(me.pointLayer.visibleLayers);
    	
	    var params = new esri.tasks.BufferParameters();
	    params.geometries  = [ evt ];
	    params.distances = [ 10 ];
	    params.outSpatialReference = new esri.SpatialReference({wkid:102100});
	    params.bufferSpatialReference = new esri.SpatialReference({wkid:102080});
	    params.unit = esri.tasks.GeometryService.UNIT_METER;
	    me.geometryService.buffer(params, function(result){
	    	
	    	var arrayInfo = [];
	    	
	    	for(var i = 0 ; i < me.pointLayer.visibleLayers.length; i++){
	    		var queryTask = new esri.tasks.QueryTask(_API.searchLayer+"/" + me.pointLayer.visibleLayers[i]);
	    		
	    		console.info(queryTask);
				var query = new esri.tasks.Query();
				query.geometry = result[0];			
				query.returnGeometry = false;
				query.outFields = ["*"];
				arrayInfo.push(queryTask.execute(query));
	    	}
	    	
	    	var	defList = new dojo.DeferredList(arrayInfo);
			defList.then(function(){
				var results = [];
				try{
					for(var i=0; i<arguments[0].length; i++){
						var resultValue = arguments[0][i][1].features;
						if(resultValue[0] != undefined){
							resultValue[0].attributes.layerNum = me.pointLayer.visibleLayers[i];
						}
						results = results.concat(resultValue);

					}	
				}catch(e){
					console.log(e);
				}
				console.info(results);
				
				
				console.info(me);
				console.info(me.map);
				console.info(me.map.infoWindow);
				console.info(evt);
				
				me.map.infoWindow.setTitle("Coordinates");
				me.map.infoWindow.setContent("lat/lon : " + evt.y + ", " + evt.x);
				me.map.infoWindow.show(evt.screenPoint);
				//me.map.infoWindow.show(evt.screenPoint,me.map.getInfoWindowAnchor(evt.screenPoint));
				
				/*me.map.on("click", function(evt) {
					
				});*/
		          
		    });
	    	
	    	
	    	/*var queryTask = new esri.tasks.QueryTask(_API.searchLayer+"/1");
			var query = new esri.tasks.Query();
			query.geometry = result[0];			
			query.returnGeometry = false;
			query.outFields = ["*"];
			queryTask.execute(query,  function(results){
				console.info(results);
				console.info(results.features.length)
			});
			
			dojo.connect(queryTask, "onError", function(err) {
				alert(err);
			});*/
	    });
    	
    	
    	
    },
    
    searchLayerOnOffHandler: function(selectInfo){
    	var me = this;
    	if(selectInfo.childNodes.length > 0 ){
    		if(selectInfo.data.checked == false){
    			me.layers = [];
    			me.layer.setVisibleLayers(me.layers);
    			common.closeWindow();
    			me.symGrpLayer.clear();
    		}else{
    			me.layers = [];
    			for(var i = 0 ; i < selectInfo.childNodes.length; i++){
    				me.layers.push(selectInfo.childNodes[i].data.id);
        		}
    			me.layer.setVisibleLayers(me.layers);
    		}
    	}else{
    		me.layerOnOff(selectInfo);
    	}
    },
    
    layerOnOff: function(selectInfo){
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
			common.closeWindow();
			me.symGrpLayer.clear();
		}
    },
    
    searchPointLayerOnOfffHandler: function(selectInfo){
    	var me = this;
    	if(selectInfo.childNodes.length > 0 ){
    		if(selectInfo.data.checked == false){
    			me.pointlayers = [];
    			me.pointLayer.setVisibleLayers(me.pointlayers);
    		}else{
    			me.pointlayers = [];
    			for(var i = 0 ; i < selectInfo.childNodes.length; i++){
    				me.pointlayers.push(selectInfo.childNodes[i].data.id);
        		}
    			me.pointLayer.setVisibleLayers(me.pointlayers);
    		}
    	}else{
    		me.pointLayerOnOff(selectInfo);
    	}
    	
    },
    
    pointLayerOnOff: function(selectInfo){
    	var me = this;
    	var idIdx = me.pointlayers.map(function(layer){
    		return layer.toString();
    	}).indexOf(selectInfo.data.id);
    	
    	if(idIdx == -1){
    		me.pointlayers.push(parseInt(selectInfo.data.id));
    	}else{
    		me.pointlayers.splice(idIdx,1);
    	}
    	me.pointLayer.setVisibleLayers(me.pointlayers);
    },
    
    selectSymbolHandler: function(evt){
    	var me = this;
    	
    	var graphic = null;
    	graphic = new esri.Graphic(evt, me.symbol);
    	me.symGrpLayer.clear();
    	me.symGrpLayer.add(graphic);
    	
    }
});