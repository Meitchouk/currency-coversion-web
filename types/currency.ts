export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

export interface CurrencyOption extends Currency {
  value: string;
  label: string;
}
