// /api/lead.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    if (!data.name || !data.email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const webhookUrl = "https://hook.us2.make.com/uohzy32vttgyvqg0yhwf8i9cy9ecianx";
    if (!webhookUrl) {
      return res.status(500).json({ error: "Webhook no configurado en Vercel" });
    }

    const makeResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!makeResponse.ok) {
      throw new Error(`Error desde Make: ${makeResponse.statusText}`);
    }

    return res.status(200).json({ success: true, message: "Lead enviado correctamente" });
  } catch (error) {
    console.error("Error en /api/lead:", error);
    return res.status(500).json({ error: "Error interno al enviar lead" });
  }
}
