import Navbar from '@/components/Navbar';

type ChildrenProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ChildrenProps) => {
  return (
    <section
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -10,
      }}
    >
      <Navbar />
      <main>{children}</main>
    </section>
  );
};
export default Layout;
