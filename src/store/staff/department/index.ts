import {store} from "@/store";

export const departmentStore = store('department',{
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
                department_size: 1,
                pageSize: 15,
                dname: '',
                position: '',
                duty: '',
                pages: 0,
                total: 0
            }

        }
    },
    actions: {
    }
})
