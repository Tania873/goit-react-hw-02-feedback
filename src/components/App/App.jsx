import React, { Component } from 'react';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from '../Section/Section';
import Notification from '../Notification';
import css from './App.module.css';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedbackBtnClick = state => {
    this.setState(prevState => ({
      [state]: prevState[state] + 1,
    }));
  };

  render() {
    const countTotalFeedback = () =>
      Object.values(this.state).reduce((acc, el) => acc + el, 0);

    const countPositiveFeedbackPercentage = () =>
      Math.round((100 / countTotalFeedback()) * this.state.good) || 0;

    return (
      <div className={css.data}>
        <div className={css.box}>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={this.state}
              onLeaveFeedback={this.handleFeedbackBtnClick}
            />
          </Section>
          <Section title="Statistics">
            {countTotalFeedback() === 0 ? (
              <Notification message="There is no feedback" />
            ) : (
              <Statistics
                good={this.state.good}
                neutral={this.state.neutral}
                bad={this.state.bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
              />
            )}
          </Section>
        </div>
      </div>
    );
  }
}

export default App;
