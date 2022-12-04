import Portfolio from "../../components/Portfolio/Portfolio";
// import { SessionAuth } from 'supertokens-auth-react/recipe/session';

export default function portfolio() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-screen-xl flex-wrap items-center justify-between">
      {/* <SessionAuth> */}
      <Portfolio publicView={false} publicUserData={null} />
      {/* </SessionAuth> */}
    </div>
  );
}
