import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import UniversitiesGallery from "../components/Universities/UniversitiesGallery";
// import UniversitiesGallery from '../components/Universities/UniversitiesGallery';

// export default function universities({ _res }) {
export default function universities() {
  return (
    <div className="max-h-screen-xl mx-auto min-h-[80vh] max-w-screen-xl">
      <UniversitiesGallery />
    </div>
  );
}

// export async function getStaticProps() {
//   try {
//     let res = await getPublicUniversities(9);
//     return {
//       props: {
//         _res: { data: res.data, status: res.status },
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         _res: { data: [], status: 200 },
//       },
//     };
//   }
// }
export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/universities",
    }),
  };
}
