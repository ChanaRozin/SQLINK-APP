
import { observer } from 'mobx-react-lite';
import { Profile } from '../profile';
import { ListProjects } from '../list-projects/list-projects';
import styles from './information.module.scss';
import { Title } from '../../shared/title/title';

export const Information = observer(() => {

  return (
    <div className={styles.container}>
      <Title title={"Information"}></Title>
      <Profile></Profile>
      <br></br>
      <ListProjects></ListProjects>
    </div>
  )
});