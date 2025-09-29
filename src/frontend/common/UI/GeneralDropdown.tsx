import { UseFormRegisterReturn } from "react-hook-form";

interface GeneralDropdownProps {
  id: string;
  label: string;
  placeholder?: string; // opcional, se mostrará como opción vacía
  options: { label: string; value: string }[];
  register: UseFormRegisterReturn;
  errorMessage?: string;
  generalInputContainer?: string;
  value: string;
}

function GeneralDropdown({
  id,
  label,
  placeholder,
  options,
  value,
  register,
  errorMessage,
  generalInputContainer,
}: GeneralDropdownProps) {
  return (
    <article className={`flex flex-col gap-3 ${generalInputContainer || ""}`}>
      <article className="flex flex-col gap-y-1">
        <label htmlFor={id} className="text-[0.9rem] font-medium text-gray-600">
          {label}
        </label>

        <select
          id={id}
          value={value}
          className="h-10 w-full rounded-md border border-solid border-gray-300 py-2 pr-2 text-[0.9rem] text-gray-600 placeholder:pl-2 [&:not(:placeholder-shown)]:pl-2"
          {...register}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </article>

      {errorMessage ? (
        <p className="text-sm text-red-400">{errorMessage}</p>
      ) : null}
    </article>
  );
}

export { GeneralDropdown };
