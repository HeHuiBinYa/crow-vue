import {store} from "@/store";

export const userStore = store('user',{
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
