import http from "@/http";
import {staffStore} from "@/store/staff";

export const increase = () => {
    return http.post("/staff/increase_department",null,{
        params: {
            dname: staffStore().department.dname,
            position: staffStore().department.position,
            duty: staffStore().department.duty
        }
    })
}

export const edit = () => {
    return http.post("/staff/edit_department",null,{
        params: {
            did: staffStore().department.did,
            dname: staffStore().department.dname,
            position: staffStore().department.position,
            duty: staffStore().department.duty
        }
    })
}

export const page = (data:any) => {
    console.log(data)
    return http.post("/staff/page_department",null,{
        params: {
            size: data._rawValue.size,
            pageSize: data._rawValue.pageSize,
            dname: data._rawValue.dname,
            position: data._rawValue.position,
            duty: data._rawValue.duty,
        }
    })
}
