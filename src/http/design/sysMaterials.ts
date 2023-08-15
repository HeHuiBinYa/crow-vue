import http from "@/http";
import {sysFileStore} from "@/store/design/file";

/**
 * 获得物料组成设计单号
 */
export const materialCompositionDesignListNumber = () => {
    return http.get("/design/materialCompositionDesignListNumber")
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
