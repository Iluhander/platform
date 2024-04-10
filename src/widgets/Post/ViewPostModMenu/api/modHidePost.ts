import { $api } from "@/shared/common/api/http";

export default async function modHidePost(postId: string, reason: string) {
  return $api.patch(`/forum/post/${postId}/mod/hide`, { reason });
}
