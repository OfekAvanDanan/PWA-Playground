export interface BillItem {
  name: string;
  price: number;
}

export class Bill {
  items: BillItem[];

  constructor(items: BillItem[] = []) {
    this.items = items;
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
