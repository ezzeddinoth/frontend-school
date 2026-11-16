import styles from "./DeleteStudent.module.css";

interface ConfirmDeleteProps {
    studentId: number;
    onConfirm: (studentId: number) => void;
    onCancel: () => void;
}

const DeleteStudent = ({ studentId, onConfirm, onCancel }: ConfirmDeleteProps) => {
    return (
        <div className={styles.overlay}>
            <div
                className={styles.popup}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="deleteTitle"
                aria-describedby="deleteDescription"
            >
                <div className={styles.iconContainer}>
                    <span>🗑️</span>
                </div>

                <h2 id="deleteTitle">Delete Student?</h2>

                <p id="deleteDescription">
                    Are you sure you want to delete student{" "}
                    <strong>#{studentId}</strong>?
                </p>

                <small>This action cannot be undone.</small>

                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.deleteButton}
                        onClick={() => { onConfirm(studentId) }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteStudent;
