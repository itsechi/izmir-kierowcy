import { useState } from 'react';
import { addNewItem, updateItem } from '../helpers/firebaseHelpers';
import { Item } from '../types';

const useItemForm = (
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const [formState, setFormState] = useState({
    selectedDay: new Date(),
    driverName: '',
  });

  const handleDriverNameChange = (name: string) => {
    // Add validation
    setFormState((prevState) => {
      return {
        ...prevState,
        driverName: name,
      };
    });
  };

  const handleSelectedDayChange = (date: Date) => {
    // Add validation
    setFormState((prevState) => {
      return {
        ...prevState,
        selectedDay: date,
      };
    });
  };

  const handleSubmit = async () => {
    if (!formState.selectedDay) return;

    const selectedDayString = formState.selectedDay.toDateString();
    const existingItem = items.find((item) => item.date === selectedDayString);

    try {
      // If item with selected date exists in the db, update it
      if (existingItem) {
        await updateItem(existingItem.id, formState.driverName);
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === existingItem.id
              ? { ...item, names: [...item.names, formState.driverName] }
              : item
          )
        );
      } else {
        const newItem = await addNewItem(
          selectedDayString,
          formState.driverName
        );
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

    // handleCloseModal();
    setFormState({
      driverName: '',
      selectedDay: new Date(),
    });
  };

  return {
    formState,
    handleSubmit,
    handleDriverNameChange,
    handleSelectedDayChange,
  };
};

export default useItemForm;
