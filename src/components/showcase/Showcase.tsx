import React from "react";
import styled from "styled-components";

export default function Showcase() {
  return (
    <Header>
      <Title>
        Hi, call me <ColoredText>Ernani</ColoredText>!
      </Title>
      <Subtitle>
        I am a <b>Senior Software Consultant</b> and <b>Front End Specialist</b>{" "}
        building amazing digital experiences at <b>Thougthworks</b>.
      </Subtitle>
      <SocialWrapper>
        <SocialLinks href="https://github.com/erneani" target="_blank">
          Github
        </SocialLinks>
        <SocialLinks
          href="https://www.linkedin.com/in/vinicius-ernani/"
          target="_blank"
        >
          Linkedin
        </SocialLinks>
      </SocialWrapper>
    </Header>
  );
}

const Title = styled.h1`
  font-size: 64px;
  margin: 0;
  margin-bottom: 16px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: normal;
  margin: 0;
  margin-bottom: 32px;
  max-width: 800px;
`;

const Header = styled.header``;

const SocialWrapper = styled.footer`
  margin-bottom: 16px;
`;

const SocialLinks = styled.a`
  font-size: 14px;

  & + & {
    margin-left: 8px;
  }
`;

const ColoredText = styled.span`
  color: #fcca46;
`;
