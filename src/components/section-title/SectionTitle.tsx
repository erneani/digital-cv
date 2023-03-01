import React from "react";
import styled from "styled-components";

interface ISectionTitle {
  text: string;
}

export default function SectionTitle({ text }: ISectionTitle) {
  return <Title>{text}</Title>;
}

const Title = styled.h3`
  font-weight: bold;
  font-size: 32px;
  margin: 32px 0px;
  color: #fcca46;
`;
