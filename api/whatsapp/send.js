export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { to, message } = req.body

  if (!to || !message) {
    return res.status(400).json({ error: 'Faltan parámetros: to, message' })
  }

  try {
    // Importar sock desde connect.js (necesitarás exportarlo)
    const { getSock } = await import('./connect.js')
    const sock = getSock()

    if (!sock) {
      return res.status(400).json({ error: 'WhatsApp no está conectado' })
    }

    const jid = to.includes('@') ? to : `${to}@s.whatsapp.net`
    
    await sock.sendMessage(jid, { text: message })
    
    return res.json({ success: true, message: 'Mensaje enviado' })
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}