import http from "@/http";
import {departmentStore} from "@/store/staff/department";

// 部门信息管理添加
export const increase = () => {
    return http.post("/staff/increase_department",null,{
        params: {
            dname: departmentStore().department.dname,
            position: departmentStore().department.position,
            duty: departmentStore().department.duty
        }
    })
}

// 部门信息管理删除
export const omit = () => {
    return http.post("/staff/omit_department",null,{
        params: {
            did: departmentStore().department.did
        }
    })
}

// 部门信息管理查询所有
export const list_department = () => {
    return http.post("/staff/list_department",null)
}

// 部门信息管理修改
export const edit = () => {
    return http.post("/staff/edit_department",null,{
        params: {
            did: departmentStore().department.did,
            dname: departmentStore().department.dname,
            position: departmentStore().department.position,
            duty: departmentStore().department.duty
        }
    })
}

// 部门信息管理分页
export const page = (data: any) => {
    return http.post("/staff/page_department",null,{
        params: {
            size: data._value.department_size,
            pageSize: data._value.pageSize,
            dname: data._value.dname,
            position: data._value.position,
            duty: data._value.duty,
        }
    })
}
