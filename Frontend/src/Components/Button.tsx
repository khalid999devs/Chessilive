const Button = ({
  onClick,
  children,
  classes,
}: {
  onClick: () => void;
  children: React.ReactNode;
  classes: string;
}) => {
  return (
    <button
      className={
        'bg-green-500 hover:bg-green-700 transition-all duration-300 text-white font-bold py-2 px-4 rounded ' +
        classes
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
