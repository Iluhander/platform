import { $api } from "@/shared/common/api/http";

export default async function modShowNovel(novelId: string) {
  return $api.patch(`/novel/${novelId}/mod/show`);
}
