import { SearchIcon } from '../icons';
import { Input } from '../input';
import { OpenDaumPostcode } from './OpenDaumPostcode';
import type { AddressInputProps } from './types';

export default function AddressInput({ value = '', onChange, error }: AddressInputProps) {
  const handleClick = () => {
    OpenDaumPostcode((selectedAddress) => {
      onChange?.(selectedAddress); // RHF가 이걸 통해 상태 업데이트
    });
  };

  return (
    <div className='w-full'>
      <Input.Root className='w-full' error={error}>
        <Input.Label>주소</Input.Label>
        <Input.Wrapper className='cursor-pointer'>
          <Input.Field
            readOnly
            className='cursor-pointer'
            placeholder='주소 찾기'
            value={value}
            onClick={handleClick}
          />
          <Input.Icon>
            <SearchIcon color='var(--color-gray-300)' />
          </Input.Icon>
        </Input.Wrapper>
        <Input.ErrorMessage />
      </Input.Root>
    </div>
  );
}
