import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...rest }) => {
  const style = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    background: variant === 'primary' ? '#eb25a9' : '#e5e7eb',
    color: variant === 'primary' ? '#fff' : '#222',
  } as React.CSSProperties;

  return (
    <button style={style} {...rest}>
      {children}
    </button>
  );
};

export default Button;
