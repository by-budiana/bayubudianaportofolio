export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is empty" });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({
        error: "Telegram env not set",
      });
    }

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const data = await tgResponse.json();

    if (!data.ok) {
      return res.status(500).json({
        error: data.description,
      });
    }

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
