// SE USA EL Twilio PARA EL CORREO ELECTRONICO
// https://login.sendgrid.com/
// QBRP1XCS62P1DBMQ83WWJBTE - CODIGO DE ACCESO A LA CUENTA
// correo de trabajo personal utilizado para esto
// https://www.youtube.com/watch?v=qFDgH6dHRA4
// https://app.sendgrid.com/settings/sender_auth

// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const nodemailer = require("nodemailer");
const path = require("path");
const express = require("express"); // Esto es Express.js
const sgMail = require("@sendgrid/mail"); // Esto es SendGrid
// const toastr = require("express-toastr");
const session = require("express-session"); // Para manejar sesiones, requerido por express-flash
// const flash = require("connect-flash"); // Para manejar los mensajes flash

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Reemplaza con tu API Key de SendGrid

const app = express();

// Configurar el uso de sesiones y flash
app.use(
  session({
    secret: SENDGRID_API_KEY, // Cambia a una clave secreta fuerte
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(flash()); // Habilitar el uso de flash
// app.use(toastr()); // Habilitar toastr

// Middleware para manejar datos de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Servir los archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Ruta para manejar el formulario de contacto
app.post("/enviar-formulario", (req, res) => {
  const { nombre, apellido, correo, telefono, mensaje } = req.body;

  console.log("Correo recibido:", correo); // Verifica si el correo está llegando correctamente

  if (!correo) {
    return res.status(400).send("Correo no recibido.");
  }

  // Aquí usamos el correo del usuario como destinatario
  const msg = {
    to: correo, // El destinatario es el correo ingresado por el usuario
    from: "brayanjpp.code@gmail.com", // Remitente verificado
    subject: `Mensaje de ${nombre} ${apellido}`,
    text: `Has recibido un mensaje de ${nombre} ${apellido}\n\nCorreo: ${correo}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`,
    html: `<p>Has recibido un mensaje de <strong>${nombre} ${apellido}</strong></p>
           <p>Correo: ${correo}</p>
           <p>Teléfono: ${telefono}</p>
           <p>Mensaje:</p>
           <p>${mensaje}</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send("Correo enviado correctamente");
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      res.status(500).send("Error al enviar el correo");
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// https://www.youtube.com/watch?v=L46FwfVTRE0
// Usando el otro metodo con este video
