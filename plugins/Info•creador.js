import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('☁️');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);

    // VCARD
    let list = [{
        displayName: "@Kcha.Mobiles ☁️",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: Izumi-kzx\nitem1.TEL;waid=51936994155:51936994155\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: izumipluss@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://whatsapp.com/channel/0029Vb5oUp43LdQUVViHwc0m/\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Peru;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: '@kcha.Mobiles',
                body: 'Creador Oficial De Eazzy X Bot',
                thumbnailUrl: 'https://qu.ax/cqUYc.jpg',
                sourceUrl: canal,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

  /*  await conn.sendMessage(m.chat, {
        text: txt,
        footer: '© Creador Oficial',
        buttons: [
            {
                buttonId: ".menu",
                buttonText: {
                    displayText: '⊹₊ ⋆ᯓᡣ𐭩 mᥱᥒᥙ ᥴ᥆m⍴ᥣᥱ𝗍᥆'
                },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 1
    }, { quoted: m }); */
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;