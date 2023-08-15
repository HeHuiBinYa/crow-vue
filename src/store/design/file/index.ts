import {store} from "@/store/index";

export const sysFileStore = store('sysFile',{
    state: () => {
        return {
            page: {
                size: 1,
                sizePage: 1,
                pid: "",
                name: "",
                fid: "",
                register: "",
                checker: "",
                descr: "",
                checktag: "",
                total: 0,
                data: [{}],
                materials: []
            },
            file: {
                fid: "",
                register: "",
                name: "",
                pid: "",
                aid: "",
                bid: "",
                cid: "",
                type: "",
                unit: "",
                grou: "",
                checktag: "S001-0",
                costprice: "",
                listprice: "",
                descr: "",
            },
            mate: {
                mid: "",
                design: "",
                designname: "",
                type: "",
                describer: "",
                pricesum: "",
                amount: "",
                munit: "",
                price: "",
                total:""
            },
            data: []
        }
    },
    actions: {
    }
})
