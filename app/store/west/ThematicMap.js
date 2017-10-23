Ext.define("asSgis.store.west.ThematicMap", {
	extend: "Ext.data.TreeStore",
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/ThematicMap.json',
		reader: {
			type: 'json'	
		}
	},
	constructor: function(){
		this.callParent();
	}
});