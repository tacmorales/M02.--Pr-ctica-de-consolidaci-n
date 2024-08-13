$(function () {
	
	/**
	 * Solo devuelvo los números en el string, como string
	 * @param {string} fono 
	 * @returns {string}
	 */
	function normalizarFono(fono) {
    let numerosEncontrados = fono.match(/\d+/g);
		if (!numerosEncontrados){ return ""}
    numerosEncontrados = numerosEncontrados.join("");
		return numerosEncontrados;
	}

	/**
	 * Devuelve el mismo string, pero cada palabra deja la primera letra en mayuscula y el resto en minuscula.
	 * @param {string} nombre 
	 * @returns {string}
	 */
	function nombrePropio(nombre){
		if (nombre === ""){ return ""}
		nombre = nombre.split(/[^a-zA-Z]+/i).filter(Boolean)
		let nombreNormalizado = nombre.map((nombre) => nombre[0].toUpperCase() + nombre.substring(1).toLowerCase())
		return nombreNormalizado.join(" ")
	}

	/**
	 * Revisa si es vacio y si cumple con la expresion regular para correo. Devuelve un string con mensaje de error si no cumple. Devuelve boolean true si si lo cumple.
	 * @param {string} correo 
	 * @returns {string|boolean}
	 */
	function verificarCorreo(correo){
		if (correo === ""){
			return "Favor ingrese un correo"
		}
		const expresionRegularParaCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (!correo.match(expresionRegularParaCorreo)){
			return "El correo ingresado no es valido"
		}
		return true
	}

	function limpiarErrorNombre() {
		$("#label-nombre").html("Nombre");
		$("#label-nombre").removeClass("label-error");
		$("#nombre").removeClass("is-invalid");
	}

	function limpiarErrorCorreo() {
		$("#label-correo").html("Correo");
		$("#label-correo").removeClass("label-error");
		$("#correo").removeClass("is-invalid");
	}

	function limpiarErrorMensaje() {
		$("#label-mensaje").html("Cuéntame");
		$("#label-mensaje").removeClass("label-error");
		$("#mensaje").removeClass("is-invalid");
	}

	function resetFono() {
		$("#label-fono").html("Teléfono");
	}

	function limpiarErrores() {
		limpiarErrorNombre();
		limpiarErrorCorreo();
		limpiarErrorMensaje();
	}

	function limpiarFormulario() {
		$("#nombre, #correo, #mensaje").val("");
	}

	function fijarErrorFormNombre(){
		$("#label-nombre").html("Favor indicar un nombre");
		$("#label-nombre").addClass("label-error");
		$("#nombre").addClass("is-invalid");
	}
	function fijarErrorFormCorreo(error){
		$("#label-correo").html(error);
		$("#label-correo").addClass("label-error");
		$("#correo").addClass("is-invalid");
	}
	function fijarErrorFormMensaje(){
		$("#label-mensaje").html("Favor redacte su mensaje");
		$("#label-mensaje").addClass("label-error");
		$("#mensaje").addClass("is-invalid");
	}

	$("#contact-form").on("submit", function (evento) {

		evento.preventDefault();

		limpiarErrores();

		const nombre = nombrePropio(String($("#nombre").val()).trim());
		const correo = String($("#correo").val()).trim().toLowerCase();
		const fono = normalizarFono(String($("#fono").val()));
		const mensaje = String($("#mensaje").val().trim());

		const nombreEsValido = !(nombre === "") ? true : fijarErrorFormNombre();
		const restuladoVerificacionCorreo = verificarCorreo(correo);
		const correoEsValido = restuladoVerificacionCorreo === true ? true : fijarErrorFormCorreo(restuladoVerificacionCorreo);
		const mensajeEsValido = !(mensaje === "") ? true : fijarErrorFormMensaje()

		const datosSonValidos = nombreEsValido && correoEsValido && mensajeEsValido;

		if (!datosSonValidos) {
			return console.log("Dato(s) ingresado(s) invalido(s)");
		}
		else{
			let mensajeExito
			if (fono === ""){
				mensajeExito = `Hola! ${nombre}, por favor revisa tus datos:\nTu correo es ${correo}\nNo proporcionaste teléfono\nTu mensaje comienza "${mensaje.substring(0,20)}\n¿Es correcto?`;
			} else{
				mensajeExito = `Hola! ${nombre}, por favor revisa tus datos:\nTu correo es ${correo}\nTu teléfono es ${fono}\nTu mensaje comienza "${mensaje.substring(0,20)}\n¿Es correcto?`;
			}
			if (window.confirm(mensajeExito)){
				$("#contact-form").trigger("submit");
			}
		}
	});

	$("#nombre, #correo, #mensaje, #fono").on("input", function (evento) {
		let id = $(this).attr("id");
		switch (id) {
			case "nombre":
				limpiarErrorNombre();
				break;
			case "correo":
				limpiarErrorCorreo();
				break;
			case "mensaje":
				limpiarErrorMensaje();
				break;
			case "fono":
				resetFono();
				break;
			default:
				break;
		}
	});
});