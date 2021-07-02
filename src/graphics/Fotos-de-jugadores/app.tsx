import React, {FC, useEffect, useState} from 'react';
import NCGStore, { replicate } from "../../stores/NodecgStore";

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

  if(!keypressRep || !currVSRep || !onOffRep) {
    console.log(currVSRep)
    return (null)
  }
  const backgroundImages = {
     Orange: "https://www.dropbox.com/s/dj8xfvnw11oelae/Fondo%20Naranja.png?dl=1",
     Blue: "https://www.dropbox.com/s/kynu2kb2dc6rsgb/Fondo%20Azul.png?dl=1"
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