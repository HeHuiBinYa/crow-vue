import http from "@/http";
import {sysFileStore} from "@/store/design/file";
import {manufactureStore} from "@/store/product/manufacture";

/**
 * 获得物料组成设计单号
 */
export const materialCompositionDesignListNumber = () => {
    return http.get("/design/materialCompositionDesignListNumber")
}

/**
 * 根据 fid 获得物料
 */
export const selectSysMaterialsByFid = () => {
    return http.post("/design/selectSysMaterialsByFid",null,{
        params: {
            fid: manufactureStore().data.manufacture.mafid
        }
    })
}

export const addSysMaterials = (data:any) => {
    return http.post("/design/addSysMaterials",null,{
        params: {
            design: data.design,
            designName: data.designname,
            type: data.type,
            describer: data.describer,
            priceSum: data.pricesum,
            amount: data.amount,
            munit: data.munit,
            price: data.price,
            fid: sysFileStore().file.fid
        }
    })
}

export const addMaterials = (data:any) => {
    return http.post("/design/addSysMaterials",null,{
        params: {
            design: data.design,
            designName: data.designname,
            type: data.type,
            describer: data.describer,
            priceSum: data.pricesum,
            amount: data.amount,
            munit: data.munit,
            price: data.price,
            fid: sysFileStore().files.SysFile.fid
        }
    })
}

export const deleteSysMaterialsByMid = () => {
    return http.post("/design/deleteSysMaterialsByMid",null,{
        params: {
            mid: sysFileStore().mate.mid
        }
    })
}

export const updateSysMaterials = (data:any) => {
    return http.post("/design/updateSysMaterials",null,{
        params: {
            design: data.design,
            designName: data.designname,
            type: data.type,
            describer: data.describer,
            priceSum: data.pricesum,
            amount: data.amount,
            munit: data.munit,
            price: data.price,
            mid: data.mid,
        }
    })
}
