import axios, { AxiosStatic } from 'axios';

export class ApiClient {
  constructor(
    private _client: AxiosStatic = axios,
  ) {
    axios.interceptors.response.use();
      
  }

  private get client() {
    this._client.defaults.headers.common["Content-Type"] = "application/ld+json";
    this._client.defaults.baseURL = process.env.REACT_APP_WIDGET_API_HOST;
    return this._client;
  }

  createChat = async (hotlineId: string, lang: string, clientIp: string, url: string): Promise<any> => {
    var body = {
      "hot_line_id": hotlineId,
      "language": lang,
      "client_ip": clientIp,
      "url": url
    };
    return await this.client.post<null>(`/chat-record/create`, body).then((response) => response.data);
  }

}