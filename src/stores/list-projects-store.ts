import React from 'react';
import { makeAutoObservable, observable } from 'mobx';
import { ApiClient } from '../shared/api/api-client';
import { SubmissionErrors } from 'final-form';
import { TypeOfTag, visitLexicalEnvironment } from 'typescript';

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
    listProjectsUserFilter: Project[] = [];
    columnsData: any = [];
    optionToSort: { key: string, type: TypeOfTag }[] = [];
    optionToSortValue: string[] = ['score'];
    filterValue: string = "";
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
        this.columnsData = Object.entries(this.listProjectsUser[0]).map((key) => {
            return {
                Header: key[0],
                accessor: key[0]
            }
        });
        this.optionToSort = Object.entries(this.listProjectsUser[0]).map((key) => {
            return {
                key: key[0],
                type: typeof key[1]
            }
        });
    };


    sortBy = (value: any) => {
        const value1 = value as string[]
        const name: keyof Project = value1[0] as keyof Project;
        const type: TypeOfTag = value1[1] as TypeOfTag;
        this.optionToSortValue = value1;
        switch (type) {
            case 'number':
                {
                    this.listProjectsUser = this.listProjectsUser.slice().sort((a, b) => Number(a[name]) - Number(b[name]));
                    this.listProjectsUserFilter = this.listProjectsUserFilter.slice().sort((a, b) => Number(a[name]) - Number(b[name]));
                    return;
                }
            case 'string':
                {
                    this.listProjectsUser = this.listProjectsUser.slice().sort((a, b) => String(a[name]).localeCompare(String(b[name])));
                    this.listProjectsUserFilter = this.listProjectsUserFilter.slice().sort((a, b) => String(a[name]).localeCompare(String(b[name])));
                    return;
                }
            case 'boolean':
                {
                    this.listProjectsUser = this.listProjectsUser.slice().sort((a, b) => a[name] == b[name] ? 0 : a[name] ? -1 : 1);
                    this.listProjectsUserFilter = this.listProjectsUserFilter.slice().sort((a, b) => a[name] == b[name] ? 0 : a[name] ? -1 : 1);;
                    return;
                }
        }
    };

    filterByName = (value: any) => {
        this.filterValue = value
        this.listProjectsUserFilter = this.listProjectsUser.filter(item => { return item.name == value });
    }

}