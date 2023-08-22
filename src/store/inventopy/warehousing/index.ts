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
                size: 1,
                sizePage: 1,
                wachecktag: "",
                waid: "",
                wagatherid: "",
                wastorer: "",
                waamountsum: "",
                wacostpricesum: "",
                wagatheredamountsum: "",
                waregister: "",
                wachecker: "",
                scheduling: [],
                records: []
            },
            warehousingInsert: {
                waid: "",
                wagatherid: "",
                wastorer: "",
                wareason: "",
                waamountsum: "",
                wacostpricesum: "",
                wagatheredamountsum: "",
                waremark: "",
                waregister: "",
                data: [],
                scheduling: {
                    scproductid: "",
                    scproductname: "",
                    scamount: "",
                    scamountunit: "",
                    sccostprice: "",
                    scubtotal: "",
                    scproductdescribe: "",
                },
                row: -1,
            },
            WarehousingVo: {
                data: [],
                page: {
                    size: 1,
                    sizePage: 3,
                    wagatherid: "",
                    wastorer: "",
                    waregister: "",
                    wachecker: "",
                    startWaamountsum: "",
                    endWaamountsum: "",
                    startWacostpricesum: "",
                    endWacostpricesum: "",
                    startWagatheredamountSum: "",
                    endWagatheredamountSum: "",
                    wareason: "",
                    wachecktag: "",
                },
                warehousing: {
                    wastorer: "",
                    waamountsum: "",
                    wacostpricesum: "",
                    wagatheredamountsum: "",
                    waregister: "",
                    wachecker: "",
                    waid: "",
                    data: [],
                },
                dispatch: {
                    dname: '',
                    number: '',
                    tag: '',
                    operator: '',

                    total: 0,
                    scid: '',
                    waid: '',
                    dispatchData: [],
                    fTag: '',
                }
            }
        }
    },
    actions: {
    }
})
