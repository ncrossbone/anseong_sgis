Ext.define("asSgis.view.main.Main", {
	extend: "Ext.container.Container",
	xtype: "asSgis-main",
	width:"100%",
	height:"100%",
	header:false,
	border:false,
	requires:[
			  "asSgis.view.map.Map",
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
		this.setHeight(Ext.getBody().getHeight()-80);
		
		var MainPopup = Ext.create("asSgis.view.main.MainPopup");
		//MainPopup.show();
		MainPopup.hide();
		//this.setWidth(Ext.getBody().getWidth());
		//this.setHeight(Ext.getBody().getHeight());
		//Ext.EventManager.onWindowResize( this.onBrowserResize, this );
	},
	onBrowserResize: function(width,height) {
		//this.setWidth(width);
		//this.setHeight(height);
	}
});