const express = require("express")
const app = express()
const httpProxy = require("http-proxy")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")

const proxy = httpProxy.createProxyServer()
const server = `https://api.darksky.net/forecast/${process.env.API_KEY}/`

app.use(bodyParser.json())
app.use(cors())
app.use(morgan(":method :url - :body"))

app.all("/*", (req, res) => {
	proxy.web(req, res, { target: server })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
