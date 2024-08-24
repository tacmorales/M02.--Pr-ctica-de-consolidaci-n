document.getElementById("contact-form").noValidate = true;

const EXPRESION_REGULAR_CORREO = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

const EXPRESION_REGULAR_FONO = /^[0-9\+\(\)\s-]+$/g;

const TIPOS_DE_ESTADO_BASE = {
	vacio: "Vacio",
	rellenado: "Rellenado"
}

const TIPOS_DE_ERRORES = {
	vacio: "ErrorVacio",
	formato: "ErrorFormato"
}

const TEXTO_LABELS = {
	nombreVacio: "Ingresa tu nombre",
	correoVacio: "Ingresa tu correo",
	fonoVacio: "Ingresa tu teléfono (opcional)",
	mensajeVacio: "Cuéntame",
	nombreRellenado: "Tu nombre",
	correoRellenado: "Tu correo",
	fonoRellenado: "Tu teléfono",
	mensajeRellenado: "Tu mensaje",
	nombreErrorVacio: "Favor indique su nombre. No puede ser vacio.",
	correoErrorVacio: "Favor indique su correo. No puede ser vacio.",
	mensajeErrorVacio: "Favor redacte su mensaje. No puede ser vacio.",
	correoErrorFormato: "El correo indicado no es válido.",
	fonoErrorFormato: "El teléfono indicado no es válido."
}

const IDS = {
	nombre: "#nombre",
	correo: "#correo",
	fono: "#fono",
	mensaje: "#mensaje",
	nombreLabel: "#label-nombre",
	correoLabel: "#label-correo",
	fonoLabel: "#label-fono",
	mensajeLabel: "#label-mensaje"
}

