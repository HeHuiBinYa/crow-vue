import {store} from "@/store";

export const userStore = store('user',{
    state: () => {
        return {
            user: {
                username: "",
                password: "",
                tok: "",
                role: "",
            },
            account: {
                eid: 0,
                staffid: '',
                ename: '',
                sex: '',
                birth: '',
                place: '',
                age: '',
                tel: '',
                card: '',
                entrytime: '',
                did: 0
            }
        }
    },
    actions: {
        btn : function f() {
            return "";
        }
    }
})
