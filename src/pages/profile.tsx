import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useRootStore } from '../stores/root-store/use-root-store';
import { BasicCard } from './card/card';

export const Profile = observer(() => {
  useEffect(()=>{
    console.log("vkkkkkkkkkkkkkkkkkkkk");
  },[])
  const { userAuthStore } = useRootStore();
  const profileDataCategory = userAuthStore.user ? Object.entries(userAuthStore.user).map((key, i) => {
    return (
      <>
        <Typography variant="h5" >
          {key[0]} :
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {key[1]}
        </Typography>
      </>
    );
  }) : null;
  return (
    <>
      {profileDataCategory}
    </>
  );
})
