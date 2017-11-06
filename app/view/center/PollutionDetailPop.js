Ext.define("asSgis.view.center.PollutionDetailPop", {
	extend: "Ext.window.Window",
	xtype: "asSgis-pollutionDetailPop",
	id:"PollutionDetailPop",
	width:400,
	height:450,
	title:"오염원 상세정보",
	items:[{
		xtype:"tabpanel",
		tabBarPosition: "top",
		items: [{
			title:"기본정보",
			items:[{
				xtype:"container",
				layout:{
					type:'table',
					columns: 2
				},
				items : [{
					html : '주소',
					height:30,
					width: 100
				}, {
					id:'infoAddr',
					height:30,
					width: 230
				}, {
					html : '지목',
					height:30,
					width: 100
				}, {
					id:'infoJimok',
					height:30,
					width: 230
				}, {
					html : '면적',
					height:30,
					width: 100
				}, {
					id:'infoArea',
					height:30,
					width: 230
				}]
			},{
				xtype:"container",
				height: 20
			},{
				xtype:"label",
				text:"*이력정보"
			},{
				xtype:"grid",
				id:'infoRecord',
				columns : [{
					text : '변동일자',
					dataIndex : 'CO_UPDATE_DATE',
					width : 130
				},{
					text : '변동사유',
					dataIndex : 'RESON',
					width : 130
				},{
					text : '변경내용',
					dataIndex : 'CO_UPDATE_INFO',
					width : 130
				}]
			}]
		},{
			title:"사업장정보",
			
			items:[{
				xtype:"container",
				layout:{
					type:'table',
					columns: 2
				},
				items : [{
					html : '사업장명',
					height:30,
					width: 100
				}, {
					id:'coName',
					height:30,
					width: 230
				}, {
					html : '사업장주소',
					height:30,
					width: 100
				}, {
					id:'coAddr',
					height:30,
					width: 230
				}, {
					html : '사업자등록번호',
					height:30,
					width: 100
				}, {
					id:'coNum',
					height:30,
					width: 230
				}]
			},{
				xtype:"container",
				height: 20
			},{
				xtype:"label",
				text:"*시설정보"
			},{
				xtype:"grid",
				id:'coInfoRecord',
				autoScroll:true,
				height: 230,
				columns : [{
					text : '시설이름',
					dataIndex : 'CO_NAME',
					width : 130
				},{
					text : '시설용량',
					dataIndex : 'CO_FACCAP',
					width : 130
				},{
					text : '저장물질',
					dataIndex : 'CO_FACMATTER',
					width : 130
				},{
					text : '변경기준일',
					dataIndex : 'CO_FACUPDATE',
					width : 130
				},{
					text : '지번',
					dataIndex : 'JIBUN',
					width : 130
				}]
			}]
		},{
			title:"건출물정보"
		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});