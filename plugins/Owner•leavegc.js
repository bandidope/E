let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
let pp = 'https://qu.ax/cqUYc.jpg'
await conn.sendMessage(m.chat, { video: { url: pp }, gifPlayback: true, caption: '*Adios a todos, el Bot se despide! (≧ω≦)ゞ*', mentions: [m.sender] }, { quoted: m })
await conn.groupLeave(id)}
handler.help = ['salir']
handler.tags = ['owner']
handler.command = /^(salir|out|leavegc|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true

export default handler
