import './notification.css'

export const Notification = ({onConfirm, onCancel, message }) => {

    return (
        <>
        <div className='alert'>
            <span>{`Confirmer la réception du courrier : ${message}`} </span>
            <div className="button-container">
                <button onClick={onConfirm}>valider</button>
                <button onClick={onCancel}>annuler</button>
            </div>
        </div>
        </>
    )
}