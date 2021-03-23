/**
 * @description websocket 上报错误信息
 * @author Uni
 */

const PORT = 8080

const Websocket = require("ws")

const fs = require('fs')

const getLog = require('./handleLog')

const wss = new Websocket.Server({
    port: PORT
})


wss.on('connection', (ws, req) => {

    async function getHistory() {
        const res = await getLog()
        
        const arr = res.split('\n')
        arr.push("---------- 历史日志 ----------")
        arr.reverse()
        ws.send(JSON.stringify(arr))
        
    }
    getHistory()
    sendMsg(ws)
})

function sendMsg(ws) {
    
    fs.watch('errorLog.txt', async (eventType, file) => {
        if (eventType === 'change') {
            const res = await getLog()
            const arr = res.split('\n')
            const len = arr.length
            ws.send(arr[len - 2])
        }
    })
}