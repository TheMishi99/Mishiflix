"use client";
import { DropdownItem } from "@/types/other-types";
import Link from "next/link";
import { ReactNode, useState } from "react";
import Button from "./Button";

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
      <Button
        type="button"
        variant="secondary"
        onClick={handleTriggerButtonOnClick}
      >
        {triggerContent}
      </Button>
      {isOpen && (
        <ul className="absolute top-14 right-2 flex flex-col justify-center items-center bg-zinc-900 rounded-xl">
          {dropdownItems.map(
            (dropdownItem) =>
              dropdownItem.condition && (
                <li
                  key={dropdownItem.id}
                  className="w-full flex justify-center items-center hover:bg-zinc-800 rounded-xl"
                >
                  {dropdownItem.type === "button" ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={dropdownItem.onClick}
                    >
                      {dropdownItem.content}
                    </Button>
                  ) : dropdownItem.type === "link" ? (
                    <Link
                      href={dropdownItem.url}
                      onClick={() => {
                        toggleIsOpen();
                      }}
                      className="text-nowrap p-2"
                    >
                      {dropdownItem.content}
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
