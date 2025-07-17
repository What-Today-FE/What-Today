import React from 'react';

/**
 * === Slot이란? ===
 * Slot은 컴포넌트의 자식 요소를 동적으로 대체하거나 병합할 수 있도록 도와주는 패턴입니다. (보통 asChild와 함께 사용됩니다.)
 * Slot을 통해 컴포넌트 외부에서 정의한 자식 요소에 props를 덮어씌우면서 더 유연하게 제어할 수 있습니다.
 * 쉽게 말해, children으로 전달 받은 자식 요소에 원하는 기능(이벤트 핸들러, 스타일 등)을 추가하기 위해 사용합니다.
 */

/**
 * @description
 * HTMLElement를 위한 기본 HTML 속성(React.HTMLAttributes<HTMLElement>)에 string 키에 대한 인덱스 시그니처를 추가한 타입입니다.
 */
interface ExtendedHTMLAttributes extends React.HTMLAttributes<HTMLElement> {
  [key: string]: unknown;
}

/**
 * @description
 * Slot 컴포넌트에 전달되는 props 타입입니다. children은 반드시 하나의 ReactElement만 가집니다.
 */
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>; // 범용적으로 HTMLElement 속성 전부를 받도록 타입 단언
  ref?: React.Ref<HTMLElement>;
}

/**
 * @description
 * 모든 이벤트 핸들러 함수에 공통적으로 적용할 수 있는 함수 타입입니다.
 * Slot에서는 모든 이벤트를 처리하기 위해 unknown으로 이벤트 핸들러일 가능성 있는 속성을 감지하는 용도로 사용됩니다.
 */
interface EventHandler {
  (...args: unknown[]): void;
}

/**
 * @description
 * `asChild` 속성을 지원할 때 사용할 타입의 export입니다. 이는 Slot 패턴(asChild)을 지원하는 컴포넌트에서 사용됩니다.
 */
export type WithAsChild<T> = T & { asChild?: boolean };

/**
 * Combines multiple React refs into a single callback ref.
 *
 * The returned ref function assigns the provided element to all given refs, supporting both function and object refs.
 *
 * @returns A callback ref that updates all provided refs with the element.
 */
function mergeRefs<T = HTMLElement>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

/**
 * Merges props from the Slot component and its child element, combining event handlers, styles, class names, and refs.
 *
 * Event handlers from both sources are chained so both are called. `className` values are concatenated, `style` objects are shallow merged, and refs are combined using `mergeRefs`. All other child props override those from the Slot.
 *
 * @returns The merged props object to be applied to the child element.
 */
function mergeProps(
  slotProps: ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
  childProps: ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
): ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> } {
  const overrideProps = { ...childProps };

  const slotPropsRecord = slotProps as Record<string, unknown>;
  const childPropsRecord = childProps as Record<string, unknown>;

  // Child prop 순회
  for (const propName in childProps) {
    const slotPropValue = slotPropsRecord[propName];
    const childPropValue = childPropsRecord[propName];

    // on으로 시작되는 이벤트 핸들러일 때
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      // 둘 다 존재하는 경우 두 핸들러가 같이 실행될 수 있도록 병합
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          (childPropValue as EventHandler)(...args);
          (slotPropValue as EventHandler)(...args);
        };
      }
      // Slot에만 존재할 때는 그것을 사용
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // style prop인 경우 Slot과 Child의 style을 병합
    else if (propName === 'style') {
      overrideProps[propName] = {
        ...(slotPropValue as React.CSSProperties),
        ...(childPropValue as React.CSSProperties),
      };
    }
    // className prop 병합
    else if (propName === 'className') {
      overrideProps[propName] = [childPropValue, slotPropValue].filter(Boolean).join(' ');
    }
  }

  // ref 병합 (ref를 childProps 순환 중에 병합하면 꼬일 수 있음)
  const slotRef = slotProps.ref;
  const childRef = childProps.ref;

  if (slotRef || childRef) {
    overrideProps.ref = mergeRefs(childRef, slotRef);
  }

  return { ...slotProps, ...overrideProps };
}

/**
 * Slottable
 *
 * @component
 * @description Slot 내에서 특정 자식 요소를 구분하기 위해 사용되는 Wrapper 컴포넌트입니다.
 * 내부적으로 `Slottable`로 래핑된 자식 엘리먼트를 감지한 후, 해당 엘리먼트에 부모로부터 전달받은 props를 병합하여 렌더링합니다.
 *
 * @example
 * ```tsx
 * <Slot onClick={() => console.log('slot')}>
 *   <Slottable>
 *     <button onClick={() => console.log('child')}>버튼</button>
 *   </Slottable>
 * </Slot>
 *
 * => 출력 순서:
 * child
 * slot
 */
export interface SlottableProps {
  children: React.ReactNode;
}

export const Slottable = ({ children }: SlottableProps) => {
  return children;
};

/**
 * Slot
 *
 * @component
 * @description asChild 패턴 구현을 위한 Slot 컴포넌트입니다.
 * @description `Slottable`로 래핑된 자식 컴포넌트를 찾아 해당 요소에 props를 병합하여 렌더링합니다.
 *
 * @param {React.ReactElement} children - 하나의 React 엘리먼트를 자식으로 받습니다. (`Slottable`로 감쌀 수 있습니다.)
 * @param {...React.HTMLAttributes<HTMLElement>} props - 병합할 HTML 속성들
 *
 * @example
 * ```tsx
 * <Slot onClick={() => console.log('slot')}>
 *   <Slottable>
 *     <button onClick={() => console.log('child')}>버튼</button>
 *   </Slottable>
 * </Slot>
 * ```
 * => console : "child" 출력 -> "slot" 출력
 */
export const Slot = ({ children, ref, ...props }: SlotProps) => {
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find((child) => {
    return React.isValidElement(child) && child.type === Slottable;
  }) as React.ReactElement<SlottableProps>;

  if (slottable && React.isValidElement(slottable.props.children)) {
    const newElement = slottable.props.children as React.ReactElement<
      ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> }
    >;
    const newChildren = childrenArray.map((child) => {
      if (child !== slottable) return child;

      if (React.isValidElement(newElement)) {
        return newElement.props.children;
      } else {
        console.warn('Slot은 하나의 React Element만 자식으로 받을 수 있습니다.');
      }

      return null;
    });

    return React.isValidElement(newElement)
      ? React.cloneElement(
          newElement,
          {
            ...props,
            ...newElement.props,
            ...mergeProps(
              { ...props, ref } as ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
              newElement.props as ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
            ),
          },
          newChildren,
        )
      : null;
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      ...mergeProps(
        { ...props, ref } as ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
        children.props as ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
      ),
    });
  }

  console.warn('Slot은 하나의 React Element만 자식으로 받을 수 있습니다.');

  return null;
};
