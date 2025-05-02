"use client";
import { DropdownItem } from "@/types/other-types";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function Dropdown({
  dropdownItems,
  triggerContent,
}: Readonly<{ dropdownItems: DropdownItem[]; triggerContent: ReactNode }>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const handleTriggerButtonOnClick = () => {
    toggleIsOpen();
  };

  return (
    <div className="relative flex justify-center items-start p-2 gap-2">
      <button
        type="button"
        onClick={handleTriggerButtonOnClick}
        className={`flex justify-center items-center p-2 gap-2 ${
          isOpen ? "bg-red-600" : "bg-zinc-800 sm:hover:bg-red-500"
        } rounded-xl`}
      >
        {triggerContent}
      </button>
      {isOpen && (
        <ul className="absolute top-14 right-2 flex flex-col justify-center items-center bg-zinc-900 rounded-xl">
          {dropdownItems.map(
            (dropdownItem) =>
              dropdownItem.condition && (
                <li
                  key={dropdownItem.id}
                  className="w-full flex justify-center items-center p-2 hover:bg-zinc-800 rounded-xl"
                >
                  <Link
                    href={dropdownItem.url}
                    onClick={() => {
                      toggleIsOpen();
                    }}
                    className="text-nowrap"
                  >
                    {dropdownItem.title}
                  </Link>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
