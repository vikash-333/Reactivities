import axios, { AxiosResponse } from 'axios';
import { Activity } from '../../models/Activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity []>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<Activity>('/activities/',activity),
    update: (activity: Activity) => requests.put<Activity>(`/activities/${activity.id}`,activity),
    delete: (id: string) => requests.delete<Activity>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;