const functions = require('@google-cloud/functions-framework')
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

functions.http('gpt4', async (req, res) => {
  //cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-nodejs
  res.set('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    res.status(204).send('')
  } else {
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: req.body,
      })
      res.status(200).send(completion.data.choices[0].message.content)
    } catch (error) {
      res.status(500).send(error)
    }
  }
})
