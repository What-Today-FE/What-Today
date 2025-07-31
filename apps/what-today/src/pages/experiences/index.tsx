import { zodResolver } from '@hookform/resolvers/zod';
import { AddressInput, Button, DatePicker, MinusIcon, PlusIcon, Select, TimePicker } from '@what-today/design-system';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchActivityDetail } from '@/apis/activityDetail';
import { postExperiences, uploadImage } from '@/apis/experiences';
import DescriptionTextarea from '@/components/experiences/DescriptionTextarea';
import ImageInput from '@/components/experiences/ImageInput';
import PriceInput from '@/components/experiences/PriceInput';
import TitleInput from '@/components/experiences/TitleInput';
import { type createExperienceForm, createExperienceFormSchema } from '@/schemas/experiences';

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

function timeToMinutes(time: { hour: string; minute: string } | null): number {
  if (!time) return -1;
  return parseInt(time.hour) * 60 + parseInt(time.minute);
}

function isOverlappingSchedule(a: Schedule, b: Schedule): boolean {
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);

  const aDate = a.date?.format?.('YYYY-MM-DD');
  const bDate = b.date?.format?.('YYYY-MM-DD');

  if (aDate !== bDate) return false;

  return aStart < bEnd && bStart < aEnd;
}

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

    const hasOverlap = value.some((s) => isOverlappingSchedule(s, temp));
    if (hasOverlap) {
      alert('해당 시간대는 이미 다른 일정과 겹칩니다.');
      return;
    }

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

  // useEffect(() => {
  //   const { date, startTime, endTime } = temp;
  //   const isComplete = date && startTime && endTime;

  //   if (!isComplete) return;

  //   const hasOverlap = value.some((s) => isOverlappingSchedule(s, temp));
  //   if (hasOverlap) {
  //     alert('해당 시간대는 이미 다른 일정과 겹칩니다.');
  //     return;
  //   }

  //   onChange([...value, temp]);
  //   setTemp({ date: null, startTime: null, endTime: null });
  // }, [temp]);

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
  const { id: activityId } = useParams();
  const isEdit = !!activityId;

  const originalSubImageIdsRef = useRef<number[]>([]);
  const originalSubImageUrlsRef = useRef<string[]>([]);

  const originalScheduleIdsRef = useRef<number[]>([]);
  const originalSchedulesRef = useRef<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<createExperienceForm>({
    resolver: zodResolver(createExperienceFormSchema),
    mode: 'onSubmit', // or 'onSubmit'
    defaultValues: {
      title: '',
      category: {},
      description: '',
      price: 0,
      address: '',
      schedules: [],
      bannerFile: '',
      subImageFiles: [],
    },
  });

  // 🔹 이미지 URL → blob URL로 변환하는 유틸
  async function imageUrlToBlobUrl(imageUrl: string): Promise<string> {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  // 🔹 시간 문자열 → { hour, minute } 객체로 변환
  function parseTimeToObject(time: string) {
    const [hour, minute] = time.split(':');
    return { hour, minute };
  }

  // 🔹 체험 상세 데이터 불러오기 및 RHF 초기값 세팅
  async function loadExperienceDetail(activityId: string) {
    try {
      const { title, category, description, price, address, schedules, bannerImageUrl, subImages } =
        await fetchActivityDetail(activityId);
      const subImageUrls = subImages.map((img) => img.imageUrl);
      console.log(subImageUrls);
      // console.log(subImageUrls.subImages[0].imageUrl);

      // console.log(title, category, description, price, address, schedules, bannerImageUrl, subImageUrls);

      originalSubImageIdsRef.current = subImages.map((img) => img.id);
      originalSubImageUrlsRef.current = subImages.map((img) => img.imageUrl);

      originalScheduleIdsRef.current = schedules.map((s) => s.id);
      originalSchedulesRef.current = schedules.map((s) => `${s.date}_${s.startTime}_${s.endTime}`);

      console.log(originalSubImageIdsRef);
      console.log(originalSubImageUrlsRef);
      console.log(originalScheduleIdsRef);
      console.log(originalSchedulesRef);

      // reset({
      //   ...,
      //   subImageFiles: subImages.map((img) => img.imageUrl),
      //   schedules: schedules.map((s) => ({
      //     date: dayjs(s.date),
      //     startTime: parseTimeToObject(s.startTime),
      //     endTime: parseTimeToObject(s.endTime),
      //   })),
      // });

      reset({
        title,
        category: { value: category, label: category }, // Select 컴포넌트용
        description,
        price: price, // RHF에서는 문자열일 수 있음
        address,
        schedules: schedules.map((s) => ({
          date: dayjs(s.date),
          startTime: parseTimeToObject(s.startTime),
          endTime: parseTimeToObject(s.endTime),
        })),
        bannerFile: bannerImageUrl,
        subImageFiles: subImageUrls,
      });
    } catch (err) {
      console.error('체험 상세 로딩 실패:', err);
      alert('체험 정보를 불러오지 못했습니다.');
    }
  }

  useEffect(() => {
    if (!isEdit || !activityId) return;
    loadExperienceDetail(activityId);
  }, [isEdit, activityId]);

  async function blobUrlToFile(blobUrl: string, fileName: string): Promise<File> {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  const onSubmit: SubmitHandler<createExperienceForm> = async (data: createExperienceForm) => {
    try {
      // 1-1. bannerFile 업로드
      const bannerFile = await blobUrlToFile(data.bannerFile, 'banner.png');
      const bannerImageUrl = await uploadImage(bannerFile);

      // 1-2. subImageFiles 업로드
      const subImageUrls = await Promise.all(
        data.subImageFiles.map((blobUrl, index) =>
          blobUrlToFile(blobUrl, `sub_${index}.png`).then((file) => uploadImage(file)),
        ),
      );

      // 2. category, schedules 전처리
      const transformedCategory = data.category.value;

      const transformedSchedules = data.schedules.map((schedule) => {
        const formattedDate = schedule.date?.format?.('YYYY-MM-DD') ?? '';
        const formattedStart = `${schedule.startTime?.hour ?? '00'}:${schedule.startTime?.minute ?? '00'}`;
        const formattedEnd = `${schedule.endTime?.hour ?? '00'}:${schedule.endTime?.minute ?? '00'}`;

        return {
          date: formattedDate,
          startTime: formattedStart,
          endTime: formattedEnd,
        };
      });

      // 3. 데이터 재구성
      const finalData = {
        title: data.title,
        category: transformedCategory,
        description: data.description,
        price: Number(data.price),
        address: data.address,
        schedules: transformedSchedules,
        bannerImageUrl,
        subImageUrls,
      };

      // 4. 최종 제출
      await postExperiences(finalData);
      navigate('/');
    } catch (e) {
      console.error('이미지 업로드 실패:', e);
      alert('이미지 업로드 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className='m-auto w-full max-w-700'>
      <h1 className='text-2xl font-bold md:text-3xl'>내 체험 등록</h1>

      <form className='flex flex-col gap-24' onSubmit={handleSubmit(onSubmit)}>
        <TitleInput {...register('title')} error={errors.title?.message} />

        <div>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <Select.Root value={field.value} onChangeValue={field.onChange}>
                <Select.Title className='font-normal'>카테고리</Select.Title>
                <Select.Trigger className={errors.category ? 'border border-red-500' : 'border border-gray-100'}>
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
