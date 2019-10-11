module.exports = {
    environment: 'dev',
    database: {
        dbName: 'wxserver',
        host: '47.101.196.193',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60 * 24
    },
    wx: {
        appId: 'wx6a6464ba2c0725ae',
        appSecret: 'ba49783802965e1e94eba5c7b14d935d',
        // loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6a6464ba2c0725ae&secret=ba49783802965e1e94eba5c7b14d935d&js_code='+ code +'&grant_type=authorization_code';
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
