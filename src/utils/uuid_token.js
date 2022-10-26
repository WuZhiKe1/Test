import { v4 as uuidv4 } from 'uuid'
//生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    //先从本地存储回去uuid看看本地是否存储
    let uuid_token = localStorage.getItem('UUID_TOKEN')
    //如果没有就生成
    if (!uuid_token) {
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem('UUID_TOKEN', uuid_token)
    }
    return uuid_token
}