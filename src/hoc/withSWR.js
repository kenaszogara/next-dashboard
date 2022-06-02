import { SWRConfig } from 'swr';
import { api } from '../services/api';

export const getRequest = (url, params) =>
  api({
    method: 'GET',
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
    url,
    params,
  }).then((res) => {
    return res.data;
  });

const config = {
  // refreshInterval: 3000,
  fetcher: getRequest,
};

export const WithSWR = ({ children }) => {
  return <SWRConfig value={config}>{children}</SWRConfig>;
};
