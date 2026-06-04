import "./Dugme.css";
interface DugmeProps {
  tekst: string;
  onClick?: () => void;
  tip?: "primarno" | "sekundarno" | "opasnost";
  disabled?: boolean;
  type?: "button" | "submit";
  fullWidth?: boolean;
}
export default function Dugme({
  tekst,
  onClick,
  tip = "primarno",
  disabled,
  type = "button",
  fullWidth,
}: DugmeProps) {
  return (
    <button
      className={`dugme dugme-${tip} ${fullWidth ? "full-width" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {tekst}
    </button>
  );
}
