import {
  AddressInput,
  Button,
  DatePicker,
  MinusIcon,
  PlusIcon,
  Select,
  type SelectItem,
  TimePicker,
} from '@what-today/design-system';
import type { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DescriptionTextarea from '@/components/experiences/DescriptionTextarea';
import ImageInput from '@/components/experiences/ImageInput';
import PriceInput from '@/components/experiences/PriceInput';
import TitleInput from '@/components/experiences/TitleInput';

interface Time {
  hour: string;
  minute: string;
}

interface Schedule {
  date: Dayjs | null;
  startTime: Time | null;
  endTime: Time | null;
}

type ScheduleInputProps = {
  value: Schedule[];
  onChange: (schedules: Schedule[]) => void;
};

function ScheduleInput({ value, onChange }: ScheduleInputProps) {
  const [temp, setTemp] = useState<Schedule>({
    date: null,
    startTime: null,
    endTime: null,
  });
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleAddSchedule = () => {
    const { date, startTime, endTime } = temp;

    if (!date || !startTime || !endTime) {
      alert('날짜와 시간을 입력해주세요.');
      return;
    }

    const isAlreadyAdded = value.some((s) => s.date === date && s.startTime === startTime && s.endTime === endTime);
    if (isAlreadyAdded) return;

    onChange([...value, temp]);

    // 다음 입력을 위해 초기화
    setTemp({
      date: null,
      startTime: null,
      endTime: null,
    });
  };

  const handleRemoveSchedule = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  useEffect(() => {
    const { date, startTime, endTime } = temp;
    const isComplete = date && startTime && endTime;

    if (!isComplete) return;

    const isAlreadyAdded = value.some((s) => s.date === date && s.startTime === startTime && s.endTime === endTime);
    if (isAlreadyAdded) return;

    onChange([...value, temp]);
    setTemp({ date: null, startTime: null, endTime: null });
  }, [temp]);

  return (
    <div className='flex flex-col gap-12'>
      {/* 기존 일정 리스트 */}
      {value.map((schedule, idx) => (
        <div key={idx} className='flex flex-col items-center gap-8 md:flex-row'>
          <div className='w-full flex-1'>
            <DatePicker value={schedule.date} onChange={() => {}} />
          </div>

          <div className='flex w-full flex-wrap items-center gap-8 md:w-auto'>
            <div className='flex-1'>
              <TimePicker className='w-full' value={schedule.startTime} onChange={() => {}} />
            </div>
            <div className='flex-1'>
              <TimePicker className='w-full' value={schedule.endTime} onChange={() => {}} />
            </div>
            <Button
              className='aspect-square w-fit rounded-full bg-gray-200'
              variant='none'
              onClick={() => handleRemoveSchedule(idx)}
            >
              <MinusIcon color='white' />
            </Button>
          </div>
        </div>
      ))}

      {/* 입력 폼 */}
      <div className='flex flex-col items-center gap-8 md:flex-row'>
        <div className='w-full flex-1'>
          <DatePicker value={temp.date} onChange={(date) => setTemp((prev) => ({ ...prev, date }))} />
        </div>
        <div className='flex w-full flex-wrap items-center gap-8 md:w-auto'>
          <div className='flex-1'>
            <TimePicker
              className='w-full'
              value={temp.startTime}
              onChange={(time) => setTemp((prev) => ({ ...prev, startTime: time }))}
            />
          </div>
          <div className='flex-1'>
            <TimePicker
              className='w-full'
              value={temp.endTime}
              onChange={(time) => setTemp((prev) => ({ ...prev, endTime: time }))}
            />
          </div>
          <Button
            className='bg-primary-500 aspect-square w-fit rounded-full'
            variant='none'
            onClick={handleAddSchedule}
          >
            <PlusIcon color='white' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateExperience() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [selectedValue, setSelectedValue] = useState<SelectItem | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bannerImage, setBannerImage] = useState<string>('');
  const [introImages, setIntroImages] = useState<string[]>([]);

  return (
    <div className='m-auto w-full max-w-700'>
      <h1 className='text-2xl font-bold md:text-3xl'>내 체험 등록</h1>

      <div className='flex flex-col gap-24'>
        <TitleInput />

        <Select.Root className='' value={selectedValue} onChangeValue={setSelectedValue}>
          <Select.Title className='font-normal'>카테고리</Select.Title>
          <Select.Trigger>
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

        <DescriptionTextarea />

        <PriceInput />

        <AddressInput />

        <div>
          <p className='mb-4 block'>예약 가능한 시간대</p>
          <ScheduleInput value={schedules} onChange={setSchedules} />
        </div>

        <div>
          <p className='mb-4 block'>배너 이미지 등록</p>
          <ImageInput max={1} value={bannerImage} onChange={setBannerImage} />
        </div>

        <div>
          <p className='mb-4 block'>소개 이미지 등록</p>
          <ImageInput max={4} value={introImages} onChange={setIntroImages} />
        </div>

        <div className='flex justify-center'>
          <Button
            size='sm'
            variant='fill'
            onClick={() => {
              console.log(selectedValue, schedules, bannerImage, introImages);
            }}
          >
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
