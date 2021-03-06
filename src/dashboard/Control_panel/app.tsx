/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {FC, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MasterList from './json/playerImageLinks5.json'
import { Team } from '~types/teamLinksTypes';
import './app.scss'

const currentVersusRep = nodecg.Replicant("currVSRep")

const app:FC = () => {
  const [BlueTeam, setBlueTeam] = useState<Team[]>(MasterList.Hawks)
  const [OrangeTeam, setOrangeTeam] = useState<Team[]>(MasterList.Hawks)

  function updateRep () {
    const blueArraycopy = Array.from(BlueTeam)
    const OrangeArraycopy = Array.from(OrangeTeam)
    const clamptofiveBlue = blueArraycopy.splice(0,5)  
    const clamptofiveOrange = OrangeArraycopy.splice(0,5)  
    clamptofiveBlue.map((player) => {
      player.color = "Blue"
      if(player.link === 'Sin_Foto') {
        player.color = 'noPhoto'
      }
    })
    clamptofiveOrange.map((player) => {
      player.color = "Orange"
      if(player.link === 'Sin_Foto') {
        player.color = 'noPhoto'
      }
    })
    const currentVersusArray = clamptofiveBlue.concat(clamptofiveOrange)
    currentVersusRep.value = currentVersusArray
  }

  function handleblueOnDragEnd(result) {
    const items = Array.from(BlueTeam);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBlueTeam(items);
  }

  function handleorangeOnDragEnd(result) {
    const items = Array.from(OrangeTeam);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrangeTeam(items);
  }

  return (
    <div className='App'>
      <div className='formulary'>
      <Formik
        initialValues={{
          Orangeteam: 'Maycam Evolve',
          Blueteam: 'Maycam Evolve'
        }}
        onSubmit={(values) =>{
          const {Orangeteam, Blueteam} = values
          setBlueTeam(MasterList[Blueteam])
          setOrangeTeam(MasterList[Orangeteam])
        }}
      > 
        <Form className='team-selection'>
          <label id='blueTeam-label' htmlFor='Blueteam'>Equipo azul</label>
          <Field id='blueTeam' as='select' name='Blueteam'>
            <option value='Maycam Evolve'>Maycam Evolve</option>
            <option value='Hawks'>Hawks</option>
            <option value='Uala Pampas'>Uala Pampas</option>
            <option value='Furious'>Furious</option>
            <option value='Newstar'>Newstar</option>
            <option value='Leviatan'>Leviatan</option>
            <option value='Malvinas Gaming'>Malvinas Gaming</option>
            <option value='Isurus'>Isurus</option>
          </Field>
          <label id='orangeTeam-label' htmlFor='OrangeTeam'>Equipo Naranja</label>
          <Field id='orangeTeam' as='select' name='Orangeteam'> 
            <option value='Maycam Evolve'>Maycam Evolve</option>
            <option value='Hawks'>Hawks</option>
            <option value='Uala Pampas'>Uala Pampas</option>
            <option value='Furious'>Furious</option>
            <option value='Newstar'>Newstar</option>
            <option value='Leviatan'>Leviatan</option>
            <option value='Malvinas Gaming'>Malvinas Gaming</option>
            <option value='Isurus'>Isurus</option>
          </Field>
          <button id='submit-button' type='submit'>Actualizar datos</button>
        </Form>
      </Formik>
      </div>
      <div className='draggables'>
        {BlueTeam ?  
            <DragDropContext onDragEnd={handleblueOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {BlueTeam.map(({name}, index) => (
                        <Draggable key={name} draggableId={name} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>{name}</p>
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
                    {OrangeTeam.map(({name}, index) => (
                        <Draggable key={name} draggableId={name} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                              <p>{name}</p>
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
      <button id='submitPhotos-button' type='button' onClick={updateRep}>ACTUALIZAR FOTOS</button>
    </div>
  );
};

export default app;
