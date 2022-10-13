import { React, useState } from "react";
import RouteSwitch from "./RouteSwitch";
import Splashscreen from "./components/Splashscreen";
import Footer from "./components/Footer";

const App = () => {
  const [splash, setSplash] = useState(<div className="Splashscreen splashscreen-hidden"></div>);

  // either use type of 'fullscreen' or 'popup'
  const timedSetSplash = (content, msLength, type = "") => {
    const newSplash = <div className={`Splashscreen ${type}`}>{content}</div>;
    setSplash(newSplash);
    if (msLength === "forever") return;
    setTimeout(() => setSplash(<div className="Splashscreen splashscreen-hidden"></div>), msLength);
  };

  return (
    <div className="App">
      <Splashscreen content={splash} />
      <RouteSwitch timedSetSplash={timedSetSplash} />
      <Footer />
    </div>
  );
};

export default App;
