'use client';

import { NumberInput } from '@mantine/core';
import { ReactNode } from 'react';

interface AmountInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
  label: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function AmountInput({
  value,
  onChange,
  label,
  placeholder = 'Enter amount',
  disabled = false,
  min = 0,
  max = 999999999,
}: AmountInputProps) {
  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      min={min}
      max={max}
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator=","
      hideControls
      styles={{
        label: {
          fontWeight: 500,
          marginBottom: 8,
        },
      }}
    />
  );
}
