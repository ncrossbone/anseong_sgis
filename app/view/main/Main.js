Ext.define("asSgis.view.main.Main", {
	extend: "Ext.container.Container",
	xtype: "asSgis-main",
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
		MainPopup.hide();
		
		this.on("resize", this.setControlSize); // 이벤트 생성
	}
});