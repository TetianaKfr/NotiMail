import React from 'react'
import './notification.css'


const Modal = (props)=> {
    
    return <>
    <div style={{background:'red'}}>
        Modal 

        <div>
            <button>confirm</button>
            <button onClick={()=>{props.cancel(false)}}>cancel</button>

        </div>
    </div>
    </>
}


 const Notification = () => {

    const [isOpen , setIOpen] = React.useState(false)

    const onConfirm = () => {
        setIOpen(true)
        console.log('Confirmation effectuée')
      };
    
   
    
    
    return (
        <>
{isOpen && 
<Modal cancel={setIOpen}></Modal>
}
        <div className='alert'>
            <span>{`Confirmer la réception du courrier : `} </span>
            <div className="button-container">

                <button onClick={onConfirm}>confirmer la reception</button>
            </div>
        </div>
        </>
    )
}
export default Notification