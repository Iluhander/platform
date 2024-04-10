import { $api } from "@/shared/common/api/http";

export default async function modDeleteComment(commentId: string) {
  return $api.delete(`/comment/${commentId}`);
}
