import service from '@/config/service'
import user from '@/store/moudles/user'


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

// 查询用户信息
userApi.info = () =>{
    return service({
        url: `${baseUrl}/info`,
        method: 'get'
    })
}

userApi.register = (data)=>{
    return service({
        url:`${baseUrl}/register`,
        method:'post',
        data:{
            name:data.username,
            password:md5(data.password),
            idCard:data.id_card,
            creditCard:data.credit_card
        }
    })
}


// 密码找回

userApi.forget = (data)=>{
    return service({
        url:`${baseUrl}/forget`,
        method:'post',
        data:{
            name:data.username,
            password:md5(data.password),
            idCard:data.id_card,
            creditCard:data.credit_card
        }
    })
}



export default userApi