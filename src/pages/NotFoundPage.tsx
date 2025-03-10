import { Link } from "react-router";
import BasePage from "./BasePage";
import { ROUTES } from "../core/constants/routes.const";

export default function NotFoundPage() {
  return (
    <BasePage>
      <div className="flex items-center flex-col gap-12">
        <h1>Page Not Found.</h1>
        <p>
          <Link className="btn-secondary" to={ROUTES.GET_STARTED}>
            Get Started
          </Link>
        </p>
      </div>
    </BasePage>
  );
}
