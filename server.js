require('dotenv').config(); // Carga las variables al inicio
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;
    console.log("email recibido")
    try {
        await transporter.sendMail({
            from: `"Servidor" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html
        });
        res.status(200).json({ message: 'Enviado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));