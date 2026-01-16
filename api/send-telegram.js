export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { nama, email, pesan } = req.body;

    // VALIDASI DATA
    if (!nama || !email || !pesan) {
      return res.status(400).json({
        error: "Data tidak lengkap",
        received: req.body,
      });
    }

    // FORMAT PESAN TELEGRAM
    const text = `📩 Pesan Kontak Website

👤 Nama: ${nama}
📧 Email: ${email}

💬 Pesan:
${pesan}`;

    // KIRIM KE TELEGRAM
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: text, // ✅ PAKAI text, BUKAN message
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(500).json({
        telegram_error: data.description,
      });
    }

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
