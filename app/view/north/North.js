Ext.define("asSgis.view.north.North", {
	extend: "Ext.container.Container",
	xtype: "asSgis-north",
	header:false,
	height:80,
	width:"100%",
	layout:{
		type:"hbox"
	},
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
				editable:false,
				width:100,
				value:"가사동"
			},{
				xtype:"checkbox",
				labelSeparator: '',
				id:"chkSan",
				style:"margin:0 5px 0 10px;",
				boxLabel:'산',
			},{
				xtype:"textfield",
				id:"searchTxt"
			},{
				xtype:"image",
				style:"width:35px;height:30px; margin-left:3px; cursor:pointer;",
				src:'./resources/images/ui/search_icon.gif'
			}]

		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});