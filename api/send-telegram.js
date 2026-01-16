export default function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {masage} req.body;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {