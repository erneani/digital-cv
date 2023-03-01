import React, { ReactNode } from "react";
import styled from "styled-components";

interface ITheBigSquare {
  children: ReactNode;
}

export default function TheBigSquare({ children }: ITheBigSquare) {
  return (
    <Container>
      <BlueSquare>{children}</BlueSquare>
    </Container>
  );
}

const Container = styled.div`
  padding: 72px 88px 0px;
`;

const BlueSquare = styled.main`
  background-color: #5c95ff;
  border-radius: 5px 5px 0px 0px;
  padding: 48px 160px;
`;
