var conveniosObj = SuperWidget.extend({
	instanceId: null,
	sociableId: null,
	widgetURI : null,
	objUnidades: {
		/*
		"CIANORTE"				: "BRASIL",
		"CURITIBA"				: "BRASIL",	
		"BELO HORIZONTE"		: "BRASIL",
		"BRASÍLIA"				: "BRASIL",	
		"GOIÂNIA"				: "BRASIL",		
		"JOINVILLE"				: "BRASIL",
		"MACAÉ"					: "BRASIL",		
		"PORTO ALEGRE"  		: "BRASIL",
		"RECIFE"				: "BRASIL",			
		"RIO DE JANEIRO"		: "BRASIL",
		"SÃO PAULO"				: "BRASIL",	
		"QUERÉTARO - MÉXICO"	: "MÉXICO",
		"DF - MÉXICO"			: "MÉXICO",
		"ARGENTINA"			    : "ARGENTINA"
		*/
	 },
	arrayPaises:[ /* "BRASIL","ARGENTINA","MÉXICO" */],
	criterioDePesquisa: null,
	arrayPesquisa: new Array(),
	init: function() {
		var that = this;
		
		if (that.mode == "view") {
			/* Carrega dinamicamente as unidades/abrangencia a partir de um dataset */
			var dataset_abrang = DatasetFactory.getDataset('listar_abrangencia', null, null, null);
			var $select_Abrang = $('#abrangencia-convenio', this.DOM);
			
			$.each(dataset_abrang.values, function(key, text) {
			    var option = new Option(text["abrangencia"], text["abrangencia"]);
			    $select_Abrang.append($(option));
			});
			
			$select_Abrang.append("<option value='TODOS' selected>TODAS UNIDADES</option>");
			
			/* Carrega dinamicamente as categorias a partir de um dataset */
			var dataset_categ = DatasetFactory.getDataset('listar_categorias', null, null, null);
			var $select_categ = $('#categoria-convenio', this.DOM);
			
			$.each(dataset_categ.values, function(key, text) {
			    var option = new Option(text["categoria"], text["categoria"]);
			    $select_categ.append($(option));
			});
			
			$select_categ.append("<option value='TODOS' selected>TODAS CATEGORIAS</option>");
		}
		
		if (that.mode == "edit") {
			/* Carrega dinamicamente as unidades/abrangencia a partir de um dataset */
			var dataset_abrang = DatasetFactory.getDataset('listar_abrangencia', null, null, null);
			var $select_Unid = $('#option_unidade', this.DOM);
			
			$.each(dataset_abrang.values, function(key, text) {
			    var option = new Option(text["abrangencia"], text["abrangencia"]);
			    $select_Unid.append($(option));
			});
			
			$('option[value=' + that.option_unidade + ']', $select_Unid).attr('selected', 'selected');
		}

		$(".wcm_title_widget").hide();
		if(this.dataset == "") {
			this.dataset = "ds_parceiros";
		}
		
		if (this.option_unidade != "Home"){
			$("#campo-abrangencia").remove();
		}

		$('#data-pesquisa').autocomplete({
		    minLength: 0,
		    minChars: 0,
		    max: 12,
		    autoFill: true,
		    mustMatch: true,
		    scroll:true
		});

		$('#data-pesquisa').on('click', function(ev) {
			if(that.arrayPesquisa.length == 0 ){
				that.autoCompletar(that);
			}else {
				$(this).autocomplete("search", "");
			}
		});
		
		$("#data-pesquisa").val("TODOS parceiros");
		$("#abrangencia-convenio").val("TODOS");
		$("#categoria-convenio").val("TODOS");
    },
    
	bindings: {
		local: {
			'btnPesquisa': ['click_resultadoPesquisa'],
			'bt-save': ['click_paramsSave'],
			'click-tr': ['click_mostraModal'],
			'pesquisa':['keydown_resultadoPesquisa','focusout_valorFocusout','focus_valorFocus'],
    		'campo-abrangencia':['change_changeSelect'],
    		'campo-categoria'  :['change_changeSelect']
		}
	},
	
	paramsSave: function() {
		var args = {};
		
		args.option_exib = $('select[id="opcao_exibicao"]', this.DOM).val();
		args.option_unit = $('select[id="option_unidade"]', this.DOM).val();
		
		if($('#opcao_exibicao').val() == "comunidade-local") {
			args.option_unidade = $('select[id="option_unidade"]', this.DOM).val();
		}else {
			args.option_unidade = $('select[id="opcao_exibicao"]', this.DOM).val();
		}
		args.dataset = $('input[id="opcao_dataset"]', this.DOM).val();
		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async:false}, this.instanceId, args);
		if (result) {
			WCMC.messageInfo(result.message);
		} else {
			WCMC.messageError("${i18n.getTranslation('save.error')}");
		}
	},
	
	resultadoPesquisa: function(el, ev){
		if(ev.originalEvent['type'] == 'keydown' && ev.originalEvent['keyCode'] != 13){
			return true;
		}
		
		$( "#conveniosGrid-container" ).hide();
		$('#gif-carrega-dados').show();
		
		
		this.filtroPesquisa();
	},
	
	mostraModal: function(id) {
		var cfg = {
			url : this.widgetURI+ "/modal.ftl",
			width : 900,
			height : 540,
			maximized : false,
			title : "${i18n.getTranslation('application.title')}",
		};
		
		var dadosConvenio = '';
		
		conveniosObj.tela = WCMC.panel(cfg);
		conveniosObj.tela.disableButton("0");
		
		dadosConvenio = this.carregaDadosModal(id);
	},
	
	carregaDadosModal: function(idConvenio){
		var constraintActive = DatasetFactory.createConstraint("metadata#id", idConvenio , idConvenio, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	    var constraints = new Array(constraintActive, c2);
	    var DatasetConvenios = DatasetFactory.getDataset(this.dataset, null, constraints);
	    var linhaConvenio = '';
	    var args = {};
	    var endereco;
	    var urlIframe;
	    var abrangencia;
	    if (DatasetConvenios.values[0] != null) {
	    	
	    	$("#conv-nome").text((DatasetConvenios.values[0].nome == "")?"-":DatasetConvenios.values[0].nome);
	    	$("#conv-categoria").text((DatasetConvenios.values[0].categoria == "")?"-":DatasetConvenios.values[0].categoria);
	    	
	    	if(DatasetConvenios.values[0].abrangencia == "LOCAL"){
	    		abrangencia = DatasetConvenios.values[0].unidade; 
	    	}else {
	    		abrangencia = this.objUnidades[DatasetConvenios.values[0].unidade];
	    	}
	    	
	    	$("#conv-abrangencia").text((abrangencia == "")?"-":abrangencia);
	    	$("#conv-contato").text((DatasetConvenios.values[0].contato == "")?"-":DatasetConvenios.values[0].contato);
	    	$("#conv-telefone").text((DatasetConvenios.values[0].telefone == "")?"-":DatasetConvenios.values[0].telefone);
	    	$("#conv-contrato").text((DatasetConvenios.values[0].contrato == "")?"Não há": DatasetConvenios.values[0].contrato);
	    	$("#conv-vigencia").text((DatasetConvenios.values[0].vigencia == "")?"não há":DatasetConvenios.values[0].vigencia);
	    	$("#conv-celular").text((DatasetConvenios.values[0].celular == "")?"-":DatasetConvenios.values[0].celular);
	    	$("#conv-email").text((DatasetConvenios.values[0].email == "")?"-":DatasetConvenios.values[0].email);
	    	$("#conv-endereco").text(DatasetConvenios.values[0].endereco);
	    	if(DatasetConvenios.values[0].site == ""){
	    		$("#conv-site").text(" - ");
	    	}else {
	    		$("#conv-site").text( (DatasetConvenios.values[0].site.substring(0,3) == "www" || DatasetConvenios.values[0].site.substring(0,3) == "WWW" ? "http://"+DatasetConvenios.values[0].site : DatasetConvenios.values[0].site));
	    		$("#conv-site").attr('href',(DatasetConvenios.values[0].site.substring(0,3) == "www" || DatasetConvenios.values[0].site.substring(0,3) == "WWW" ? "http://"+DatasetConvenios.values[0].site : DatasetConvenios.values[0].site));
	    	}
	    	
	    	$("#conv-observacoes").text((DatasetConvenios.values[0].observacoes== "")?"não há":DatasetConvenios.values[0].observacoes);
	    	$("#conv-beneficio").text((DatasetConvenios.values[0].beneficio== "")?"-":DatasetConvenios.values[0].beneficio);
	    }
	    
	    endereco= ((DatasetConvenios.values[0].endereco== "")? "TOTVS - Avenida Braz Leme, Casa Verde, São Paulo" : DatasetConvenios.values[0].endereco);
		urlIframe = "<iframe id='id-iframe' src='"+this.widgetURI+"/resources/css/iframe.html?address="+endereco+"'></iframe>";
		$('#mapa-container').append(urlIframe);
		
	},
	
    autoCompletar: function(that){
		var constraints = [
			                   DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
			                   DatasetFactory.createConstraint("ativo", "Sim", "Sim", ConstraintType.MUST),
		                  ];
		
		$("#data-pesquisa").val('Carregando...');
		var DatasetConvenios = DatasetFactory.getDatasetASync(that.dataset, null, constraints,  null, this.processaPesquisaAutoCompletar, that);
    },
    
    processaPesquisaAutoCompletar: function(DatasetConvenios, textStatus, jqXHR, that){
		var i7 = 0;
	    var convenio;
	    var valorCategoria = $("#categoria-convenio").val();
	    var valorAbrangencia;
		
    	if(that.option_unidade != "Home"){
			valorAbrangencia= that.option_unidade;
		}else {
			valorAbrangencia = $("#abrangencia-convenio").val();
		}
	    
	    if(valorAbrangencia != "TODOS"){
		    while(DatasetConvenios.values[i7] != null) {
		    	convenio = DatasetConvenios.values[i7];
		    	
		    	if (valorCategoria != "TODOS" && valorCategoria != convenio.categoria) {
					i7++;
					continue;
				}
		    	/*valorAbrangencia diferente de um dos países: Brasil, Argentina e México*/
		    	if(that.arrayPaises.indexOf(valorAbrangencia) == -1){
		    		if( (convenio.unidade) == valorAbrangencia || (convenio.abrangencia) ==  "NACIONAL" && convenio.pais == that.objUnidades[valorAbrangencia] ) {
		    			that.arrayPesquisa.push(convenio.nome);
		    		}
		    	}else {
		    		if(convenio.pais == valorAbrangencia ) {
		    			that.arrayPesquisa.push(convenio.nome);
		    		}
		    	}
		    	i7++;
		    }
	    }else {
			while(DatasetConvenios.values[i7] != null) {
				convenio = DatasetConvenios.values[i7];
				
				if (valorCategoria != "TODOS" && valorCategoria != convenio.categoria) {
					i7++;
					continue;
				}
				
				that.arrayPesquisa.push(convenio.nome);
				i7++;
			}
	    }
	    
	    $("#data-pesquisa").val('');
		var source = that.arrayPesquisa;
		$("#data-pesquisa").autocomplete( "option", "source", source);
	    $("#data-pesquisa").autocomplete("search", "");
    },
    
    filtroPesquisa: function(){
		var constraints = [
	                       	DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
	                       	DatasetFactory.createConstraint("ativo", "Sim", "Sim", ConstraintType.MUST)
	                      ];
		
		DatasetFactory.getDatasetASync(this.dataset, null, constraints, null, this.processaPesquisa, this);
    },

    processaPesquisa: function(DatasetConvenios, textStatus, jqXHR, that){
    	var i7 = 0;
    	var dadosArray;
    	var resultadoPesquisa = new Array();
    	var valorAbrangencia;
    	var convenio;
		var valorDePesquisa = $("#data-pesquisa").val();
		var valorCategoria = $("#categoria-convenio").val();
		var criterioDePesquisa = ( ($("#data-pesquisa").val() == "TODOS parceiros") ? "" : "nome");
		
		if(that.option_unidade != "Home"){
			/*Caso não esteja na home, considera a unidade configurada (não é exibido o campo abrangência)*/
			valorAbrangencia= that.option_unidade;
		}else {
			/*unidade = Home, widget exibido na home, e o campo de abrangência é usado para filtro.*/
			valorAbrangencia = $("#abrangencia-convenio").val();
		}
    	
		if(valorAbrangencia != "TODOS"){
	    	while(DatasetConvenios.values[i7] != null) {
				convenio = DatasetConvenios.values[i7];
				if ((criterioDePesquisa && (convenio[criterioDePesquisa].search(valorDePesquisa) == -1  && convenio[criterioDePesquisa].search(valorDePesquisa.toUpperCase())== -1)
					|| (valorCategoria != "TODOS" && valorCategoria != convenio.categoria))) {
					i7++;
					continue;
				}
	    		dadosArray = [convenio['metadata#id'], convenio.nome, convenio.categoria];
	    		
	    		/*valorAbrangencia diferente de um dos países: Brasil, Argentina e México*/
				if(that.arrayPaises.indexOf(valorAbrangencia) == -1){ //unidade local
		    		if( (convenio.unidade) == valorAbrangencia || (convenio.abrangencia) == "NACIONAL" && convenio.pais == that.objUnidades[valorAbrangencia] ) {
				    	resultadoPesquisa.push(dadosArray);
		    		}
				}else { /*abrangência = nível país*/
					if(convenio.pais == valorAbrangencia ) {
						resultadoPesquisa.push(dadosArray);
					}
				}
		    	i7++;	
	    	}
		}else {
			while(DatasetConvenios.values[i7] != null) {
				convenio = DatasetConvenios.values[i7];
				if ((criterioDePesquisa && (convenio[criterioDePesquisa].search(valorDePesquisa) == -1  && convenio[criterioDePesquisa].search(valorDePesquisa.toUpperCase())== -1)|| (valorCategoria != "TODOS" && valorCategoria != convenio.categoria))) {
					i7++;
					continue;
				}
				dadosArray = [convenio['metadata#id'], convenio.nome, convenio.categoria];
				resultadoPesquisa.push(dadosArray);
				i7++;
			}
		}

		that.showResultadoPesquisa(resultadoPesquisa, that);
    },

    showResultadoPesquisa: function(resultadoPesquisa, that){
	    $("#conveniosGrid").jqGrid("GridUnload");
	    if (resultadoPesquisa.length > 0) {
	        /*var that = that;*/
		    var myGrid =  $('#conveniosGrid').jqGrid({
		    	onSelectRow: function(id){
		    		that.mostraModal(id);
		    	},
		    	rowNum:5,
		    	toppager: true,
		    	rowList:[5,10,15],
		    	datatype: "local",
		        height: null,
		        width: null,
		        shrinkToFit: false,
		        /*viewrecords: true,*/
		        colNames: [' ','Nome', 'Categoria'],
		        colModel: [
					{
						sortable: false,
					    /*index: 'id',
					    name: 'id',*/
					    align: 'center',
					    width: 30
					    /*sorttype: "text"*/
					    /*hidden: true*/
				    }, 
	           
		            {
					    name: 'Nome',
			            index: 'Nome',
			            sorttype: "text",
			            width: 185
		            }, 
		            
		            {
		            	name: 'Categoria',
			            index: 'Categoria',
			            sorttype: "text",
			            width: 285
		            }
		       ],
		    });
		    
		    var names = ['id','Nome', 'Categoria'];
		    var mydata = [];
	
		    for (var i = 0; i < resultadoPesquisa.length; i++) {
		        mydata[i] = {};
		        for (var j = 0; j < resultadoPesquisa[i].length; j++) {
		            mydata[i][names[j]] = resultadoPesquisa[i][j];
		        }
		    }
		    
		    myGrid.setGridParam({data: mydata}).trigger("reloadGrid");
		    
		    if ($("#conveniosGrid-container #convenio-mensagem").length > 0){
		    	$("#convenio-mensagem").remove();
		    }
		    
	    }else if ($("#convenio-mensagem").length == 0){
	    	$( "#conveniosGrid-container" ).append( "<p id='convenio-mensagem'>Não há resultados para a pesquisa.</p>" );
	    }
	    
	    $('#gif-carrega-dados').hide();
	    $( "#conveniosGrid-container" ).slideDown( "slow" );
    },
    
    valorFocus: function(el){
    	if($(el).val() == 'TODOS parceiros') {
    		$(el).val('');
    	}
    },
    valorFocusout: function(el){
    	if($(el).val() == '') {
    		$(el).val("TODOS parceiros");
    	}
    },
    
    changeSelect: function(){
    	this.arrayPesquisa = [];
    }
    
});