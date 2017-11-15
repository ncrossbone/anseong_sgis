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
Ext.Ajax.request({
	url: proxy+"http://112.217.167.123:23002/arcgis/rest/services/SOIL_ANSUNG/MapServer/legend?f=pjson",
	async: true, 
	success : function(response, opts) {
		jsonData = Ext.util.JSON.decode( response.responseText );
		_legend = jsonData.layers;
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
	"id": 17 ,"tableId":20 , "docId" : 36 , "name" : "PLLT_SPECIFY" , "koName" : "특정토양오염관리대상시설"
},{
	"id": 18 ,"tableId":23 , "docId" : 0 , "name" : "PLLT_DETAIL" , "koName" : "토양정밀조사"
},{
	"id": 19 ,"tableId":22 , "docId" : 0 , "name" : "PLLT_OBSERVE" , "koName" : "토양측정망"
}];

var _saveMapPoint = undefined;

var _docInfo = [{
	"id" : 36 ,"name" : "DOC_SPECIFY" , "koName" : "문헌특정"
},{
	"id" : 34 ,"name" : "DOC_CLEAN" , "koName" : "문헌정화"
},{
	"id" : 35 ,"name" : "DOC_ETC" , "koName" : "문헌기타"
},{
	"id" : 37 ,"name" : "DOC_CAD" , "koName" : "도면"
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


var _pollutionDetailLayer = [29,31,32,26,25];
//var proxy = './proxy/proxy.jsp?';

window.onresize = function() {
	var w = Ext.query('.x-window');
	Ext.each(w, function(item) {
		Ext.getCmp(item.id).adjustPosition(100,100);
		})
	}
