export type NavbarItem = {
  condition: boolean;
  id: number;
  title: string;
  url: string;
};

export type DropdownItem = {
  condition: boolean;
  id: number;
  title: string;
  url: string;
};

export type Media = {
  id: number;
  image: string;
  url: string;
  title: string;
  overview: string;
};

export type SelectOption = {
  id: number;
  value: string;
  label: string;
};
