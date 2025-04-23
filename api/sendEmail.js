import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { codeChariot, etatChariot, commentaires, imageData, imageName } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'djmoot972@gmail.com',
    subject: `Anomalie Chariot - ${codeChariot}`,
    html: `
      <h2>Nouvelle anomalie détectée</h2>
      <p><strong>Code Chariot :</strong> ${codeChariot}</p>
      <p><strong>État :</strong> ${etatChariot}</p>
      <p><strong>Commentaires :</strong><br>${commentaires || 'Aucun commentaire'}</p>
    `,
    attachments: imageData ? [{
      filename: imageName || 'photo.png',
      content: imageData.split("base64,")[1],
      encoding: 'base64',
    }] : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur d’envoi d’email:', error);
    res.status(500).json({ message: 'Erreur lors de l’envoi du mail' });
  }
}