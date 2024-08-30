import styles from './Button.module.css';

type ButtonProps = {
  onClick: () => void;
  styling: string;
  children: React.ReactNode;
};

export const Button = ({ onClick, children, styling }: ButtonProps) => {
  return (
    <button className={styles[styling]} onClick={onClick}>
      {children}
    </button>
  );
};
