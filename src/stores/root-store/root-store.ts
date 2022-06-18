import axios from 'axios';
import { ApiClient } from '../../shared/api/api-client';
import { RouterStore, syncHistoryWithStore } from '@superwf/mobx-react-router';
import { createBrowserHistory } from 'history';
import { UserAuthStore } from '../user-auth-store';
import { ListProjectsStore } from '../list-projects-store';

export class RootStore {

    constructor() {
        const history = createBrowserHistory();
        syncHistoryWithStore(history, this.routerStore);
    }

    routerStore = new RouterStore();
    apiClient = new ApiClient(axios);
    userAuthStore = new UserAuthStore(this.apiClient, this.routerStore);
    listProjectsStore = new ListProjectsStore(this.apiClient);
}


