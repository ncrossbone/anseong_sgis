Ext.define("asSgis.view.center.PollutionDetailPop", {
	extend: "Ext.window.Window",
	xtype: "asSgis-pollutionDetailPop",
	id:"PollutionDetailPop",
	width:430,
	height:450,
	title:"오염원 상세정보",
	border:false,
	shawdow:false,
	items:[{
		xtype:"tabpanel",
		border:false,
		tabBarPosition: "top",
		items: [{
			title:"기본정보",
			border:false,
			items:[{
				xtype:"container",
				width:430,
				border:false,
				layout:{
					type:'table',
					columns: 2
				},
				items : [{
					html : '주소',
					bodyStyle:"background:#eaeff4; padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-top:1px solid #dbdbdb !important; border-bottom:1px solid #dbdbdb !important; border-right:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 120
				}, {
					id:'infoAddr',
					height:30,
					width: 280,
					bodyStyle:"padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important; border-top:1px solid #dbdbdb !important;",
					border:false
				}, {
					html : '지목',
					bodyStyle:"background:#eaeff4; padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important; border-right:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 120
				}, {
					id:'infoJimok',
					height:30,
					width: 280,
					bodyStyle:"padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important;",
					border:false
				}, {
					html : '면적',
					bodyStyle:"background:#eaeff4; padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important; border-right:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 120
				}, {
					id:'infoArea',
					height:30,
					width: 280,
					bodyStyle:"padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important;",
					border:false
				}]
			},{
				xtype:"container",
				height: 10
			},{
				xtype:"label",
				cls:"window-title-text",
				text:"이력정보"
			},{
				xtype:"container",
				height: 5
			},{
				xtype:"grid",
				border:false,
				id:'infoRecord',
				width:402,
				columns : [{
					text : '변동일자',
					dataIndex : 'CO_UPDATE_DATE',
					align: 'left',
					style: 'text-align:left',
					width : 100
				},{
					text : '변동사유',
					dataIndex : 'RESON',
					align: 'left',
					style: 'text-align:left',
					width : 150
				},{
					text : '변경내용',
					dataIndex : 'CO_UPDATE_INFO',
					align: 'left',
					style: 'text-align:left',
					width : 150
				}]
			}]
		},{
			title:"사업장정보",
			
			items:[{
				xtype:"container",
				width:430,
				border:false,
				layout:{
					type:'table',
					columns: 2
				},
				items : [{
					html : '사업장명',
					bodyStyle:"background:#eaeff4; padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-top:1px solid #dbdbdb !important; border-bottom:1px solid #dbdbdb !important; border-right:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 120
				}, {
					id:'coName',
					bodyStyle:"padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important; border-top:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 280
				}, {
					html : '사업장주소',
					bodyStyle:"background:#eaeff4; padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important; border-right:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 120
				}, {
					id:'coAddr',
					border:false,
					bodyStyle:"padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important;",
					height:30,
					width: 280
				}, {
					html : '사업자등록번호',
					bodyStyle:"background:#eaeff4; padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important; border-right:1px solid #dbdbdb !important;",
					border:false,
					height:30,
					width: 120
				}, {
					id:'coNum',
					border:false,
					bodyStyle:"padding:5px 10px; font-family: notokr-bold; letter-spacing:-1px; border-bottom:1px solid #dbdbdb !important;",
					height:30,
					width: 280
				}]
			},{
				xtype:"container",
				height: 10
			},{
				xtype:"label",
				cls:"window-title-text",
				text:"시설정보"
			},{
				xtype:"container",
				height: 5
			},{
				xtype:"grid",
				id:'coInfoRecord',
				autoScroll:true,
				border:false,
				height: 230,
				width:402,
				columns : [{
					text : '시설이름',
					dataIndex : 'CO_NAME',
					align: 'right',
					style: 'text-align:center',
					width : 130
				},{
					text : '시설용량',
					dataIndex : 'CO_FACCAP',
					align: 'right',
					style: 'text-align:center',
					width : 130
				},{
					text : '저장물질',
					dataIndex : 'CO_FACMATTER',
					align: 'right',
					style: 'text-align:center',
					width : 130
				},{
					text : '변경기준일',
					dataIndex : 'CO_FACUPDATE',
					align: 'right',
					style: 'text-align:center',
					width : 130
				}]
			}]
		},{
			title:"건출물정보",
			items:[{
				type:"container",
				laytout:{
					type:"hbox"
				},
				items:[{
					xtype:"combo",
					id:"imgCombo",
					displayField: 'fileClass',
					valueField: 'fileName',
					hiddenName : 'fileType',
					editable:false,
					width:380,
					listeners:{
						select: function(combo,record){
							
							var pdfComponent = Ext.getCmp("pdfComponent");
							console.info(combo.valueCollection.items[0].data);
							if(combo.valueCollection.items[0].data.fileType == 37){
								pdfComponent.setHtml(
										"<img src=\"./resources/DOC/"+combo.valueCollection.items[0].data.folderName+"/"+combo.valueCollection.items[0].data.fileName+"\" width=\"100%\" height=\"100%\"></img>"
										//"<img src=\"./resources/images/symbol/spot.png \" width=\"100%\" height=\"100%\"></img>"
									)
							}else{
								if(combo.valueCollection.items[0].data.fileType == 36){
									pdfComponent.setHtml(
										"<iframe src=\"./resources/DOC/"+combo.valueCollection.items[0].data.folderName+"/"+combo.valueCollection.items[0].data.fileName+".pdf\" width=\"100%\" height=\"100%\"></iframe>"
									)
								}else{
									pdfComponent.setHtml(
										"<iframe src=\"./resources/DOC/"+combo.valueCollection.items[0].data.folderName+"/"+combo.valueCollection.items[0].data.fileName+"\" width=\"100%\" height=\"100%\"></iframe>"
									)
								}
								
							};
						}
						
					}
				},{
					xtype: 'component',
					id: 'pdfComponent',
					height: 400
				}]
			}]
		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});