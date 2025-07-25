import { Input } from '@what-today/design-system';
import { Select } from '@what-today/design-system';
import { ArtIcon, BusIcon, FoodIcon, PlusIcon, SportIcon, TourIcon, WellbeingIcon } from '@what-today/design-system';
import { DatePicker } from '@what-today/design-system';
import { TimePicker } from '@what-today/design-system';
import { Button } from '@what-today/design-system';
import { useState } from 'react';

export default function CreateExperience() {
  const [title, setTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState<{ value: string; label: React.ReactNode } | null>(null);
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [selectedTime, setSelectedTime] = useState<{ hour: string; minute: string } | null>(null);
  return (
    <div className='mt-40'>
      <div className='flex flex-col gap-40'>
        <div>
          <Input.Root className='w-full'>
            <Input.Label>제목</Input.Label>
            <Input.Wrapper>
              <Input.Field
                placeholder='제목을 입력해 주세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div>
          <Select.Root value={selectedValue} onChangeValue={(value) => setSelectedValue(value)}>
            <Select.Trigger className='w-300 rounded-2xl border bg-white px-15 py-10'>
              <Select.Value placeholder='카테고리를 선택해 주세요' />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>카테고리</Select.Label>
                <Select.Item className='flex gap-10' value='apple'>
                  <ArtIcon /> 문화예술
                </Select.Item>
                <Select.Item className='flex gap-10' value='banana'>
                  <FoodIcon /> 음식
                </Select.Item>
                <Select.Item className='flex gap-10' value='banana'>
                  <SportIcon /> 스포츠
                </Select.Item>
                <Select.Item className='flex gap-10' value='banana'>
                  <WellbeingIcon /> 웰빙
                </Select.Item>
                <Select.Item className='flex gap-10' value='banana'>
                  <BusIcon /> 버스
                </Select.Item>
                <Select.Item className='flex gap-10' value='banana'>
                  <TourIcon /> 여행
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <div>
          <Input.Root className='w-full' size='md'>
            <Input.Label>입력 폼에서 사용</Input.Label>
            <Input.Wrapper>
              <Input.Textarea
                autoHeight
                className='h-50'
                placeholder='크기 조정이 가능한 textarea입니다.'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div>
          <Input.Root className='w-full'>
            <Input.Label>가격</Input.Label>
            <Input.Wrapper>
              <Input.Field placeholder='가격을 입력해주세요' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div>
          <Input.Root className='w-full'>
            <Input.Label>주소</Input.Label>
            <Input.Wrapper>
              <Input.Field placeholder='주소를 입력해주세요' />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div className='flex items-center gap-20'>
          <div className=''>
            <DatePicker />
          </div>
          <div className=''>
            <TimePicker value={selectedTime} onChange={setSelectedTime} />
          </div>
          <Button
            className='flex h-fit w-fit cursor-pointer items-center rounded-full bg-sky-400 p-10'
            size='xs'
            variant='none'
          >
            <PlusIcon className='size-20' color='black' />
          </Button>
        </div>
        <div />
        <div className='flex justify-center'>
          <Button className='w-138' size='sm' variant='fill'>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
