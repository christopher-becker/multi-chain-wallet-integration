import { Link } from "react-router";
import GetStarted from "./get-started/GetStarted";
import { ROUTES } from "../../core/constants/routes.const";

export default function Header() {
  return (
    <header className="bg-gray-950 border-b-[1px] border-b-gray-800 stick px-2">
      <nav className="flex gap-4 items-center py-2">
        <Link
          data-testid="header-title"
          className="flex-1"
          to={ROUTES.HOME_PAGE}
        >
          Token List
        </Link>
        <GetStarted />
      </nav>
    </header>
  );
}
