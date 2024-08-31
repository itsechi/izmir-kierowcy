import { getDayOfWeek } from '../../helpers/calendarHelpers';
import { Item } from '../../types';
import styles from './ItemList.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

type ListProps = {
  item: Item;
  handleDeleteName: (itemId: string, name: string) => void;
};

const List = ({ item, handleDeleteName }: ListProps) => {
  const date = new Date(item.date);
  const day = getDayOfWeek(date);
  const dateString = date.toLocaleDateString();
  const isToday = item.date === new Date().toDateString();

  const deleteName = (name: string) => {
    handleDeleteName(item.id, name);
  };

  return (
    <div className={isToday ? styles.itemToday : styles.item}>
      <p className={styles.itemDateString}>
        {day} <span className={styles.itemDate}>{dateString}</span>
      </p>
      <ul className={styles.itemNames}>
        {item.names.map((name) => (
          <li
            className={styles.itemName}
            key={name}
            onClick={() => deleteName(name)}
          >
            {name}
            <DeleteIcon />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
