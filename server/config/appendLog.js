/**
 * @description 更新错误日志
 * @author Uni
 */

const fs = require('fs')

const appendLog = (obj) => {
    const date = new Date().toString()
    const str = `记录时间：${date} --- 错误码：${obj.errno} --- 错误信息：${obj.msg}\n`
    fs.appendFile('./ws/errorLog.txt', str, (err) => {
        if (err) {
            console.log(err)
        }
    })

    console.log(JSON.stringify(obj))
}

module.exports = appendLog