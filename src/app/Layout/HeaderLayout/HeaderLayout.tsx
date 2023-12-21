import Navbar from "../Navbar/Navbar";

interface HeaderLayoutProps {
    children: React.ReactElement;
}
const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
    return (
        <div className="bg-[#f9f9f9] min-h-screen">
            <Navbar />
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 pt-[78px] min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default HeaderLayout;
