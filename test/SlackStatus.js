import React from 'react';
import {
	renderIntoDocument,
	findRenderedDOMComponentWithClass
} from 'react-dom/test-utils';
import fetchMock from "fetch-mock";
import { expect } from 'chai';
import SlackStatus from '../src/SlackStatus';

describe('Slack Status', () => {
  before(() => {
    fetchMock.post("https://slackout.etch.co", {
      data: {
        user: {
          statusText: "Making an awesome plugin",
          statusEmoji: ":simple_smile:",
          __typename: "User"
        }
      }
    });
  });

  it('should render a component', () => {
    const component = renderIntoDocument(
      <SlackStatus id="U2NK19J0L" />
    );

    const el = findRenderedDOMComponentWithClass(component, 'slack-status');

    expect(el).to.be.ok;
  });

  it('should render a loading div', () => {
    const component = renderIntoDocument(
      <SlackStatus id="U2NK19J0L" />
    );

    const el = findRenderedDOMComponentWithClass(component, 'slack-status--loading');

    expect(el).to.be.ok;
  });

  it('should render a status', () => {
    const component = renderIntoDocument(
      <SlackStatus id="U2NK19J0L" />
    );

    setTimeout(() => {
      const el = findRenderedDOMComponentWithClass(component, 'slack-status__text');

      expect(el).to.be.ok;
    }, 500);
  });

  after(() => {
    fetchMock.restore();
  });
})
