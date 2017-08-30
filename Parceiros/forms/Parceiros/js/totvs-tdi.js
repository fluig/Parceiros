var theme = "smoothness";

var DEFAULT_CSS = new Array("/totvs/js/jqwidgets/styles/jqx.base.css", "/totvs/js/jqwidgets/styles/jqx.ui-<theme>.css",  "/totvs/js/jquery/jquery-ui-1.10.3/css/<theme>/jquery-ui-1.10.3.custom.css", "/totvs/css/totvs-tdi.css");
var LIST_JS = new Array("/totvs/js/jqwidgets/jqxcore.js", "/totvs/js/jqwidgets/jqxtabs.js", "/totvs/js/jquery/jquery-ui-1.10.3/jquery-ui.js", "/totvs/js/jquery/jquery.price_format.1.8.js", "/totvs/js/jquery/jquery.maskedinput.min.js");

var js_loaded = new Array();

$(function() {
	loadDefaults();
	setReadOnlyDisabledFields();
});

function loadDefaults() {
	for (var i=0;i<DEFAULT_CSS.length;i++) {
		var f = DEFAULT_CSS[i];
		f = f.replace("<theme>", theme);
		loadFile(f, "css");
	}
}

function loadJs(index, type) {
	var loaded = false;
	for (var i=0;i<js_loaded.length;i++) {
		var j = js_loaded[i];
		if (j == index) { loaded = true; }
	}
	if (!loaded) { 
		loadFile(LIST_JS[index], "js");
		js_loaded.push(index);
	}
}

