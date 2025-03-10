import { Link } from "react-router";
import { ROUTES } from "../core/constants/routes.const";
import GetStarted from "./wallet/get-started/GetStarted";

export default function Header() {
  return (
    <header className="bg-gray-950 border-b-[1px] border-b-gray-800 stick px-2">
      <nav className="flex gap-4 items-center py-2">
        <Link className="flex-1" to={ROUTES.HOME_PAGE}>
          Home
        </Link>
        <GetStarted />
      </nav>
    </header>
  );
}
