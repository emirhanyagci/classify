import axiosInstance from "@/lib/axios";

export function uploadAvatar(file: Blob) {

    const formData = new FormData();
    formData.append('avatar', file, 'avatar.jpg');
    console.log(formData);

    return axiosInstance.post('/user/upload-avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
