import { useState } from 'react';
import './App.css';
import 'react-day-picker/style.css';
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './config/firebaseConfig';
import { Item } from './types';
import useFetchItems from './hooks/useFetchItems';
import ItemList from './components/ItemList/ItemList';
import InputModal from './components/InputModal/InputModal';

const MyDatePicker = () => {
  const { items, setItems } = useFetchItems();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [weekDay, setWeekDay] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverName, setDriverName] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedDay) return;

    const selectedDayString = selectedDay.toDateString();
    const existingItem = items.find((item) => item.date === selectedDayString);

    try {
      if (existingItem) {
        const docRef = doc(db, 'kierowcy', existingItem.id);
        await updateDoc(docRef, { names: arrayUnion(driverName) });

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === existingItem.id
              ? { ...item, names: [...item.names, driverName] }
              : item
          )
        );
      } else {
        const newDocRef = doc(collection(db, 'kierowcy'));
        const newItem: Item = {
          id: newDocRef.id,
          names: [driverName],
          date: selectedDayString,
        };
        await setDoc(newDocRef, newItem);

        setItems((prevItems) => [...prevItems, newItem]);
      }
    } catch (error) {
      console.error('Error updating or creating document:', error);
    }

    handleCloseModal();
  };

  return (
    <div className="my-date-picker">
      <button className="open-modal-btn" onClick={handleOpenModal}>
        Wpisz imię kierowcy
      </button>

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

      <div className="item-list">
        {items.map((item) => (
          <ItemList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MyDatePicker;
