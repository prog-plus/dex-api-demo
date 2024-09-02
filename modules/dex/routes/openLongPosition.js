import S from 'fluent-json-schema';

import openLongPositionController from '../controllers/openLongPosition.js';

const request_schema = S.object()
  .prop('user_id', S.string().format('uuid').required())
  .prop('asset_id', S.string().format('uuid').required())
  .prop('amount_token', S.number().required());

const response_schema = S.object()
  .prop('status', S.string().required())
  .prop('message', S.string());

export default async function (server, options) {
  const { prefix } = options;

  server.route({
    method: 'POST',
    path: `${prefix}/position/long/open`,
    handler: openLongPositionController,
    schema: {
      description: 'Opens a long position',
      body: request_schema,
      response: {
        200: response_schema,
        400: response_schema,
        500: response_schema,
      },
    },
  });
}
