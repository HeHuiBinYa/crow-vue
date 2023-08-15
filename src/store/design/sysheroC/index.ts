import {store} from "@/store/index";

export const sysHeroCStore = store('sysHeroC',{
    state: () => {
        return {
            data: {
                sys_heroC: {
                    cid: "",
                    bid: "",
                    cName: "",
                    created: "",
                    updated: ""
                },
                cname: "",
                size: 1,
                sizePage: 3,
            }
        }
    },
    actions: {
    }
})
