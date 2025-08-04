import { Input } from '@what-today/design-system';
import { type ChangeEvent, memo, useEffect, useState } from 'react';

import type InputProps from '@/types/InputProps';

export interface PriceInputProps extends InputProps {
  value: number;
  onChange: (value: number) => void;
}

function PriceInput({ value, onChange, error }: PriceInputProps) {
  const formatNumber = (num: number | string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const unformatNumber = (str: string) => str.replaceAll(',', '');

  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (typeof value === 'number' && !isNaN(value)) {
      setDisplay(formatNumber(value));
    } else {
      setDisplay('');
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = unformatNumber(e.target.value);
    const numeric = Number(raw);

    if (!isNaN(numeric)) {
      setDisplay(formatNumber(numeric));
      onChange(numeric); // 외부에는 숫자로 전달
    } else {
      setDisplay('');
      onChange(0);
    }
  };

  const handleBlur = () => {
    const numeric = Number(unformatNumber(display));
    if (!isNaN(numeric)) {
      setDisplay(formatNumber(numeric));
    }
  };

  return (
    <Input.Root className='w-full' error={error}>
      <Input.Label>가격</Input.Label>
      <Input.Wrapper>
        <Input.Field
          inputMode='numeric'
          placeholder='가격을 입력해주세요'
          type='text'
          value={display}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(PriceInput);
