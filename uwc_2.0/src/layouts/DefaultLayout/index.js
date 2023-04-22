import Header from "./components/Header";

const DefaultLayout = ({children}) => {
    return (
        <div className="h-[100vh] w-full">
            <Header/>
            <div className="max-w-[86rem] mx-auto w-full pt-[5rem] desktop:pt-[5rem] min-h-[calc(100vh-200px)]">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

const Footer = () =>{
    return (
        <footer className="mt-10 border-b-[10px] border-b-blue-400 relative">
            <section className="bg-slate-100 p-4 min-h-[200px] ">
                <h3 className="text-3xl text-center">Footer</h3>
                <p className="text-base text-center text-slate-500 mt-2">Thank you for using our system.</p>
            </section>
            <span className="absolute right-10 bottom-4"> (C) All rights reserved.</span>
        </footer>
    )
}

export default DefaultLayout;