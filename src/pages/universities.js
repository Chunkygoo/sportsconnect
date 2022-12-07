import React from "react";
// import UniversitiesGallery from '../components/Universities/UniversitiesGallery';

export default function universities({ _res }) {
  return (
    <div className="max-h-screen-xl mx-auto min-h-[80vh] max-w-screen-xl">
      {/* <UniversitiesGallery _res={_res} /> */}
      <div>uni</div>
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
