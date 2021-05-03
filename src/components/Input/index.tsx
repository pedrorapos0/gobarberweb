import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: {};
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle,
  ...rest
}) => {
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const inpuRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (inpuRef.current?.value) {
      setIsField(true);
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inpuRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isField={isField}
      style={containerStyle}
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inpuRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
