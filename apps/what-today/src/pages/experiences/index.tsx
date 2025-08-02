import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressInput, Button, Select, type SelectItem, useToast } from '@what-today/design-system';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchActivityDetail } from '@/apis/activityDetail';
import { patchExperiences, postExperiences, uploadImage } from '@/apis/experiences';
import DescriptionTextarea from '@/components/experiences/DescriptionTextarea';
import ImageInput from '@/components/experiences/ImageInput';
import PriceInput from '@/components/experiences/PriceInput';
import ScheduleInput, { type Schedule } from '@/components/experiences/ScheduleInput';
import TitleInput from '@/components/experiences/TitleInput';
import { type createExperienceForm, createExperienceFormSchema } from '@/schemas/experiences';

export default function CreateExperience() {
  const navigate = useNavigate();
  const { id: activityId } = useParams();
  const isEdit = !!activityId;
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  // 시간 문자열 → { hour, minute } 객체로 변환
  function parseTimeToObject(time: string) {
    const [hour, minute] = time.split(':');
    return { hour, minute };
  }

  // 체험 상세 데이터 불러오기 및 RHF 초기값 세팅
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
        toast({
          title: '불러오기 실패',
          description: `체험 정보를 불러오지 못했습니다.`,
          type: 'error',
        });
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

  const createExperienceMutation = useMutation({
    mutationFn: async (data: createExperienceForm) => {
      const bannerFile = await blobUrlToFile(data.bannerFile, 'banner.png');
      const bannerImageUrl = (await uploadImage(bannerFile)).file;

      const subImageUrlResponses = await Promise.all(
        data.subImageFiles.map((blobUrl, index) =>
          blobUrlToFile(blobUrl, `sub_${index}.png`).then((file) => uploadImage(file)),
        ),
      );
      const subImageUrls = subImageUrlResponses.map((res) => res.file);

      const finalData = {
        title: data.title,
        category: data.category.value as '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙',
        description: data.description,
        price: Number(data.price),
        address: data.address,
        schedules: data.schedules
          .filter((s) => s.date && s.startTime && s.endTime)
          .map((s) => ({
            date: s.date!.format('YYYY-MM-DD'),
            startTime: `${s.startTime!.hour}:${s.startTime!.minute}`,
            endTime: `${s.endTime!.hour}:${s.endTime!.minute}`,
          })),
        bannerImageUrl,
        subImageUrls,
      };

      return postExperiences(finalData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'myActivitiesInfinite',
      });
      toast({
        title: '체험 등록 성공',
        description: `성공적으로 체험을 등록했습니다.`,
        type: 'success',
      });
      navigate('/');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '체험 등록에 실패했습니다.';
      toast({
        title: '체험 등록 실패',
        description: `체험 등록에 실패했습니다.`,
        type: 'error',
      });
    },
  });

  const editExperienceMutation = useMutation({
    mutationFn: async (params: { activityId: string; data: createExperienceForm }) => {
      const { activityId, data } = params;

      const bannerImageUrl = data.bannerFile.startsWith('blob:')
        ? await blobUrlToFile(data.bannerFile, 'banner.png')
            .then(uploadImage)
            .then((res) => res.file)
        : data.bannerFile;

      const subImageUrlsToAdd = await Promise.all(
        data.subImageFiles
          .filter((url) => !originalSubImageUrlsRef.current.includes(url))
          .map((url, index) => blobUrlToFile(url, `sub_${index}.png`).then((file) => uploadImage(file))),
      ).then((resList) => resList.map((r) => r.file));

      const subImageIdsToRemove = originalSubImageUrlsRef.current
        .filter((url) => !data.subImageFiles.includes(url))
        .map((url) => {
          const index = originalSubImageUrlsRef.current.indexOf(url);
          return originalSubImageIdsRef.current[index];
        });

      const schedulesToAdd = data.schedules
        .filter((s) => {
          if (!s.date || !s.startTime || !s.endTime) return false;
          const key = `${s.date.format('YYYY-MM-DD')}_${s.startTime.hour}:${s.startTime.minute}_${s.endTime.hour}:${s.endTime.minute}`;
          return !originalSchedulesRef.current.includes(key);
        })
        .map((s) => ({
          date: s.date!.format('YYYY-MM-DD'),
          startTime: `${s.startTime!.hour}:${s.startTime!.minute}`,
          endTime: `${s.endTime!.hour}:${s.endTime!.minute}`,
        }));

      const scheduleIdsToRemove = originalSchedulesRef.current
        .filter((key) => {
          return !data.schedules.some((s) => {
            const currentKey = `${s.date!.format('YYYY-MM-DD')}_${s.startTime!.hour}:${s.startTime!.minute}_${s.endTime!.hour}:${s.endTime!.minute}`;
            return currentKey === key;
          });
        })
        .map((key) => {
          const index = originalSchedulesRef.current.indexOf(key);
          return originalScheduleIdsRef.current[index];
        });

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

      return patchExperiences(body, activityId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', variables.activityId] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'myActivitiesInfinite',
      });

      toast({
        title: '체험 수정 성공',
        description: `성공적으로 체험을 수정했습니다.`,
        type: 'success',
      });

      navigate(`/activities/${variables.activityId}`);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '체험 수정에 실패했습니다.';
      toast({
        title: '체험 수정 실패',
        description: message,
        type: 'error',
      });
    },
  });

  return (
    <div className='m-auto w-full max-w-700'>
      <h1 className='my-36 text-2xl font-bold md:text-3xl'>내 체험 {isEdit ? '수정' : '등록'}</h1>

      <form
        className='flex flex-col gap-24'
        onSubmit={handleSubmit((data) => {
          if (isEdit && activityId) {
            editExperienceMutation.mutate({ activityId, data });
          } else {
            createExperienceMutation.mutate(data);
          }
        })}
      >
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
                    <Select.Item value='문화 · 예술'>문화 예술</Select.Item>
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
          {/* <p className='mb-4 block'>예약 가능한 시간대</p> */}
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
          <Button
            loading={isEdit ? editExperienceMutation.isPending : createExperienceMutation.isPending}
            size='sm'
            type='submit'
            variant='fill'
            onClick={() => {}}
          >
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
