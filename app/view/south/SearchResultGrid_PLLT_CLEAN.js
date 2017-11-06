Ext.define('asSgis.view.south.SearchResultGrid_PLLT_CLEAN', {
	
	extend: 'Ext.container.Container',
	
	
	height: '100%',
	width: '100%',
	
	
	items: [{
		xtype: 'container',
		id: 'searchResultContainer_PLLT_CLEAN',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			id: 'serachReultGrid_PLLT_DETAIL',
			height: 320,
			autoScroll:true,
			columns : [ {
				text : 'PNU',
				dataIndex : 'PNU_ID',
				width : 150
			}, {
				text : '사업장id',
				dataIndex : 'CO_ID',
				width : 150
			}, {
				text : '대분류',
				dataIndex : 'SUR_CATEGORY1',
				width : 150
			}, {
				text : '소분류',
				dataIndex : 'SUR_CATEGORY2',
				width : 150
			}, {
				text : '이력번호',
				dataIndex : 'SUR_HISNO',
				width : 150
			}, {
				text : '수행연도',
				dataIndex : 'SUR_DATE',
				width : 150
			}, {
				text : '지점번호',
				dataIndex : 'SUR_SPOTNO',
				width : 150
			}, {
				text : '지점이름(정화장소)',
				dataIndex : 'SUR_SPOTNAME',
				width : 150
			}, {
				text : '정화부지상세',
				dataIndex : 'SUR_SPOTDET',
				width : 150
			}, {
				text : '정화기준',
				dataIndex : 'SRU_REFER',
				width : 150
			}, {
				text : '카드뮴(mg/kg)',
				dataIndex : 'SUR_Cd',
				width : 150
			}, {
				text : '구리',
				dataIndex : 'SUR_Cu',
				width : 150
			}, {
				text : '비소 ',
				dataIndex : 'SUR_As',
				width : 150
			}, {
				text : '수은',
				dataIndex : 'SUR_Hg',
				width : 150
			}, {
				text : '납',
				dataIndex : 'SUR_Pb',
				width : 150
			}, {
				text : '6가 크롬',
				dataIndex : 'SUR_Cr',
				width : 150
			}, {
				text : '아연',
				dataIndex : 'SUR_Zn',
				width : 150
			}, {
				text : '니켈',
				dataIndex : 'SUR_Ni',
				width : 150
			}, {
				text : '불소',
				dataIndex : 'SUR_F',
				width : 150
			}, {
				text : '유기인',
				dataIndex : 'SUR_DOP',
				width : 150
			}, {
				text : 'PCBs',
				dataIndex : 'SUR_PCBs',
				width : 150
			}, {
				text : '시안',
				dataIndex : 'SUR_Si',
				width : 150
			}, {
				text : '페놀류',
				dataIndex : 'SUR_Penol',
				width : 150
			}, {
				text : 'BTEX',
				dataIndex : 'SUR_BTEX',
				width : 150
			}, {
				text : '벤젠',
				dataIndex : 'SUR_Ben',
				width : 150
			}, {
				text : '톨루엔',
				dataIndex : 'SUR_TOL',
				width : 150
			}, {
				text : '에틸벤젠',
				dataIndex : 'SUR_ETIL',
				width : 150
			}, {
				text : '크실렌',
				dataIndex : 'SUR_CSIL',
				width : 150
			}, {
				text : 'TPH',
				dataIndex : 'SUR_TPH',
				width : 150
			}, {
				text : 'TCE',
				dataIndex : 'SUR_TCE',
				width : 150
			}, {
				text : 'PCE',
				dataIndex : 'SUR_PCE',
				width : 150
			}, {
				text : '벤조(a)피렌',
				dataIndex : 'SUR_BENZO',
				width : 150
			}, {
				text : 'pH',
				dataIndex : 'SUR_Ph',
				width : 150
			}, {
				text : '오염도검사기관',
				dataIndex : 'SUR_ORG',
				width : 150
			}, {
				text : '출처구분',
				dataIndex : 'SUR_INSEC',
				width : 150
			}, {
				text : '출처(문서ID)',
				dataIndex : 'SUR_INDOC',
				width : 151
			}, {
				text : '비고',
				dataIndex : 'SUR_TEXT',
				width : 152
			}
			]
		}]
	}],
	initComponent: function(){
		this.callParent();
	}
});