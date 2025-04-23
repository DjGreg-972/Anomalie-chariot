
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { code, etat, commentaire, fileData, fileName } = req.body;

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
    subject: `Anomalie chariot - ${code}`,
    html: `
      <h2>Nouvelle anomalie signalée</h2>
      <p><strong>Code chariot :</strong> ${code}</p>
      <p><strong>État :</strong> ${etat}</p>
      <p><strong>Commentaire :</strong> ${commentaire || 'Aucun'}</p>
    `,
    attachments: fileData
      ? [
          {
            filename: fileName || 'photo.jpg',
            content: fileData.split('base64,')[1],
            encoding: 'base64',
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l’envoi du mail:', error);
    res.status(500).json({ message: 'Erreur lors de l’envoi du mail' });
  }
}
