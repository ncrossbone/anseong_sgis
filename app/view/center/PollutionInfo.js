Ext.define("asSgis.view.center.PollutionInfo", {
	extend: "Ext.window.Window",
	xtype: "asSgis-pollutionInfo",
	id:"PollutionInfo",
	width:400,
	height:450,
	title:"오염원 상세정보",
	items:[{
		xtype:"tabpanel",
		tabBarPosition: "top",
		items: [{
			title:"기본정보"
		},{
			title:"사업장정보"
		},{
			title:"건출물정보"
		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});