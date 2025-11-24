import Message from "./message";
import NavBar from "./Components/Layout/Header/navBar.tsx";
import CheckoutPage from "./Components/Pages/checkoutPage";

function App() {
  return (
    <div>
      <NavBar />
      <CheckoutPage />
      <Message />
    </div>
  );
}

export default App;
