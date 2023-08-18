import {store} from "@/store";

export const procedureStore = store('procedure',{
    state: () => {
        return {
            data: {
                data: [{}],
                procedure: {
                    prdetailsnumber: "",
                    prprocedureid: "",
                    maid: "",
                    procedurename: "",
                    prlabourhouramount: "",
                    prsubtotal: "",
                    prmodulesubtotal: "",
                    prcostprice: "",
                    prdemandamount: ""
                },
                file: []
            }
        }
    },
    actions: {

    }
})
