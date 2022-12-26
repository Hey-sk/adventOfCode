
import './input.css'

export default function Input({title, heading, handleSubmit, defaultInput}) {
    return (
        <>
            <div className="inputComponent">
                <div className='inputTitle'>{title}</div>
                <div className='inputHeading'>{heading}</div>
                <form className="inputComponentForm" onSubmit={(e) => handleSubmit(e)}>
                    <textarea id='textInput' defaultValue={defaultInput}/>
                    <button type='submit'> LOAD INPUT </button>
                </form>
            </div>
        </>
    )
}