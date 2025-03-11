import { Link } from "react-router";
import { ROUTES } from "../../core/constants/routes.const";
export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t-[1px] border-t-gray-800 stick px-2">
      <nav className="flex gap-4 items-center py-2 justify-center">
        <span data-testid="footer-title">Footer</span>
        <Link to={ROUTES.HOME_PAGE}>Home</Link>
      </nav>
    </footer>
  );
}
