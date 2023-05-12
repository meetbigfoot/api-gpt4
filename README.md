## Dev locally

```
npm i
env-cmd npx functions-framework --target=gpt4
```

## Deploy

```
gcloud functions deploy gpt4 \
--allow-unauthenticated \
--runtime=nodejs18 \
--update-env-vars OPENAI_API_KEY=PASTE_KEY_HERE \
--timeout=540s \
--trigger-http
```
