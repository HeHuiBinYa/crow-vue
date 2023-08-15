import {store} from "@/store/index";

export const sysHeroBStore = store('sysHeroB',{
    state: () => {
        return {
            data: {
                sys_heroB: {
                    bid: "",
                    aid: "",
                    bName: "",
                    created: "",
                    updated: ""
                },
                bname: "",
                size: 1,
                sizePage: 3,
            }
        }
    },
    actions: {
    }
})
