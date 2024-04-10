import { $api } from "@/shared/common/api/http";

export default async function modShowPost(postId: string) {
  return $api.patch(`/forum/post/${postId}/mod/show`);
}
