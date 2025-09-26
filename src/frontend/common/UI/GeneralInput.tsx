import { UseFormRegisterReturn } from "react-hook-form";

interface GeneralInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  generalInputContainer?: string;
}

function GeneralInput({
  id,
  label,
  type,
  placeholder,
  register,
  errorMessage,
  generalInputContainer,
}: GeneralInputProps) {
  return (
    <article className={`flex flex-col gap-3 ${generalInputContainer || ""}`}>
      <article className="flex flex-col gap-y-1">
        <label htmlFor={id} className="text-[0.9rem] font-medium text-gray-600">
          {label}
        </label>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-solid border-gray-300 py-2 pr-2 text-[0.9rem] text-gray-600 placeholder:pl-2 [&:not(:placeholder-shown)]:pl-2"
          {...register}
        />
      </article>

      {errorMessage ? (
        <p className="text-sm text-red-400">{errorMessage}</p>
      ) : null}
    </article>
  );
}

export { GeneralInput };
