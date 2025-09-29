interface GeneralSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  errorMessage?: string;
  containerClassName?: string;
}

export function GeneralSwitch({
  id,
  label,
  checked,
  onChange,
  errorMessage,
  containerClassName,
}: GeneralSwitchProps) {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName || ""}`}>
      <label htmlFor={id} className="text-[0.9rem] font-medium text-gray-600">
        {label}
      </label>
      <div
        className="relative inline-flex h-6 w-11 cursor-pointer items-center"
        onClick={() => onChange(!checked)}
      >
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-blue-500"></div>
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5"></div>
      </div>
      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
    </div>
  );
}
