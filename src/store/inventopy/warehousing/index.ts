import {store} from "@/store/index";

export const warehousingStore = store('warehousing',{
    state: () => {
        return {
            warehousing: {
                wagatherid: "", // 出入库申请单号
                waregister: "", // 登记人
                wastorer: "", // 出入库人
                waamountsum: "", // 总件数
                wacostpricesum: 0, //  总金额
                wagatheredamountsum: "",
                wareason: "",
                waid: -1,
            },
            page: {
                waid: "",
                size: 1,
                sizePage: 1,
                wagatherid: "",
                wastorer: "",
                waamountsum: "",
                wacostpricesum: "",
                wagatheredamountsum: "",
                waregister: "",
                wachecker: "",
                scheduling: []
            }
        }
    },
    actions: {
    }
})
