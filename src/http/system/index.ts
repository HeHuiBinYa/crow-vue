import http from "@/http";

export const updateCarousel = (data: any) => {
    return http.post("/system/updateCarousel",{
        file: data
    },{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
