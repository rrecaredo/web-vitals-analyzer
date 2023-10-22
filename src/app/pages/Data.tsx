import {
  DQLEditor,
  Flex,
  Heading,
  Paragraph,
  RunQueryButton,
  TimeseriesChart,
  convertToTimeseries,
} from '@dynatrace/strato-components-preview';
import * as Colors from '@dynatrace/strato-design-tokens/colors';
import { ErrorIcon } from '@dynatrace/strato-icons';
import React, { useEffect, useState } from 'react';
import { useDQLQuery } from '../hooks/useDQLQuery';

export const Data = () => {
  const initialQuery =
    'fetch logs \n| summarize count(), by:{bin(timestamp, 1m)}';

  // query string is stored in a state variable, which is updated whenever the text input in the QueryEditor changes.
  const [queryString, setQueryString] = useState<string>(initialQuery);

  // Initialize the useDQLQuery hook to get Data from SDK. The hook exposes multiple properties for
  // setting a loading spinner or providing the error message if something fails.
  const { error, result, fetchQuery, queryState, visualRecommendations } =
    useDQLQuery();

  // useEffect for fetching initialQuery
  // more information on useEffect can be found here: https://reactjs.org/docs/hooks-effect.html
  useEffect(
    () => {
      fetchQuery(initialQuery);
    },
    // should only be run on the initial render, so no dependency is necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // onClickQuery function is executed when the "RUN QUERY" Button is clicked and fetches the data from Grail.
  function onClickQuery() {
    fetchQuery(queryString);
  }

  return (
    <>
      <Flex flexDirection="column" alignItems="center" padding={32}>
        <img
          src="./assets/Dynatrace_Logo.svg"
          alt="Dynatrace Logo"
          width={150}
          height={150}
          style={{ paddingBottom: 32 }}
        ></img>
        <Heading level={2}>
          Explore the data in your environment by using the Dynatrace Query
          Language
        </Heading>
      </Flex>
      <Flex flexDirection="column" padding={32}>
        <DQLEditor
          value={queryString}
          onChange={(event) => setQueryString(event)}
        />
        <Flex justifyContent={error ? 'space-between' : 'flex-end'}>
          {error && (
            <Flex
              alignItems={'center'}
              style={{ color: Colors.default.Text.Critical.Default }}
            >
              <ErrorIcon />
              <Paragraph>{error?.error.message}</Paragraph>
            </Flex>
          )}
          {queryState === 'success' && !result?.records && (
            <Paragraph>no data available</Paragraph>
          )}
          {queryState === 'success' &&
            result?.records &&
            !visualRecommendations.includes('TimeSeriesChart') && (
              <Paragraph>use a query which has time series data</Paragraph>
            )}
          <RunQueryButton
            onClick={onClickQuery}
            queryState={queryState}
          ></RunQueryButton>
        </Flex>
        {result?.records &&
          visualRecommendations.includes('TimeSeriesChart') && (
            <TimeseriesChart
              data={convertToTimeseries(result.records, result.types)}
              gapPolicy="connect"
              variant="line"
            />
          )}
      </Flex>
    </>
  );
};
