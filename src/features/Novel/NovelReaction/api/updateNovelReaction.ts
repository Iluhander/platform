import { $api } from "@/shared/common/api/http";

export default function updateNovelReaction(id: string, type: number) {
  return new Promise((resolve, reject) => {
    $api
      .patch(`/novel/${id}/set-reaction`, {
        type
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}
