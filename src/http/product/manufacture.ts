import http from "@/http";
import {manufactureStore} from "@/store/product/manufacture/index"

export const getSerialnumber1 = () => {
    return http.post("/product/getSerialnumber1")
}

export const getSerialnumber2 = () => {
    return http.post("/product/getSerialnumber2")
}

export const insertManufacture = () => {
    return http.post("/product/insertManufacture",null,{
        params: {
            mafid: manufactureStore().data.manufacture.mafid,
            manufactureid: manufactureStore().data.manufacture.manufactureid,
            maproductid: manufactureStore().data.manufacture.maproductid,
            maproductname: manufactureStore().data.manufacture.maproductname,
            maamount: manufactureStore().data.manufacture.maamount,
            madesigner: manufactureStore().data.manufacture.madesigner,
            mamodulecostpricesum: manufactureStore().data.manufacture.mamodulecostpricesum,
            malabourcostpricesum: manufactureStore().data.manufacture.malabourcostpricesum,
            maproductdescribe: manufactureStore().data.manufacture.maproductdescribe,
        }
    })
}

/**
 * 计划审核
 */
export const queryPageManufacture = () => {
    return http.post("/product/queryPageManufacture",null,{
        params: {
            size: manufactureStore().page.size,
            sizePage: manufactureStore().page.sizePage,
        }
    })
}

export const manufactureExamine = () => {
    return http.post("/product/manufactureExamine",null,{
        params: {
            machecktag: manufactureStore().page.machecktag,
            machecker: manufactureStore().page.machecker,
            maid: manufactureStore().page.maid,
        }
    })
}

/**
 * 生产计划完工
 */
export const queryPageManufactureFinished = () => {
    return http.post("/product/queryPageManufactureFinished",null,{
        params: {
            size: manufactureStore().finished.size,
            sizePage: manufactureStore().finished.sizePage,
        }
    })
}

export const manufactureComplete = () => {
    return http.post("/product/manufactureComplete",null,{
        params: {
            matesteramount: manufactureStore().finished.matesteramount,
            marealmodulecostpricesum: manufactureStore().finished.marealmodulecostpricesum,
            mareallabourcostpricesum: manufactureStore().finished.mareallabourcostpricesum,
            maremapk: manufactureStore().finished.maremapk,
            maid: manufactureStore().finished.maid,
        }
    })
}
