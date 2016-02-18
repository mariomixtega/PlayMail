
	var Utils = {

		//Convierte un numero en formato 24 hrs a un formato de 12 horas
		convertToHour : function(i){
		    var tipo = "A.M.";
			if(i > 12) { tipo = "P.M."; i -=12; }

			return i + ':00 ' + tipo;
		},

		//Renderiza una plantilla de handlebars
		Render : function(selector, templateId, context){
			var source   = $(templateId).html();
			var template = Handlebars.compile(source);
			var html    = template(context);
			$(selector).html(html);
		}
	}
