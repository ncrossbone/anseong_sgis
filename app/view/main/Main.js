Ext.define("asSgis.view.main.Main", {
	extend: "Ext.container.Container",
	xtype: "asSgis-main",
	width:"100%",
	header:false,
	border:false,
	requires:["asSgis.view.map.Map",
			  "asSgis.view.north.North",
			  "asSgis.view.west.West"],
	layout:{
		type:"absolute"
	},
	items: [{
		xtype:"asSgis-map"
	},{
		xtype:"asSgis-north"
	},{
		xtype:"asSgis-west"
	}],
	initComponent: function(){
		this.callParent();
		//this.setWidth(Ext.getBody().getWidth());
		//this.setHeight(Ext.getBody().getHeight());
		//Ext.EventManager.onWindowResize( this.onBrowserResize, this );
	},
	onBrowserResize: function(width,height) {
		//this.setWidth(width);
		//this.setHeight(height);
	}
});