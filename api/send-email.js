import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur parsing formulaire:", err);
      return res.status(500).json({ message: "Erreur analyse formulaire" });
    }

    const { chariot, etat, commentaire } = fields;
    const photo = files.photo;

    let attachments = [];

    if (photo && photo.filepath) {
      attachments.push({
        filename: photo.originalFilename || "photo.jpg",
        content: fs.readFileSync(photo.filepath),
        contentType: photo.mimetype
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Anomalie Chariot" <${process.env.SMTP_USER}>`,
      to: "djmoot972@gmail.com",
      subject: `Nouvelle anomalie - Chariot ${chariot || "non précisé"}`,
      html: `
        <h2>Anomalie signalée</h2>
        <p><strong>Chariot :</strong> ${chariot || "-"}</p>
        <p><strong>État :</strong> ${etat || "-"}</p>
        <p><strong>Commentaire :</strong><br/>${commentaire || "(aucun)"}</p>
        <p>Photo : ${attachments.length > 0 ? "en pièce jointe" : "non fournie"}</p>
      `,
      attachments
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email envoyé avec succès" });
    } catch (err) {
      console.error("Erreur envoi email:", err);
      res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
    }
  });
}