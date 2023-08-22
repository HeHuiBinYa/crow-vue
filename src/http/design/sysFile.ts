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

export const querySysFileVo = () => {
    return http.post("/design/querySysFileVo",null,{
        params: {
            size: sysFileStore().files.size,
            sizePage: sysFileStore().files.sizePage,
            pid: sysFileStore().files.pid,
            name: sysFileStore().files.name,
            grou: sysFileStore().files.grou,
            aid: sysFileStore().files.aid,
            bid: sysFileStore().files.bid,
            cid: sysFileStore().files.cid,
            type: sysFileStore().files.type,
            unit: sysFileStore().files.unit,
            register: sysFileStore().files.register,
            checker: sysFileStore().files.checker,
            startTime: sysFileStore().files.startTime[0],
            endTime: sysFileStore().files.startTime[1],
            startMoney: sysFileStore().files.startMoney,
            endMoney: sysFileStore().files.endMoney,
            startMoneys: sysFileStore().files.startMoneys,
            endMoneys: sysFileStore().files.endMoneys,
            checktag: sysFileStore().files.checktag,
        }
    })
}

export const updateFile = () => {
    return http.post("/design/updateFile",null,{
        params: {
            fid: sysFileStore().files.SysFile.fid,
            register: sysFileStore().files.SysFile.register,
            name: sysFileStore().files.SysFile.name,
            aid: sysFileStore().files.SysFile.aid,
            bid: sysFileStore().files.SysFile.bid,
            cid: sysFileStore().files.SysFile.cid,
            type: sysFileStore().files.SysFile.type,
            unit: sysFileStore().files.SysFile.unit,
            grou: sysFileStore().files.SysFile.grou,
            costPrice: sysFileStore().files.SysFile.costPrice,
            listPrice: sysFileStore().files.SysFile.listPrice,
            descr: sysFileStore().files.SysFile.descr,
        }
    })
}

export const updateCheckTag = () => {
    return http.post("/design/updateCheckTag",null,{
        params: {
            fid: sysFileStore().files.SysFile.fid,
        }
    })
}
