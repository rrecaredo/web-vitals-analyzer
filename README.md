# Introduction

This is a demo application that domestrates some of the capabilities of the [Dytatrace App Toolkit](https://developer.dynatrace.com/reference/app-toolkit/) along with [Dynatrace App Functions](https://developer.dynatrace.com/develop/functions/).

## Available Scripts

| Command              | Description                                               |
| -------------------- | --------------------------------------------------------- |
| **npm run start**    | Runs the app in development mode                          |
| **npm run deploy**   | Deploys the app in dynatrace cloud. You must be logged in |
| **npm run test:api** | Runs jest unit tests for the /api (app functions)         |
| **npm run test:ui**  | Runs jest unit tests for the /app folder (frontend)       |

## Stack

- [Dynatrace app-toolkit](https://developer.dynatrace.com/reference/app-toolkit/)
- [Dynatrace app functions](https://developer.dynatrace.com/develop/functions/)
- [Dynatrace Stratos](https://developer.dynatrace.com/reference/design-system/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React DOM](https://react.dev/)
- [Styled Components](https://styled-components.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/v3/)
- [Recharts](https://recharts.org/en-US/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Architecture

The application relies on Dynatrace to serve the React based frontent assets in a CDN fashion. For the sake of simplicity, this is a "serverless" application.

![arch1](https://github.com/rrecaredo/web-vitals-analyzer/assets/196860/251d899a-ff04-4ed4-982f-b01bb669f7b5)


