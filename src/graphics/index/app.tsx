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
    return (null)
  }
  const currentImageLink = currVSRep[parseInt(keypressRep, 10) === 0 ? 9 : keypressRep-1].link
  if(onOffRep === "on"){
    return (
      <div>
        <img className='Current' src={currentImageLink} alt=''/>    
      </div>
    );
  };
  return(null)
}

export default app;