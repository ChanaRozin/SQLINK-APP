import { observer } from "mobx-react-lite";
import styles from './title.module.scss';

type Props={
    title:string
}
export const Title = observer((props:Props) => {

    const {title}=props;

      return (
    <p className={styles.title}>{title}</p>
      );
    })