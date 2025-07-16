import { ErrorMessage } from './InputErrorMessage';
import { Field } from './InputField';
import { Icon } from './InputIcon';
import { Label } from './InputLabel';
import { Root } from './InputRoot';
import { Textarea } from './InputTextarea';
import { TextCounter } from './InputTextCounter';
import { Wrapper } from './InputWrapper';

/**
 * @description Input 합성 컴포넌트 (텍스트 입력 Input & Textarea를 지원합니다.)
 *
 * @example
 * <Input.Root>
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Wrapper>
 *     <Input.Field value={value} onChange={onChange} />
 *   </Input.Wrapper>
 *   <Input.ErrorMessage />
 * </Input.Root>
 *
 * @example
 * <Input.Root>
 *   <Input.Label>자기소개</Input.Label>
 *   <Input.Wrapper>
 *     <Input.Textarea
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       autoHeight
 *       maxLength={200}
 *     />
 *   </Input.Wrapper>
 *   <Input.TextCounter length={value.length} maxLength={200} />
 *   <Input.ErrorMessage />
 * </Input.Root>
 */
export const Input = {
  Root,
  Label,
  Wrapper,
  Icon,
  Field,
  Textarea,
  TextCounter,
  ErrorMessage,
};
