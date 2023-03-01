import { WorkInfo } from "@/types";
import React from "react";
import styled from "styled-components";

interface IWorkCard extends WorkInfo {
  isActual?: boolean;
}

export default function WorkCard({
  company,
  description,
  endDate,
  startDate,
  jobTitle,
  isActual,
}: IWorkCard) {
  return (
    <Wrapper>
      <Container>
        <JobHeading>
          <JobTitle>
            <EnhancedJobTitle>{jobTitle}</EnhancedJobTitle> - {company}
          </JobTitle>
          <JobDuration>
            {startDate} - {isActual ? "present" : endDate}
          </JobDuration>
        </JobHeading>
        <JobDescription>{description}</JobDescription>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: -16px;

  & + & {
    margin-top: 0px;
  }
`;

const Container = styled.div`
  padding: 16px;

  &:hover ${Wrapper} {
    background-color: rgba(68, 85, 68, 0.08);
  }
`;

const JobHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 8px;

  @media (min-width: 758px) {
    flex-direction: row;
  }
`;

const JobTitle = styled.div`
  font-size: 24px;
`;

const EnhancedJobTitle = styled.span`
  color: #fcca46;
  font-weight: bold;
`;

const JobDuration = styled.div`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const JobDescription = styled.p`
  font-size: 20px;
`;
