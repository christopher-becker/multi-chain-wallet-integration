import Footer from "../components/Footer";
import Header from "../components/header/Header";
import Modals from "../modals";

type BasePageProps = React.PropsWithChildren<{
  centerContent?: boolean;
}>;

export default function BasePage(props: BasePageProps) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main
        className={`flex-1 flex justify-center py-12 px-0 sm:px-2 ${
          props.centerContent === false ? "items-start" : "items-center"
        }`}
      >
        {props.children ?? <></>}
      </main>
      <Modals />
      <Footer />
    </div>
  );
}
