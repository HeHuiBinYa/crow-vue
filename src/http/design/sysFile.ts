import http from "@/http";
import {sysFileStore} from "@/store/design/file";

/**
 * 获得产品编号
 */
export const obtainAproductNumber = () => {
    return http.get("/design/obtainAproductNumber")
}

export const queryPageSysFile = () => {
    return http.post("/design/queryPageSysFile",null,{
        params: {
            size: sysFileStore().page.size,
            sizePage: sysFileStore().page.sizePage,
        }
    })
}

/**
 * 添加档案
 */
export const addSysFile = () => {
    return http.post("/design/addSysFile",null,{
        params:{
            register: sysFileStore().file.register,
            name: sysFileStore().file.name,
            aid: sysFileStore().file.aid,
            pid: sysFileStore().file.pid,
            bid: sysFileStore().file.bid,
            cid: sysFileStore().file.cid,
            type: sysFileStore().file.type,
            unit: sysFileStore().file.unit,
            grou: sysFileStore().file.grou,
            checkTag: sysFileStore().file.checktag,
            costPrice: sysFileStore().file.costprice,
            listPrice: sysFileStore().file.listprice,
            descr: sysFileStore().file.descr,
        }
    })
}

/**
 * 审核档案状态
 */
export const examineSysFile = () => {
    return http.post("/design/examineSysFile",null,{
        params: {
            checker: sysFileStore().page.checker,
            checkTag: sysFileStore().page.checktag,
            fid: sysFileStore().page.fid,
        }
    })
}

/**
 * 获得所有档案
 */
export const selectSysFileList = () => {
    return http.post("/design/queryFileList")
}
