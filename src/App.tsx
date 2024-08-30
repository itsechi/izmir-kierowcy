import { useEffect, useRef, useState } from 'react';
import 'react-day-picker/style.css';
import useFetchItems from './hooks/useFetchItems';
import ItemList from './components/ItemList/ItemList';
import InputModal from './components/InputModal/InputModal';
import { addNewDriverEntry, updateDriverName } from './helpers/firebaseHelpers';
import { Button } from './components/Button/Button';

const App = () => {
  const { items, setItems } = useFetchItems();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [weekDay, setWeekDay] = useState<string | undefined>();
  const [driverName, setDriverName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    if (!selectedDay) return;

    const selectedDayString = selectedDay.toDateString();
    const existingItem = items.find((item) => item.date === selectedDayString);

    try {
      if (existingItem) {
        await updateDriverName(existingItem.id, driverName);
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === existingItem.id
              ? { ...item, names: [...item.names, driverName] }
              : item
          )
        );
      } else {
        const newItem = await addNewDriverEntry(selectedDayString, driverName);
        setItems((prevItems) => {
          const updatedItems = [...prevItems, newItem];
          const sortedItems = updatedItems.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });
          return sortedItems;
        });
      }
    } catch (error) {
      console.error('Error updating or creating document:', error);
    }

    setDriverName('');
    setSelectedDay(new Date());
    handleCloseModal();
  };

  useEffect(() => {
    if (!listContainerRef.current) return;

    const todayDateString = new Date().toDateString();
    const todayItem = items.find((item) => item.date === todayDateString);
    if (todayItem) {
      const index = items.indexOf(todayItem);
      const itemElement = listContainerRef.current.children[
        index
      ] as HTMLDivElement;
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [items]);

  return (
    <div className="my-date-picker">
      <Button onClick={handleOpenModal} styling={'secondaryBtn'}>
        Wpisz imię kierowcy
      </Button>

      {isModalOpen && (
        <InputModal
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
          driverName={driverName}
          setDriverName={setDriverName}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          weekDay={weekDay}
          setWeekDay={setWeekDay}
        />
      )}

      <div className="item-list" ref={listContainerRef}>
        {items.map((item) => (
          <ItemList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
