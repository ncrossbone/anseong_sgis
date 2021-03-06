var common = (function(){
	//윈도우 중복 생성 방지
	var windowOnOff = function(cmpId,defineId){
		Ext.getCmp(cmpId)!=undefined?Ext.getCmp(cmpId).show():Ext.create(defineId).show();
	};
	return{
		onClickStaticBtn:function(){
			windowOnOff("StatsInfo","asSgis.view.center.StatsInfo");
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
			asSgis.getApplication().fireEvent('dynamicLayer1OnOff', node);
		},
		
		dynamicTreePanel2Controll: function(node){
			asSgis.getApplication().fireEvent('dynamicLayer2OnOff', node);
		},
		
		searchTreePanel1Controll: function(node){
			asSgis.getApplication().fireEvent('searchLayerOnOff', node);
		},
		
		searchTreePanel2Controll: function(node){
			asSgis.getApplication().fireEvent('searchPointLayerOnOff', node);
		},
		
		areaComboSelect: function(pnuCd){
			
			var coreMap = Ext.getCmp("_mapDiv_");
			
			var queryTask = new esri.tasks.QueryTask(_API.anseongGeo);
			var query = new esri.tasks.Query();
			query.returnGeometry = true;
			query.outSpatialReference = {"wkid":102100};
			query.where = "PNU = '"+pnuCd+"'";
			query.outFields = ["*"];
			queryTask.execute(query,  function(result){
				if(result.features.length == 0){
					coreMap.searchLayerAdmin.symGrpLayer.clear();
					return;
				}else{
					
					var center = esri.geometry.Polygon(result.features[0].geometry).getExtent().getCenter();
					coreMap.map.centerAndZoom(center,17);
					
					asSgis.getApplication().fireEvent('selectSymbol', center);
					
					
				}
			});
		},
		
		

		pollutionPop: function(grid,getCoId, noCoId){//(해당 그리드 , coId를 갖고 있는지)
			
			var pnuCd = null;
			var coId = null;
			
			var pollutionDetailLayer = [29,31,32];
			
			if(grid.getStore().getAt(0) == null){
				return;
			}
			
			

			var pollutionDetailPop = Ext.getCmp("PollutionDetailPop");
			
			if(pollutionDetailPop == undefined){
				pollutionDetailPop = Ext.create("asSgis.view.center.PollutionDetailPop",{
					constrain:true
				});
				
			}
			
			
			var popTab = Ext.getCmp("popTab"); //오염원상세정보 tab
			popTab.setActiveTab(0); //기본정보로 세팅 (disable을 위해)
			
			var subInfo = Ext.getCmp("subInfo"); // 사업장정보
			if(noCoId == true){
				//사업장정보				
				subInfo.setDisabled(true);
				pnuCd = grid.getStore().getAt(0).data.PNU;
			}else{
				//사업장정보
				subInfo.setDisabled(false);
				
				pnuCd = grid.getStore().getAt(0).data.PNU;
				coId = grid.getStore().getAt(0).data.CO_ID;
			}
			
			
			var arrayInfo = [];

			for(var i = 0 ; i < pollutionDetailLayer.length ; i++){
				var queryTask = new esri.tasks.QueryTask(_API.searchLayer +"/" + pollutionDetailLayer[i]);
				var query = new esri.tasks.Query();
				query.where = "PNU = '"+pnuCd+"'";

				query.returnGeometry = false;
				query.outFields = ["*"];
				arrayInfo.push(queryTask.execute(query));
			}
			
			var	defList = new dojo.DeferredList(arrayInfo);
			defList.then(function(){
				var results = [];
				try{
					for(var i=0; i<arguments[0].length; i++){
						var resultValue = arguments[0][i][1];
						results = results.concat(resultValue);

					}	
				}catch(e){
					console.log(e);
				}
				common.popUpDataInsert(results,getCoId,pnuCd);

				pollutionDetailPop.show();
				pollutionDetailPop.setPosition(Ext.getBody().getViewSize().width -450 , Ext.getBody().getViewSize().height - 900 );
		    });
			
		},
		
		popUpDataInsert: function(results,getCoId,pnuCd){

			/* 0: AREA_BASE - 주소 : ADDRES_ALL
			 * 1: JIMOK_CHG - 지목 : JIMOL_USE (order by JIMOL_UPDATE ), 면적: JIMOL_SIZE  , 이력정보: JIMOL_UPDATEMENT
			 * 2: OWN_CHG - 이력정보 : OWN_UPDATEMNT
			 * 3: CO_BASE
			 * 4: CO_HIS*/
			
			/*사업장명 : coName
			 *사업장주소 : coAddr
			 *사업자등록번호 : coNum*/
			
			var addr = "-";
			var jimok = "-";
			var area = "-";
			var coNm = "-";
			var coAd = "-";
			var coNumb = "-"; 
			
			
			addr = results[0].features[0].attributes.ADRESS_ALL;
			
			//지목의 max날짜를 검색
			const maxJimok = results[1].features.reduce(function(prev, current) {
			    return (prev.attributes.JIMOL_UPDATECODE > current.attributes.JIMOL_UPDATECODE) ? prev : current
			});			
			
			var storeData = [];
			for(var i = 0 ; i < results[1].features.length; i++){
				if(results[1].features[i].attributes.JIMOL_UPDATE != null){	//날짜가 없는것들은 제외
					storeData.push({"CO_UPDATE_DATE": results[1].features[i].attributes.JIMOL_UPDATE , "RESON" : "지목변경", "CO_UPDATE_INFO":results[1].features[i].attributes.JIMOL_USE});
				}
			}
			for(var k = 0 ; k < results[2].features.length; k++){
				if(results[2].features[k].attributes.OWN_UPDATE2 != null){	//날짜가 없는것들은 제외
					storeData.push({"CO_UPDATE_DATE": results[2].features[k].attributes.OWN_UPDATE2.replace(/\./g,"-") , "RESON" : "소유주변경", "CO_UPDATE_INFO":results[2].features[k].attributes.OWN_NAME});	
				}
			}
			
			var jiOwnInfoStore = Ext.create('Ext.data.Store',{
				fields:[
					'CO_UPDATE_DATE',
					'RESON',
					'CO_UPDATE_INFO'
					],
					sorters: [{
				    	property: 'CO_UPDATE_DATE',
				    	direction: 'DESC'
				    }],
				data: storeData
			})
			var infoRecord = Ext.getCmp("infoRecord");
			infoRecord.setStore(jiOwnInfoStore);
			
			
			
			
			
			//
			var pdfCombo = Ext.getCmp("imgCombo");
			pdfCombo.setValue("");
			
			var coStoreData = [];
			
			if(getCoId == true){
				var queryTask = new esri.tasks.QueryTask(_API.piljiCo);
				var query = new esri.tasks.Query();
				query.where = "PNU = '"+pnuCd+"'";
				query.returnGeometry = false;
				query.outFields = ["*"];
				queryTask.execute(query, function(result){
					console.info(result);
					if(result.features.length > 0 ){
						for(var j = 0 ; j < result.features.length ; j++){
							if(result.features[j].attributes.CO_CANCELDATE == "9999.12.31"){
								coStoreData.push(
										{"CO_NAME": result.features[j].attributes.CO_COMNAME,
										 "CHG_DAY": result.features[j].attributes.CO_UPDATE,
										 "END_DAY": "-",
										 "CO_ID"  : result.features[j].attributes.CO_ID
										});
							}else{
								coStoreData.push(
										{"CO_NAME": result.features[j].attributes.CO_COMNAME,
										 "CHG_DAY": result.features[j].attributes.CO_UPDATE,
										 "END_DAY": result.features[j].attributes.CO_CANCELDATE,
										 "CO_ID"  : result.features[j].attributes.CO_ID
										});
							}
							
						}
					}
					
					var coInfoStore = Ext.create('Ext.data.Store',{
						fields:[
							'CO_NAME',
							'CHG_DAY',
							'END_DAY'
						],
						sorters: [{
					    	property: 'CHG_DAY',
					    	direction: 'DESC'
					    }],
						data:coStoreData
					})
					var coInfoRecord = Ext.getCmp("coInfoRecord");
					coInfoRecord.setStore(coInfoStore);
					
					
					var coIdList = "";
					for(var a = 0 ; a < coStoreData.length; a++){
						if(a == coStoreData.length-1){
							coIdList += "'" + coStoreData[a].CO_ID + "'";
						}else{
							coIdList += "'" + coStoreData[a].CO_ID + "',";
						}
					}
					console.info(coIdList);
					var pdfArr = [];
					var pdfResults = [];
					for(var j = 0 ; j < _docInfo.length; j++){
						var queryTask = new esri.tasks.QueryTask(_API.searchLayer + "/" + _docInfo[j].id);
						var query = new esri.tasks.Query();
						query.where = "CO_ID IN ("+coIdList+")";
						query.returnGeometry = false;
						query.outFields = ["*"];
						pdfArr.push(queryTask.execute(query));
						dojo.connect(queryTask, "onError", function(err) {
							alert(err);
						});
					}
					
					var	pdfList = new dojo.DeferredList(pdfArr);
					var pdfResults = [];
					pdfList.then(function(){
						try{
							
							for(var i=0; i<arguments[0].length; i++){
								if(arguments[0][i][1].features.length > 0){
									for(var j = 0 ; j < arguments[0][i][1].features.length; j++){
										arguments[0][i][1].features[j].attributes.folderName = _docInfo[i].name;
										arguments[0][i][1].features[j].attributes.type = _docInfo[i].id;
									}
									
								}
								pdfResults = pdfResults.concat(arguments[0][i][1].features);
								
	
							}	
							
							
							console.info(pdfResults);
							
							
							var pdfData = [];
							for(var q = 0 ; q < pdfResults.length; q++){
								console.info(pdfResults[q].attributes);
								pdfData.push({"fileName" : pdfResults[q].attributes.DOC_NM
											, "fileClass": pdfResults[q].attributes.DOC_CLASS
											, "fileType":pdfResults[q].attributes.type
											, "folderName":pdfResults[q].attributes.folderName})
							}
							var pdfStore = Ext.create('Ext.data.Store',{
								fields:[
									'fileName',
									'fileClass'
								],
								data:pdfData
							});
							
							pdfCombo.setStore(pdfStore);
						}catch(e){
							console.log(e);
						}
					});
					
					
				});
				
				dojo.connect(queryTask, "onError", function(err) {
					alert(err);
				});
			}
			
			
			
			/* 주소 : infoAddr
			 * 지목 : infoJimok
			 * 면적 : infoArea
			 * */
			
			
			if(maxJimok.attributes.JIMOL_USE != null){
				jimok = maxJimok.attributes.JIMOL_USE; // JIMOL_UPDATECODE가 가장 높은 지목
			}

			if(maxJimok.attributes.JIMOL_SIZE != null){
				area = maxJimok.attributes.JIMOL_SIZE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "㎡";
			}

			
			var infoAddr = Ext.getCmp("infoAddr");
			var infoAddr1 = Ext.getCmp("infoAddr1");
			infoAddr.setHtml(addr);
			infoAddr1.setHtml(addr);
			
			var infoJimok = Ext.getCmp("infoJimok");
			var infoJimok1 = Ext.getCmp("infoJimok1");
			infoJimok.setHtml(jimok);
			infoJimok1.setHtml(jimok);
			
			var infoArea = Ext.getCmp("infoArea");
			var infoArea1 = Ext.getCmp("infoArea1");
			infoArea.setHtml(area);
			infoArea1.setHtml(area);
			
		},
		
		
		mapClick: function(evt,type){
			
			var coreMap = Ext.getCmp("_mapDiv_");
			var selectLayer = coreMap.searchLayerAdmin.layer.visibleLayers;
			var resultList = [];
			
			var pnuId = "";
			
			
			
			asSgis.getApplication().fireEvent('bufferPoint', evt.mapPoint);
			
			
			if(type == undefined){
				asSgis.getApplication().fireEvent('selectSymbol', evt.mapPoint);
			}
			
			
			if(selectLayer.length > 0){
				
				_saveMapPoint = evt;
				
				if(Ext.getCmp("searchResultWindow") != undefined){
					Ext.getCmp("searchResultWindow").removeAll();
				}
				
				
				
				var exeArr = [];
				
				for(var i = 0; i < selectLayer.length ; i++){

						var queryTask = new esri.tasks.QueryTask(_API.searchLayer + "/" + selectLayer[i]);
						var query = new esri.tasks.Query();
						if(type == "search"){
							query.where = "PNU = '"+evt+"'";					
						}else{
							query.geometry = evt.mapPoint;			
						}
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
					
					//검색결과 값이 아무것도 없을때
					if(results.length < 1){
						common.closeWindow();
						return;
					}
					
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
						common.searchResult(results[j].attributes.layerId, results[j].attributes.PNU, getcoIdLayer , noCoId , "Polygon");	
					}					
			    });
			}			
		},
		
		

		testResult: function(UID,layerNum){
			
			common.searchResult(layerNum, UID , undefined, false ,"Point")  //layerId, PNU , getcoIdLayer , noCoId , type
		},
		
		tabCounting: function(store){
			
			var tabInfo = Ext.getCmp("tab_"+store.gridName); //grid tab 
			if(store.getCount() == tabInfo.totalCnt){ // 만약 원래 카운트와 필터 카운트가 같을시 총카운트만 표출
				tabInfo.setTitle(tabInfo.initialConfig.title + "("+store.getCount()+")");
			}else{
				tabInfo.setTitle(tabInfo.initialConfig.title + "("+store.getCount()+"/"+tabInfo.totalCnt+")");
			}
			
			
		},
		
		//layerId : 레이어 id ,  pnu : pnu ID , getcoIdLayer : 공장아이디를 갖고 있는 레이어인지, noCoId : 루프중 공장아이디가 있는지 없는지 ,  type : polygon인지 point인지  
		searchResult: function(layerId, PNU , getcoIdLayer , noCoId , type){
			
			console.info("layerId :::"+layerId);
			console.info("PNU :::" + PNU);
			console.info("getcoIdLayer :::" + getcoIdLayer);
			console.info("noCoId :::" + noCoId);
			console.info("type :::" + type);
			//return;
			//co_id 를 가져오는 레이어 인지 판단
			var getCoId = false;
			
			if(layerId == getcoIdLayer){
				if(noCoId == false){
					getCoId = true;
				}
			}
			
			var title = "";
			
			for(var i = 0 ; i < _legend.length  ; i++){
				if(_legend[i].layerId == layerId){
					title = _legend[i].layerName;
				}
				
			}
			
			if(layerId == 28){ //예외 legend에 포함되어 있지 않은 table 정보
				title = "오염시설이력";
			}
			
			var gridName = "";
			var gridTable = null;
			for(var j = 0 ; j < _gridMapping.length ; j++){
				if(_gridMapping[j].id == layerId){
					gridName = _gridMapping[j].name;
					gridTable = _gridMapping[j].tableId;
				}
			}
			console.info("gridName::"+gridName);
			console.info("gridTable::"+gridTable);
			//임시 app.js 에 grid 명이 없을때
			
			if(gridTable == null){
				alert("테이블이 존재하지 않습니다");
				return;
			}
			
			
			var mapContainer = Ext.getCmp("mapContainer");
			
			var westContainer = Ext.getCmp("westContainer");
			
			var windowWidth = mapContainer.getWidth();
			var windowHeight = 300;
			var windowY = mapContainer.getHeight() - windowHeight;
			
			console.info(mapContainer.getHeight() - windowY);
			//1. nort 검색결과 생성
			var searchResultWindow = Ext.getCmp("searchResultWindow");
			console.info(searchResultWindow);
			if(searchResultWindow == undefined){
				var searchResultWindow = Ext.create("Ext.window.Window", {
					renderTo: mapContainer.el,
					id: 'searchResultWindow',
					title: '검색결과',
					constrain: true,
					border:false,
					shawdow:false,
					maximizable: true,
					width: windowWidth - westContainer.width+20,
					height: mapContainer.getHeight() - windowY,
					y: windowY,
					x: westContainer.width-15,
					listeners:{
						'maximize': function(){
							this.setWidth(windowWidth - westContainer.width+20);
							this.setX(westContainer.width-15);
						},
						resize: function(){
							common.resultResize(this);
						}
					}
				});

			}
			
			//공장 아이디가 없는 레이어이면
			if(noCoId == true){
				searchResultWindow.show();
			}else{
				searchResultWindow.hide();
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
			
			searchResultTabPanel.setActiveItem("tab_" + gridName);
			
			//그리드 붙여 넣기
			//asSgis.view.south.SearchResultGrid
			console.info(type);
			if(type == "Polygon"){
				console.info(gridName);
				var resultGrid = Ext.getCmp("serachReultGrid_"+gridName+"_grid");
				if(resultGrid ==undefined){
					resultGrid = Ext.create("asSgis.view.south.SearchResultGrid_"+gridName,{
						id: "serachReultGrid_"+gridName+"_grid",
						autoResize: true,
						border:false
					});
				}
				
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
				
			}else if(type == "Point"){
				
				
				//임시 없는 데이터 
				
				
				
				var resultGrid = Ext.getCmp("serachReultGrid_Point_"+gridName+"_grid");
				if(resultGrid == undefined){
					resultGrid = Ext.create("asSgis.view.south.SearchResultGrid_Point_"+gridName,{
						id: "serachReultGrid_Point_"+gridName+"_grid",
						border:false
					});
				}
				
				var resultTab = Ext.getCmp("tab_"+gridName);
				resultTab.add(resultGrid);
				
				
				
				var grdCtl = resultGrid.items.items[0];
				grdCtl = grdCtl.items.items[0];	

				var resultGridStore = Ext.create("asSgis.store.south.SearchResultGrid_Point_"+gridName,{
					layerId: gridTable,
					UID: PNU,
					gridCtl : grdCtl,
					gridName : gridName,
					getCoId : getCoId,
					noCoId : noCoId
				});
				resultGridStore.load();
				
				
				//검색결과창이 hidden 일때 (다른검색을 하게되면 검색결과창이 초기화되어서...)
				if(searchResultWindow.inheritedState.hidden == true){
					console.info("?");
					var comp = Ext.getCmp('searchResultTabPanel').items.items;  //검색결과 tab component 찾기
					for(var a = 0 ; a < comp.length; a++){ //for문돌려 현제 검색결과에 있는 tab_id를 찾아 point_tab아이디와 다른것들은 hidden,토양오염실태조사,토양측정망 제외후 히든 
						if(comp[a].id != "tab_"+gridName && comp[a].id != "tab_PLLT_RESERCH" && comp[a].id != "tab_PLLT_OBSERVE"){
							Ext.getCmp('searchResultTabPanel').getComponent(comp[a].id).tab.hide();
						}
					}
					searchResultWindow.show();
				}
				
			}

		},
		
		resultResize:function(window){
			var searchResultWindow = Ext.getCmp("searchResultWindow");
			if(Ext.getCmp('searchResultTabPanel') != undefined){
				//현제 가지고 있는 그리드 모두의 width , height 값을 변경해준다
				var searchResultPanel = Ext.getCmp('searchResultTabPanel').items.items;
				for(var i = 0 ; i <  searchResultPanel.length; i++){
					searchResultPanel[i].items.items[0].items.items[0].items.items[0].setHeight(window.height-80);
					searchResultPanel[i].items.items[0].items.items[0].items.items[0].setWidth(window.width);
				}
			}
			
		},
		
		closeWindow: function(){
			
			if(Ext.getCmp("searchResultWindow") != undefined){
				Ext.getCmp("searchResultWindow").close();
			}
			
			if(Ext.getCmp("PollutionDetailPop") != undefined){
				Ext.getCmp("PollutionDetailPop").close();
			}
			
		},
		
		setTooltipXY: function(){
			var me = Ext.getCmp("_mapDiv_");
			
			if(me != undefined)
				me.setX(9); // 좌측 패널 resize, collapse, expand시 맵 left 고정 2016-04-05
			
			var popCtl = Ext.getCmp("popSiteInfo");
			
			if(popCtl != undefined && popCtl != null){
				
				var curLevel = me.map.getLevel();
				var resolution = me.tileInfo.lods[curLevel].resolution;
				var extent = me.map.extent;
				var centerPoint = esri.geometry.toScreenPoint(extent,Ext.getBody().getWidth(), Ext.getBody().getHeight()-67, popCtl.point);
				xPx = centerPoint.x-popCtl.getWidth()/2+5;
				yPx = centerPoint.y-popCtl.getHeight()+63;
				// 이미지 사이즈 절반만큼 offset
				xPx += 11;
				yPx += 11;
				
				popCtl.setX(xPx);
				popCtl.setY(yPx);
			}
		},
		
		closePopSiteInfo: function(){
			var popCtl = Ext.getCmp("popSiteInfo");
			
			if(popCtl != undefined){
				popCtl.close();
			}
		}
		
	};
})();
	