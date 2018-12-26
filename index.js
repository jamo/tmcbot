const token = process.env.BOT_TOKEN

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
  if (body.message.text === '/paste') {
    let text = ''
    if (body.message.reply_to_message && body.message.reply_to_message.from.username) {
      text = `@${body.message.reply_to_message.from.username} `
    }
    text += 'Valitse Netbeansin ylävalikosta "TMC" -> "Send code to TMC Pastebin" ja valitse avautuvasta ikkunasta "Send". Tämän jälkeen saat linkin koodiisi, jonka voit kopioida ja liittää tänne.'
    const msg = {method: 'sendMessage', chat_id: body.message.chat.id, text: text}
    console.log('sending:', JSON.stringify(msg))
    res.end(JSON.stringify(msg))
  } else if (body.message.text === '/jamo-test') {
    msg = {method: 'sendMessage', chat_id: body.message.chat.id, text: JSON.stringify(body)}
    console.log('sending:', JSON.stringify(msg))
    res.end(JSON.stringify(msg))
  } else {
    res.end('')
  }
}
