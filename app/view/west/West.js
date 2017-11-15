Ext.define("asSgis.view.west.West", {
	extend: "Ext.panel.Panel",
	xtype: "asSgis-west",
	id: "westContainer",
	y:80,
	width:297,
	collapsible: true,
    collapseDirection: 'left',
    headerPosition: 'right',
    border:false,
    header:{
    	width:17,
    	style:"background:transparent;",
    	titlePosition:1
    },
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
		title:"<span class='westTitle'>주제도</span>",
		store:Ext.create("asSgis.store.west.ThematicMap1"),
		id:"thematicMap",
		border:false,
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
		title:"<span class='westTitle'>토양환경 이력 선택<img src='' style='width:10px; height:10px; border: 1px solid; cursor:pointer;' onclick='common.onClickStaticBtn()'></span>",
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
	},
	listeners:{
    	collapse:{
    		fn: function(el){
    			Ext.get("westContainer_header-innerCt").setStyle("background","url('./resources/images/ui/left_off.png') no-repeat");
    		}
    	},
    	expand:{
    		fn: function(el){

    			Ext.get("westContainer_header-innerCt").setStyle("background","url('./resources/images/ui/left_on.png') no-repeat");
    		}
    	}
    }
});