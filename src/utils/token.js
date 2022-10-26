//本地存储token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

//获取本地token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

//清除token
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}