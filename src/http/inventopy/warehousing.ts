import http from "@/http";
import {warehousingStore} from "@/store/inventopy/warehousing";

export const getWagatherid = () => {
    return http.get("/inventopy/getWagatherid")
}

export const wagatheridComplete = () => {
    return http.post("/inventopy/wagatheridComplete",null,{
        params: {
            wagatherid: warehousingStore().warehousing.wagatherid, // 出入库申请单号
            waregister: warehousingStore().warehousing.waregister, // 登记人
            wastorer: warehousingStore().warehousing.wastorer, // 出入库人
            waamountsum: warehousingStore().warehousing.waamountsum, // 总件数
            wacostpricesum: warehousingStore().warehousing.wacostpricesum, //  总金额
            wagatheredamountsum: warehousingStore().warehousing.wagatheredamountsum,
            wareason: warehousingStore().warehousing.wareason,
        }
    })
}

export const examinePageWarehousing = () => {
    return http.post("/inventopy/examinePageWarehousing",null,{
        params: {
            size: warehousingStore().page.size,
            sizePage: warehousingStore().page.sizePage
        }
    })
}

export const updateWarehousing = () => {
    return http.post("/inventopy/updateWarehousing",null,{
        params: {
            wachecker: warehousingStore().page.wachecker,
            wachecktag: warehousingStore().page.wachecktag,
            waid: warehousingStore().page.waid,
        }
    })
}

export const insertWarehousing = () => {
    return http.post("/inventopy/insertWarehousing",null,{
        params: {
            wagatherid: warehousingStore().warehousingInsert.wagatherid,
            wastorer: warehousingStore().warehousingInsert.wastorer,
            wareason: warehousingStore().warehousingInsert.wareason,
            waamountsum: warehousingStore().warehousingInsert.waamountsum,
            wacostpricesum: warehousingStore().warehousingInsert.wacostpricesum,
            wagatheredamountsum: warehousingStore().warehousingInsert.wagatheredamountsum,
            waremark: warehousingStore().warehousingInsert.waremark,
            waregister: warehousingStore().warehousingInsert.waregister,
        }
    })
}

export const queryWarehousingVo = () => {
    return http.post("/inventopy/queryWarehousingVo",null,{
        params: {
            size: warehousingStore().WarehousingVo.page.size,
            sizePage: warehousingStore().WarehousingVo.page.sizePage,
            wagatherid: warehousingStore().WarehousingVo.page.wagatherid,
            wastorer: warehousingStore().WarehousingVo.page.wastorer,
            waregister: warehousingStore().WarehousingVo.page.waregister,
            wachecker: warehousingStore().WarehousingVo.page.wachecker,
            startWaamountsum: warehousingStore().WarehousingVo.page.startWaamountsum,
            endWaamountsum: warehousingStore().WarehousingVo.page.endWaamountsum,
            startWacostpricesum: warehousingStore().WarehousingVo.page.startWacostpricesum,
            endWacostpricesum: warehousingStore().WarehousingVo.page.endWacostpricesum,
            startWagatheredamountSum: warehousingStore().WarehousingVo.page.startWagatheredamountSum,
            endWagatheredamountSum: warehousingStore().WarehousingVo.page.endWagatheredamountSum,
            wareason: warehousingStore().WarehousingVo.page.wareason,
            wachecktag: warehousingStore().WarehousingVo.page.wachecktag,
        }
    })
}

export const updateWarehousingVo = () => {
    return http.post("/inventopy/updateWarehousingVo",null,{
        params: {
            wastorer: warehousingStore().WarehousingVo.warehousing.wastorer,
            waamountsum: warehousingStore().WarehousingVo.warehousing.waamountsum,
            wacostpricesum: warehousingStore().WarehousingVo.warehousing.wacostpricesum,
            wagatheredamountsum: warehousingStore().WarehousingVo.warehousing.wagatheredamountsum,
            waregister: warehousingStore().WarehousingVo.warehousing.waregister,
            wachecker: warehousingStore().WarehousingVo.warehousing.wachecker,
            waid: warehousingStore().WarehousingVo.warehousing.waid,
        }
    })
}

export const updateWachecktag = () => {
    return http.post("/inventopy/updateWachecktag",null,{
        params: {
            waid: warehousingStore().WarehousingVo.warehousing.waid,
        }
    })
}
