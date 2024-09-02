import { useRef } from 'react';
import 'react-day-picker/style.css';
import useFetchItems from './hooks/useFetchItems';
import AgendaList from './components/AgendaList/AgendaList';
import InputModal from './components/InputModal/InputModal';
import Button from './components/Button/Button';
import useItemForm from './hooks/useItemForm';
import useModal from './hooks/useModal';
import useScrollToToday from './hooks/useScrollToToday';
import useItemActions from './hooks/useItemActions';

const App = () => {
  const { items, setItems } = useFetchItems();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const {
    formState,
    formError,
    handleSubmit,
    handleSelectedDayChange,
    handleDriverNameChange,
    handleCheckboxChange,
  } = useItemForm(items, setItems, handleCloseModal);
  const { handleDeleteName } = useItemActions(setItems);

  // Scroll to today's date if it exists
  const listContainerRef = useRef<HTMLDivElement>(null);
  useScrollToToday(items, listContainerRef);

  return (
    <div className="my-date-picker">
      <Button onClick={handleOpenModal} styling={'secondaryBtn'}>
        Wpisz imię kierowcy
      </Button>

      {isModalOpen && (
        <InputModal
          formError={formError}
          handleCloseModal={handleCloseModal}
          formState={formState}
          handleSubmit={handleSubmit}
          handleSelectedDayChange={handleSelectedDayChange}
          handleDriverNameChange={handleDriverNameChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      <AgendaList
        listContainerRef={listContainerRef}
        handleDeleteName={handleDeleteName}
        items={items}
      />
    </div>
  );
};

export default App;
