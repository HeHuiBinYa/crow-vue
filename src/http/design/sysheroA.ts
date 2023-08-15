import http from "@/http";
import {sysHeroAStore} from "@/store/design/sysheroA";

// 添加一级分类
export const addSysHeroA = () => {
    return http.post("/design/addSysHeroA",null,{
        params: {
            aName: sysHeroAStore().data.sys_heroA.aName
        }
    })
}

// 查询所有一级分类
export const selectSysHeroAList = () => {
    return http.get("/design/selectSysHeroAList")
}

// 分页查询一级分类
export const pageSysHeroA = () => {
    return http.post("/design/pageSysHeroA",null,{
        params: {
            aname: sysHeroAStore().data.aname,
            size: sysHeroAStore().data.size,
            sizePage: sysHeroAStore().data.sizePage
        }
    })
}

// 修改一级分类
export const updateA = (data: any) => {
    return http.put("/design/updateSysHeroA",null,{
        params: {
            aName: data.name,
            aid:data.did
        }
    })
}
