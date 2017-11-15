Ext.define('asSgis.view.south.SearchResultGrid_PLLT_RESERCH', {
	
	extend: 'Ext.container.Container',
	
	
	items: [{
		xtype: 'container',
		id: 'searchResultContainer_PLLT_RESERCH',
		items: [{
			xtype: 'grid',
			id: 'serachReultGrid_PLLT_RESERCH',
			autoScroll:true,
			height: 210,
			columns : [ {
				text : 'PNU',
				dataIndex : 'PNU',
				width : 150
			}, {
				text : '대분류',
				dataIndex : 'SUR_CATEGORY1',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '소분류',
				dataIndex : 'SUR_CATEGORY2',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '이력번호',
				dataIndex : 'SUR_HISNO',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '조사연도',
				dataIndex : 'SUR_DATE',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '지점번호(시료번호)',
				dataIndex : 'SUR_SPOTNO',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '지점이름(고유명칭)',
				dataIndex : 'SUR_SPOTNAME',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '지역구분',
				dataIndex : 'SUR_AREASEC',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '시료채취깊이',
				dataIndex : 'SUR_DEPTH',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '카드뮴(mg/kg)',
				dataIndex : 'SUR_Cd',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '구리',
				dataIndex : 'SUR_Cu',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '비소',
				dataIndex : 'SUR_As',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '수은',
				dataIndex : 'SUR_Hg',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '납',
				dataIndex : 'SUR_Pb',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '6가크롬',
				dataIndex : 'SUR_Cr',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '아연',
				dataIndex : 'SUR_Zn',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '니켈',
				dataIndex : 'SUR_Ni',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '불소',
				dataIndex : 'SUR_F',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '유기인',
				dataIndex : 'SUR_DOP',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'PCBs',
				dataIndex : 'SUR_PCBs',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '시안',
				dataIndex : 'SUR_Si',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '페놀류',
				dataIndex : 'SUR_Penol',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'BTEX',
				dataIndex : 'SUR_BTEX',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '벤젠',
				dataIndex : 'SUR_Ben',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '톨루엔',
				dataIndex : 'SUR_TOL',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '에틸벤젠',
				dataIndex : 'SUR_ETIL',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '크실렌',
				dataIndex : 'SUR_CSIL',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'TPH',
				dataIndex : 'SUR_TPH',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'TCE',
				dataIndex : 'SUR_TCE',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'PCE',
				dataIndex : 'SUR_PCE',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '벤조(a)피렌',
				dataIndex : 'SUR_BENZO',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'pH',
				dataIndex : 'SUR_Ph',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '출처구분',
				dataIndex : 'SUR_INSEC',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '출처(문서ID)',
				dataIndex : 'SUR_INDOC',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '비고',
				dataIndex : 'SUR_TEXT',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}]
		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});