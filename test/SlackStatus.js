import React from 'react';
import {
  renderIntoDocument,
	findRenderedDOMComponentWithClass
} from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import fetchMock from "fetch-mock";
import { expect } from 'chai';
import simple from 'simple-mock';
import SlackStatus from '../src/SlackStatus';
import getStatus from '../src/getStatus';

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
    simple.mock(getStatus, 'example').resolveWith({
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

  it('should render a status', async () => {
    const renderer = new ShallowRenderer();
    const component = renderer.render(<SlackStatus id="U2NK19J0L" />);

    // Call the API for the data
    await renderer._instance.componentDidMount();

    // Rerender
    await renderer._instance.render();

    const result = renderer.getRenderOutput();

    expect(result.props.children).to.deep.equal([
      <div className="slack-status__emoji">:simple_smile:</div>,
      <p className="slack-status__text">Making an awesome plugin</p>
    ]);
  });

  afterEach(function () {
    simple.restore()
  });

  after(() => {
    fetchMock.restore();
  });
})
