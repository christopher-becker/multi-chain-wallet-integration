import { Link } from "react-router";
import { ROUTES } from "../core/constants/routes.const";
export default function Footer() {
  return (
    <footer className="bg-cyan-950 text-cyan-50 stick bottom-0 px-2">
      <nav className="flex gap-4 items-center py-2">
        <span data-testid="footer-display">Footer</span>
        <Link to={ROUTES.HOME_PAGE}>Home</Link>
      </nav>
    </footer>
  );
}
