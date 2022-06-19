import { makeAutoObservable } from 'mobx';
import { ApiClient } from '../shared/api/api-client';
import { TypeOfTag } from 'typescript';

export type ListProjectForm = {
    filterValue: string,
    sortValue: string
};

export type Project = {
    id: string;
    name: string;
    score: number;
    durationInDays: string;
    bugsCount: number;
    madeDadeline: boolean
};

export class ListProjectsStore {
    listProjectsUser: Project[] = [];
    listProjectsUserFilter: Project[] = [];
    columnsData: any = [];
    optionToSort: { label: string, value: TypeOfTag }[] = [];
    percentageProjectsDeadline: number = 0;
    averageScore: number = 0;
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
        this.listProjectsUserFilter = response;
        this.setAverageScore();
        this.setPercentageProjectsDeadline();
        this.columnsData = Object.entries(this.listProjectsUser[0]).map((key) => {
            return {
                Header: key[0],
                accessor: key[0]
            }
        });
        Object.entries(this.listProjectsUser[0]).forEach((item) => {
            this.optionToSort.push({
                label: item[0],
                value: typeof item[1]
            })
        });
        // this.optionToSort = [{
        //     label: " key[0] as string",
        //     value: "typeof key[1] as string"
        // }]
    };


    sortBy = (label: string | undefined, type: TypeOfTag | undefined) => {
        const name = label as keyof Project;
        if (name !== undefined && type !== undefined) {
            switch (type) {
                case 'number':
                    {
                        this.listProjectsUserFilter = this.listProjectsUserFilter.slice().sort((a, b) => Number(a[name]) - Number(b[name]));
                        return;
                    }
                case 'string':
                    {
                        this.listProjectsUserFilter = this.listProjectsUserFilter.slice().sort((a, b) => String(a[name]).localeCompare(String(b[name])));
                        return;
                    }
                case 'boolean':
                    {
                        this.listProjectsUserFilter = this.listProjectsUserFilter.slice().sort((a, b) => a[name] === b[name] ? 0 : a[name] ? -1 : 1);;
                        return;
                    }
            }
        }
    };

    filterByName = (form: ListProjectForm) => {
        if (form.filterValue === undefined)
            this.listProjectsUserFilter = this.listProjectsUser
        else
            this.listProjectsUserFilter = this.listProjectsUser.filter(item => { return item.name.includes(form.filterValue) });
        this.setAverageScore();
        this.setPercentageProjectsDeadline();
    }

    setPercentageProjectsDeadline = () => {
        const count = this.listProjectsUserFilter.filter(project => project.madeDadeline === true);
        this.percentageProjectsDeadline = count.length / this.listProjectsUserFilter.length;
    }

    setAverageScore = () => {
        const sumScore = this.listProjectsUserFilter.reduce((accumulator, current) => accumulator + current.score, 0);
        this.averageScore = sumScore / this.listProjectsUserFilter.length
    }

}