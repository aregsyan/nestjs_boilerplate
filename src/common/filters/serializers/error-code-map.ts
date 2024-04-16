export default {
  500: {
    code: 500,
    title: 'Internal Server Error',
    message:
      'Unexpected error: if the error persists, please contact an administrator, quoting the code and timestamp of this error',
  },
  400: {
    code: 400,
    title: 'Bad Request',
    message:
      'At least one parameter is invalid. Examine the details ' +
      'property for more information. Invalid parameters are listed and prefixed accordingly: body for parameters ' +
      'submitted in the requests body, query for parameters appended to the requests URL, and params for ' +
      'templated parameters of the requests URL.',
  },
  401: {
    code: 401,
    title: 'Unauthorised',
    message:
      "Access is restricted to authenticated users only. The query can't be made without a valid JWT token (check the Authorization header of your request).",
  },
  404: {
    code: 404,
    title: 'Not Found',
    message:
      'The requested resource, or one of its sub-resources, ' +
      "can't be found. If the submitted query is valid, this error is likely to be caused by a " +
      'problem with a nested resource that has been deleted or modified. Check the details ' +
      'property for additional insights.',
  },
  403: {
    code: 403,
    title: 'Forbidden',
    message:
      "Insufficient permissions. Your current user roles don't allow you to perform this " +
      'query. Should you believe this error to be incorrect, please contact an administrator.',
  },
  429: {
    code: 429,
    title: 'Too Many Requests',
    message:
      'The number of requests from this client is restricted to a specified quota.',
  },
  502: {
    code: 502,
    title: 'Bad Gateway',
    message:
      'The upstream system returned a response which we cannot understand',
  },
  503: {
    code: 503,
    title: 'Service Unavailable',
    message:
      'The server is not ready to handle the request. If specified please check the <strong>Retry-After</strong> for the time period specified for recovery/re-attempt of request.',
  },
  504: {
    code: 504,
    title: 'Gateway Timeout',
    message:
      'The server, while acting as a gateway or proxy, did not get a response in time from the upstream server that it needed in order to complete the request.',
  },
};
