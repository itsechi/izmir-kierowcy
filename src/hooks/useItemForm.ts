import { useState } from 'react';
import { addNewItem, updateItem } from '../helpers/firebaseHelpers';
import { Driver, Item } from '../types';

const useItemForm = (
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const [formState, setFormState] = useState({
    selectedDay: new Date(),
    driverName: '',
    towar: false,
  });
  const [formError, setFormError] = useState('');

  const handleDriverNameChange = (name: string) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        driverName: name,
      };
    });
  };

  const handleSelectedDayChange = (date: Date) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        selectedDay: date,
      };
    });
  };

  const handleCheckboxChange = (status: boolean) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        towar: status,
      };
    });
  };

  const handleSubmit = async () => {
    if (!formState.selectedDay) {
      setFormError('Wybierz dzień');
      return;
    }
    if (formState.driverName.trim().length === 0) {
      setFormError('Pole nie może być puste');
      return;
    }

    const selectedDayString = formState.selectedDay.toDateString();
    const existingItem = items.find((item) => item.date === selectedDayString);

    try {
      // If item with selected date exists in the db, update it
      if (existingItem) {
        await updateItem(
          existingItem.id,
          formState.driverName,
          formState.towar
        );
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.id === existingItem.id) {
              const newDriver: Driver = {
                name: formState.driverName,
                towar: formState.towar,
              };
              return {
                ...item,
                names: [...item.names, newDriver],
              };
            } else {
              return item;
            }
          })
        );
      } else {
        const newItem = await addNewItem(
          selectedDayString,
          formState.driverName,
          formState.towar
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
      towar: false,
    });
  };

  return {
    formState,
    handleSubmit,
    handleDriverNameChange,
    handleSelectedDayChange,
    handleCheckboxChange,
    formError,
  };
};

export default useItemForm;
