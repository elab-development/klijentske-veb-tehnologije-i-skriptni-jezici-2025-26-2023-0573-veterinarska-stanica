import "./Polje.css";
interface PoljeProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}
export default function Polje({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: PoljeProps) {
  return (
    <div className="polje">
      <label className="polje-label">
        {label}
        {required && " *"}
      </label>
      <input
        className="polje-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
