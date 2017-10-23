Ext.application({
    name   : 'asSgis',
    launch : function() {
    	var main = Ext.create("asSgis.view.main.Main", {
    		renderTo: Ext.getBody()
    	});
    }
});