import { useSelectContext } from './context';

function SelectValue() {
  const { selectedItem } = useSelectContext();

  return selectedItem?.label ? <p>{selectedItem.label}</p> : <p className='text-gray-300'>값을 선택해주세요.</p>;
}

export const Value = SelectValue;
