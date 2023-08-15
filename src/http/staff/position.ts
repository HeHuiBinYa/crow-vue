import http from "@/http";
import {positionStore} from "@/store/staff/position";

// 职业状型图
export const columnarPosition = () => {
    return http.post("/staff/columnarPosition")
}

// 部门职位管理添加
export const increases = () => {
    return http.post("/staff/increase_position",null,{
        params: {
            plevel: positionStore().position.plevel,
            psalary: positionStore().position.psalary,
            position: positionStore().position.position,
        }
    })
}

// 部门职位管理删除
export const omits = () => {
    return http.post("/staff/omit_position",null,{
        params: {
            pid: positionStore().position.pid,
        }
    })
}

// 部门信息管理查询所有
export const list_position = () => {
    return http.post("/staff/list_position",null)
}

// 部门职位管理修改
export const edits = () => {
    return http.post("/staff/edit_position",null,{
        params: {
            pid: positionStore().position.pid,
            plevel: positionStore().position.plevel,
            psalary: positionStore().position.psalary,
            position: positionStore().position.position,
        }
    })
}

// 部门职位管理分页
export const pages = (data: any) => {
    return http.post("/staff/page_position",null,{
        params: {
            size: data._value.position_size,
            pageSize: data._value.pageSize,
            plevel: data._value.plevel,
            psalary: data._value.psalary,
            position: data._value.position,
        }
    })
}
