module.exports = {
    msg (data, clients, ws) {
        clients.forEach(socket =>  {
            if(socket.readyState === 1 && socket != ws) //OPEN
                socket.send(JSON.stringify({ type: 'msg', value: data.value }))
        })
    }
}