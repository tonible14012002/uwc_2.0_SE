import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import NoHeaderLayout from "./layouts/NoHeaderLayout/index.js";
import { privateRoutes } from "./routes";
import { EmployeeProvider } from "./context/EmployeeContext";
import ScrollToTop from "./components/ScrollToTop";
import { VehicleProvider } from "./context/VehicleContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || DefaultLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <VehicleProvider>
                    <EmployeeProvider>
                      <ScrollToTop>
                        <Page/>
                      </ScrollToTop>
                    </EmployeeProvider>
                  </VehicleProvider>
                </Layout>
              }
            />
          )
        })}
        <Route
          path="*"
          element={
            <NoHeaderLayout>
            <div>
              not found
            </div>
            </NoHeaderLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
