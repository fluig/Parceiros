<script src="/parceiros/resources/js/vcXMLRPC.js"></script>

<div class="bootstrap wcm-widget-class super-widget"
	id="conveniosObj_${instanceId}"
    data-params="conveniosObj.instance({instanceId:${instanceId}, option_unidade:'${option_unidade!''}', widgetURI: '${widgetURI}', mode:'view', dataset: '${dataset!''}' } )">
    
    <div id="convenio-container">
	    <h4 id="convenios-titulo" data-convenios-titulo>Parcerias</h4>
		
		<div id="campos-pesquisa-container">
			<div id="campo-abrangencia" class="campo-pesquisa">
				<label  class="campo-pesquisa-label">Abrangência:</label>
				<select id="abrangencia-convenio" class="form-control" data-campo-abrangencia>
				</select>
				<!-- 
				<select id="abrangencia-convenio2" class="form-control" data-campo-abrangencia>
					<option value="BELO HORIZONTE">BELO HORIZONTE</option>
					<option value="BRASÍLIA">BRASÍLIA</option>
					<option value="CIANORTE">CIANORTE</option>
					<option value="CURITIBA">CURITIBA</option>
					<option value="GOIÂNIA">GOIÂNIA</option>
					<option value="JOINVILLE">JOINVILLE</option>
					<option value="MACAÉ">MACAÉ</option>
					<option value="PORTO ALEGRE">PORTO ALEGRE</option>
					<option value="RECIFE">RECIFE</option>
					<option value="RIO DE JANEIRO">RIO DE JANEIRO</option>
					<option value="SÃO PAULO">SÃO PAULO</option>
					<option value="QUERÉTARO - MÉXICO">QUERÉTARO – MÉXICO</option>
					<option value="DF - MÉXICO">DF – MÉXICO</option>
					<option value="ARGENTINA">UNIDADES ARGENTINA</option>
					<option value="MÉXICO">UNIDADES MÉXICO</option>
					<option value="BRASIL">UNIDADES BRASIL</option>
					<option value="TODOS" selected>TODAS UNIDADES</option>
				</select>
				 -->
			</div>
			
			<div class="campo-pesquisa">
				<label  class="campo-pesquisa-label">Categoria:</label>
				<select id="categoria-convenio" name="categoria" class="form-control" data-campo-categoria>
				</select>
				<!-- 
				<select id="categoria-convenio" name="categoria" class="form-control" data-campo-categoria>
					<option value="ACADEMIA">ACADEMIA</option>
					<option value="ATACADISTA">ATACADISTA</option>
					<option value="AUTO PEÇAS">AUTO PEÇAS</option>
					<option value="CALÇADOS">CALÇADOS</option>
					<option value="CASA DE CÂMBIO">CASA DE CÂMBIO</option>
					<option value="COMÉRCIO">COMÉRCIO</option>
					<option value="EDITORA">EDITORA</option>
					<option value="ELETROELETRÔNICOS">ELETROELETRÔNICOS</option>
					<option value="ELETRÔNICOS">ELETRÔNICOS</option>
					<option value="ENTRETENIMENTO">ENTRETENIMENTO</option>
					<option value="ESCOLA DE EDUCAÇÃO INFANTIL">ESCOLA DE EDUCAÇÃO INFANTIL</option>
					<option value="ESCOLA DE IDIOMAS">ESCOLA DE IDIOMAS</option>
					<option value="ESCOLA/CURSOS">ESCOLA/CURSOS</option>
					<option value="ESTÉTICA E BELEZA">ESTÉTICA E BELEZA</option>
					<option value="FACULDADE/UNIVERSIDADE">FACULDADE/UNIVERSIDADE</option>
					<option value="LOCAÇÃO DE VEÍCULOS">LOCAÇÃO DE VEÍCULOS</option>
					<option value="MÓVEIS E DECORAÇÃO">MÓVEIS E DECORAÇÃO</option>
					<option value="POSTO DE GASOLINA">POSTO DE GASOLINA</option>
					<option value="RESTAURANTE">RESTAURANTE</option>
					<option value="SALÃO DE BELEZA">SALÃO DE BELEZA</option>
					<option value="SAÚDE E ESTÉTICA">SAÚDE E ESTÉTICA</option>
					<option value="SEGURADORA">SEGURADORA</option>
					<option value="SERVIÇO">SERVIÇO</option>
					<option value="SUPERMERCADO">SUPERMERCADO</option>
					<option value="VESTUÁRIO/MODA">VESTUÁRIO/MODA</option>
					<option value="TODOS" selected>TODAS CATEGORIAS</option>					
				</select>
				-->
			</div>
			
			<div class="campo-pesquisa margin-elemento-pesquisa">
				<label class="campo-pesquisa-label">Parceiro:</label>
				<div class="input-group">
			      <input type="text" class="form-control" name="data-pesquisa" id="data-pesquisa" data-pesquisa>
			      <span class="input-group-btn">
			        <button type="button" class="btn btn-default" data-btnPesquisa>
				      	<span class="glyphicon glyphicon-search"></span>
					</button>
			      </span>
			    </div>
		    </div>
		    
		    <div id="gif-carrega-dados" class="margin-elemento-pesquisa">
			   <img src="${widgetURI}/resources/images/spiffygif_48x48.gif" alt="carregando"> 
			</div>
		    
			<div id="conveniosGrid-container" class="margin-elemento-pesquisa">
			    <table border="0" cellpadding="2" cellspacing="2" id="conveniosGrid">
			        <tbody>
			        </tbody>
			    </table>
		    </div>
		    
	    </div>
	</div>
</div>
