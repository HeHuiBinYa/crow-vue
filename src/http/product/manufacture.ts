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

export const queryManufactureVo = () => {
    return http.post("/product/queryManufactureVo",null,{
        params: {
            size: manufactureStore().queryManufacture.queryManufactureVo.size,
            sizePage: manufactureStore().queryManufacture.queryManufactureVo.sizePage,
            manufactureid: manufactureStore().queryManufacture.queryManufactureVo.manufactureid,
            maproductid: manufactureStore().queryManufacture.queryManufactureVo.maproductid,
            maproductname: manufactureStore().queryManufacture.queryManufactureVo.maproductname,
            madesigner: manufactureStore().queryManufacture.queryManufactureVo.madesigner,
            machecker: manufactureStore().queryManufacture.queryManufactureVo.machecker,
            startMaamount: manufactureStore().queryManufacture.queryManufactureVo.startMaamount,
            endMaamount: manufactureStore().queryManufacture.queryManufactureVo.endMaamount,
            startMatesteramount: manufactureStore().queryManufacture.queryManufactureVo.startMatesteramount,
            endMatesteramount: manufactureStore().queryManufacture.queryManufactureVo.endMatesteramount,
            machecktag: manufactureStore().queryManufacture.queryManufactureVo.machecktag,
            manufacturepriceduretag: manufactureStore().queryManufacture.queryManufactureVo.manufacturepriceduretag,
        }
    })
}

// 修改
export const updateManufactureById = () => {
    return http.post("/product/updateManufactureById",null,{
        params: {
            maid: manufactureStore().queryManufacture.manufacture.maid,
            maproductname: manufactureStore().queryManufacture.manufacture.maproductname,
            maamount: manufactureStore().queryManufacture.manufacture.maamount,
            matesteramount: manufactureStore().queryManufacture.manufacture.matesteramount,
            madesigner: manufactureStore().queryManufacture.manufacture.madesigner,
            mamodulecostpricesum: manufactureStore().queryManufacture.manufacture.mamodulecostpricesum,
            marealmodulecostpricesum: manufactureStore().queryManufacture.manufacture.marealmodulecostpricesum,
            malabourcostpricesum: manufactureStore().queryManufacture.manufacture.malabourcostpricesum,
            mareallabourcostpricesum: manufactureStore().queryManufacture.manufacture.mareallabourcostpricesum,
            maproductdescribe: manufactureStore().queryManufacture.manufacture.maproductdescribe,
        }
    })
}

export const updateManufactureByMachecktag = () => {
    return http.post("/product/updateManufactureById",null,{
        params: {
            maid: manufactureStore().queryManufacture.manufacture.maid,
            machecktag: 'S001-0'
        }
    })
}

export const updateManufactureByManufacturepricedureTag = () => {
    return http.post("/product/updateManufactureById",null,{
        params: {
            maid: manufactureStore().queryManufacture.manufacture.maid,
            manufacturepriceduretag: 'S002-1'
        }
    })
}
