import { $api } from "..";

export default function apiPostWrap(endpoint: string, data: any) {
  return new Promise((resolve, reject) => {
    $api
      .post(endpoint, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.status.code);
      });
  });
}
