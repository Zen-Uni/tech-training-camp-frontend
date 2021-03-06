/**
 * @description 响应模型
 * @author Uni
 */

// import error log
const appendLog = require('./appendLog')

 class BaseModel {
    constructor(data, msg) {
        if (typeof data === 'string') {
            this.msg = data
            data = null
            msg = null
        }

        if (data) {
            this.data = data
        }

        if (msg) {
            this.msg = msg
        }
    }
}

// successful result model
class SuccessModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.code = 0
    }
}

// error result model
class ErrorModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.code = 1
        appendLog(data)
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}