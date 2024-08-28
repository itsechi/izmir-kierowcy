import styles from './InputModal.module.css';
import { DayPicker } from 'react-day-picker';
import { pl } from 'date-fns/locale';
import { getDayOfWeek } from '../../helpers/calendarHelpers';

type InputModalProps = {
  handleSubmit: () => void;
  handleCloseModal: () => void;
  driverName: string;
  setDriverName: (name: string) => void;
  selectedDay?: Date;
  setSelectedDay: (date: Date) => void;
  weekDay?: string;
  setWeekDay: (day: string) => void;
};

const InputModal: React.FC<InputModalProps> = ({
  handleSubmit,
  handleCloseModal,
  driverName,
  setDriverName,
  selectedDay,
  setSelectedDay,
  setWeekDay,
}) => {
  const onDaySelect = (date: Date) => {
    if (!date) return;
    setWeekDay(getDayOfWeek(date));
    setSelectedDay(date);
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
          selected={selectedDay}
          onSelect={onDaySelect}
          locale={pl}
          required
          className={styles.modalCalendar}
        />

        <h2>Wpisz imię kierowcy</h2>
        <input
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          placeholder="Wpisz imię kierowcy"
          className={styles.modalInput}
        />

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default InputModal;
