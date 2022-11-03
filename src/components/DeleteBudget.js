import React from 'react'
import styles from "./modal.module.css"

const DeleteBudget = ({toggleDelete,deleteConfirmed,clickedId}) => {
   

  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <b>Are you sure you want to delete budget?</b>

        <div className={styles.modalbutton}>
          <button onClick={()=>deleteConfirmed(clickedId)} >Delete</button>
          <button name={clickedId} onClick={()=>toggleDelete()}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBudget