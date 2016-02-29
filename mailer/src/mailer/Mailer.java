package mailer;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

class EmailSenderService {
    private final Properties properties = new Properties();
    private String password;
    private Session session;
    
    private void init() {
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.port", 587);
        properties.put("mail.smtp.mail.sender", "mixtega@gmail.com");
        properties.put("mail.smtp.user", "gabitokarma@gmail.com");  // El usuario para autenticar
        properties.put("mail.smtp.auth", "true");

        session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(properties.getProperty("mail.smtp.user"), "PASSWORD");
            }
        });
    }
    
    // Para desactivar la protección de acceso a aplicaciones no oficiales es en este link
    // https://myaccount.google.com/security
    // Abajo hay una opción para desactivarlo.
    public boolean sendEmail() {
        init();
        boolean enviado = false;
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress((String) properties.get("mail.smtp.mail.sender")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress("gabitokarma@gmail.com"));
            //message.addRecipient(Message.RecipientType.TO, InternetAddress.Parse(To));
            message.setSubject("Test");
            message.setText("Message Body");
            
            Transport t = session.getTransport("smtp");
            t.connect((String) properties.get("mail.smtp.user"), "PASSWORD");
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            enviado = true;
        } catch(MessagingException me) {
            System.out.println(me.getMessage());
        }
        return enviado;
    }
}
public class Mailer {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        EmailSenderService mail = new EmailSenderService();
        if(mail.sendEmail()) {
            System.out.println("El correo fue enviado con exito!");
        }
        else {
            System.out.println("No se pudo enviar el correo!");
        }
    }
    
}
