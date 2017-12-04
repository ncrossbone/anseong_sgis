Ext.application({
    name   : 'asSgis',
    launch : function() {
    	var main = Ext.create("asSgis.view.main.Main", {
    		renderTo: Ext.getBody()
    	});
    }
});

var proxy = './proxy/proxy.jsp?';

//layer 공통
var _API = null;

var store = Ext.create('Ext.data.Store', {
	autoLoad : true,

	fields : [ {
		name : 'MapserviceUrl'
	} ],

	proxy : {
		type : 'ajax',
		url : './resources/data/LayerMapper.json',
		reader : {
			type : 'json'
		}
	}
});

store.load(function(a,b,c){
	_API = a[0].data;
});

//지번 레이어 레전드 json 전역변수 설정
var _legend = null;

var _gridMappingName = [{
	tableName:"PLLT_CLEAN" , layerName : "토양정화명령부지", docName: "DOC_DOC"
},{
	tableName:"PLLT_RESERCH" , layerName : "토양오염실태조사 ", docName: ""
},{
	tableName:"PLLT_SPECIFY" , layerName : "특정토양오염관리대상시설", docName: "DOC_DOC"
},{
	tableName:"PLLT_DETAIL" , layerName : "토양정밀조사", docName: ""
},{
	tableName:"PLLT_OBSERVE" , layerName : "토양측정망", docName: ""
}]

Ext.Ajax.request({
	url: proxy+"http://112.217.167.123:23002/arcgis/rest/services/SOIL_ANSUNG/MapServer/legend?f=pjson",
	async: true, 
	success : function(response, opts) {
		jsonData = Ext.util.JSON.decode( response.responseText );
		_legend = jsonData.layers;
		//http://112.217.167.123:23002/arcgis/rest/services/SOIL_ANSUNG/MapServer/layers
	},
	failure: function(form, action) {
		alert("오류가 발생하였습니다.");
	}
});


var _gridMapping = [{
	"id": 15 ,"tableId":30 , "docId" : 34 ,"name" : "PLLT_CLEAN" , "koName" : "토양정화명령부지"
},{
	"id": 16 ,"tableId":21 , "docId" : 0 , "name" : "PLLT_RESERCH" , "koName" : "토양오염실태조사"
},{
	"id": 17 ,"tableId":20 , "docId" : 35 , "name" : "PLLT_SPECIFY" , "koName" : "특정토양오염관리대상시설"
},{
	"id": 18 ,"tableId":23 , "docId" : 0 , "name" : "PLLT_DETAIL" , "koName" : "토양정밀조사"
},{
	"id": 19 ,"tableId":22 , "docId" : 0 , "name" : "PLLT_OBSERVE" , "koName" : "토양측정망"
},{
	"id": 1 ,"tableId":36 , "docId" : 0 , "name" : "FAC_OIL_2UND" , "koName" : "2만리터 미만의 석유류 저장시설"
},{
	"id": 6 ,"tableId":37 , "docId" : 0 , "name" : "FAC_TOXIC" , "koName" : "유독물시설"
},{
	"id": 7 ,"tableId":37 , "docId" : 0 , "name" : "FAC_TOXIC" , "koName" : "유독물질시설"
},{
	"id": 10 ,"tableId":41 , "docId" : 0 , "name" : "FAC_WASTE" , "koName" : "폐기물처리시설"
},{
	"id": 12 ,"tableId":39 , "docId" : 0 , "name" : "FAC_SEWAGE" , "koName" : "하수(분뇨)처리시설"
},{
	"id": 5 ,"tableId":38 , "docId" : 0 , "name" : "FAC_SCRAP" , "koName" : "원광석고철보관소"
},{
	"id": 4 ,"tableId":40 , "docId" : 0 , "name" : "FAC_TRAFFIC" , "koName" : "교통관련시설"
},{
	"id": 11 ,"tableId":42 , "docId" : 0 , "name" : "FAC_WATER" , "koName" : "폐수배출시설"
},{
	"id": 2 ,"tableId":43 , "docId" : 0 , "name" : "FAC_BURY" , "koName" : "가축매몰지"
},{
	"id": 3  ,"tableId":44 , "docId" : 0 , "name" : "FAC_GOLF" , "koName" : "골프장"
},{
	"id": 28  ,"tableId": 28 , "docId" : 0 , "name" : "FAC_HIS" , "koName" : "오염시설이력"
}];

var _saveMapPoint = undefined;

var _docInfo = [{
	"id" : 34 ,"name" : "DOC_DOC" , "koName" : "문헌"
},{
	"id" : 35 ,"name" : "DOC_CAD" , "koName" : "도면"
}];

/*var _pollutionDetailLayer = [{
	"id": 29 , "name" : "areaBase", "koName" : "필지기본"
},{
	"id": 31 , "name" : "jimokChg", "koName" : "지목변경"
},{
	"id": 32 , "name" : "ownChg",  "koName" : "소유권변경"
},{
	"id": 26 , "name" : "coHis",  "koName" : "소유권변경"
},{
	"id": 25 , "name" : "coBase",  "koName" : "소유권변경"
}];*/


//var proxy = './proxy/proxy.jsp?';

window.onresize = function() {
	var w = Ext.query('.x-window');
	Ext.each(w, function(item) {
		Ext.getCmp(item.id).adjustPosition(100,100);
		})
	}
