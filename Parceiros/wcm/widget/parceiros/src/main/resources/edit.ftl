<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

<div class="bootstrap wcm-widget-class super-widget"
	id="conveniosObj_${instanceId}"
    data-params="conveniosObj.instance({instanceId:${instanceId}, option_unidade:'${option_unidade!''}', widgetURI: '${widgetURI}', mode:'edit', dataset: '${dataset!''}'})">

	<table class="table">
	  	<tr>
			<th>Exibição:</th>
			<td>
				<select id="opcao_exibicao" name="opcao_exibicao" class="form-control" data-opcao-exibicao >
					<option value="Home"   				<#if option_exib! == 'Home'>			selected</#if> >Home</option>
					<option value="comunidade-local"	<#if option_exib! == 'comunidade-local'>selected</#if> >Comunidade Local</option>
				</select> 
			</td>
		</tr>
		<tr id="option-unidade-tr">
			<th>Unidade:</th>
			<td>
				<select id="option_unidade" class="form-control">
				</select>
				<!-- 
				<select id="option_unidade2">
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
				</select>
				 --> 
			</td>
	  	</tr>
	  	<tr>
			<th>Dataset:</th>
			<td>
				<input type="text" id="opcao_dataset" name="opcao_dataset" value="${dataset!''}" class="form-control" /> 
			</td>
		</tr>
	  	<tr>
			<td colspan="2">
				<button type="button" name="btIncluir" id="btIncluir" value="Salvar" class="btn btn-primary" data-bt-save>Salvar</button>
			</td>
		</tr>
	</table>
</div>
