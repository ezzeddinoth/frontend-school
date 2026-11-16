import { useState } from "react";
import type { IStudent } from "../../../api/dto/student";
import styles from "./SaveStudent.module.css";

interface SaveStudentProps {
    editStudent: IStudent | null
    stopEditing: () => void
    submit: (student: IStudent) => void
}

function SaveStudent({ editStudent, stopEditing, submit }: SaveStudentProps) {

    const isEditting: boolean = editStudent !== null
    const initStudent: IStudent = editStudent !== null ?
        editStudent :
        { id: 0, name: "", subscription: [] };
    const [student, setStudent] = useState<IStudent>(initStudent);

    return (
        <main className={styles.saveStudentPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>{isEditting ? "Edit Student" : "Create New Student"}</h1>

                    <p>
                        {isEditting
                            ? "Update student information"
                            : "Add a new student to your records"}
                    </p>
                </header>

                <section className={styles.formContainer}>
                    <form onSubmit={() => { }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="studentName">Student Name</label>

                            <input
                                id="studentName"
                                type="text"
                                placeholder="Enter student name"
                                value={student.name}
                                onChange={(e) => { setStudent({ ...student, name: e.target.value }) }}
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
                                onClick={() => { submit(student) }}
                            >
                                {isEditting ? "Update Student" : "Create Student"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default SaveStudent;
