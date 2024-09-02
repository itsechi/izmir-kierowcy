import {
  deleteItem,
  removeDriverNameFromItem,
} from '../helpers/firebaseHelpers';
import { Item } from '../types';

const useItemActions = (
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const handleDeleteName = async (itemId: string, driverId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId
          ? { ...item, drivers: item.drivers.filter((n) => n.id !== driverId) }
          : item
      );

      // Check if any item has an empty `drivers` array and if so, delete the entire document
      const filteredItems = updatedItems.filter(
        (item) => item.drivers.length > 0
      );

      if (filteredItems.length !== updatedItems.length) {
        const emptyItem = updatedItems.find(
          (item) => item.id === itemId && item.drivers.length === 0
        );
        if (emptyItem) {
          deleteItem(itemId);
        }
      } else {
        const updatedDrivers = updatedItems.find(
          (item) => item.id === itemId
        )?.drivers;
        removeDriverNameFromItem(itemId, updatedDrivers);
      }

      return filteredItems;
    });
  };

  return {
    handleDeleteName,
  };
};

export default useItemActions;
