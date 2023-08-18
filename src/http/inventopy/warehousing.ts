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
