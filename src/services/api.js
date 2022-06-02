import axios from 'axios';

const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZGVtby5jb20iLCJwYXNzd29yZCI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMS0wOC0xN1QwOToxNjoxOC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wOC0xN1QwOToxNjoxOC4wMDBaIiwiaWF0IjoxNjMxMzQ2MDA1fQ.azOYyZu8WGDsJRepKy8GGb6Fha3br933ZGMurxDzfNo';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    Authorization: `Bearer ${apiKey}`,
  },
});
