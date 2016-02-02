package controllers;

import play.*;
import play.mvc.*;
import views.html.*;
import models.Ejemplos;

public class Ejemplo extends Controller{
	
	public Result index() {
		Ejemplos ejemplo = new Ejemplos("Ernesto");
		ejemplo.save();
		return ok(ejemplos.render(ejemplo));
	}
}
