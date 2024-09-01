import {
  deleteItem,
  removeDriverNameFromItem,
} from '../helpers/firebaseHelpers';
import { Item } from '../types';

const useItemActions = (
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const handleDeleteName = async (itemId: string, name: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId
          ? { ...item, names: item.names.filter((n) => n !== name) }
          : item
      );

      // Check if any item has an empty `names` array and if so, delete the entire document
      const filteredItems = updatedItems.filter(
        (item) => item.names.length > 0
      );

      if (filteredItems.length !== updatedItems.length) {
        const emptyItem = updatedItems.find(
          (item) => item.id === itemId && item.names.length === 0
        );
        if (emptyItem) {
          deleteItem(itemId);
        }
      } else {
        removeDriverNameFromItem(itemId, name);
      }

      return filteredItems;
    });
  };

  return {
    handleDeleteName,
  };
};

export default useItemActions;
