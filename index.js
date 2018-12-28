const token = process.env.BOT_TOKEN
const pasteTextFi =
  'Valitse Netbeansin ylävalikosta "TMC" -> "Send code to TMC Pastebin" ja valitse avautuvasta ikkunasta "Send". Tämän jälkeen saat linkin koodiisi, jonka voit kopioida ja liittää tänne.'

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
  } else if (message.text === '/jamo-test') {
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: JSON.stringify(message),
    })
  }
  console.log('sending:', JSON.stringify(msg))
  res.end(JSON.stringify(msg))
}
