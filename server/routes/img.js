const router = require('koa-router')()

const koaForm = require('formidable-upload-koa')
// const checkLogin = require('../controller/checkLogin')

const upLoadAvatar = require('../controller/upLoadAvatar')
const { parseJWT } = require('../middleware/jwt')

router.prefix('/api/img')

router.post('/avatar', koaForm(), async (ctx, next) => {
    const files = ctx.req.files['upImg']
    const token = ctx.headers.authorization
    const { data } = await parseJWT(token)
    const email = data.username
    const { name, size, path, type } = files

    // console.log('path --------- ', path)
    // console.log('size --------- ', size)

    ctx.body = await upLoadAvatar({
        name,
        type,
        size,
        filePath: path,
        email
    })
})


module.exports = router