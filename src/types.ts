export interface Item {
  id: string;
  date: string;
  names: Driver[];
}

export interface Driver {
  name: string;
  towar: boolean;
}
