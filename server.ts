import express from 'express'

const app = express()
const port = 8000

app.get('/health', (req, res) => res.sendStatus(200))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})