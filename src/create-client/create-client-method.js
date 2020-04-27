import getRouteSpecs from './get-route-specs';
import getCaller from './get-caller';
import getOrigin from './get-origin';
import getCallPath from './get-call-path';
import validateRequest from './validate-request';

export default (specs, callers, method, origin, validationLevel) => (
  async (
    path,
    {
      pathParams = {},
      queryParams = {},
      body,
      contentType = 'application/json',
    } = { pathParams: {}, queryParams: {}, contentType: 'application/json' },
  ) => {
    const routeSpecs = getRouteSpecs(specs, path, method);
    validateRequest(validationLevel, routeSpecs, pathParams, queryParams, body, contentType);
    const caller = getCaller(callers, routeSpecs, path);
    const callOrigin = getOrigin(origin, specs);
    const callPath = getCallPath(path, pathParams);
    const callUrl = new URL(callOrigin + callPath);
    for (const key in queryParams) {
      callUrl.searchParams.append(key, queryParams[key]);
    }
    return caller(callUrl, body);
  }
);
