import Header from "../components/Header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <div className="bg-background min-h-screen relative">
      <Header />
      <div className="container mx-auto">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
