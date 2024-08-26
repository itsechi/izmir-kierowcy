import { getDayOfWeek } from '../../helpers/calendarHelpers';
import { Item } from '../../types';

const List: React.FC<{ item: Item }> = ({ item }) => {
  const date = new Date(item.date);
  const day = getDayOfWeek(date);
  const dateString = date.toLocaleDateString();

  return (
    <div className="list-item">
      <p>
        {day}, {dateString}
      </p>
      {item.names.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
};

export default List;
