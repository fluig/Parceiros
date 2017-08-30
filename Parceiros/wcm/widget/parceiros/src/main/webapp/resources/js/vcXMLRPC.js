//Legado da vcXMLRPC.js

// Definição de tipos de dados utilizados para manipulação de datasets
var ConstraintType = {};
ConstraintType.MUST = 1;
ConstraintType.SHOULD = 2;
ConstraintType.MUST_NOT = 3;

//Definição da variavéis do processo
var parentOBJ = {}
var WKDef = WKDefField = "";
var WKVersDef = WKVersDefField = "";
var WKNumProces = WKNumProcesField = "";
var WKNumState = WKNumStateField = "";

if(parent.ECM === undefined){
	parentOBJ = window.opener.parent;
}else{
	parentOBJ = parent;
}

if(parentOBJ.ECM.workflowView && parentOBJ.ECM.workflowView.processDefinition){
	WKDef = WKDefField = parentOBJ.ECM.workflowView.processId;
	WKVersDef = WKVersDefField = parentOBJ.ECM.workflowView.version;
	WKNumProces = WKNumProcesField = parentOBJ.ECM.workflowView.processDefinition.processInstanceId;
	WKNumState = WKNumStateField = parentOBJ.ECM.workflowView.processDefinition.currentMovto; //corrigir atividade e não movimento
}

var simpleAjaxAPI = {};
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && RegExp.$1 < 10 && parent.ECM === undefined) {
	//Se for menor que IE9 é necessária a implentação nativa para ajax.
	simpleAjaxAPI = (function(){
		function request(method, config) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, config.url, config.async);
			xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
			xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var response =  JSON.parse(xhr.responseText);
					if (xhr.status == 200) {
						config.success(response)
					} else if (config.error) {
						config.error();
					} else {
						parentOBJ.WCMAPI.failHandler(xhr);
					}
				}
			}
			
			if (method == "POST") {
				xhr.send(JSON.stringify(config.data));
			} else {
				xhr.send();
			}
		};

		var simpleAjaxAPI = {};
		simpleAjaxAPI.Create = function(config) {
			request("POST", config);
		};

		simpleAjaxAPI.Read = function(config) {
			request("GET", config);
		};
		
		return simpleAjaxAPI;
	})();
	
} else {
	simpleAjaxAPI.Create = parentOBJ.WCMAPI.Create;
	simpleAjaxAPI.Read = parentOBJ.WCMAPI.Read;
}

//Definição de funções de Dataset
var DatasetFactory = {}
DatasetFactory.getDataset = function(name, fields, constraints, order) {
	var data = {
		name:name,
		fields:fields,
		constraints:constraints,
		order:order
	};

	var result;
	simpleAjaxAPI.Create({
		url: parentOBJ.ECM.restUrl + "dataset/datasets/",
		data: data,
		async:false,
		success: function(data){
			result = data;
		}
	});
	return result;
}

DatasetFactory.getDatasetASync = function(name, fields, constraints, order, callback, widget) {
	var data = {
		"name": name,
		"fields": fields,
		"constraints": constraints,
		"order": order
	};

	var result;
	simpleAjaxAPI.Create({
		"url": parentOBJ.ECM.restUrl + "dataset/datasets/",
		"data": data,
		"async": true,
		"success": function(data, textStatus, jqXHR){
			callback(data, textStatus, jqXHR, widget);
		}
	});
}

DatasetFactory.createConstraint = function(field, initialValue, finalValue, type) {
	return new SearchConstraint(field, initialValue, finalValue, type);
}

DatasetFactory.getAvailableDatasets = function() {
	var result;
	simpleAjaxAPI.Read({
		url: parentOBJ.ECM.restUrl + "dataset/availableDatasets/",
		async:false,
		success: function(data){
			result = data;
		}
	});
	return result;
}

function SearchConstraint(field, initialValue, finalValue, type) {
    this._field = field;
	this._initialValue = (initialValue!=null)?initialValue:"___NULL___VALUE___";
	this._finalValue = (finalValue!=null)?finalValue:"___NULL___VALUE___";
	this._type = type;
}

function getDatasetValues(datasetId, filter){
	if(filter == null){
		filter={};
	}else if(typeof(filter) != "object"){
		parentOBJ.WCMC.messageWarn("Filtro Invalido" + ".");
	}

	var data = {
		datasetId:datasetId,
		filter:filter
	};

	if(typeof(datasetId) == "number"){
		var url = parentOBJ.ECM.restUrl + "dataset/cardDatasetValues/";
	}else{
		var url = parentOBJ.ECM.restUrl + "dataset/standardDatasetValues/";
	}

	var result;
	simpleAjaxAPI.Create({
		url: url,
		data: data,
		async:false,
		success: function(data){
			result = data;
		}
	});
	return result;
}