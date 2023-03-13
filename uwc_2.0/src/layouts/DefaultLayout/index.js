import Header from "./components/Header";

const DefaultLayout = ({children}) => {
    return (
        <div className="h-[100vh] w-full">
            <Header/>
            <div className="max-w-[86rem] mx-auto w-full">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;