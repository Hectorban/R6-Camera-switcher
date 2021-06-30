import ioHook from 'iohook';
import * as nodecgApiContext from './utils/nodecg-api-context'

const nodecg = nodecgApiContext.get()
const keypresRep = nodecg.Replicant("keypressRep")
console.log("a")
ioHook.on('mousemove', (event) => {
  console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

// Register and start hook
ioHook.start();
