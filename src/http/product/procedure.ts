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

export const insertNowProcedure = () => {
    return http.post("/product/insertNowProcedure",null,{
        params: {
            prdetailsnumber: manufactureStore().queryManufacture.procedure.prdetailsnumber,
            prprocedureid: manufactureStore().queryManufacture.procedure.prprocedureid,
            procedurename: manufactureStore().queryManufacture.procedure.procedurename,
            prlabourhouramount: manufactureStore().queryManufacture.procedure.prlabourhouramount,
            prreallabourhouramount: manufactureStore().queryManufacture.procedure.prreallabourhouramount,
            prsubtotal: manufactureStore().queryManufacture.procedure.prsubtotal,
            prrealsubtotal: manufactureStore().queryManufacture.procedure.prrealsubtotal,
            prmodulesubtotal: manufactureStore().queryManufacture.procedure.prmodulesubtotal,
            prrealmodulesubtotal: manufactureStore().queryManufacture.procedure.prrealmodulesubtotal,
            prcostprice: manufactureStore().queryManufacture.procedure.prcostprice,
            prdemandamount: manufactureStore().queryManufacture.procedure.prdemandamount,
            prrealamount: manufactureStore().queryManufacture.procedure.prrealamount,
            maid: manufactureStore().queryManufacture.manufacture.maid,
        }
    })
}

export const deleteProcedureById = () => {
    return http.post("/product/deleteProcedureById",null,{
        params: {
            id: manufactureStore().queryManufacture.procedure.prid
        }
    })
}

export const updateProcedure = () => {
    return http.post("/product/updateProcedure",null,{
        params: {
            procedurename: manufactureStore().queryManufacture.procedure.procedurename,
            prlabourhouramount: manufactureStore().queryManufacture.procedure.prlabourhouramount,
            prreallabourhouramount: manufactureStore().queryManufacture.procedure.prreallabourhouramount,
            prsubtotal: manufactureStore().queryManufacture.procedure.prsubtotal,
            prrealsubtotal: manufactureStore().queryManufacture.procedure.prrealsubtotal,
            prmodulesubtotal: manufactureStore().queryManufacture.procedure.prmodulesubtotal,
            prrealmodulesubtotal: manufactureStore().queryManufacture.procedure.prrealmodulesubtotal,
            prcostprice: manufactureStore().queryManufacture.procedure.prcostprice,
            prdemandamount: manufactureStore().queryManufacture.procedure.prdemandamount,
            prrealamount: manufactureStore().queryManufacture.procedure.prrealamount,
            prid: manufactureStore().queryManufacture.procedure.prid,
        }
    })
}
