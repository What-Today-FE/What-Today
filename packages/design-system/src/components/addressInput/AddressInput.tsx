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
        <Input.Wrapper>
          <Input.Field readOnly placeholder='주소를 입력해 주세요' value={value} onClick={handleClick} />
        </Input.Wrapper>
        <Input.ErrorMessage />
      </Input.Root>
    </div>
  );
}
