import Link from 'next/link';
import { Page404 } from '@/views/404';

export default function Novel404() {
  return (
    <Page404>
      <p>Такой новеллы нет(</p>
      <Link href="/" style={{ color: '#ffc107' }}>
        Посмотреть, какие есть →
      </Link>
    </Page404>
  );
}
