import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { chariot, etat, commentaire } = req.body;

  // À personnaliser avec tes vraies infos SMTP (Brevo, Mailgun...)
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
    to: "djmoot972@gmail.com", // adresse de réception
    subject: `Nouvelle anomalie - Chariot ${chariot || "non précisé"}`,
    html: `
      <h2>Anomalie signalée</h2>
      <p><strong>Chariot :</strong> ${chariot || "-"}</p>
      <p><strong>État :</strong> ${etat || "-"}</p>
      <p><strong>Commentaire :</strong><br/>${commentaire || "(aucun)"}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
}