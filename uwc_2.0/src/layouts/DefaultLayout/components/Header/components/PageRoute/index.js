import EButton from "../../../../../../components/Button";
import usePageName from "../../../../../../hooks/usePageName";

const PageRoute = () => {

    const { pageName, pages } = usePageName();

    return (
        <div className="hidden desktop:flex">
            <EButton
                to={'/'}
            >
                <div className={`px-8 py-3 ${pageName === pages.Dashboard? "text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                    Dashboard
                </div>
            </EButton>
            <EButton
                to={'/employee'}
            >
                <div className={`px-8 py-3 ${pageName === pages.Employee ? "hover:bg-blue-500 text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                    Employee 
                </div>
            </EButton>
            <EButton
                to={'/vehicle'}
            >
                <div className={`px-8 py-3 ${pageName === pages.Vehicle ? "hover:bg-blue-500 text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                    Vehicle
                </div>
            </EButton>
            <EButton
                to={'/route-map'}
            >
                <div className={`px-8 py-3 ${pageName === pages.RouteMap ? "text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                    Route Map 
                </div>
            </EButton>
        </div>
    );
}

export default PageRoute;
