import Link from 'next/link';
import { Page404 } from '@/views/404';

export default function Post404() {
  return (
    <Page404>
      <p>Пост не найден(</p>
      <Link href="/forum" style={{ color: '#ffc107' }}>
        Продолжить поиск →
      </Link>
    </Page404>
  );
}
