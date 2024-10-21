import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest';
import { MemoryRouter } from "react-router";
import { useLocation } from 'react-router-dom';
import JobPreview from "../../../src/Pages/CreateJob/jobPreview";

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe("Job Preview", () => {
  const details = {
      role: 'Barista',
      jobtype: 'full-time',
      location: 'Talley',
      pay: '10',
      description: 'Make coffee!',
      requiredSkills: 'Enthusiasm',
  }

  const questions = {
      question1: 'Q1',
      question2: 'Q2',
      question3: 'Q3',
      question4: 'Q4',
  }

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      state: {
        details: details,
        questions: questions,
      },
    });
  });

  it('renders job details correctly', () => {
    render(
      <MemoryRouter>
        <JobPreview />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Barista')).toBeInTheDocument()
    expect(screen.getByText('Barista')).toBeInTheDocument();
    expect(screen.getByText('full time')).toBeInTheDocument();
    expect(screen.getByText('Talley')).toBeInTheDocument();
    // expect(screen.getByText('10 $/hr')).toBeInTheDocument();
    expect(screen.getByText('Make coffee!')).toBeInTheDocument();
    expect(screen.getByText('Enthusiasm')).toBeInTheDocument();
    expect(screen.getByText('1: Q1')).toBeInTheDocument();
    expect(screen.getByText('2: Q2')).toBeInTheDocument();
    expect(screen.getByText('3: Q3')).toBeInTheDocument();
    expect(screen.getByText('4: Q4')).toBeInTheDocument();
  });

})
