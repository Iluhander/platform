import $api from '../http/api';

export async function createNovel(novelsList?: any[]) {
  try {
    if (novelsList && novelsList.length >= Number(process.env.NEXT_PUBLIC_MAX_NOVELS_COUNT)) {
      return;
    }

    const res = await $api.put(`/novel/add`);

    return res.data;
  } catch (err) {
    // @ts-ignore
    console.err(err.response.status);
  }
}
