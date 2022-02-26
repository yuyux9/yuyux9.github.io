import _axios from 'axios';
import type * as types from './types';

export const axios = _axios.create({
  baseURL: '/api/',
  timeout: 24 * 1000,
  responseType: 'json',
});

function factory<R, S>(path: string): (schema: R) => Promise<S> {
  return async (schema: R) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(schema))
      form.append(key, value instanceof File ? value : JSON.stringify(value));
    return await axios.post<S>(path, form).then((response) => response.data);
  };
}

export const api = {
  SauceNAO: factory<types.SauceNAORequestSchema, types.SauceNAOParseResult>(
    './SauceNAO'
  ),
  IqDB: factory<types.IqDBRequestSchema, types.IqDBParseResult>('./IqDB'),
  ascii2d: factory<types.ascii2dRequestSchema, types.ascii2dParseResult>(
    './ascii2d'
  ),
  EHentai: factory<types.EHentaiRequestSchema, types.EHentaiParseResult>(
    './E-Hentai'
  ),
  TraceMoe: factory<types.TraceMoeRequestSchema, types.TraceMoeParseResult>(
    './TraceMoe'
  ),
};