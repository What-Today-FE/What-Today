import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchActivityDetail } from '@/apis/activityDetail';
import { patchExperiences, postExperiences, uploadImage } from '@/apis/experiences';
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
  date?: Dayjs | null;
  startTime?: Time | null;
  endTime?: Time | null;
}

type ScheduleInputProps = {
  value: Schedule[];
  onChange: (schedules: Schedule[]) => void;
};

function timeToMinutes(time: { hour: string; minute: string } | null): number {
  if (!time) return -1;
  return parseInt(time.hour) * 60 + parseInt(time.minute);
}

function isOverlappingSchedule(a: Required<Schedule>, b: Required<Schedule>): boolean {
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
  const handleScheduleChange = (index: number, field: keyof Schedule, newValue: Dayjs | Time | null) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };

    const currentSchedule = updated[index];
    // 1. 시작 시간이 끝 시간보다 늦은지 검사
    if (currentSchedule.startTime && currentSchedule.endTime) {
      const startMinutes = timeToMinutes(currentSchedule.startTime);
      const endMinutes = timeToMinutes(currentSchedule.endTime);

      if (startMinutes >= endMinutes) {
        alert('시작 시간은 끝 시간보다 빨라야 합니다.');
        return; // 변경사항 적용하지 않음
      }
    }

    // 2. 현재 스케줄이 완성되었고, 다른 스케줄과 겹치는지 검사
    if (currentSchedule.date && currentSchedule.startTime && currentSchedule.endTime) {
      // 현재 인덱스를 제외한 다른 스케줄들과 비교
      const hasOverlap = updated
        .filter((_, idx) => idx !== index) // 현재 수정 중인 항목 제외
        .some((otherSchedule) => {
          // 완성된 스케줄만 비교
          if (!otherSchedule.date || !otherSchedule.startTime || !otherSchedule.endTime) {
            return false;
          }
          return isOverlappingSchedule(currentSchedule as Required<Schedule>, otherSchedule as Required<Schedule>);
        });

      if (hasOverlap) {
        alert('해당 시간대는 이미 다른 일정과 겹칩니다.');
        return; // 변경사항 적용하지 않음
      }
    }

    // 3. 마지막 행이 모두 입력되면 새로운 빈 행 추가
    if (index === value.length - 1) {
      const lastSchedule = updated[index];
      if (lastSchedule.date && lastSchedule.startTime && lastSchedule.endTime) {
        // 새로운 빈 행 추가
        updated.push({ date: null, startTime: null, endTime: null });
      }
    }

    onChange(updated);
  };

  const handleRemoveSchedule = (index: number) => {
    if (value.length <= 1) return; // 최소 하나는 유지

    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  // 항상 마지막에 빈 행이 있도록 보장
  const schedules = (() => {
    if (value.length === 0) {
      // 빈 배열이면 빈 행 하나 추가
      return [{ date: null, startTime: null, endTime: null }];
    }

    // 마지막 항목이 빈 행인지 확인
    const lastItem = value[value.length - 1];
    const isLastEmpty = !lastItem.date && !lastItem.startTime && !lastItem.endTime;

    if (isLastEmpty) {
      // 이미 마지막이 빈 행이면 그대로 반환
      return value;
    } else {
      // 마지막이 완성된 행이면 빈 행 추가
      return [...value, { date: null, startTime: null, endTime: null }];
    }
  })();

  return (
    <div className='flex flex-col gap-12'>
      {schedules.map((schedule, idx) => {
        const isLast = idx === schedules.length - 1;
        const scheduleKey =
          schedule?.date && schedule?.startTime && schedule?.endTime
            ? `${schedule.date.format?.('YYYY-MM-DD') ?? 'no-date'}-${schedule.startTime.hour}:${schedule.startTime.minute}-${schedule.endTime.hour}:${schedule.endTime.minute}`
            : `empty-schedule-${idx}`;
        const isComplete = schedule.date && schedule.startTime && schedule.endTime;

        return (
          <div key={scheduleKey} className='flex flex-col items-center gap-8 md:flex-row'>
            <div className='w-full flex-1'>
              <DatePicker value={schedule?.date || null} onChange={(date) => handleScheduleChange(idx, 'date', date)} />
            </div>
            <div className='flex w-full flex-wrap items-center gap-8 md:w-auto'>
              <div className='flex-1'>
                <TimePicker
                  className='w-full md:w-120'
                  value={schedule?.startTime || null}
                  onChange={(time) => handleScheduleChange(idx, 'startTime', time)}
                />
              </div>
              <div className='flex-1'>
                <TimePicker
                  className='w-full md:w-120'
                  value={schedule?.endTime || null}
                  onChange={(time) => handleScheduleChange(idx, 'endTime', time)}
                />
              </div>

              {/* 마지막 행이 아니거나, 완성된 행이면 삭제 버튼 표시 */}
              {(!isLast || isComplete) && (
                <Button
                  className='aspect-square w-fit rounded-full bg-gray-200'
                  variant='none'
                  onClick={() => handleRemoveSchedule(idx)}
                >
                  <MinusIcon color='white' />
                </Button>
              )}

              {/* 마지막 행이고 비어있으면 플레이스홀더 */}
              {isLast && (
                <Button className='bg-primary-500 aspect-square w-fit rounded-full' variant='none'>
                  <PlusIcon color='white' />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CreateExperience() {
  const navigate = useNavigate();
  const { id: activityId } = useParams();
  const isEdit = !!activityId;
  const queryClient = useQueryClient();

  const originalSubImageIdsRef = useRef<number[]>([]);
  const originalSubImageUrlsRef = useRef<string[]>([]);

  const originalScheduleIdsRef = useRef<number[]>([]);
  const originalSchedulesRef = useRef<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createExperienceForm>({
    resolver: zodResolver(createExperienceFormSchema),
    mode: 'onSubmit',
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

  // 🔹 시간 문자열 → { hour, minute } 객체로 변환
  function parseTimeToObject(time: string) {
    const [hour, minute] = time.split(':');
    return { hour, minute };
  }

  // 🔹 체험 상세 데이터 불러오기 및 RHF 초기값 세팅
  const loadExperienceDetail = useCallback(
    async (activityId: string) => {
      try {
        const { title, category, description, price, address, schedules, bannerImageUrl, subImages } =
          await fetchActivityDetail(activityId);
        const subImageUrls = subImages.map((img) => img.imageUrl);

        originalSubImageIdsRef.current = subImages.map((img) => img.id);
        originalSubImageUrlsRef.current = subImages.map((img) => img.imageUrl);

        originalScheduleIdsRef.current = schedules.map((s) => s.id);
        originalSchedulesRef.current = schedules.map((s) => `${s.date}_${s.startTime}_${s.endTime}`);

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
    },
    [reset],
  );

  useEffect(() => {
    if (!isEdit || !activityId) return;
    loadExperienceDetail(activityId);
  }, [isEdit, activityId, loadExperienceDetail]);

  async function blobUrlToFile(blobUrl: string, fileName: string): Promise<File> {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  const handleCreate: SubmitHandler<createExperienceForm> = async (data: createExperienceForm) => {
    try {
      // 1-1. bannerFile 업로드
      const bannerFile = await blobUrlToFile(data.bannerFile, 'banner.png');
      const bannerImageUrlResponse = await uploadImage(bannerFile);
      const bannerImageUrl = bannerImageUrlResponse.file;

      // 1-2. subImageFiles 업로드
      const subImageUrlResponses = await Promise.all(
        data.subImageFiles.map((blobUrl, index) =>
          blobUrlToFile(blobUrl, `sub_${index}.png`).then((file) => uploadImage(file)),
        ),
      );
      const subImageUrls = subImageUrlResponses.map((response) => response.file);

      // 2. category, schedules 전처리
      const transformedCategory = data.category.value;

      // 완성된 스케줄만 필터링
      const validSchedules = data.schedules.filter((s) => s.date && s.startTime && s.endTime);

      const transformedSchedules = validSchedules.map((schedule) => ({
        date: schedule.date?.format?.('YYYY-MM-DD') ?? '',
        startTime: `${schedule.startTime?.hour ?? '00'}:${schedule.startTime?.minute ?? '00'}`,
        endTime: `${schedule.endTime?.hour ?? '00'}:${schedule.endTime?.minute ?? '00'}`,
      }));

      // 3. 데이터 재구성
      const finalData = {
        title: data.title,
        category: transformedCategory as '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙',
        description: data.description,
        price: Number(data.price),
        address: data.address,
        schedules: transformedSchedules,
        bannerImageUrl,
        subImageUrls: subImageUrls.length > 0 ? subImageUrls : [],
      };

      // 4. 최종 제출
      await postExperiences(finalData);

      // 내 체험 관리 쿼리 무효화
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'myActivitiesInfinite',
      });

      // 메인 페이지 체험 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });

      navigate('/');
    } catch (e) {
      console.error('이미지 업로드 실패:', e);
      alert('이미지 업로드 중 문제가 발생했습니다.');
    }
  };

  const handleEdit: SubmitHandler<createExperienceForm> = async (data) => {
    // 🔹 activityId null 체크 추가
    if (!activityId) {
      alert('체험 ID가 없습니다.');
      return;
    }

    // 1. bannerImageUrl 처리 (blob이면 업로드, 아니면 그대로 사용)
    const bannerImageUrl = data.bannerFile.startsWith('blob:')
      ? await blobUrlToFile(data.bannerFile, 'banner.png')
          .then((file) => uploadImage(file))
          .then((response) => response.file)
      : data.bannerFile;

    // 🔹 새로 추가된 이미지(blob만 있음)만 업로드
    const subImageUrlResponses = await Promise.all(
      data.subImageFiles
        .filter((url) => !originalSubImageUrlsRef.current.includes(url)) // 새로 추가된 blob만
        .map((blobUrl, index) => blobUrlToFile(blobUrl, `sub_${index}.png`).then((file) => uploadImage(file))),
    );
    const subImageUrlsToAdd = subImageUrlResponses.map((response) => response.file);

    // 🔹 삭제할 이미지 ID
    const subImageIdsToRemove = originalSubImageUrlsRef.current
      .filter((url) => !data.subImageFiles.includes(url)) // 원래 있었는데 사라진 URL
      .map((url) => {
        const index = originalSubImageUrlsRef.current.indexOf(url);
        return originalSubImageIdsRef.current[index];
      });

    // 🔹 새로 추가된 스케줄
    const schedulesToAdd = data.schedules
      .filter((s) => {
        if (!s.date || !s.startTime || !s.endTime) return false;

        const key = `${s.date.format('YYYY-MM-DD')}_${s.startTime.hour}:${s.startTime.minute}_${s.endTime.hour}:${s.endTime.minute}`;
        return !originalSchedulesRef.current.includes(key);
      })
      .map((s) => ({
        date: s.date.format('YYYY-MM-DD'),
        startTime: `${s.startTime!.hour}:${s.startTime!.minute}`,
        endTime: `${s.endTime!.hour}:${s.endTime!.minute}`,
      }));

    // 🔹 삭제할 스케줄 ID
    const scheduleIdsToRemove = originalSchedulesRef.current
      .filter((key) => {
        return !data.schedules.some((s) => {
          if (!s.date || !s.startTime || !s.endTime) return false;

          const currentKey = `${s.date.format('YYYY-MM-DD')}_${s.startTime.hour}:${s.startTime.minute}_${s.endTime.hour}:${s.endTime.minute}`;
          return currentKey === key;
        });
      })
      .map((key) => {
        const index = originalSchedulesRef.current.indexOf(key);
        return originalScheduleIdsRef.current[index];
      });

    // 🔹 최종 body 구성
    const body = {
      title: data.title,
      category: data.category.value as '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙',
      description: data.description,
      price: Number(data.price),
      address: data.address,
      bannerImageUrl,
      subImageUrlsToAdd,
      subImageIdsToRemove,
      schedulesToAdd,
      scheduleIdsToRemove,
    };

    await patchExperiences(body, activityId);

    // 내 체험 관리 쿼리 무효화
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === 'myActivitiesInfinite',
    });

    // 메인 페이지 체험 목록 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: ['activities'],
    });

    // 상세 페이지 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: ['activity', activityId],
    });

    navigate(`/activities/${activityId}`);
  };

  return (
    <div className='m-auto w-full max-w-700'>
      <h1 className='my-36 text-2xl font-bold md:text-3xl'>내 체험 {isEdit ? '수정' : '등록'}</h1>

      <form className='flex flex-col gap-24' onSubmit={handleSubmit(isEdit ? handleEdit : handleCreate)}>
        <TitleInput {...register('title')} error={errors.title?.message} />

        <div>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <Select.Root value={field.value} onChangeValue={(value: SelectItem) => field.onChange(value)}>
                <Select.Title className='font-normal'>카테고리</Select.Title>
                <Select.Trigger className={errors.category && 'border border-red-500'}>
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

        <PriceInput
          {...register('price', {
            valueAsNumber: true,
          })}
          error={errors.price?.message}
        />

        <Controller
          control={control}
          name='address'
          render={({ field, fieldState }) => (
            <AddressInput
              error={fieldState.error?.message}
              value={field.value}
              onChange={(value: string) => field.onChange(value)}
            />
          )}
        />

        <div>
          <p className='mb-4 block'>예약 가능한 시간대</p>
          <Controller
            control={control}
            name='schedules'
            render={({ field, fieldState }) => (
              <>
                <ScheduleInput value={field.value} onChange={(value: Schedule[]) => field.onChange(value)} />
                {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <p className='mb-4 block'>배너 이미지 등록</p>
          <Controller
            control={control}
            name='bannerFile'
            render={({ field, fieldState }) => (
              <>
                <ImageInput max={1} value={field.value} onChange={(value: string) => field.onChange(value)} />
                {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <p className='mb-4 block'>소개 이미지 등록</p>
          <Controller
            control={control}
            name='subImageFiles'
            render={({ field, fieldState }) => (
              <>
                <ImageInput max={4} value={field.value} onChange={(value: string[]) => field.onChange(value)} />
                {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div className='mt-36 flex justify-center'>
          <Button size='sm' type='submit' variant='fill' onClick={() => {}}>
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
