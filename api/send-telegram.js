export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {message} = req.body;

    await fetch(
      `/api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    res.status(200).json({ message: 'Message sent successfully' });
}
