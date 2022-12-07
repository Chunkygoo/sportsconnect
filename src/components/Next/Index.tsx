import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  });
  return <Fragment />;
}
