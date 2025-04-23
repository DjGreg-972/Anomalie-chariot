
import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Erreur de traitement du formulaire" });
    }

    const { code, etat, commentaire } = fields;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attachments = [];
    if (files.photo) {
      const file = Array.isArray(files.photo) ? files.photo[0] : files.photo;
      attachments.push({
        filename: file.originalFilename,
        content: fs.createReadStream(file.filepath),
      });
    }

    const mailOptions = {
      from: `"Anomalie Chariot" <${process.env.SMTP_USER}>`,
      to: "djmoot972@gmail.com",
      subject: `Nouvelle anomalie - ${code}`,
      html: `
        <h2>Nouvelle anomalie détectée</h2>
        <p><strong>Code Chariot:</strong> ${code}</p>
        <p><strong>État:</strong> ${etat}</p>
        <p><strong>Commentaire:</strong> ${commentaire}</p>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email envoyé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'envoi de l'email", error });
    }
  });
}
