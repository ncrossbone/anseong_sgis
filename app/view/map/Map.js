Ext.define("asSgis.view.map.Map", {
	extend: "Ext.container.Container",
	id: "mapContainer",
	xtype: "asSgis-map",
	y: 80,
	width: "100%",
	requires:["asSgis.view.map.CoreMap"],
	header:false,
	items:[{
		xtype:"asSgis-coremap"
	}],
	initComponent: function(){
		this.callParent();
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight()-80);
	}
});