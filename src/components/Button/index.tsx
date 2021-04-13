import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './style';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<Buttonprops> = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest} type="submit">
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;
