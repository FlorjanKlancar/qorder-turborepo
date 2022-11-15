type Props = {
  buttonText: string;
  buttonType: "orderButton" | "primary" | "secondary";
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  type?: "button" | "submit";
  disabled?: true | false;
  buttonSize: "sm" | "md";
};

export const Button = ({
  buttonText,
  buttonType,
  onClick,
  type,
  disabled,
  buttonSize,
}: Props) => {
  let buttonStyle;

  switch (buttonType) {
    case "orderButton":
      buttonStyle = `btn-${buttonSize} btn w-full border-default/80 bg-default`;
      break;
    case "primary":
      buttonStyle = `btn-${buttonSize} btn w-full border-green-500/80 bg-green-500`;
      break;
    case "secondary":
      buttonStyle = `btn-${buttonSize} btn btn-outline w-full`;
      break;
    default:
      buttonStyle = `btn-${buttonSize} btn w-full`;
  }
  return (
    <button
      className={buttonStyle}
      type={type ? type : "button"}
      disabled={disabled ? disabled : false}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
