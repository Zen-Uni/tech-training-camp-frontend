/**
 * @description 所有的错误类型
 * @author Uni
 */


module.exports = {

    // 未知错误
    unknowErrorInfo: {
        errno: 10000,
        msg: "未知错误，请联系管理员: 13670210824@163.com"
    },

    // 邮箱已注册
    emailExistsInfo: {
        errno: 10001,
        msg: "邮箱已存在"
    },

    // 错误邮箱格式
    emailFormatErrorInfo: {
        errno: 10002,
        msg: "邮箱发送失败，请检查格式"
    },

    // 验证码错误
    captchaErrorInfo: {
        errno: 10003,
        msg: "验证码错误"
    },

    // 用户邮箱或密码错误
    loginErrorInfo: {
        errno: 10004,
        msg: "用户邮箱或密码错误"
    },

    // 未登录
    notLoginInfo: {
        errno: 10005,
        msg: "尚未登录"
    },

    // 文章发布失败
    postArticleErrorInfo: {
        errno: 10006,
        msg: "文章发布失败"
    },

    // 获取文章失败
    getArticleErrorInfo: {
        errno: 10007,
        msg: "文章获取失败"
    },

    // 文章内容获取失败
    getArticleContentErrorInfo: {
        errno: 10008,
        msg: "文章内容获取失败"
    },

    // 文章协同编辑更新失败
    upDateArticleErrorInfo: {
        errno: 10009,
        msg: "文章更新失败"
    },

    // 头像上传失败
    upLoadAvatarErrorInfo: {
        errno: 10010,
        msg: "头像更新失败"
    }
}