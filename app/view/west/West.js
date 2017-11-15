Ext.define("asSgis.view.west.West", {
	extend: "Ext.panel.Panel",
	xtype: "asSgis-west",
	id: "westContainer",
	y:80,
	width:300,
	autoScroll: true,
	collapsible: true,
    collapseDirection: 'left',
    headerPosition: 'right',
    border:false,
    layout:{
		type:'accordion',
		 animate: true,
	     multi: true,
         fill: false
	},
	defaults: {
        //border: true,
        //autoHeight: true,
        //minHeight: 304,
        titleCollapse: false
    },
	items:[{
		xtype:"treepanel",
		title:"주제도",
		store:Ext.create("asSgis.store.west.ThematicMap1"),
		scroll: false,
		rootVisible: false,
		useArrows: false,
		lines:false,
		bufferedRenderer: false,
		collapsed: false,
		listeners: {
			checkchange:function(node,checked){
				
				node.eachChild(function(n) {
	                node.cascadeBy(function(n){
	                    n.set('checked', checked);
                    });
	            });
				
				common.dynamicTreePanel1Controll(node);
			}
		}
	},{
		xtype:"treepanel",
		header: {
			hidden: true
		},
		store:Ext.create("asSgis.store.west.ThematicMap2"),
		scroll: false,
		rootVisible: false,
		useArrows: false,
		lines:false,
		bufferedRenderer: false,
		collapsed: false,
		listeners: {
			checkchange:function(node,checked){
				
				node.eachChild(function(n) {
	                node.cascadeBy(function(n){
	                    n.set('checked', checked);
                    });
	            });
				
				common.dynamicTreePanel2Controll(node);
			}
		}
		
	},{
		xtype:"treepanel",
		title:"토양환경 이력 선택<img src='' style='width:10px; height:10px; border: 1px solid; cursor:pointer;' onclick='common.onClickStaticBtn()'>",
		store:Ext.create("asSgis.store.west.SoliEnvironHistory"),
		scroll: false,
		rootVisible: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		useArrows: false,
		lines:false,
		bufferedRenderer: false,
		collapsed: false,
		listeners: {
			checkchange:function(node,checked){
				
				node.eachChild(function(n) {
	                node.cascadeBy(function(n){
	                    n.set('checked', checked);
                    });
	            });
				
				common.searchTreePanel1Controll(node);
				
				if(_saveMapPoint != undefined){
					common.mapClick(_saveMapPoint);
				}
			}
		}
	},{
		xtype:"treepanel",
		header: {
			hidden: true
		},
		store:Ext.create("asSgis.store.west.SoliEnvironHistoryPoint"),
		scroll: false,
		rootVisible: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		useArrows: false,
		lines:false,
		bufferedRenderer: false,
		collapsed: false,
		listeners: {
			checkchange:function(node,checked){
				node.eachChild(function(n) {
	                node.cascadeBy(function(n){
	                    n.set('checked', checked);
                    });
	            });
				
				common.searchTreePanel2Controll(node);
				
				
			}
		}
	}],
	initComponent: function(){
		this.callParent();
		this.setHeight(Ext.getBody().getHeight()-80);
	}
});