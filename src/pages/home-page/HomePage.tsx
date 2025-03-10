import BasePage from "../BasePage";
import ChainList from "../../components/chain/ChainList";
import { Suspense } from "react";
import useStore from "../../core/stores/store";
import GetStarted from "./components/get-started/GetStarted";

export default function HomePage() {
  const { chains } = useStore();
  return (
    <BasePage centerContent={false}>
      {!!chains ? (
        <Suspense fallback={<>Loading ...</>}>
          <ChainList />
        </Suspense>
      ) : (
        <GetStarted />
      )}
    </BasePage>
  );
}
