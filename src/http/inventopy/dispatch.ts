import http from "@/http";
import {warehousingStore} from "@/store/inventopy/warehousing";

export const insertDispatch = () => {
    return http.post("/inventopy/insertDispatch",null,{
        params: {
            dname: warehousingStore().WarehousingVo.dispatch.dname,
            number: warehousingStore().WarehousingVo.dispatch.number,
            tag: warehousingStore().WarehousingVo.dispatch.tag,
            operator: warehousingStore().WarehousingVo.dispatch.operator,
            scid: warehousingStore().WarehousingVo.dispatch.scid,
        }
    })
}
