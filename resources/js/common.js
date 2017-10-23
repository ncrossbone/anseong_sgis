var common = (function(){
	//윈도우 중복 생성 방지
	var windowOnOff = function(cmpId,defineId){
		Ext.getCmp(cmpId)!=undefined?Ext.getCmp(cmpId).show():Ext.create(defineId).show();
	};
	return{
		onClickStaticBtn:function(){
			windowOnOff("StatsInfo","asSgis.view.center.StatsInfo");
			windowOnOff("PollutionInfo","asSgis.view.center.PollutionInfo");
			windowOnOff("SearchResult","asSgis.view.south.SearchResult");
		},
		groupBtnClick:function(obj){
			var btnArr = ['btn01','btn02','btn03','btn04','btn05','btn06','btn07','btn08','btn09'];
			var btnId = Ext.getCmp(obj.target.id);
			
			for(var i =0; i<btnArr.length; i++){
				if(btnArr[i]!=btnId){
					Ext.getCmp(btnArr[i]).setSrc(Ext.getCmp(btnArr[i]).getSrc().replace('_on','_off'));
				}
			}
			
			btnId.getSrc().split("_")[1].split(".")[0]=='on'?btnId.setSrc(btnId.getSrc().replace('_on','_off')):btnId.setSrc(btnId.getSrc().replace('_off','_on'));
		}
	};
})();