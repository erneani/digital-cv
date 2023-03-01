import React from "react";
import styled from "styled-components";

export default function Separator() {
  return <Rect />;
}

const Rect = styled.div`
  width: 100%;
  height: 10px;
  background-color: #fcca46;
`;
