import dynamic from "next/dynamic";

// const IndexNoSSR = dynamic(new Promise((res) => res(Index)), {
//   ssr: false,
// });

const IndexNoSSR = dynamic(
  import("../../components/Auth/Index").then((module) => module.default),
  {
    ssr: false,
  }
);

export default function loginsignup() {
  return <IndexNoSSR />;
}
