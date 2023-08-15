import {store} from "@/store/index";

export const sysHeroAStore = store('sysHeroA',{
    state: () => {
        return {
            data: {
                sys_heroA: {
                    aid: "",
                    aName: "",
                    created: "",
                    updated: ""
                },
                aname: "",
                size: 1,
                sizePage: 3,
            }
        }
    },
    actions: {
    }
})
