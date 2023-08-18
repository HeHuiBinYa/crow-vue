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
