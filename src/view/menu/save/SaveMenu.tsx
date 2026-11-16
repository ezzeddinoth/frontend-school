import { useState } from "react";
import type { IMenu } from "../../../api/dto/menu";
import styles from "./SaveMenu.module.css";

interface SaveMenuProps {
    editMenu: IMenu | null
    stopEditing: () => void
    submit: (menu: IMenu) => void
}

function SaveMenu({ editMenu, stopEditing, submit }: SaveMenuProps) {

    const isEditting: boolean = editMenu !== null
    const initMenu: IMenu = editMenu !== null ?
        editMenu :
        { id: 0, name: "" };
    const [menu, setMenu] = useState<IMenu>(initMenu);

    return (
        <main className={styles.saveMenuPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>{isEditting ? "Edit Menu" : "Create New Menu"}</h1>

                    <p>
                        {isEditting
                            ? "Update menu information"
                            : "Add a new menu to your records"}
                    </p>
                </header>

                <section className={styles.formContainer}>
                    <form onSubmit={() => { }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="menuName">Menu Name</label>

                            <input
                                id="menuName"
                                type="text"
                                placeholder="Enter menu name"
                                value={menu.name}
                                onChange={(e) => { setMenu({ ...menu, name: e.target.value }) }}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={stopEditing}
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className={styles.saveButton}
                                onClick={() => { submit(menu) }}
                            >
                                {isEditting ? "Update Menu" : "Create Menu"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default SaveMenu;
