import http from "@/http";
import {procedureStore} from "@/store/product/procedure/index"
import {manufactureStore} from "@/store/product/manufacture";

export const getProcedure1 = () => {
    return http.post("/product/getProcedure1")
}

export const getProcedure2 = () => {
    return http.post("/product/getProcedure2")
}

export const insertProcedure = (data: any) => {
    return http.post("/product/insertProcedure",null,{
        params: {
            prdetailsnumber: data.prdetailsnumber,
            prprocedureid: data.prprocedureid,
            maid: manufactureStore().data.manufacture.maid,
            procedurename: data.procedurename,
            prlabourhouramount: data.prlabourhouramount,
            prsubtotal: data.prsubtotal,
            prmodulesubtotal: data.prmodulesubtotal,
            prcostprice: data.prcostprice,
            prdemandamount: data.prdemandamount,
        }
    })
}
