import { useRef } from 'react';
import 'react-day-picker/style.css';
import useFetchItems from './hooks/useFetchItems';
import ItemList from './components/ItemList/ItemList';
import InputModal from './components/InputModal/InputModal';
import {
  deleteItem,
  removeDriverNameFromItem,
} from './helpers/firebaseHelpers';
import { Button } from './components/Button/Button';
import useItemForm from './hooks/useItemForm';
import useModal from './hooks/useModal';
import useScrollToToday from './hooks/useScrollToToday';

const App = () => {
  const { items, setItems } = useFetchItems();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const {
    formState,
    handleSubmit,
    handleSelectedDayChange,
    handleDriverNameChange,
  } = useItemForm(items, setItems);

  // Scroll to today's date if it exists
  const listContainerRef = useRef<HTMLDivElement>(null);
  useScrollToToday(items, listContainerRef);

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

  return (
    <div className="my-date-picker">
      <Button onClick={handleOpenModal} styling={'secondaryBtn'}>
        Wpisz imię kierowcy
      </Button>

      {isModalOpen && (
        <InputModal
          handleCloseModal={handleCloseModal}
          formState={formState}
          handleSubmit={handleSubmit}
          handleSelectedDayChange={handleSelectedDayChange}
          handleDriverNameChange={handleDriverNameChange}
        />
      )}

      <div className="item-list" ref={listContainerRef}>
        {items.map((item) => (
          <ItemList
            key={item.id}
            item={item}
            handleDeleteName={handleDeleteName}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
