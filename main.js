 	function print() {
		
   	 	if (hasClass(sidebarDiv,'collapsed')) {
			sidebar.open();
		} else {
			sidebar.close();
		} 
		
		document.getElementById("img_map").innerHTML = "";
 		
		swal("Área para imprimir", "selecione a área que deseja na impressão", "info");

		//manter esse código antes de imprimir a busca, para deixar a base "invisível"   
		const valueOpacity = document.getElementById('opacity-input').value
		document.getElementById('opacity-input').value = 0.0
		const opacityInput = document.getElementById('opacity-input');
		const opacityOutput = document.getElementById('opacity-output');
		setOpacidadeBase();

		// Adiciona um evento de teclado para cancelar a seleção da área de impressão
		window.addEventListener('keydown', function(event) {
			if (event.key === 'Escape') {
				
				modal.parentNode.removeChild(modal);
				
				// manter esse código após imprimir a busca, para voltar a opacidade da base que estava antes
				document.getElementById('opacity-input').value = valueOpacity
				setOpacidadeBase(); 
			}
		}); 

	 	var element = document.getElementById('map');
		var modal = document.createElement('div');
		modal.style.position = 'fixed';
		modal.style.top = '0';
		modal.style.left = '0';
		modal.style.width = '100%';
		modal.style.height = '100%';
		modal.style.cursor = 'move';  

		document.body.appendChild(modal);

		var box = document.createElement('div');
		box.style.position = 'absolute';
		box.style.border = '1px dashed red';
		box.style.width = '700px'; 
		box.style.height = '500px';
		box.style.maxWidth = '700px'; 
		box.style.maxHeight = '500px';
		box.style.minWidth = '200px'; 
		box.style.minHeight = '200px'; 
		box.style.top = '25%';
		box.style.left = '25%';
		box.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

		modal.appendChild(box);

		//Arrastar e redimensionar o box usando jQuery UI
		$(box).draggable().resizable();

		var print_button_container = document.createElement('div');
		print_button_container.style.position = 'absolute';
		print_button_container.style.bottom = '-30px';
		print_button_container.style.left = '50%';
		print_button_container.style.transform = 'translate(-50%, 0)';

		var print_button = document.createElement('button');
		print_button.innerText = 'Imprimir';
		print_button.style.border = 'none';
		print_button.style.borderRadius = '4px';
		print_button.style.cursor = 'pointer';
		
		print_button.addEventListener('click', function() {
			html2canvas(element, {
				x: box.offsetLeft - element.offsetLeft,
				y: box.offsetTop - element.offsetTop,
				width: box.offsetWidth,
				height: box.offsetHeight
			}).then(function(canvas) {
				var img = new Image();
				img.onload = function() {
					var canvasResized = document.createElement('canvas');
					canvasResized.width = 700;
					canvasResized.height = 500;
					var ctx = canvasResized.getContext('2d');
					ctx.drawImage(img, 0, 0, 700, 500);
					var imgResized = document.createElement('img');
					imgResized.src = canvasResized.toDataURL();

					document.getElementById('img_map').appendChild(imgResized);

					swal("Print gerado com sucesso", "Clique no botão para imprimir os dados do lote pesquisado com o print ", "success"); // ALTERAR O TAMANHO DO ICON SUCCESS

 					if (hasClass(sidebarDiv,'collapsed')) {
						sidebar.open('search_sql');
					} 

					// manter esse código após imprimir a busca, para voltar a opacidade da base que estava antes
					document.getElementById('opacity-input').value = valueOpacity
					setOpacidadeBase(); 
				}

				img.src = canvas.toDataURL();

				//visibilidade do botão de imprimir atributos 
				document.getElementById("imprimir").style.display = "block";
				
			});
			modal.parentNode.removeChild(modal);
		});

		print_button_container.appendChild(print_button);
		
		box.appendChild(print_button_container);

		modal.addEventListener('mousedown', function(event) {
			event.preventDefault();
			modal.addEventListener('mousemove', handleMouseMove);
		});

		modal.addEventListener('mouseup', function(event) {
			event.preventDefault();
			modal.removeEventListener('mousemove', handleMouseMove);
		});

		function handleMouseMove(event) {
			event.preventDefault();
		}
	} 
