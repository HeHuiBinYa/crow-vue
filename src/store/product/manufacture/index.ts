import {store} from "@/store";

export const manufactureStore = store('anufacture',{
    state: () => {
        return {
            data: {
                data: [],
                manufacture: {
                    row: -1,
                    maid: "",
                    mafid: "",
                    manufactureid: "",
                    maproductid: "",
                    maproductname: "",
                    maamount: 0,
                    madesigner: "",
                    mamodulecostpricesum: 0,
                    malabourcostpricesum: 0,
                    maproductdescribe: "",
                },
                file: []
            },
            page: {
                size: 1,
                sizePage: 1,
                data: [],
                procedures: [],
                manufactureid: "",
                maproductname: "",
                madesigner: "",
                maregistertime: "",
                machecker: "", // 审核人
                maproductdescribe: "",
                maamount: 0,
                mamodulecostpricesum: "",
                maid: -1,
                machecktag: ""
            },
            finished: {
                size: 1,
                sizePage: 1,
                manufactureid: "",
                maproductname: "",
                madesigner: "",
                maamount: "",
                matesteramount: "",
                marealmodulecostpricesum: "",
                mareallabourcostpricesum: "",
                maremapk: "",
                maid: -1,
                data: [],
                scheduling: [{}],
            }
        }
    },
    actions: {

    }
})
