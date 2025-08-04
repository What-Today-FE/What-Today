import { Select } from '@what-today/design-system';

export default function CategorySelect() {
  return (
    <Select.Root className='flex flex-col gap-10' value={{ value: 'e', label: 'd' }}>
      <Select.Title className='font-normal'>카테고리</Select.Title>
      <Select.Trigger className='py-15'>
        <Select.Value className='flex' placeholder='카테고리를 선택해 주세요' />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>카테고리</Select.Label>
          <Select.Item value='문화 · 예술'>문화예술</Select.Item>
          <Select.Item value='식음료'>식음료</Select.Item>
          <Select.Item value='스포츠'>스포츠</Select.Item>
          <Select.Item value='투어'>투어</Select.Item>
          <Select.Item value='관광'>관광</Select.Item>
          <Select.Item value='웰빙'>웰빙</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
