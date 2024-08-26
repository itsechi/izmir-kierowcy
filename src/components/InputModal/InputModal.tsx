import styles from './InputModal.module.css';
import { DayPicker } from 'react-day-picker';
import { pl } from 'date-fns/locale';
import { getDayOfWeek } from '../../helpers/calendarHelpers';

const InputModal = ({
  handleSubmit,
  handleCloseModal,
  driverName,
  setDriverName,
  selectedDay,
  setSelectedDay,
  weekDay,
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
          footer={weekDay ? `Selected: ${weekDay}` : 'Pick a day.'}
          locale={pl}
          required
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
