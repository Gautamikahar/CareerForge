import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
//this has the main pages which should displayed 
function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;