import './notification.css'

 const Notification = ({onConfirm, onCancel, message }) => {
    const handleConfirmation = () => {
        console.log('Confirmation effectuée')
      };
    
      const handleCancel= () => {
          console.log('Annulation effectuée')
      };
    
    <Notification onConfirm={handleConfirmation} onCancel={handleCancel} message="Votre Message" />;
    
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
export default Notification