$(function () {
	/**
	 * Revisa si es vacio y si cumple con la expresion regular para correo. Devuelve un string con mensaje de error si no cumple. Devuelve boolean true si si lo cumple.
	 * @param {string} correo 
	 * @returns {string|boolean}
	 */
	function verificar(textoAVerificar, regex){
		if (!textoAVerificar.match(regex))
			return false
		else
			return true
	}

	function fijarEstadoBaseEnInput(input, tipoEstadoBase){
		$(IDS[`${input}Label`]).html(TEXTO_LABELS[`${input}${tipoEstadoBase}`])
		$(IDS[`${input}Label`]).removeClass("label-error");
		$(IDS[input]).removeClass("is-invalid");
	}

	function fijarErrorEnInput(input, tipoDeError){
		$(IDS[`${input}Label`]).html(TEXTO_LABELS[`${input}${tipoDeError}`]);
		$(IDS[`${input}Label`]).addClass("label-error");
		$(IDS[input]).addClass("is-invalid");
	}

	function limpiarFormulario() {
		$("#nombre, #correo, #mensaje, #fono").val("");
	}

	function sacudirInput(nombreId){
		setTimeout(() => {
			$(IDS[nombreId]).addClass("shake");
		}, 200);
		$(IDS[nombreId]).removeClass("shake");
	}

	/* Escucha cuando se pierde el foco del input. Si no pasa la validación, fija el estilo visual de "error en el input". */
	$("input, textarea").on("focusout", function() {
		const id = $(this).attr("id");
		const nombre = String($("#nombre").val()).trim();
		const correo = String($("#correo").val()).trim().toLowerCase();
		const fono = String($("#fono").val()).trim();
		const mensaje = String($("#mensaje").val()).trim();
		switch (id) {
			case "nombre":
				if(nombre === "") 
					fijarEstadoBaseEnInput("nombre", TIPOS_DE_ESTADO_BASE.vacio);
				else
					fijarEstadoBaseEnInput("nombre", TIPOS_DE_ESTADO_BASE.rellenado);
				break;
			case "correo":
				if(correo === "") 
					fijarEstadoBaseEnInput("correo", TIPOS_DE_ESTADO_BASE.vacio);
				else if ( verificar(correo, EXPRESION_REGULAR_CORREO) )
					fijarEstadoBaseEnInput("correo", TIPOS_DE_ESTADO_BASE.rellenado)
				else
					fijarErrorEnInput("correo", TIPOS_DE_ERRORES.formato)
				break;
			case "mensaje":
				if(mensaje === "")
					fijarEstadoBaseEnInput("mensaje", TIPOS_DE_ESTADO_BASE.vacio) ;
				else
					fijarEstadoBaseEnInput("mensaje", TIPOS_DE_ESTADO_BASE.rellenado)
				break;
			case "fono":
				if(fono === "") 
					fijarEstadoBaseEnInput("fono", TIPOS_DE_ESTADO_BASE.vacio);
				else if(verificar(fono, EXPRESION_REGULAR_FONO))
					fijarEstadoBaseEnInput("fono", TIPOS_DE_ESTADO_BASE.rellenado);
				else
					fijarErrorEnInput("fono", TIPOS_DE_ERRORES.formato);
				break;
			default:
				break;
		} 
	});

	/* Escucha cuando en un input comienza a tipearse, para limpiar el error -usuario corrigiendo o ingresando por primera vez-*/
	$("input, textarea").on("input", function (evento) {
		const id = $(this).attr("id");
		switch (id) {
			case "nombre":
				fijarEstadoBaseEnInput("nombre", TIPOS_DE_ESTADO_BASE.rellenado);
				break;
			case "correo":
				fijarEstadoBaseEnInput("correo", TIPOS_DE_ESTADO_BASE.rellenado);
				break;
			case "fono":
				fijarEstadoBaseEnInput("fono", TIPOS_DE_ESTADO_BASE.rellenado);
				break;
			case "mensaje":
				fijarEstadoBaseEnInput("mensaje", TIPOS_DE_ESTADO_BASE.rellenado);
				break;
			default:
				break;
		}
	});

	/* Escucha cuando el formulario intenta enviarse. Si hay campos con errores, no envía la información fija el error correspondiente y coloca una clase css que provoca que se sacudan*/
	$("#contact-form").on("submit", function (evento) {
		evento.preventDefault();
		
		const nombre = String($("#nombre").val()).trim();
		const correo = String($("#correo").val()).trim().toLowerCase();
		const fono = String($("#fono").val()).trim();
		const mensaje = String($("#mensaje").val()).trim();
		let formularioAprobadoParaEnvio = true;

		if(nombre === ""){
			fijarErrorEnInput("nombre", TIPOS_DE_ERRORES.vacio);
			sacudirInput("nombre");
			formularioAprobadoParaEnvio = false;
		}

		if(correo === ""){
			fijarErrorEnInput("correo", TIPOS_DE_ERRORES.vacio);
			sacudirInput("correo");
			formularioAprobadoParaEnvio = false;
		}
		else if( verificar(correo, EXPRESION_REGULAR_CORREO) ){
			fijarEstadoBaseEnInput("correo", TIPOS_DE_ESTADO_BASE.rellenado);
		}
		else{
			fijarErrorEnInput("correo", TIPOS_DE_ERRORES.formato)
			sacudirInput("correo");
			formularioAprobadoParaEnvio = false;
		}

		if(fono === "") 
			fijarEstadoBaseEnInput("fono", TIPOS_DE_ESTADO_BASE.vacio);
		else if(verificar(fono, EXPRESION_REGULAR_FONO))
			fijarEstadoBaseEnInput("fono", TIPOS_DE_ESTADO_BASE.rellenado);
		else{
			fijarErrorEnInput("fono", TIPOS_DE_ERRORES.formato);
			sacudirInput("fono");
			formularioAprobadoParaEnvio = false;
		}

		if(mensaje === ""){
			fijarErrorEnInput("mensaje", TIPOS_DE_ERRORES.vacio);
			sacudirInput("mensaje");
			formularioAprobadoParaEnvio = false;
		}

		if (!formularioAprobadoParaEnvio) {
			return console.log("Dato(s) ingresado(s) invalido(s)");
		}
		else{
			const resultado = window.confirm(`Por favor confirma tus datos:\nNombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${fono}\nMensaje: ${mensaje}`);
			if (resultado.valueOf()){
				limpiarFormulario()
				window.alert("Hola! He recibido tu información correctamente. Me contactaré contigo via e-mail o mensaje de texto en las próximas 24 horas. Esto es mentira. Esta web no envía nada a ningun correo. Si de verdad deseas comunicarte conmigo, hay un link a la dirección de mi correo al pie de página. Lo siento por el tiempo perdido.");
			}
			//aqui enviaría el formulario
		}
	});
});
