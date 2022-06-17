import axios from 'axios';
import { ApiClient } from '../../shared/api/api-client';

export class RootStore {

    apiClient = new ApiClient(
        axios,
    );

}