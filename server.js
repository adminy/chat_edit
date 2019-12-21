const app = require('express')()
const wss = require('express-ws')(app)
const dispatchers = require('./dispatchers')

app.ws('/', (ws, req) => {
	console.log('connected X')
    const { clients } = wss.getWss()

	ws.on('message', msg => {
		const data = JSON.parse(msg);
		if (data.type in dispatchers) dispatchers[data.type](data, clients, ws);
		else console.log('no dispatcher')
	});

})

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

if(process.argv.length > 2)
	app.listen(process.argv[2])
else console.log('node server.js 80')

