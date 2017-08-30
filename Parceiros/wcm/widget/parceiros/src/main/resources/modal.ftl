<#attempt>
	<!--  <form id="form">
		<div id="container">
			
		</div>
	</form>-->
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
	<div id="convenio-modal">
		<div id="cabecalho-convenio">
			
			<div id="cabecalho-convenio-tit">
				<h1 id="conv-nome"></h1>
			</div>
			
			<div id="cabecalho-convenio-sub">
				<ul>
					<li>
						<label>Categoria:</label>
						<span id="conv-categoria"></span>
					</li>
					<li>
						<label>Abrangência:</label>
						<span id="conv-abrangencia"></span>		
					</li>
				</ul>
			</div>
				
		</div>
		
		<div id="conteudo-convenio">
			<div id="coluna1-convenio">
				<div id="contato-convenio">
					<span class="glyphicon glyphicon-phone"></span>
					<ul>
						<li>
							<label>Contato: </label>
							<span id="conv-contato"></span>
						</li> 
						<li>
							<label>Telefone:</label>
							<span id="conv-telefone"></span>
						</li>
						<li>
							<label>Celular: </label>
							<span id="conv-celular"></span>
						</li>
						<li>
							<label>Email:   </label>
							<span id="conv-email"></span>
						</li>
						<li>
							<label>Site:    </label>
							<a href="#" id="conv-site" target="_blank"></a>
						</li>
					</ul>
				</div>
				
				
				<div id="contrato-convenio">
					<ul>
						<li>
							<label>Contrato:</label>
							<span id="conv-contrato"></span>
						</li> 
						<li>
							<label>Vigência:</label>
							<span id="conv-vigencia"></span>
						</li>
					</ul>
				</div>
			</div>
			
			<div id="coluna2-convenio">
				<div id="beneficio-convenio">
					<ul>
						<li>
							<label>Benefício:</label>
							<span id="conv-beneficio"></span>
						</li>  
					</ul>
				</div>
			
				<div id="info-convenio">
					<ul>
						<li>
							<label>Observações:</label>
							<span id="conv-observacoes"></span>
						</li>
					</ul>
				</div>
			</div>
			<div id="localizacao-convenio">
				<ul>
					<li>
						<label>Endereço:</label>
						<span id="conv-endereco"></span>
					</li> 
				</ul>
				<div id="mapa-container"></div>
			</div>	
		</div>
	</div>
	
	
		
	
<#recover>
	<#include "/social_error.ftl">
</#attempt>
