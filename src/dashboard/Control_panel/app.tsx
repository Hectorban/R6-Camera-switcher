/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {FC, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MasterList from './json/playerImageLinks.json'
import './app.scss'

const currentVersusRep = nodecg.Replicant("currVSRep")

const app:FC = () => {
  const [BlueTeam, setBlueTeam] = useState()
  const [OrangeTeam, setOrangeTeam] = useState()

  function handleblueOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(BlueTeam);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items[0].color = "Blue"
    items[1].color = "Blue"
    items[2].color = "Blue"
    items[3].color = "Blue"
    items[4].color = "Blue"
    const fiveClamp = items.splice(0,4)
    setBlueTeam(fiveClamp);
    const currentVersusArray = OrangeTeam.concat(BlueTeam)
    currentVersusRep.value = currentVersusArray
  }

  function handleorangeOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(OrangeTeam);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items[0].color = "Orange"
    items[1].color = "Orange"
    items[2].color = "Orange"
    items[3].color = "Orange"
    items[4].color = "Orange"
    const fiveClamp = items.splice(0,4)
    setOrangeTeam(fiveClamp);
    const currentVersusArray = OrangeTeam.concat(BlueTeam)
    currentVersusRep.value = currentVersusArray
  }

  return (
    <div className='App'>
      <div className='formulary'>
      <Formik
        initialValues={{
          Orangeteam: '9z',
          Blueteam: 'INF'
        }}
        onSubmit={(values) =>{
          const {Orangeteam, Blueteam} = values
           setBlueTeam(MasterList[Blueteam])
           setOrangeTeam(MasterList[Orangeteam])
        }}
        
      > 
        <Form>
          <label htmlFor='Blueteam'>Equipo azul</label>
          <Field id='BlueTeam' as='select' name='Blueteam'>
            <option value='9z'>9z</option>
            <option value='CA'>CA</option>
            <option value='FG'>FG</option>
            <option value='INF'>INF</option>
            <option value='LDM'>LDM</option>
            <option value='LEV'>LEV</option>
            <option value='MVG'>MVG</option>
            <option value='NG'>NG</option>
          </Field>
          <label htmlFor='OrangeTeam'>Equipo Naranja</label>
          <Field id='OrangeTeam' as='select' name='Orangeteam'>
            <option value='INF'>INF</option>
            <option value='LEV'>LEV</option>
            <option value='MVG'>MVG</option>
            <option value='NG'>NG</option>
            <option value='9z'>9z</option>
            <option value='CA'>CA</option>
            <option value='9z'>FG</option>
            <option value='LDM'>LDM</option>
          </Field>
          <button type='submit'>Actualizar</button>
        </Form>
      </Formik>
      </div>
      <div className='draggables'>
    {BlueTeam ?  
        <DragDropContext onDragEnd={handleblueOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {BlueTeam.map(({name, link}, index) => (
                    <Draggable key={name} draggableId={name} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={link} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    : null}
    {OrangeTeam ?  
        <DragDropContext onDragEnd={handleorangeOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {OrangeTeam.map(({name, link}, index) => (
                    <Draggable key={name} draggableId={name} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={link} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    : null}
    </div>
    </div>
  );
};

export default app;
