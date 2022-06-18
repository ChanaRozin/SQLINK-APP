import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useRootStore } from '../stores/root-store/use-root-store';
import { BasicCard } from './card/card';

export const ListProjects = observer(() =>  {

  const { listProjectsStore } = useRootStore();

  useEffect(() => {
    listProjectsStore.getListProjectsUser()
  }, []);
console.log("listProjectsStore",listProjectsStore.listProjectsUser.length)
  return (
    <BasicCard data={listProjectsStore.listProjectsUser}></BasicCard>
  );
})
