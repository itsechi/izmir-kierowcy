export interface Item {
  id: string;
  date: string;
  drivers: Driver[];
}

export interface Driver {
  id: string;
  name: string;
  towar: boolean;
}
