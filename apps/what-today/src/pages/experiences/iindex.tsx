import { Input } from '@what-today/design-system';
import { Select } from '@what-today/design-system';
import { ArtIcon, BusIcon, FoodIcon, PlusIcon, SportIcon, TourIcon, WellbeingIcon } from '@what-today/design-system';
import { DatePicker } from '@what-today/design-system';
import { TimePicker } from '@what-today/design-system';
import { Button } from '@what-today/design-system';
import { BannerInput } from '@what-today/design-system';
import { IntroduceInput } from '@what-today/design-system';
import { useState } from 'react';

export default function CreateExperience() {
  const [title, setTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState<{ value: string; label: React.ReactNode } | null>(null);
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [startTime, setStartTime] = useState<{ hour: string; minute: string } | null>(null);
  const [endTime, setEndTime] = useState<{ hour: string; minute: string } | null>(null);

  console.log(selectedValue);
  return (
    <div className='mt-40'>
      <div className='flex flex-col gap-40'>
        <div>
          <Input.Root className='w-full gap-10'>
            <Input.Label>제목</Input.Label>
            <Input.Wrapper>
              <Input.Field
                className='py-5'
                placeholder='제목을 입력해 주세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div>
          <Select.Root
            className='flex flex-col gap-10'
            value={selectedValue}
            onChangeValue={(value) => setSelectedValue(value)}
          >
            <Select.Title className='font-normal'>카테고리</Select.Title>
            <Select.Trigger className='py-15'>
              <Select.Value className='flex' placeholder='카테고리를 선택해 주세요' />
            </Select.Trigger>
            <Select.Content className='flex items-center'>
              <Select.Group>
                <Select.Label>카테고리</Select.Label>
                <Select.Item className='flex items-center gap-10' value='문화·예술'>
                  <ArtIcon className='size-15' /> 문화예술
                </Select.Item>
                <Select.Item className='flex items-center gap-10' value='음식'>
                  <FoodIcon className='size-15' /> 음식
                </Select.Item>
                <Select.Item className='flex items-center gap-10' value='스포츠'>
                  <SportIcon className='size-15' /> 스포츠
                </Select.Item>
                <Select.Item className='flex items-center gap-10' value='웰빙'>
                  <WellbeingIcon className='size-15' /> 웰빙
                </Select.Item>
                <Select.Item className='flex items-center gap-10' value='버스'>
                  <BusIcon className='size-15' /> 버스
                </Select.Item>
                <Select.Item className='flex items-center gap-10' value='여행'>
                  <TourIcon className='size-15' /> 여행
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <div>
          <Input.Root className='flex w-full gap-10' size='md'>
            <Input.Label>입력 폼에서 사용</Input.Label>
            <Input.Wrapper>
              <Input.Textarea
                autoHeight
                className='min-h-200'
                placeholder='체험에 대한 설명을 입력해 주세요.'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div>
          <Input.Root className='flex w-full gap-10'>
            <Input.Label>가격</Input.Label>
            <Input.Wrapper>
              <Input.Field placeholder='가격을 입력해주세요' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>
        <div>
          <Input.Root className='flex w-full gap-10'>
            <Input.Label>주소</Input.Label>
            <Input.Wrapper>
              <Input.Field placeholder='주소를 입력해주세요' />
            </Input.Wrapper>
            <Input.ErrorMessage />
          </Input.Root>
        </div>

        <div className='flex flex-col items-center gap-20 md:flex-row'>
          <div className='w-full'>
            <DatePicker />
          </div>
          <div className='flex justify-between gap-20'>
            <div className='flex items-center gap-10'>
              <div>
                <TimePicker value={startTime} onChange={setStartTime} />
              </div>
              <div>-</div>
              <div>
                <TimePicker value={endTime} onChange={setEndTime} />
              </div>
            </div>
            <div>
              <Button
                className='flex h-fit w-fit cursor-pointer items-center rounded-full bg-blue-400 p-10'
                size='xs'
                variant='none'
              >
                <PlusIcon className='size-20' color='white' />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <BannerInput />
        </div>
        <div>
          <IntroduceInput />
        </div>

        <div className='flex justify-center'>
          <Button className='w-138' size='sm' variant='fill'>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
