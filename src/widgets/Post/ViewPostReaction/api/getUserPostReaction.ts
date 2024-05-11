import { $api } from "@/shared/common/api/http";

export default function getUserPostReaction(postId: string): Promise<{ type: number }> {
  return new Promise((resolve, reject) => {
    $api
      .get(`/forum/post/${postId}/reaction`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}
