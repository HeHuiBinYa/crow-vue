import http from "@/http";
import {sysHeroCStore} from "@/store/design/sysheroC";

// 添加三级分类
export const addSysHeroC = () => {
    return http.post("/design/addSysHeroC",null,{
        params: {
            bid: sysHeroCStore().data.sys_heroC.bid,
            cName: sysHeroCStore().data.sys_heroC.cName
        }
    })
}

// 根据id查询三级分类
export const selectSysHeroCByCid = (data:any) => {
    return http.post("/design/selectSysHeroCByCid",null,{
        params: {
            bid: data
        }
    })
}

// 分页查询三级分类
export const pageSysHeroC = () => {
    return http.post("/design/pageSysHeroC",null,{
        params: {
            cname: sysHeroCStore().data.cname,
            size: sysHeroCStore().data.size,
            sizePage: sysHeroCStore().data.sizePage
        }
    })
}

// 修改三级分类
export const updateC = (data: any) => {
    return http.put("/design/updateSysHeroC",null,{
        params: {
            bid: data.id,
            cName: data.name,
            cid: data.did
        }
    })
}

