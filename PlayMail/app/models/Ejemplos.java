package models;

import play.db.ebean.Model;
import javax.persistence.*;

@Entity
public class Ejemplos extends Model{
	@Id
	public Long id;
	public String texto;
	
	public Ejemplos (String texto) {
		this.texto = texto;
	}
}
