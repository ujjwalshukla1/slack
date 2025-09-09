import {axiosInstance} from './axiosInstance';

export async function getStreamToken() {
    const response = await axiosInstance.get('/chat/token');
    return response.data;
}