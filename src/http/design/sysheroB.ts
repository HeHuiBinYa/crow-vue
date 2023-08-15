import http from "@/http";
import {sysHeroBStore} from "@/store/design/sysheroB";

// 添加二级分类
export const addSysHeroB = () => {
    return http.post("/design/addSysHeroB",null,{
        params: {
            aid: sysHeroBStore().data.sys_heroB.aid,
            bName: sysHeroBStore().data.sys_heroB.bName
        }
    })
}

// 查询所有二级分类
export const selectSysHeroBList = () => {
    return http.get("/design/selectSysHeroBList")
}

// 根据id查询二级分类
export const selectSysHeroBByCid = (data:any) => {
    return http.post("/design/selectSysHeroBByBid",null,{
        params: {
            aid: data
        }
    })
}

// 分页查询二级分类
export const pageSysHeroB = () => {
    return http.post("/design/pageSysHeroB",null,{
        params: {
            bname: sysHeroBStore().data.bname,
            size: sysHeroBStore().data.size,
            sizePage: sysHeroBStore().data.sizePage
        }
    })
}

// 修改二级分类
export const updateB = (data: any) => {
    return http.put("/design/updateSysHeroB",null,{
        params: {
            aid: data.id,
            bName: data.name,
            bid:data.did
        }
    })
}

