import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

interface Props {}

export default function Shipping({}: Props): ReactElement {
  const router = useRouter();
  router.push('/login');
  return <div></div>;
}
