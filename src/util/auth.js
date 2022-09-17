import Cookies from 'js-cookie'

const TokenKey = 'Authentication'

export function getToken() {
    return Cookies.get(TokenKey) ? Cookies.get(TokenKey) : null;
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}


export function removeToken() {
    return Cookies.remove(TokenKey)
}