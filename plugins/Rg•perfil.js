
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Info'
  let user = global.db.data.users[who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/cqUYc.jpg')
  let { exp, corazones, name, registered, regTime, age, level } = global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let api = await axios.get(`https://delirius-apiofc.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let userNationalityData = api.data.result
  let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
  let img = await (await fetch(`${pp}`)).buffer()
  let txt = ` –  *P E R F I L  -  U S E R*\n\n`
      txt += `◦ *Nombre* : ${name}\n`
      txt += `◦ *Edad* : ${registered ? `${age} años` : '×'}\n`
      txt += `◦ *Numero* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
      txt += `◦ *Nacionalidad* : ${userNationality}\n`
      txt += `◦ *Link* : wa.me/${who.split`@`[0]}\n`
      txt += `◦ *Corazones* : ${corazones}\n`
      txt += `◦ *Nivel* : ${level}\n`
      txt += `◦ *XP* : Total ${exp} (${user.exp - min}/${xp})\n`
      txt += `◦ *Premium* : ${prem ? 'Si' : 'No'}\n`
      txt += `◦ *Registrado* : ${registered ? 'Si': 'No'}`
  let mentionedJid = [who]
// await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fake)

await conn.sendMessage(m.chat, {
  image: img,
  caption: txt,
  footer: dev,
  buttons: [
    {
      buttonId: `.owner`,
      buttonText: { displayText: '📞 Owner' },
    },
    {
      buttonId: `.grupos`,
      buttonText: { displayText: '🥞 Grupos' },
    },
  ],
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
    },
  },
  viewOnce: true,
  headerType: 4,
}, { quoted: m });

}
handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['start']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatDate(n, locale = 'es-US') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatHour(n, locale = 'en-US') {
  let d = new Date(n)
  return d.toLocaleString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
}
