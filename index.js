const token = process.env.BOT_TOKEN
const replyMsgs = require('./messages')

const pasteTextEn = 'In Netbeans, click "TMC" -> "Send code to TMC Pastebin" from the top row. Click "Send" in the opened window. This will give you a link to your code that you can copy and paste here.'

const ideLogTextEn = 'You can retrieve the Netbeans IDE log through these steps: 1. Open Netbeans. 2. Replicate the problem. 3. From the Netbeans top row, choose "Wiev" -> "IDE log". 4. Copy all the text from the opened panel, paste it to a pastebin service (such as pastebin.org), and send the link here.'

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
      return await handleMessage(
        parsedBody.message || parsedBody.edited_message,
        res
      )
    })
  } else {
    res.end(`hello`)
    return
  }
}

async function handleMessage(message, res) {
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
    text += 'käytä !paste /paste tilalla'
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
    text += replyMsgs.pasteTextFi
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
    text += replyMsgs.ideLogTextFi
    Object.assign(msg, {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: text,
    })
  } else if (/!chmod/.test(message.text)) {
    let text = ''
    if (message.reply_to_message && message.reply_to_message.from.username) {
      text = `@${message.reply_to_message.from.username} `
    }
    text += replyMsgs.chmodTextFi
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
