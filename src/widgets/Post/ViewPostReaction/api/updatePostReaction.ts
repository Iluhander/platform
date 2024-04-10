import { $api } from "@/shared/common/api/http";

export default function updatePostReaction(id: string, type: number) {
  return new Promise((resolve, reject) => {
    $api
      .patch(`/forum/post/${id}/set-reaction`, {
        type
      })
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}
