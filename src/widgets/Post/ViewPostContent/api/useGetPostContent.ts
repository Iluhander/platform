import { useEffect, useState } from 'react';

export default function useGetPostContent(postId: string) {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/static/post/content/${postId}`, {
      method: 'Get'
    }).then((response) => {
      response.text().then((newData) => {
        // Little defence against man-in-the-middle.
        if (~newData.indexOf('<script')) {
          setData(null);
        } else {
          setData(newData);
        }
      });
    });
  }, []);

  return data;
}
