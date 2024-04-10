import { $api } from "@/shared/common/api/http";

export default function getPostsReactions(ids: string[]) {
  return $api.post('/forum/post/reactions', ids);
}
