import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://edx37442.apps.dynatrace.com/',
  app: {
    name: 'Web Vitals Analyzer',
    version: '0.0.3',
    description: 'Web vitals analyzer',
    id: 'my.web.vitals.analyzer',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }]
  },
};

module.exports = config;
