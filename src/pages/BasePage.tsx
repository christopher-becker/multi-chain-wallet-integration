import Footer from "../components/Footer";
import Header from "../components/Header";
import Modals from "../modals";

type BasePageProps = React.PropsWithChildren<{}>;

export default function BasePage(props: BasePageProps) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div>{props.children ?? <></>}</div>
      </main>
      <Modals />
      <Footer />
    </div>
  );
}
