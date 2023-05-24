import React, { useState } from 'react';
import { Container } from './App.styled';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';
// import PropTypes from 'prop-types';

const initOptions = { good: 0, neutral: 0, bad: 0 };

export default function App() {
  const [options, setOptions] = useState(initOptions);
  const { good, neutral, bad } = options;

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const total = countTotalFeedback();

  const onLeaveFeedback = feedbackType => {
    setOptions(prev => ({ ...prev, [feedbackType]: prev[feedbackType] + 1 }));
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  return (
    <>
      <Container>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={options}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>
      </Container>
      <Container>
        <Section title="Statistics">
          {!total ? (
            <Notification message={'There is no feedback'} />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </Container>
    </>
  );
}