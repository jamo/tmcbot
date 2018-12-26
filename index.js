const token = process.env.BOT_TOKEN
// reply('NetBeansissa, valitse TMC -> Send code to TMC pastebin ja kopio linkki tänne.')

module.exports = async (req, res) => {
  console.log('GOT REQUEST')
  console.log('GOT REQUEST1', req.url)
  console.log('GOT REQUEST1', req.method)
  let body = ''

  if (req.method === 'POST') {
    req.on('data', data => {
      body += data
    })
    req.on('end', async () =>{
      console.log('GOT REQUEST1', body)
      return await handleMessage(JSON.parse(body), res)
    })

  } else {
    res.end(`hello`);
  }

}

async function handleMessage(body, res) {
  res.setHeader('Content-Type','application/json');
  let msg
  if (body.message.text === '/paste') {
    msg = {method: 'sendMessage', chat_id: body.message.chat.id, text: 'Valitse Netbeansin ylävalikosta "TMC" -> "Send code to TMC Pastebin" ja valitse avautuvasta ikkunasta "Send". Tämän jälkeen saat linkin koodiisi, jonka voit kopioida ja liittää tänne.'}
    console.log('sending:', JSON.stringify(msg))
    res.end(JSON.stringify(msg))
//  } else if (body.message.from.id == 181771615) {
//    msg = {method: 'sendMessage', chat_id: body.message.chat.id, text: JSON.stringify(body)}
//    console.log('sending:', JSON.stringify(msg))
//    res.end(JSON.stringify(msg))
  } else {
    res.end('')
  }
}
