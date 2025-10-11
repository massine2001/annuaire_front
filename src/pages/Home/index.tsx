import Description from "./components/Description";
import QuickData from "./components/QuickData";
import './style.css';


const Home = () => {


  return (
    <div className="home">
      <div className="home-first-row">
        <Description />
        <QuickData />
      </div>
      
    </div>
  );
}

export default Home;
