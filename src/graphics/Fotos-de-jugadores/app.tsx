import React, {FC, useEffect, useState} from 'react';
import NCGStore, { replicate } from "../../stores/NodecgStore";

import './app.scss'

const app:FC = () => {
  const [state, setState] = useState({
    replicants: NCGStore.getReplicants(),
  });

  useEffect(() => {
    replicate("keypressRep");
    replicate("currVSRep")
    replicate("onOffRep") // You can subscribe to replicants with this method
  }, []);

  useEffect(() => {
    NCGStore.on("change", () => {
      setState({
        replicants: NCGStore.getReplicants(),
      });
    });
  }, []);

  const {
    replicants: { keypressRep, currVSRep, onOffRep }, // Used to take out a replicant from the replicants object
  } = state || {};

  if(!currVSRep || !onOffRep) {
    return (null)
  }
  const backgroundImages = {
     Orange: "https://www.dropbox.com/s/nwbp0iliu5n74re/Fondo%20Naranja.png?raw=1",
     Blue: "https://www.dropbox.com/s/jgs1o1tnuqi39ou/Fondo%20Azul.png?raw=1",
     noPhoto: ""
  }

  const currentImageLink = currVSRep[parseInt(keypressRep, 10) === 0 ? 9 : keypressRep-1].link
  const CurrentBackColor = currVSRep[parseInt(keypressRep, 10) === 0 ? 9 : keypressRep-1].color
  if(onOffRep === "on"){
    return (
      <div className='app'>
        <img className='Background' src={backgroundImages[CurrentBackColor]} alt=''/>
        <img className='Current' src={currentImageLink} alt=''/>    
      </div>
    );
  };
  return(null)
}

export default app;
