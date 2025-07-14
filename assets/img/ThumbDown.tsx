type ThumbIconProps = {
  filled?: boolean;
  className?: string;
};

const ThumbDown = ({
  filled = false,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#f44336" : "none"}
    stroke="#f44336"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="24"
    height="24"
    style={{ transform: "rotate(180deg)" }}
  >
    <path d="M7 10v12H3V10h4zm2 0h6.586a2 2 0 0 1 1.789 2.894l-3.138 6.276a2 2 0 0 1-1.789 1.13H9V10z" />
  </svg>
);

export default ThumbDown;
