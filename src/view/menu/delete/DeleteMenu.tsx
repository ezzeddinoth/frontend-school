import styles from "./DeleteMenu.module.css";

interface ConfirmDeleteProps {
    menuId: number;
    onConfirm: (menuId: number) => void;
    onCancel: () => void;
}

const DeleteMenu = ({ menuId, onConfirm, onCancel }: ConfirmDeleteProps) => {
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

                <h2 id="deleteTitle">Delete Menu?</h2>

                <p id="deleteDescription">
                    Are you sure you want to delete menu{" "}
                    <strong>#{menuId}</strong>?
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
                        onClick={() => { onConfirm(menuId) }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMenu;
