import Header from "./components/Header";

const DefaultLayout = ({children}) => {
    return (
        <div className="h-[100vh] w-full">
            <header className="h-[80px] block">
                <Header/>
            </header>
            <div className="max-w-[1400px] mx-auto w-full">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;