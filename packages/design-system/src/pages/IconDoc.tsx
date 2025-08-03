import {
  ArrowIcon,
  ArtIcon,
  BellIcon,
  BusIcon,
  CalendarIcon,
  ChevronIcon,
  CloudIcon,
  DeleteIcon,
  DotIcon,
  EditIcon,
  ErrorIcon,
  ExitIcon,
  EyeIcon,
  EyeOffIcon,
  FoodIcon,
  GithubIcon,
  InfoIcon,
  KaKaoIcon,
  ListIcon,
  LocationIcon,
  MinusIcon,
  MoreIcon,
  PlusIcon,
  SearchIcon,
  SettingIcon,
  SpinIcon,
  SportIcon,
  StarIcon,
  SuccessIcon,
  TourIcon,
  TriangleIcon,
  UserIcon,
  WellbeingIcon,
} from '@components/icons';

import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const fillIcons = [
  { name: 'StarIcon (filled)', component: StarIcon, props: { filled: true } },
  { name: 'StarIcon', component: StarIcon, props: { filled: false } },
];

const directionIcons = [
  { name: 'TriangleIcon', component: TriangleIcon, props: { direction: 'bottom' } },
  { name: 'MoreIcon', component: MoreIcon, props: { direction: 'right' } },
  { name: 'ChevronIcon', component: ChevronIcon, props: { direction: 'right' } },
  { name: 'ArrowIcon', component: ArrowIcon, props: { direction: 'right' } },
];

const colorIcons = [
  { name: 'BellIcon', component: BellIcon },
  { name: 'EyeIcon', component: EyeIcon },
  { name: 'EyeOffIcon', component: EyeOffIcon },
  { name: 'SearchIcon', component: SearchIcon },
  { name: 'GithubIcon', component: GithubIcon },
  { name: 'KaKaoIcon', component: KaKaoIcon },
  { name: 'ArtIcon', component: ArtIcon, props: { color: 'red' } },
  { name: 'FoodIcon', component: FoodIcon, props: { color: 'blue' } },
  { name: 'SportIcon', component: SportIcon, props: { color: 'green' } },
  { name: 'TourIcon', component: TourIcon, props: { color: 'yellow' } },
  { name: 'BusIcon', component: BusIcon, props: { color: 'purple' } },
  { name: 'WellbeingIcon', component: WellbeingIcon, props: { color: 'orange' } },
  { name: 'UserIcon', component: UserIcon },
  { name: 'ListIcon', component: ListIcon, props: { color: 'pink' } },
  { name: 'SettingIcon', component: SettingIcon, props: { color: 'red' } },
  { name: 'CalendarIcon', component: CalendarIcon, props: { color: 'gray' } },
  { name: 'EditIcon', component: EditIcon, props: { color: 'blue' } },
  { name: 'LocationIcon', component: LocationIcon, props: { color: 'var(--color-blue-500)' } },
  { name: 'DeleteIcon', component: DeleteIcon, props: { color: 'var(--color-red-500)' } },
  { name: 'DotIcon', component: DotIcon, props: { color: 'var(--color-gray-500)' } },
  { name: 'PlusIcon', component: PlusIcon, props: { color: 'var(--color-gray-700)' } },
  { name: 'MinusIcon', component: MinusIcon, props: { color: 'var(--color-gray-900)' } },
  { name: 'SpinIcon', component: SpinIcon, props: { color: 'var(--color-red-500)' } },
  { name: 'ExitIcon', component: ExitIcon, props: { color: 'var(--color-primary-500)' } },
  { name: 'SuccessIcon', component: SuccessIcon },
  { name: 'InfoIcon', component: InfoIcon },
  { name: 'ErrorIcon', component: ErrorIcon },
  { name: 'CloudIcon', component: CloudIcon, props: { color: 'var(--color-primary-500)' } },
];

const ColorIconPropsCode = `<LocationIcon className="size-50" color="var(--color-blue-500)" />`;
const DirectionIconPropsCode = `<ChevronIcon className="size-50" direction="right" />`;
const FillIconPropsCode = `<StarIcon className="size-50" filled />`;

const iconScope = {
  GithubIcon,
  StarIcon,
  EyeIcon,
  EyeOffIcon,
  KaKaoIcon,
  ArtIcon,
  FoodIcon,
  SportIcon,
  TourIcon,
  BusIcon,
  WellbeingIcon,
  UserIcon,
  ListIcon,
  SettingIcon,
  CalendarIcon,
  EditIcon,
  ChevronIcon,
  SearchIcon,
  ArrowIcon,
  TriangleIcon,
  BellIcon,
  DotIcon,
  PlusIcon,
  MinusIcon,
  DeleteIcon,
  MoreIcon,
  LocationIcon,
  SpinIcon,
  ExitIcon,
  ErrorIcon,
  SuccessIcon,
  InfoIcon,
  CloudIcon,
};

export default function IconDoc() {
  return (
    <>
      <DocTemplate
        description={`
# Icon 컴포넌트

디자인 시스템에서 제공하는 아이콘들은 세 가지 타입으로 나뉩니다:

1. **FillIconProps 아이콘**: \`filled: boolean\`으로 채움 여부 제어
2. **DirectionIconProps 아이콘**: \`direction: 'top' | 'right' | 'bottom' | 'left'\` 방향 지정
3. **ColorIconProps 아이콘**: \`color\` 속성으로 색상 지정

각 아이콘은 TailwindCSS의 \`className\`으로 사이즈/여백 등을 조절할 수 있으며, 아래 Playground에서 직접 테스트할 수 있습니다.
        `}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| className | string | TailwindCSS 스타일 클래스 (예: 'size-6') |
| color | string | 색상 지정 (예: 'red', '#333', 'var(--color-blue-500)') |
| direction | 'top' \\| 'bottom' \\| 'left' \\| 'right' | 방향 지정 (방향 아이콘에서 사용) |
| filled | boolean | 채움 여부 (일부 아이콘에만 적용됨) |
        `}
        title='Icon'
      />

      {renderIconGrid('FillIconProps 아이콘', fillIcons)}
      {renderIconGrid('DirectionIconProps 아이콘', directionIcons)}
      {renderIconGrid('ColorIconProps 아이콘', colorIcons)}

      <div className='mt-24'>
        <h2>1) ColorIconProps 아이콘은 className과 color로 색상 조절 가능합니다.</h2>
        <DocCode code={ColorIconPropsCode} />
        <h2>2) DirectionIconProps 아이콘은 className과 direction으로 방향 조절 가능합니다.</h2>
        <DocCode code={DirectionIconPropsCode} />
        <h2>3) FillIconProps 아이콘은 className과 filled로 채움 여부 조절 가능합니다.</h2>
        <DocCode code={FillIconPropsCode} />

        <Playground code={ColorIconPropsCode} scope={iconScope} />
      </div>
    </>
  );
}

function renderIconGrid(title: string, icons: { name: string; component: any; props?: any }[]) {
  return (
    <section className='mt-12'>
      <h3 className='mb-4 text-lg font-semibold'>{title}</h3>
      <div className='grid grid-cols-3 gap-10 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8'>
        {icons.map(({ name, component: Icon, props }) => (
          <div
            key={name}
            className='flex flex-col items-center justify-center rounded-lg border bg-white p-4 text-center transition hover:shadow'
          >
            <Icon className='size-30' {...props} />
            <span className='mt-2 text-xs break-words'>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
