import http from "@/http";
import {warehousingStore} from "@/store/inventopy/warehousing";

export const getScproductid = () => {
    return http.get("/inventopy/getScproductid")
}

export const schedulingComplete = (data:any) => {
    return http.post("/inventopy/schedulingComplete",null,{
        params: {
            scproductid: data.scproductid,
            scproductname: data.scproductname,
            scamount: data.scamount,
            scubtotal: data.scubtotal,
            scgatheredamount: data.scgatheredamount,
            waid: warehousingStore().warehousing.waid
        }
    })
}

export const insertScheduling = (data: any) => {
    return http.post("/inventopy/insertScheduling",null,{
        params: {
            scproductid: data.scproductid,
            scproductname: data.scproductname,
            scamount: data.scamount,
            scamountunit: data.scamountunit,
            sccostprice: data.sccostprice,
            scubtotal: data.scubtotal,
            scproductdescribe: data.scproductdescribe,
            waid: warehousingStore().warehousingInsert.waid
        }
    })
}

export const updateSchedulingByScamount = () => {
    return http.post("/inventopy/updateSchedulingByScamount",null,{
        params: {
            total: warehousingStore().WarehousingVo.dispatch.total,
            scid: warehousingStore().WarehousingVo.dispatch.scid,
        }
    })
}
