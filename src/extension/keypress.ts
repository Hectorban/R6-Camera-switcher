import ioHook from 'iohook'
import * as nodecgApiContext from './utils/nodecg-api-context'
import keyReference from './utils/keyReference.json'

const nodecg = nodecgApiContext.get()
const keypresRep = nodecg.Replicant("keypressRep")
const onOffRep = nodecg.Replicant("onOffRep")

ioHook.on('keydown', (event) => {
  const {rawcode} = event
  const keyPressString = String.fromCharCode(rawcode)
  if(rawcode >= 48 && rawcode <= 57) {
    keypresRep.value = keyPressString
    onOffRep.value = "on"
  } 
  if(rawcode >= 96 && rawcode <= 105) {
    keypresRep.value = keyReference[keyPressString]
    onOffRep.value = "on"
  } 
  if(rawcode === 67) {
    onOffRep.value = "off"    
  }
});

// Register and start hook
ioHook.start()
