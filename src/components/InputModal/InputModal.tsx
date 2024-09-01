import styles from './InputModal.module.css';
import { DayPicker } from 'react-day-picker';
import { pl } from 'date-fns/locale';
import Button from '../Button/Button';

type InputModalProps = {
  formState: {
    selectedDay: Date;
    driverName: string;
    towar: boolean;
  };
  handleCloseModal: () => void;
  handleSubmit: () => void;
  handleSelectedDayChange: (date: Date) => void;
  handleDriverNameChange: (name: string) => void;
  handleCheckboxChange: (status: boolean) => void;
};

const InputModal: React.FC<InputModalProps> = ({
  handleCloseModal,
  formState,
  handleSubmit,
  handleSelectedDayChange,
  handleDriverNameChange,
  handleCheckboxChange,
}) => {
  const onDaySelect = (date: Date) => {
    if (!date) return;
    handleSelectedDayChange(date);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleCloseModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Wybierz dzień</h2>

        <DayPicker
          mode="single"
          selected={formState.selectedDay}
          onSelect={onDaySelect}
          locale={pl}
          required
          className={styles.modalCalendar}
        />

        <h2>Wpisz imię kierowcy</h2>
        <input
          type="text"
          value={formState.driverName}
          onChange={(e) => handleDriverNameChange(e.target.value)}
          placeholder="Wpisz imię kierowcy"
          className={styles.modalInput}
        />
        <label>
          Towar
          <input
            type="checkbox"
            checked={formState.towar}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          />
        </label>

        <Button onClick={handleSubmit} styling={'submitBtn'}>
          Dodaj
        </Button>
      </div>
    </div>
  );
};

export default InputModal;
