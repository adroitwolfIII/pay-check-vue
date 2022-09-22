import service from '@/config/service'


import md5 from 'js-md5'
const userApi = {}

const baseUrl = '/user'

// 登陆函数
userApi.login = (username, password) => {
    
    return service({
        url: `${baseUrl}/login`,
        data: {
            p: username,
            password: md5(password)
        },
        method: 'post'
    })
    
}

userApi.info = () =>{
    return service({
        url: `${baseUrl}/info`,
        method: 'get'
    })
}


userApi.info = () =>{
    return service({
        url: `${baseUrl}/info`,
        method: 'get'
    })
}

export default userApi