import { zodResolver } from '@hookform/resolvers/zod';
import { AddressInput, Button, DatePicker, MinusIcon, PlusIcon, Select, TimePicker } from '@what-today/design-system';
import type { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import DescriptionTextarea from '@/components/experiences/DescriptionTextarea';
import ImageInput from '@/components/experiences/ImageInput';
import PriceInput from '@/components/experiences/PriceInput';
import TitleInput from '@/components/experiences/TitleInput';
import { createExperienceFormSchema } from '@/schemas/experiences';

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
      {(value ?? []).map((schedule, idx) => (
        <div key={idx} className='flex flex-col items-center gap-8 md:flex-row'>
          <div className='w-full flex-1'>
            <DatePicker value={schedule.date} onChange={() => {}} />
          </div>

          <div className='flex w-full flex-wrap items-center gap-8 md:w-auto'>
            <div className='flex-1 md:w-120'>
              <TimePicker className='w-full' value={schedule.startTime} onChange={() => {}} />
            </div>
            <div className='flex-1 md:w-120'>
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
              className='w-full md:w-120'
              value={temp.startTime}
              onChange={(time) => setTemp((prev) => ({ ...prev, startTime: time }))}
            />
          </div>
          <div className='flex-1'>
            <TimePicker
              className='w-full md:w-120'
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

  // const [selectedValue, setSelectedValue] = useState<SelectItem | null>(null);
  // const [schedules, setSchedules] = useState<Schedule[]>([]);
  // const [bannerImage, setBannerImage] = useState<string>('');
  // const [introImages, setIntroImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createExperienceFormSchema),
    mode: 'onSubmit', // or 'onSubmit'
    defaultValues: {
      title: '',
      category: null,
      description: '',
      price: '',
      address: '',
      schedules: [],
      bannerFile: '',
      subImageFiles: [],
    },
  });

  return (
    <div className='m-auto w-full max-w-700'>
      <h1 className='text-2xl font-bold md:text-3xl'>내 체험 등록</h1>

      <form className='flex flex-col gap-24' onSubmit={handleSubmit((data) => console.log(data))}>
        <TitleInput {...register('title')} error={errors.title?.message} />

        <div>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <Select.Root value={field.value} onChangeValue={field.onChange}>
                <Select.Title className='font-normal'>카테고리</Select.Title>
                <Select.Trigger className={errors.category ? 'border border-red-500' : 'border border-gray-300'}>
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
            )}
          />
          <p className='text-sm text-red-500'>{errors.category?.message}</p>
        </div>

        <DescriptionTextarea {...register('description')} error={errors.description?.message} />

        <PriceInput {...register('price')} error={errors.price?.message} />

        <Controller
          control={control}
          name='address'
          render={({ field, fieldState }) => (
            <AddressInput error={fieldState.error?.message} value={field.value} onChange={field.onChange} />
          )}
        />

        <div>
          <p className='mb-4 block'>예약 가능한 시간대</p>
          {/* <ScheduleInput value={schedules} onChange={setSchedules} /> */}
          <Controller
            control={control}
            name='schedules'
            render={({ field, fieldState }) => (
              <>
                <ScheduleInput value={field.value} onChange={field.onChange} />
                {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <p className='mb-4 block'>배너 이미지 등록</p>
          {/* <ImageInput max={1} value={watch('bannerFile')} onChange={(url) => setValue('bannerFile', url)} /> */}
          <Controller
            control={control}
            name='bannerFile'
            render={({ field, fieldState }) => (
              <>
                <ImageInput max={1} value={field.value} onChange={field.onChange} />
                {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <p className='mb-4 block'>소개 이미지 등록</p>
          {/* <ImageInput max={4} value={watch('subImageFiles')} onChange={(url) => setValue('subImageFiles', url)} /> */}
          <Controller
            control={control}
            name='subImageFiles'
            render={({ field, fieldState }) => (
              <>
                <ImageInput max={4} value={field.value} onChange={field.onChange} />
                {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div className='flex justify-center'>
          <Button size='sm' type='submit' variant='fill' onClick={() => {}}>
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
