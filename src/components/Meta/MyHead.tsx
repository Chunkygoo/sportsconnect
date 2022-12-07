import Head from 'next/head';
import React from 'react';

export default function MyHead() {
  return (
    <Head>
      <title>Sports Connect App</title>
      <meta
        name="description"
        content="Sports Connect connects athletes to universities"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
