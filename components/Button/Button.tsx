import styles from "./styles.module.css";

type ButtonProps = {
  title?: string;
  type?: "DEFAULT" | "WARNING" | "DANGER";
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

const Button = ({
  title,
  children,
  type = "DEFAULT",
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.main} ${styles[type]} ${className ?? ""}`}
      onClick={onClick}
    >
      {children ?? title}
    </button>
  );
};

export default Button;
