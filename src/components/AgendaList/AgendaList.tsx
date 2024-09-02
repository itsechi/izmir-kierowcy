import { Edit, Delete } from '@mui/icons-material';
import { getDayOfWeek } from '../../helpers/calendarHelpers';
import { Item } from '../../types';
import styles from './AgendaList.module.css';

type AgendaListProps = {
  items: Item[];
  listContainerRef: React.RefObject<HTMLDivElement>;
  handleDeleteName: (itemId: string, name: string) => void;
};

const AgendaList = ({
  items,
  listContainerRef,
  handleDeleteName,
}: AgendaListProps) => {
  return (
    <div className={styles.list} ref={listContainerRef}>
      {items.map((item) => (
        <AgendaItem
          key={item.id}
          item={item}
          handleDeleteName={handleDeleteName}
        />
      ))}
    </div>
  );
};

type AgendaItemProps = {
  item: Item;
  handleDeleteName: (itemId: string, name: string) => void;
};

const AgendaItem = ({ item, handleDeleteName }: AgendaItemProps) => {
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
        {item.names.map((driver, i) => (
          <li className={styles.itemName} key={i}>
            {driver.towar && <span className={styles.itemStatus}>T</span>}
            {driver.name}
            {/* <Edit /> */}
            <Delete onClick={() => deleteName(driver.name)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgendaList;
