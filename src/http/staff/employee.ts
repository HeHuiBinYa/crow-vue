import http from "@/http"
import {employeeStore} from "@/store/staff/employee";
import {userStore} from "@/store/user/index"

export const getStaffId = () => {
    return http.get("/staff/employee_id")
}

export const increase_association = () => {
    return http.post("/staff/increase_association",null,{
        params: {
            staffid: employeeStore().$state.data.employee.staffid,
            ename: employeeStore().$state.data.employee.ename,
            sex: employeeStore().$state.data.employee.sex,
            birth: employeeStore().$state.data.employee.birth,
            place: employeeStore().$state.data.employee.place,
            age: employeeStore().$state.data.employee.age,
            tel: employeeStore().$state.data.employee.tel,
            card: employeeStore().$state.data.employee.card,
            did: employeeStore().$state.data.employee.department.did,
            pid: employeeStore().$state.data.employee.position.pid
        }
    })
}

export const edit_association = () => {
    return http.put("/staff/edit_association",null,{
        params: {
            eid: employeeStore().data.association.edit_employee.eid,
            ename: employeeStore().data.association.edit_employee.ename,
            sex: employeeStore().data.association.edit_employee.sex,
            birth: employeeStore().data.association.edit_employee.birth[0]+"-"+(employeeStore().data.association.edit_employee.birth[1] < 10 ? "0"+employeeStore().data.association.edit_employee.birth[1] : employeeStore().data.association.edit_employee.birth[1])+"-"+(employeeStore().data.association.edit_employee.birth[2] <= 10 ? "0"+employeeStore().data.association.edit_employee.birth[2] : employeeStore().data.association.edit_employee.birth[2]),
            place: employeeStore().data.association.edit_employee.place,
            age: employeeStore().data.association.edit_employee.age,
            tel: employeeStore().data.association.edit_employee.tel,
            card: employeeStore().data.association.edit_employee.card,
            pid: employeeStore().data.association.edit_employee.did,
            did: employeeStore().data.association.edit_employee.pid,
        }
    })
}

export const page_association = () => {
    return http.post("/staff/page_association",null,{
        params: {
            ename: employeeStore().data.association.employeeVo.ename,  // 员工姓名
            sex:  employeeStore().data.association.employeeVo.sex,  // 员工性别
            tel:  employeeStore().data.association.employeeVo.tel,  // 员工电话
            place:  employeeStore().data.association.employeeVo.place,  // 出生地址
            pid:  employeeStore().data.association.employeeVo.pid,  // 主键 ID
            did:  employeeStore().data.association.employeeVo.did,  // 主键 ID
            state: employeeStore().data.association.employeeVo.state,
            tartingAge:  employeeStore().data.association.employeeVo.tartingAge, // 年龄查询
            endAge:  employeeStore().data.association.employeeVo.endAge,
            initialDateOfBirth: employeeStore().data.association.employeeVo.birth[0], // 出生日期查询
            endDateOfBirth: employeeStore().data.association.employeeVo.birth[1],
            startDateOfEmployment: employeeStore().data.association.employeeVo.entrytime[0], // 入职时间查询
            endOfEmploymentDate: employeeStore().data.association.employeeVo.entrytime[1],
            departureDate: employeeStore().data.association.employeeVo.leavetim[0],   // 离职时间查询
            terminationDate: employeeStore().data.association.employeeVo.leavetim[1],
            size: employeeStore().data.association.employeeVo.size,
            sizePage: employeeStore().data.association.employeeVo.sizePage
        }
    })
}

export const getAemployee = () => {
    return http.post("/staff/getAemployee",null,{
        params: {
            tok: userStore().user.tok
        }
    })
}
