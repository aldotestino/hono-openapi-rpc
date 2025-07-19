import apiClient from 'api/client';

export const client = apiClient('/', {
  // biome-ignore lint/suspicious/noExplicitAny: could be anything
  fetch: async (url: any, options: any) => {
    const res = await fetch(url, {
      ...options,
      credentials: 'include',
    });

    if (res.status >= 400) {
      const { message } = await res.json();
      throw new Error(message);
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return res;
  },
});
