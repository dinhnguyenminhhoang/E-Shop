import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

interface DefaultLayoutProps {
    children: React.ReactElement;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="bg-background_Color min-h-screen capitalize">
            <Navbar />
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 pt-[78px] capitalize">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
