import axios, { AxiosStatic } from 'axios';
import { Project } from '../../stores/list-projects-store';
import { ResponseLogin } from '../../stores/user-auth-store';

export class ApiClient {
    constructor(
        private _client: AxiosStatic = axios,
    ) {
        axios.interceptors.response.use();
    }

    private get client() {
        this._client.defaults.headers.common["Content-Type"] = "application/json";
        this._client.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") ?? ""}`;
        return this._client;
    }

    login = async (data: any): Promise<ResponseLogin[]> => {
        return await this.client.post<ResponseLogin[]>("https://private-052d6-testapi4528.apiary-mock.com/authenticate", data).then((response) => response.data);
    }

    getListProjectsUser = async (): Promise<Project[]> => {
        return await this.client.get<Project[]>("https://private-052d6-testapi4528.apiary-mock.com/info").then((response) => response.data);
    }

}