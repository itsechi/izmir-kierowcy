import { getDayOfWeek } from '../../helpers/calendarHelpers';
import { Item } from '../../types';
import styles from './ItemList.module.css';

const List: React.FC<{ item: Item }> = ({ item }) => {
  const date = new Date(item.date);
  const day = getDayOfWeek(date);
  const dateString = date.toLocaleDateString();
  const isToday = item.date === new Date().toDateString();

  return (
    <div className={isToday ? styles.itemToday : styles.item}>
      <p className={styles.itemDateString}>
        {day} <span className={styles.itemDate}>{dateString}</span>
      </p>
      <ul className={styles.itemNames}>
        {item.names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
