import "./App.css";
import AddressInput from "./components/AddressInput.js";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import markerArrow from "./assets/markerarrow.png"
import Descriptions from "./components/Descriptions.js";


function App() {

  return (
    <>
      <Header />
      <Hero />
      <AddressInput />
      <div className="line-container">
        <img src={markerArrow} id="marker-arrow"/>
      </div>
      <Descriptions />
      
    </> 
  );
}

export default App;
