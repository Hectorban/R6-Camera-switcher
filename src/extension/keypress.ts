import iohook from 'iohook'
import * as nodecgApiContext from './utils/nodecg-api-context'

const nodecg = nodecgApiContext.get()
const keypresRep = nodecg.Replicant("keypressRep")

iohook.on("keypress", event => {
  console.log(event);
  keypresRep.value = event
  // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
});
iohook.start();