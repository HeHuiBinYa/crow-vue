import http from '@/http/index'
import {userStore} from '@/store/user/index'

export const login = (data: any) => {
    console.log(data)
    return http.post('/auth/login',null,{
        params:{
            username: data.username,
            password: data.password,
            role: data.role
        }
    });
}

export const quit = () => {
    return http.post("/auth/quit",null,{
        params: {
            tok: userStore().user.tok
        }
    })
}

export const getRole = () => {
    return http.post('/auth/role');
}
