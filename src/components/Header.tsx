import { Link } from "react-router";
import { ROUTES } from "../core/constants/routes.const";
import ConnectButton from "./wallet/connect-button/ConnectButton";

export default function Header() {
  return (
    <header className="bg-cyan-950 text-cyan-50 stick px-2">
      <nav className="flex gap-4 items-center py-2">
        Header
        <Link className="flex-1" to={ROUTES.HOME_PAGE}>
          Home
        </Link>
        <ConnectButton />
      </nav>
    </header>
  );
}