function loadFile(file, type){
	var fileref = null;
	if (type == "js") {
		$.ajax({
            url: file,
            dataType: "script",
            async: false
        });
	} else if (type == "css"){
		fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", file);
	}
	if (fileref != null) {
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}

function setTitulo(titulo) {
	var html = "<table border='0' width='777'><tr><td align='left' width='100'>";
	html += "<a href='http://www.totvs.com.br' target='_blank'><img src='/totvs/images/company_logo.png' id='totvsLogo' alt='Totvs' title='Totvs' border='0' /></a>";
	html += "</td><td align='center'><h1>" + titulo + "</h1></td></tr></table>";
	$(html).prependTo($("body"));
}

//id = id da div para criação das tabs, size = tamanho maximo da aba 
function setTabsControl(id, size) {
	loadJs(0);
	loadJs(1);
	$("#" + id).jqxTabs({width: '98%', height: size, theme: theme, scrollable: true, scrollPosition: "both"});
}

//id = id do campo que será um datepicker
//formato = d – day of month (single digit where applicable)
//		    dd – day of month (two digits)
// 			m – month of year (single digit where applicable)
//			mm – month of year (two digits)
//			y – year (two digits)
//			yy – year (four digits)
//			D – short day name
//			DD – full day name
//			M – short month name
//			MM – long month name
function setData(id, formato, desabilitarAnterior, desabilitarPosterior) {
	loadJs(2);
	
	if (formato == undefined || formato == null || formato == "") { formato = "dd/mm/yy"; }
	
	$("#" + id).datepicker({
		showOn: "both",
		buttonImage: "/totvs/images/calendar.png",
		buttonImageOnly: true,
		changeMonth: true,
	    changeYear: true,
	    selectOtherMonths: true,
	    showOtherMonths: true,
	    showButtonPanel: true,
	    dateFormat: formato,
	    yearRange: "-70:+10"
	});	
	
	if (desabilitarAnterior) { $("#" + id).datepicker("option", "minDate", 0); }
	if (desabilitarPosterior) { $("#" + id).datepicker("option", "maxDate", 0); }
	
	$("#" + id).attr("class", "date");
	$("#" + id).attr("readonly", "readonly");
	$(".ui-datepicker-trigger").css("margin-bottom","-3px");	
	
}

//id = id do campo a ser aplicado, decimals = quantidade de casas decimais, negatives (true, false) = se vai permitir informar valores negativos 
function setNumero(id, decimals, negatives) {
	loadJs(3);
	$("#" + id).priceFormat({
		clearPrefix: true,
		prefix: '',
	    centsSeparator: ',',
	    thousandsSeparator: '.',
	    centsLimit: decimals,
	    allowNegative: negatives
	});
	$("#" + id).attr("class", "numeric");
}

// id = id do campo a ser aplicado, decimals = quantidade de casas decimais, negatives (true, false) = se vai permitir informar valores negativos 
function setMoeda(id, decimals, negatives) {
	loadJs(3);
	$("#" + id).priceFormat({
		prefix: "R$ ",
	    centsSeparator: ',',
	    thousandsSeparator: '.',
	    centsLimit: decimals,
	    allowNegative: negatives
	});
	$("#" + id).attr("class", "numeric");
}

function setPercentual(id, decimals, negatives) {
	loadJs(3);
	$("#" + id).priceFormat({
		clearPrefix: true,
		prefix: '',
		suffix: '%',
	    centsSeparator: ',',
	    thousandsSeparator: '.',
	    centsLimit: decimals,
	    allowNegative: negatives
	});
	$("#" + id).attr("class", "numeric");
}

function setRequired(id) {
	$("label[for=" + id + "]").attr("class", "required");
}
function setUnrequired(id) {
	$("label[for=" + id + "]").attr("class", "");
}

function setReadOnlyField(id) {
	var f = document.getElementById(id);
	if (f != null && f != undefined) {
		f.className = "readonly";
		f.readOnly = true;
	}
}
function setWriteField(id) {
	var f = document.getElementById(id);
	if (f != null && f != undefined) {
		f.className = "";
		f.readOnly = false;
	}
}

function setReadOnlyDisabledFields() {
	var i = document.getElementsByTagName("input");
	for (var cont=0;cont<i.length;cont++) {
		var f = i[cont];
		if (f.name.substring(0,1) == "_") {
			f.className = "readonly";
		}
	}
	var s = document.getElementsByTagName("select");
	for (var cont=0;cont<s.length;cont++) {
		var f = s[cont];
		if (f.name.substring(0,1) == "_") {
			f.className = "readonly";
		}
	}
	var t = document.getElementsByTagName("textarea");
	for (var cont=0;cont<t.length;cont++) {
		var f = t[cont];
		if (f.name.substring(0,1) == "_") {
			f.className = "readonly";
		}
	}
}

function setCep(id){
	loadJs(4);
	var c = $("#" + id).attr("class");
	$("#" + id).mask('99999-999');
	$("#" + id).attr("class", c + " cep");
}

function setTelefone(id){
	loadJs(4);
	$("#" + id).mask("(99) 9999-9999?9");
	$("#" + id).focusout(function(){
	    var phone, element;
	    element = $(this);
	    element.unmask();
	    phone = element.val().replace(/\D/g, '');
	    if(phone.length > 10) {
	        element.mask("(99) 99999-999?9");
	    } else {
	        element.mask("(99) 9999-9999?9");
	    }
	}).trigger('focusout');
	var c = $("#" + id).attr("class");
	$("#" + id).attr("class", c + " telefone");
}


function setCpf(id){
	loadJs(4);
	$("#" + id).mask('999.999.999-99', {reverse: true});
	var c = $("#" + id).attr("class");
	$("#" + id).attr("class", c + " cpf");
}

function setCnpj(id){
	loadJs(4);
	$("#" + id).mask("99.999.999/9999-99");
	var c = $("#" + id).attr("class");
	$("#" + id).attr("class", c + " cnpj");
}

function setHora(id){
	loadJs(4);
	$("#" + id).mask('99:99');
	var c = $("#" + id).attr("class");
	$("#" + id).attr("class", c + " hora");
}

function setHoraSegundo(id){
	loadJs(4);
	$("#" + id).mask('99:99:99');
}

function setRg(id) {
	loadJs(4);
	$("#" + id).mask("?99.999.999-9");	
	var c = $("#" + id).attr("class");
	$("#" + id).attr("class", c + " rg");
}

function getFloatValue(id) {
	var v = $("#" + id).val(); 
	var s = v.replace(/[^\d,-]/g, '');
	s = s.replace(",", ".");
	return parseFloat(s);
}

function getPosicaoFilho(id) {
	return parseInt(id.substring(id.indexOf("___") + 3));
}

function hideLoading() {
	$("#loadingTotvs").hide();
	$(".totvs-overlay").hide();
}

function showLoading(texto, onReady) {

	console.log("showLoading:" + texto + ":" + $("#divLoading").length);
	
	if ($("#divLoading").length == 0) {
		var html = '<div id="loadingTotvs">';
		html += '<div id="divLoading"  style="width: 250px; height: 60px; margin-right: auto; margin-left: auto; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; -webkit-box-shadow: black 0px 1px 10px; box-shadow: black 0px 1px 10px; position: relative;  top: 185px; background-color: rgb(233, 234, 240);">';
		html += '<div style="text-shadow: 1px 1px white;padding:10px;">' + texto + '</div>';
		html += '<img src="/portal/resources/images/rel_interstitial_loading.gif">';
		html += '</div>';
		html += '</div>';
		html += '<div class="totvs-overlay"></div>';
		$('body').append(html); 
	}
	
	$("#loadingTotvs").show();
	$(".totvs-overlay").show();
	
	setTimeout(onReady, 100);
	
	
}
