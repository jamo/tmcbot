const token = process.env.BOT_TOKEN
const pasteTextFi =
  'Valitse Netbeansin ylävalikosta "TMC" -> "Send code to TMC Pastebin" ja valitse avautuvasta ikkunasta "Send". Tämän jälkeen saat linkin koodiisi, jonka voit kopioida ja liittää tänne.'

const ideLogTextFi = 'Saat Netbeanssin IDE login näin: 1. Avaa Netbeans. 2. Aiheuta ongelma uudestaan. 3. Valitse Netbeanssin yläpalkista "View" -> "IDE Log". 4. Kopioi avautuvasta paneelista kaikki teksti ja liitä se vastaukseesi.'

const pasteTextEn = 'In Netbeans, click "TMC" -> "Send code to TMC Pastebin" from the top row. Click "Send" in the opened window. This will give you a link to your code that you can copy and paste here.'

const ideLogTextEn = 'You can retrieve the Netbeans IDE log through these steps: 1. Open Netbeans. 2. Replicate the problem. 3. From the Netbeans top row, choose "View" -> "IDE log". 4. Copy all the text from the opened panel, paste it to a pastebin service (such as pastebin.org), and send the link here.'

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.method === 'POST') {
    let body = ''
    req.on('data', data => {
      body += data
    })
    req.on('end', async () => {
      console.log('got data: ', body)
      const parsedBody = JSON.parse(body)
      return await handleMessage(parsedBody.message || parsedBody.edited_message , res)
    })
  } else {
    res.end(`hello`)
    return
  }
}

async function handleMessage(message , res) {
  console.log('got req:', JSON.stringify(message))
  const msg = {}
  if (message.reply_to_message && message.reply_to_message.message_id) {
    msg['reply_to_message_id'] = message.reply_to_message.message_id
  }
  if (message.text === '/paste') {
    let text = ''
    if (message.reply_to_message && message.reply_to_message.from.username) {
      text = `@${message.reply_to_message.from.username} `
    }
    text += "käytä !paste /paste tilalla"
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: text,
    })
  } else if (/!paste-en/.test(message.text)) {
    let text = ''
    if (message.reply_to_message && message.reply_to_message.from.username) {
      text = `@${message.reply_to_message.from.username} `
    }
    text += pasteTextEn
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: text,
    })
  } else if (/!idelog-en/.test(message.text)) {
    let text = ''
    if (message.reply_to_message && message.reply_to_message.from.username) {
      text = `@${message.reply_to_message.from.username} `
    }
    text += ideLogTextEn
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: text,
    })
  } else if (/!paste/.test(message.text)) {
    let text = ''
    if (message.reply_to_message && message.reply_to_message.from.username) {
      text = `@${message.reply_to_message.from.username} `
    }
    text += pasteTextFi
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: text,
    })
  } else if (/!idelog/.test(message.text)) {
    let text = ''
    if (message.reply_to_message && message.reply_to_message.from.username) {
      text = `@${message.reply_to_message.from.username} `
    }
    text += ideLogTextFi
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: text,
    })
  } else if (message.text === '!jamo-test') {
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: JSON.stringify(message),
    })
  }
  console.log('sending:', JSON.stringify(msg))
  res.end(JSON.stringify(msg))
}
