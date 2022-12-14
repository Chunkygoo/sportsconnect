import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import SessionAuth from "../components/Auth/SessionAuth";
import UniversitiesGallery from "../components/Universities/UniversitiesGallery";

export default function MyUniversities() {
  return (
    <SessionAuth>
      <div className="max-h-screen-xl mx-auto min-h-[80vh] max-w-screen-xl">
        <UniversitiesGallery />
      </div>
    </SessionAuth>
  );
}

// export async function getServerSideProps(context) {
//   let cookieString = '';
//   for (var key of Object.keys(context.req.cookies)) {
//     cookieString += key + '=' + context.req.cookies[key] + '; ';
//   }
//   try {
//     let myAxios = await myAxiosPrivate();
//     var res = await myAxios
//       .get(`/universities/interested_only?limit=-1`, {
//         headers: {
//           Cookie: cookieString,
//         },
//       })
//       .catch((e) => {
//         throw new Error(e);
//       });
//     if (res.status === 401) {
//       return { props: { fromSupertokens: 'needs-refresh' } };
//     }
//     return {
//       props: {
//         _res: { data: res.data, status: res.status },
//       },
//     };
//   } catch (error) {
//     if (error.message !== 'CanceledError: canceled') {
//       throw new Error(e);
//     }
//   }
// }

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/myuniversities",
    }),
  };
}
