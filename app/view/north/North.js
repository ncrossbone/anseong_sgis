Ext.define("asSgis.view.north.North", {
	extend: "Ext.container.Container",
	xtype: "asSgis-north",
	id: "northContainer",
	header:false,
	height:80,
	width:"100%",
	layout:{
		type:"hbox"
	},
	style:"border-bottom: 1px solid #d4d4d4;",
	items:[{
		xtype:"container",
		style:"background:#fff; padding:20px 30px;",
		width:280,
		height:80,
		items:[{
			xtype:"image",
			src:"./resources/images/ui/logo.png",
		}]
	},{
		xtype:"container",
		width:1640,
		height:80,
		layout:{
			type:"vbox"
		},
		items:[{
			xtype:"container",
			height:40,
			style:"background:#00284b;",
			width:"100%",
			layout:{
				type:"hbox",
				align: "middle",
                pack: "end"
			},
			items:[{
				xtype:"label",
				style:"font-size:13px; letter-spacing:-1px; color:#fff; background: url('./resources/images/ui/logout.png') no-repeat left center; padding-left: 20px; cursor:pointer;",
				text:"로그아웃"
			},{
				xtype:"container",
				width:10
			},{
				xtype:"label",
				style:"color:#fff;",
				text:"|"
			},{
				xtype:"container",
				width:10
			},{
				xtype:"label",
				style:"font-size:13px; letter-spacing:-1px; color:#fff; background: url('./resources/images/ui/guide.png') no-repeat left center; padding-left: 18px; cursor:pointer;",
				text:"이용안내"
			},{
				xtype:"container",
				width:20
			}]
		},{
			xtype:"container",
			style:"background: #f6f7fa;",
			width:"100%",
			height:40,
			layout:{
				type:"hbox",
				align:"center"
			},
			items:[{
				xtype:"image",
				style:"width:12px; height:15px; margin:0 5px 0 20px;",
				src:'./resources/images/ui/search_position.png'
			},{
				xtype:"combo",
				id:"cbo01",
				editable:false,
				width:100,
				value:"경기도"
			},{
				xtype:"image",
				style:"width:6px;height:11px; margin:0 5px;",
				src:'./resources/images/ui/arrow.png'
			},{
				xtype:"combo",
				id:"cbo02",
				editable:false,
				width:100,
				value:"안성시"
			},{
				xtype:"image",
				style:"width:6px;height:11px; margin:0 5px;",
				src:'./resources/images/ui/arrow.png'
			},{
				xtype:"combo",
				id:"cbo03",
				//store: 'northDongStore',
				store: Ext.create('asSgis.store.north.NorthDongStore'),
				displayField: 'name',
				valueField: 'id',
				editable:false,
				width:100,
				listeners:{
					select:function(combo,record){
						var admCd = record.data.id.substring(0,8);
						var reStore = Ext.create('asSgis.store.north.NorthReStore');
						reStore.admCd = admCd;
						reStore.load();
						var cbo04 = Ext.getCmp("cbo04");
						cbo04.setStore(reStore);
						
						
					}
				}
			},{
				xtype:"image",
				style:"width:6px;height:11px; margin:0 5px;",
				src:'./resources/images/ui/arrow.png'
			},{
				xtype:"combo",
				id:"cbo04",
				displayField: 'name',
				valueField: 'id',
				editable:false,
				width:100,
				store: Ext.create('asSgis.store.north.NorthReStore'),
				listeners:{
					select:function(combo,record){
						common.areaComboSelect(combo,record);
					}
				}
			},{
				xtype:"checkbox",
				labelSeparator: '',
				id:"chkSan",
				style:"margin:0 5px 0 10px;",
				boxLabel:"<span style='font-family: notokr-bold;'>산</span>"
			},{
				xtype:"textfield",
				id:"searchTxt"
			},{
				xtype:"image",
				style:"width:35px;height:30px; margin-left:3px; cursor:pointer;",
				src:'./resources/images/ui/search_icon.gif'
				
			},{
				xtype:"button",
				listeners:{
					click:function(){
						common.expResultTest();
					}
				}
			}]

		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});
