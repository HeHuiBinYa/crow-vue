import http from '@/http/index'
import {useCounterStore} from '@/store/index'

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
            tok: useCounterStore().user.tok
        }
    })
}

export const getRole = () => {
    return http.post('/auth/role');
}
