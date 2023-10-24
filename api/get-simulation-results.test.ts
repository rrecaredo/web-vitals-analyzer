/**
 * @jest-environment @dynatrace/runtime-simulator/lib/test-environment
 */

import fakeResponse from "./__fixtures__/test-data.json";

const fetchMock = jest.fn();
globalThis.fetch = fetchMock;

import getSimulationScores from './get-simulation-results'

describe('get-simulation-scores', () => {

  it('should return an object with a message property', async () => {
    // An example of how to overwrite the implementation of fetch within a test.
    fetchMock.mockImplementationOnce(() => {
      return Promise.resolve(fakeResponse);
    })

    const payload = {
      tenantId: 'xxx000000',
      appId: 'APPLICATION-0000000000000000',
      dates: '2021-01-01_2021-01-02',
      metricType: 'RESPONSE_END',
    }

    const result = await getSimulationScores(payload)
    expect(result).toEqual('Hello world')
    expect(fetchMock).not.toHaveBeenCalled();
    expect.assertions(2)
  })
})
