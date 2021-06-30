/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {FC} from 'react';
import { Formik, Field, Form } from 'formik';
import MasterList from './json/playerImageLinks.json'

const currentVersusRep = nodecg.Replicant("currVSRep")

const app:FC = () => {
  console.log("A")
  
  return (
    <div className='Team-Selection'>
      <Formik
        initialValues={{
          Orangeteam: '9z',
          Blueteam: 'INF'
        }}
        onSubmit={(values) =>{
          const {Orangeteam, Blueteam} = values
          const blueTeamArr = MasterList[Blueteam]
          const OrangeTeamArr = MasterList[Orangeteam]
          const currentVersusArray = OrangeTeamArr.concat(blueTeamArr)
          currentVersusRep.value = currentVersusArray
        }}
      >
        <Form>
          <label htmlFor='Blueteam'>Equipo azul</label>
          <Field as='select' name='Blueteam'>
            <option value='9z'>9z</option>
            <option value='CA'>CA</option>
            <option value='9z'>FG</option>
            <option value='LDM'>LDM</option>
          </Field>
          <label htmlFor='OrangeTeam'>Equipo Naranja</label>
          <Field as='select' name='Orangeteam'>
            <option value='INF'>INF</option>
            <option value='LEV'>LEV</option>
            <option value='MVG'>MVG</option>
            <option value='NG'>NG</option>
          </Field>
          <button type='submit'>Actualizar</button>
        </Form>
      </Formik>
    </div>
  );
};

export default app;
