import {store} from "@/store";

export const staffStore = store('staff',{
    state: () => {
        return {
            department: {
                did: '',
                dname: '',
                position: '',
                duty: '',
                created: '',
                updated: ''
            },
            query : {
                depar_query: {
                    size: 1,
                    pageSize: 15,
                    dname: '',
                    position: '',
                    duty: '',
                    pages: 0,
                    total: 0
                }
            }

        }
    },
    actions: {
    }
})
