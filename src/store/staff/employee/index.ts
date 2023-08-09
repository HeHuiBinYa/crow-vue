import {store} from "@/store";

export const employeeStore = store('employee',{
    state: () => {
        return {
            data: {
                employee: {
                    staffid: "",
                    ename: "",
                    sex: "男",
                    birth: "",
                    place: "",
                    age: "",
                    tel: "",
                    card: "",
                    department: {
                        did: "",
                    },
                    position: {
                        pid: "",
                    }
                },
                association: {
                    employeeVo: {
                        ename: "",
                        sex: "",
                        birth: [], // 出生日期
                        place: "",
                        tartingAge: "", // 开始年龄
                        endAge: "",     // 结束年龄
                        tel: "",
                        pid: "",
                        did: "",
                        state: "ZZ-01",
                        entrytime: [], // 入职时间
                        leavetim: [], // 离职时间
                        size: 1,
                        sizePage: 11,
                    },
                    edit_employee: {
                        eid: "",
                        ename: "",
                        sex: "",
                        birth: [], // 出生日期
                        age: "",
                        tel: "",
                        place: "",
                        pid: "",
                        did: "",
                        card: ""
                    },
                    data: [],
                },
                department: [{label: "请选择分配部门", value: 0}],
                position: [{label: "请选择分配职位", value: 0}]
            }
        }
    },
    actions: {
    }
})
