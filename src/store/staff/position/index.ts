import {store} from "@/store";

export const positionStore = store('position',{
    state: () => {
        return {
            position: {
                pid: '',
                plevel: '',
                psalary: '',
                position: '',
                created: '',
                updated: ''
            },
            query : {
                position_size: 1,
                pageSize: 15,
                plevel: '',
                psalary: '',
                position: '',
                pages: 0,
                total: 0
            }

        }
    },
    actions: {
    }
})
