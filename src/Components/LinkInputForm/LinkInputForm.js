import React from 'react'
import './LinkInputForm .css'

function LinkInputForm({onInputChange, onImageSubmit}) {
    return (
        <div>
            <p className='f3 tc'>
                {'Detecting faces in your pictures. Give it a try ! !'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5' >
                    <input type="text" className='f4 pa2 w-80 center' onChange={onInputChange}/>
                    <button className='w-20 grow f4 link ph3 pv2 dib gray bg-light-grey' onClick={onImageSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default LinkInputForm
