'use client';

import { Select } from '@mantine/core';
import { CurrencyOption } from '@/types/currency';
import { ReactNode } from 'react';

interface CurrencySelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  currencies: CurrencyOption[];
  label: ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

export function CurrencySelect({
  value,
  onChange,
  currencies,
  label,
  placeholder = 'Select currency',
  disabled = false,
}: CurrencySelectProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data={currencies}
      searchable
      disabled={disabled}
      clearable={false}
      nothingFoundMessage="No currency found"
      comboboxProps={{ 
        shadow: 'md',
        transitionProps: { transition: 'pop', duration: 200 }
      }}
      styles={{
        label: {
          fontWeight: 500,
          marginBottom: 8,
        },
      }}
    />
  );
}
