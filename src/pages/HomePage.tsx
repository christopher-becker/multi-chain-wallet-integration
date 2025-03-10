import BasePage from "./BasePage";
import ChainList from "../components/chain/ChainList";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <BasePage>
      <Suspense fallback={<>Loading ...</>}>
        <ChainList />
      </Suspense>
    </BasePage>
  );
}
