Ext.define('asSgis.view.south.SearchResultGrid_PLLT_SPECIFY', {
	
	extend: 'Ext.container.Container',
	items: [{
		xtype: 'container',
		id: 'searchResultContainer_PLLT_SPECIFY',
		items: [{
			xtype: 'grid',
			id: 'serachReultGrid_PLLT_SPECIFY',
			autoScroll:true,
			height: 210,
			columns : [ {
				text : 'PNU',
				dataIndex : 'PNU',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '사업장ID',
				dataIndex : 'CO_ID',
				align: 'right',
				style: 'text-align:center',
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
				text : '수행연도',
				dataIndex : 'SUR_DATE',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '지점번호',
				dataIndex : 'SUR_SPOTNO',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '지점이름',
				dataIndex : 'SUR_SPOTNAME',
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '카드뮴(mg/kg)',
				dataIndex : 'SUR_Cd',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '구리',
				dataIndex : 'SUR_Cu',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '비소 ',
				dataIndex : 'SUR_As',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '수은',
				dataIndex : 'SUR_Hg',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '납',
				dataIndex : 'SUR_Pb',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '6가 크롬',
				dataIndex : 'SUR_Cr',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '아연',
				dataIndex : 'SUR_Zn',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '니켈',
				dataIndex : 'SUR_Ni',
				hidden: true,
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
				hidden: true,
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
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'PCE',
				dataIndex : 'SUR_PCE',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '벤조(a)피렌',
				dataIndex : 'SUR_BENZO',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : 'pH',
				dataIndex : 'SUR_Ph',
				hidden: true,
				align: 'right',
				style: 'text-align:center',
				width : 150
			}, {
				text : '오염도검사기관',
				dataIndex : 'SUR_ORG',
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
			}
			]
		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});