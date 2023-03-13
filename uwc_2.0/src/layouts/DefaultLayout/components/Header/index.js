import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import EButton from "../../../../components/Button";
import { useRef } from "react";

const Header = () => {
    const routeName = useRef("");

    const handleRouteChange = (name) => {
        routeName.current = name
    }

    console.log(routeName.current)
    return (
        <div className="w-full fixed h-[80px] bg-white">
            <div className="h-full max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <div className="rounded-full w-14 h-14 bg-blue-400 flex items-center justify-center mr-4">
                        <FontAwesomeIcon className="w-[20px] h-[20px] text-white" icon={faUser}/>
                    </div>
                    <div className="font-semibold text-base mr-8">
                        <h3>Welcome Back</h3>
                        <h3>Tony</h3>
                    </div>
                    <div className=" font-thin text-sm">
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                </div>
                <div className="flex">
                <EButton
                        to={'/'}
                        onClick={() => handleRouteChange('/')}
                    >
                        <div className={`px-8 py-3 ${routeName.current === '/' ? "font-semibold text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                            Dashboard
                        </div>
                    </EButton>
                    <EButton
                        to={'/employee'}
                        onClick={() => handleRouteChange('employee')}
                    >
                        <div className={`px-8 py-3 ${routeName.current === 'employee' ? "font-semibold hover:bg-blue-500 text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                            Employee 
                        </div>
                    </EButton>
                    <EButton
                        to={'/vehicle'}
                        onClick={() => handleRouteChange('vehicle')}
                    >
                        <div className={`px-8 py-3 ${routeName.current === 'vehicle' ? "font-semibold hover:bg-blue-500 text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                            Vehicle
                        </div>
                    </EButton>
                    <EButton
                        to={'/route-map'}
                        onClick={() => handleRouteChange('route-map')}
                    >
                        <div className={`px-8 py-3 ${routeName.current === 'route-map' ? "font-semibold text-white bg-blue-400": "hover:text-blue-500"} transition-all `}>
                            Route Map 
                        </div>
                    </EButton>
                </div>
            </div>
        </div>
    )
}

export default Header;