import type { ParameterObject } from 'openapi3-ts';
import validateParam from './validate-param';
import validateBody from './validate-body';
import { ValidationLevel, RouteSpecs, Params } from '../../types';

export default (
  validationLevel: ValidationLevel,
  routeSpecs: RouteSpecs,
  pathParams: Params,
  queryParams: Params,
  body: any,
  contentType: string,
) => {
  if (validationLevel === 'off') return;
  try {
    if (routeSpecs.parameters) {
      for (const parameter of routeSpecs.parameters) {
        const value = {
          path: pathParams,
          query: queryParams,
        }[(parameter as ParameterObject).in as 'path' | 'query'][(parameter as ParameterObject).name];
        validateParam(parameter, value);
      }
    }
    validateBody(routeSpecs, contentType, body);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    if (!e.message.startsWith('[oa-client:')) throw e;
    // eslint-disable-next-line no-console
    if (validationLevel === 'warn') console.warn(e);
    throw e;
  }
};
