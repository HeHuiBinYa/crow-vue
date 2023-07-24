import {defineStore} from "pinia";

export const useCounterStore = defineStore('counter',{
    state: () => {
        return {
            user: {
                username: "",
                password: "",
                tok: "",
                role: "",
            }
        }
    },
    actions: {
        btn : function f() {
            return "";
        }
    }
})
