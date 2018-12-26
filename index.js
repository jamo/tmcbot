const token = process.env.BOT_TOKEN
const pasteTextFi = 'Valitse Netbeansin ylävalikosta "TMC" -> "Send code to TMC Pastebin" ja valitse avautuvasta ikkunasta "Send". Tämän jälkeen saat linkin koodiisi, jonka voit kopioida ja liittää tänne.'

module.exports = async (req, res) => {

  if (req.method === 'POST') {
    let body = ''
    req.on('data', data => {
      body += data
    })
    req.on('end', async () =>{
      return await handleMessage(JSON.parse(body), res)
    })
  } else {
    res.end(`hello`);
    return
  }
}

async function handleMessage(body, res) {
  res.setHeader('Content-Type','application/json');
  console.log('got req:', JSON.stringify(body))
  msg = {}
  if (body.message.reply_to_message &&  body.message.reply_to_message.message_id) {
    msg['reply_to_message_id'] = body.message.reply_to_message.message_id
  }
  if (body.message.text === '/paste') {
    let text = ''
    if (body.message.reply_to_message && body.message.reply_to_message.from.username) {
      text = `@${body.message.reply_to_message.from.username} `
    }
    text += pasteTextFi
    msg = Object.assign(msg, {
      method: 'sendMessage',
      chat_id: body.message.chat.id,
      text: text})

    if (body.message.reply_to_message && body.message.reply_to_message.message_id) {
      msg['reply_to_message_id'] = body.message.reply_to_message.message_id
    }

    console.log('sending:', JSON.stringify(msg))
    res.end(JSON.stringify(msg))
  } else if (body.message.text === '/jamo-test') {

    msg = Object.assign(msg, {method: 'sendMessage',
      chat_id: body.message.chat.id,
      text: JSON.stringify(body)
    })
    console.log('sending:', JSON.stringify(msg))
    res.end(JSON.stringify(msg))
  } else {
    res.end('')
  }
}
