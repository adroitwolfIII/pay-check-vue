import axios from 'axios'
import { getToken } from '@/util/auth'
import store from '@/store'
import router from '@/router'
import { BASE_URL } from '@/config/global.var'
import {Message} from "element-ui"

// axios相应的封装
const service = axios.create({
    timeout: 10000,
    baseURL: BASE_URL,
});


function setTokenToHeader(config) {
    // set token
    const token = store.getters.token ? store.getters.token : getToken();

    if (token) {
        config.headers['Authentication'] = token;
    }
}


service.interceptors.request.use(config => {
        setTokenToHeader(config);
        if (config.method === 'post' || config.method === 'put') {
            // config.data = qs.stringify({...config.data });
            if (config.headers['Content-Type'] === 'multipart/form-data') {

            } else {
                config.headers['Content-Type'] = 'application/json; charset=utf-8';
                config.data = JSON.stringify({ ...config.data })
            }

        } else if (config.method === 'get') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.params = { ...config.params }
        }


        return config;
    }, error => {

        return Promise.reject(error);
    }

)

service.interceptors.response.use(

    response => {
        const res = response;
        const config = response.config

        const data = res ? res.data : null;
        const status = data ? data.status : -1;
        if (status === 200) {
            console.log("成功");
            return data;
        }
        if (status === 401) { // 验证当前地址 消除缓存 如果当前的是主页的登陆，则不退到登陆窗口
            store.dispatch("clear_info");
            let href = window.location.href;
            let post = window.location.port;
            let url = href.split(post + "/");

            var re = /^index.html.*?/;

            if (re.test(url[1])) {
                return response;
            } else {
                Message.error("您还未登陆，请先登录");
                router.push({ name: 'Login' });
            }
        } else if (status === 400 || status === 503) {
            Message.error(data.message);
        } else if (status === 500) {
            Message.error("服务异常！");
        } else if (status === 404) { //资源错误

        } else if (status === 403) {
            Message.error("请不要尝试权限之外的事情");
        }
        return Promise.reject(response);
    },
    error => {
        console.log(error.response)
        const res = error.response
        const status = res ? res.status : -1;
        const data = res ? res.data : null;
        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            Message.error("网络连接超时");
            //return Promise.reject(error); // reject这个错误信息
        }else{
            Message.error("网络异常");
        }
        
        return Promise.reject(error);
    }
);

export default service
