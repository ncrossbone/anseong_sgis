var common = (function(){
	//윈도우 중복 생성 방지
	var windowOnOff = function(cmpId,defineId){
		Ext.getCmp(cmpId)!=undefined?Ext.getCmp(cmpId).show():Ext.create(defineId).show();
	};
	return{
		onClickStaticBtn:function(){
			windowOnOff("StatsInfo","asSgis.view.center.StatsInfo");
			windowOnOff("PollutionDetailInfo","asSgis.view.center.PollutionDetailInfo");
			//windowOnOff("SearchResult","asSgis.view.south.SearchResult");
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
		},
		
		setInitZoomLevel: function(extent,a,b,obj,c){
			var coreMap = Ext.getCmp("_mapDiv_"); 
			coreMap.map.setLevel(7);
		},
		
		dynamicTreePanel1Controll: function(node){
			asSgis.getApplication().fireEvent('dynamicLayerOnOff', node);
		},
		
		searchTreePanel1Controll: function(node){
			asSgis.getApplication().fireEvent('searchLayerOnOff', node);
		},
		
		areaComboSelect: function(combo, record){
			
			var coreMap = Ext.getCmp("_mapDiv_");
			
			var center = esri.geometry.Polygon(record.data.geometry).getExtent().getCenter();
			coreMap.map.centerAndZoom(center,17);
		},
		
		

		pollutionPop: function(grid,getCoId, noCoId){//(해당 그리드 , coId를 갖고 있는지)
			
			var pnuCd = null;
			var coId = null;
			
			var pollutionDetailLayer = [29,31,32,25,26,28];
			
			if(grid.getStore().getAt(1) == null){
				return;
			}
			
			if(noCoId == true){
				pnuCd = grid.getStore().getAt(1).data.PNU_NO;
			}else{
				pnuCd = grid.getStore().getAt(1).data.PNU_NO;
				coId = grid.getStore().getAt(1).data.CO_ID;
			}

			var pollutionDetailPop = Ext.getCmp("PollutionDetailPop");
			if(pollutionDetailPop == undefined){
				pollutionDetailPop = Ext.create("asSgis.view.center.PollutionDetailPop");
				console.info(pollutionDetailPop);
			}
			
			var arrayInfo = [];
			
			console.info("공장아이디가 있는지?"+getCoId);
			if(getCoId == false){
				pollutionDetailLayer.splice(pollutionDetailLayer.indexOf(25),3);
			}
			
			console.info(pollutionDetailLayer);
			

			for(var i = 0 ; i < pollutionDetailLayer.length ; i++){
				var queryTask = new esri.tasks.QueryTask("http://112.217.167.123:23002/arcgis/rest/services/SOIL_ANSUNG/MapServer/" + pollutionDetailLayer[i]);
				var query = new esri.tasks.Query();
				if(pollutionDetailLayer[i] == 29 || pollutionDetailLayer[i] == 31 || pollutionDetailLayer[i] == 32){
					query.where = "PNU_CODE = '"+pnuCd+"'";
				}else{
					query.where = "CO_ID = '"+coId+"'";
				}
				

				query.returnGeometry = false;
				query.outFields = ["*"];
				arrayInfo.push(queryTask.execute(query));
			}
			
			var	defList = new dojo.DeferredList(arrayInfo);
			defList.then(function(){
				var results = [];
				try{
					console.info(arguments[0]);
					for(var i=0; i<arguments[0].length; i++){
						var resultValue = arguments[0][i][1];
						results = results.concat(resultValue);

					}	
				}catch(e){
					console.log(e);
				}
				
				common.popUpDataInsert(results,getCoId);
				

				pollutionDetailPop.show();
		    });
			
		},
		
		popUpDataInsert: function(results,getCoId){

			/* 0: AREA_BASE - 주소 : ADDRES_ALL
			 * 1: JIMOK_CHG - 지목 : JIMOL_USE (order by JIMOL_UPDATE ), 면적: JIMOL_SIZE  , 이력정보: JIMOL_UPDATEMENT
			 * 2: OWN_CHG - 이력정보 : OWN_UPDATEMNT
			 * 3: CO_BASE
			 * 4: CO_HIS*/
			
			/*사업장명 : coName
			 *사업장주소 : coAddr
			 *사업자등록번호 : coNum*/
			
			var addr , jimok , area , coNm , coAd , coNumb = "-";
			
			addr = results[0].features[0].attributes.ADRESS_ALL;
			
			
			const maxJimok = results[1].features.reduce(function(prev, current) {
			    return (prev.attributes.JIMOL_UPDATECODE > current.attributes.JIMOL_UPDATECODE) ? prev : current
			});			
			
			var storeData = [];
			for(var i = 0 ; i < results[1].features.length; i++){
				storeData.push({"CO_UPDATE_DATE": results[1].features[i].attributes.JIMOL_UPDATE , "RESON" : "지목변경", "CO_UPDATE_INFO":results[1].features[i].attributes.JIMOL_USE});
			}
			for(var k = 0 ; k < results[2].features.length; k++){
				if(results[2].features[k].attributes.OWN_UPDATE2 != null){
					storeData.push({"CO_UPDATE_DATE": results[2].features[k].attributes.OWN_UPDATE2.replace(/\./g,"-") , "RESON" : "소유주변경", "CO_UPDATE_INFO":results[2].features[k].attributes.OWN_NAME});	
				}
			}
			
			var jiOwnInfoStore = Ext.create('Ext.data.Store',{
				fields:[
					'CO_UPDATE_DATE',
					'RESON',
					'CO_UPDATE_INFO'
					],
				data: storeData
			})
			var infoRecord = Ext.getCmp("infoRecord");
			infoRecord.setStore(jiOwnInfoStore);
			
			
			var coStoreData = [];
			
			console.info(getCoId);
			if(getCoId == true){
				
				for(var a = 0 ; a < results[5].features.length; a++){
					coStoreData.push({"CO_NAME": results[4].features[0].attributes.CO_COMNAME , "CO_FACCAP" : results[5].features[a].attributes.CO_FACCAP, "CO_FACMATTER":results[5].features[a].attributes.CO_FACMATTER, "CO_FACUPDATE":results[5].features[a].attributes.CO_FACUPDATE , "지번": "지번"});
				}

				coNm = results[4].features[0].attributes.CO_COMNAME;
				console.info(coNm);
				
				coAd = addr;
				
				coNumb = results[3].features[0].attributes.CO_UNQNO;
			}
			
			var coInfoStore = Ext.create('Ext.data.Store',{
				fields:[
					'CO_NAME',
					'CO_FACCAP',
					'CO_FACMATTER',
					'CO_FACUPDATE',
					'JIBUN'
				],
				data:coStoreData
			})
			var coInfoRecord = Ext.getCmp("coInfoRecord");
			console.info(coInfoStore);
			coInfoRecord.setStore(coInfoStore);
			
			
			/*사업장명 : coName
			 *사업장주소 : coAddr
			 *사업자등록번호 : coNum*/
			
			var coName = Ext.getCmp("coName");
			coName.setHtml(coNm);
			
			var coAddr = Ext.getCmp("coAddr");
			coAddr.setHtml(coAd);
			
			var coNum = Ext.getCmp("coNum");
			coNum.setHtml(coNumb);
			
			
			/* 주소 : infoAddr
			 * 지목 : infoJimok
			 * 면적 : infoArea
			 * */
			
			
			jimok = maxJimok.attributes.JIMOL_USE; // JIMOL_UPDATECODE가 가장 높은 지목
			area = maxJimok.attributes.JIMOL_SIZE;
			
			var infoAddr = Ext.getCmp("infoAddr");
			infoAddr.setHtml(addr);
			
			var infoJimok = Ext.getCmp("infoJimok");
			infoJimok.setHtml(jimok);
			
			var infoArea = Ext.getCmp("infoArea");
			infoArea.setHtml(area);
			
			
		},
		
		mapClick: function(evt){
			
			_saveMapPoint = evt;
			
			var coreMap = Ext.getCmp("_mapDiv_");
			var selectLayer = coreMap.searchLayerAdmin.layer.visibleLayers;
			console.info(selectLayer);
			var resultList = [];
			
			var pnuId = "";
			if(selectLayer.length > 0){

				if(Ext.getCmp("searchResultWindow") != undefined){
					Ext.getCmp("searchResultWindow").removeAll();
				}
				
				
				
				var exeArr = [];
				
				for(var i = 0; i < selectLayer.length ; i++){

						var queryTask = new esri.tasks.QueryTask("http://112.217.167.123:23002/arcgis/rest/services/SOIL_ANSUNG/MapServer/" + selectLayer[i]);
						var query = new esri.tasks.Query();
						query.geometry = evt.mapPoint;
						query.returnGeometry = false;
						query.outFields = ["*"];
						exeArr.push(queryTask.execute(query));
						
						dojo.connect(queryTask, "onError", function(err) {
							alert(err);
						});
				};

				var	defList = new dojo.DeferredList(exeArr);
				var coLayer = [15,17,18]; // coId를 가지고있는 polygon 레이어번호
				var getcoIdLayer = null;
				var noCoId = false; // coId를 가지고 있는지 판단
				defList.then(function(){
					var results = [];
					try{
						for(var i=0; i<arguments[0].length; i++){
							var resultValue = arguments[0][i][1].features;
							if(resultValue[0] != undefined){
								resultValue[0].attributes.layerId = selectLayer[i];
							}
							results = results.concat(resultValue);

						}	
					}catch(e){
						console.log(e);
					}
					
					var noCo = [true,null]; // 선택된 레이어 중에 CO_ID를 전부 가지고있지 않으면
					//co_id를 가지고 있는 레이어 하나만 추출하기 위해
					for(var a = 0 ; a < results.length; a++){
						for(var b = 0 ; b < coLayer.length ; b++){
							if(results[a].attributes.layerId == coLayer[b]){
								getcoIdLayer = results[a].attributes.layerId;
							}
						}	
					}
					

					if(getcoIdLayer == null){
						getcoIdLayer = results[0].attributes.layerId;
						noCoId = true;
					}
					
					for(var j = 0 ; j < results.length; j++){
						common.searchResult(results[j].attributes.layerId, results[j].attributes.PNU, getcoIdLayer , noCoId);	
					}					
			    });
			}			
		},
		
		searchResult: function(layerId, PNU , getcoIdLayer , noCoId){
			
			//co_id 를 가져오는 레이어 인지 판단
			var getCoId = false;
			
			if(layerId == getcoIdLayer){
				if(noCoId == false){
					getCoId = true;
				}
			}
			
			console.info(getCoId);
			var title = "";
			
			for(var i = 0 ; i < _legend.length  ; i++){
				if(_legend[i].layerId == layerId){
					title = _legend[i].layerName;
				}
			}
			
			var gridName = "";
			var gridTable = null;
			for(var j = 0 ; j < _gridMapping.length ; j++){
				if(_gridMapping[j].id == layerId){
					gridName = _gridMapping[j].name;
					gridTable = _gridMapping[j].tableId;
				}
			}
			
			console.info("layerId:"+layerId)
			console.info("title:"+title);
			console.info("gridName:"+gridName);
			console.info("gridTable:"+gridTable);
			
			
			var mapContainer = Ext.getCmp("mapContainer");
			console.info(mapContainer);
			
			var westContainer = Ext.getCmp("westContainer");
			
			var windowWidth = mapContainer.getWidth();
			var windowHeight = 300;
			var windowY = mapContainer.getHeight() - windowHeight;
			

			//1. nort 검색결과 생성
			var searchResultWindow = Ext.getCmp("searchResultWindow");
			if(searchResultWindow == undefined){
				var searchResultWindow = Ext.create("Ext.window.Window", {
					renderTo: mapContainer.el,
					id: 'searchResultWindow',
					title: '검색결과',
					width: windowWidth - westContainer.width,
					height: mapContainer.getHeight() - windowY,
					y: windowY,
					x: westContainer.width
				});
				searchResultWindow.show();

			}
			
			
			// 2. 탭페널 생성			
			var searchResultTabPanel = Ext.getCmp("searchResultTabPanel");
			if(searchResultTabPanel == undefined){
				var tabPanel = new Ext.TabPanel({
			        id: 'searchResultTabPanel',
			        enableTabScroll: true
			    });
				searchResultWindow.add(tabPanel);			 	
			}
			

			var searchResultTabPanel = Ext.getCmp("searchResultTabPanel");
			// 3. 탭 생성
			if(Ext.getCmp("tab_" + gridName) == undefined){
				var resultTabOption = {
				        title : title,
				        id: "tab_" + gridName, 
				        header: false
				    }
				searchResultTabPanel.add(resultTabOption);
			}
			

			
			//그리드 붙여 넣기
			//asSgis.view.south.SearchResultGrid
			
			var resultGrid = Ext.create("asSgis.view.south.SearchResultGrid_"+gridName);
			var resultTab = Ext.getCmp("tab_"+gridName);
			resultTab.add(resultGrid);
			
			
			var grdCtl = resultGrid.items.items[0];
			grdCtl = grdCtl.items.items[0];	

			var resultGridStore = Ext.create("asSgis.store.south.SearchResultGrid_"+gridName,{
				layerId: gridTable,
				pnuNo: PNU,
				gridCtl : grdCtl,
				gridName : gridName,
				getCoId : getCoId,
				noCoId : noCoId
			});
			resultGridStore.load();
			
			

		}
		
	};
})();
	