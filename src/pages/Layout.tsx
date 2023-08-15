type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container bg-slate-100 mx-auto min-h-screen">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
