import React from 'react';
import { makeAutoObservable } from 'mobx';
import { ApiClient } from '../shared/api/api-client';
import { SubmissionErrors } from 'final-form';

export type Project = {
    id: string;
    name: string;
    score: number;
    durationInDays: string;
    bugsCount: number;
    madeDadeline: boolean
}
export class ListProjectsStore {
    listProjectsUser: Project[] = [];
    constructor(
        public apiClient: ApiClient,
    ) {
        makeAutoObservable(this, {
            apiClient: false,
        });
    }

    getListProjectsUser = async () => {
        const response = await this.apiClient.getListProjectsUser();
        this.listProjectsUser = response;
    };

}