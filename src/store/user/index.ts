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
                eid: '',
                staffid: '',
                ename: '',
                sex: '',
                birth: '',
                place: '',
                age: '',
                tel: '',
                card: '',
                entrytime: ''
            }
        }
    },
    actions: {
        btn : function f() {
            return "";
        }
    }
})
