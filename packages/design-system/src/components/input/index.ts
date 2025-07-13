import { ErrorMessage } from './InputErrorMessage';
import { Field } from './InputField';
import { Icon } from './InputIcon';
import { Label } from './InputLabel';
import { Root } from './InputRoot';
import { Wrapper } from './InputWrapper';

/**
 * @description Input 합성 컴포넌트
 *
 * @example
 * <Input.Root>
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Wrapper>
 *     <Input.Field value={value} onChange={onChange} />
 *   </Input.Wrapper>
 *   <Input.ErrorMessage />
 * </Input.Root>
 */
export const Input = {
  Root,
  Label,
  Wrapper,
  Icon,
  Field,
  ErrorMessage,
};
