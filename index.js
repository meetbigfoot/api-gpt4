const functions = require('@google-cloud/functions-framework')
const cors = require('cors')({ origin: true })
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

functions.http('gpt4', (req, res) => {
  cors(req, res, async () => {
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: req.body,
      })
      res.status(200).send(completion.data.choices[0].message.content)
    } catch (error) {
      res.status(500).send(error)
    }
  })
})
