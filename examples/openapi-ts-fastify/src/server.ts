import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import Fastify from 'fastify';
import glue from 'fastify-openapi-glue';

import { serviceHandlers } from './handlers';

export const buildServer = async () => {
  const fastify = Fastify();

  const specificationPath = join(__dirname, '..', 'openapi.json');
  const specificationJson = JSON.parse(
    readFileSync(specificationPath, 'utf-8'),
  );

  fastify.register(glue, {
    prefix: 'v3',
    serviceHandlers,
    specification: specificationJson,
  });

  return fastify;
};
