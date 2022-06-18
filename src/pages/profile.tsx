import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/root-store/use-root-store';
import { BasicCard }  from './card/card';

export const Profile = observer(() =>  {
    const { userAuthStore } = useRootStore();
    console.log("userAuthStore",userAuthStore.user)
  return (
    <BasicCard data={userAuthStore.user}></BasicCard>
  );
})
