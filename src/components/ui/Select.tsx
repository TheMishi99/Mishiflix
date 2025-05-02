import { SelectOption } from "@/types/other-types";
import { SetStateAction, Dispatch } from "react";

export default function Select({
  options,
  value,
  setValue,
}: Readonly<{
  options: SelectOption[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}>) {
  return (
    <select
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
      className="p-2 bg-zinc-900 rounded-xl"
    >
      {options.map((o) => (
        <option key={o.id} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
