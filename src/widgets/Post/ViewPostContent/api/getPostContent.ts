export default async function getPostContent(postId: string) {
  let res;
  
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_ASSETS}/static/post/content/${postId}`, {
      method: 'Get'
    });
  } catch (e) {
    return null;
  }
  
  const newData = await res.text()
  if (~newData.indexOf('<script')) {
    return null;
  }

  return newData;
}
