import { $api } from "@/shared/common/api/http";

export default async function modHideNovel(novelId: string, reason: string) {
  return $api.patch(`/novel/${novelId}/mod/hide`, { reason });
}
