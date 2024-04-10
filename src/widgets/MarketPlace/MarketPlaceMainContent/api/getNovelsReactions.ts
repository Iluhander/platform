import { $api } from "@/shared/common/api/http";

export default function getNovelsReactions(ids: string[]) {
  return $api.post('/novel/reactions', ids);
}
