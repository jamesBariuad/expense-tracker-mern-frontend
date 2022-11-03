import React from "react";
import styles from "./modal.module.css";

const DeleteTransaction = ({
  id,
  closeDelete,
  deleteConfirmed,
  transactions,
}) => {
  const filterById = transactions?.filter(
    (transaction) => transaction._id === id
  );
  const handleDelete = () => {
    deleteConfirmed(filterById);
    closeDelete();
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <b>Are you sure you want to delete transaction?</b>

        <div className={styles.modalbutton}>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={closeDelete}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransaction;
