import { $api } from "@/shared/common/api/http";

export default function getUserNovelReaction(novelId: string): Promise<{ type: number }> {
  return new Promise((resolve, reject) => {
    $api
      .get(`/novel/${novelId}/reaction`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}
