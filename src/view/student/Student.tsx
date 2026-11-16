import { useState } from "react";
import styles from "./Student.module.css";
import { useLoaderData } from "react-router-dom";
import type { IStudent, IStudentPost } from '../../api/dto/student';
import StudentTable from "./table/StudentTable";
import SaveStudent from "./save/SaveStudent";
import DeleteStudent from "./delete/DeleteStudent";
import { createStudent, deleteStudent, updateStudent } from "../../api/request/student";
import { useRevalidator } from "react-router-dom";
import EditSubscribe from "./editSubscibe/EditSubscribe";

function Student() {
  const students = useLoaderData<IStudent[]>();
  const revalidator = useRevalidator();

  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const [showSaveStudent, setShowSaveStudent] = useState<boolean>(false);
  const [ToEditStudent, setToEditStudent] = useState<IStudent | null>(null);

  const [toDeleteStudent, setToDeleteStudent] = useState<IStudent | null>(null);

  const clickSave = () => {
    setShowSaveStudent(true);
    setToEditStudent(null);
  }

  const clickEdit = (student: IStudent) => {
    setShowSaveStudent(true);
    setToEditStudent(student);
  }

  const stopEditing = () => {
    setShowSaveStudent(false);
    setToEditStudent(null);
  }

  const clickDelete = (student: IStudent) => {
    setToDeleteStudent(student);
  }

  const stopDeleting = () => {
    setToDeleteStudent(null);
  }

  const requestCreate = (student: IStudent) => {
    const st: IStudentPost = { name: student.name }
    createStudent(st).
      then(
        () => {
          setShowSaveStudent(false)
          setToEditStudent(null)
          revalidator.revalidate();
        }
        /** todo refresh student list */).
      catch(/*to do handle; do we need finally? */)
  }

  const requestUpdate = (student: IStudent) => {
    updateStudent(student).
      then(
        () => {
          setShowSaveStudent(false)
          setToEditStudent(null)
          revalidator.revalidate();
        }
        /** todo refresh student list */).
      catch(/*to do handle; do we need finally? */)
  }

  const requestDelete = (studentId: number) => {
    deleteStudent(studentId).
      then(
        () => {
          alert()
          setToDeleteStudent(null)
          revalidator.revalidate();
        }
        /** todo refresh student list */).
      catch(/*to do handle; do we need finally? */)
  }

  const submitSave = (student: IStudent) => {
    if (ToEditStudent === null) {
      requestCreate(student);
    } else {
      requestUpdate(student);
    }
  }

  const [multiSelect, setMultiSelect] = useState<boolean>(false)

  const toggleSelectStudent = (student: IStudent): void => {
    // list was empty
    if (selectedStudents.length === 0) {
      if (student.subscription.length > 0) {
        setSelectedStudents([student.id])
        setMultiSelect(false)
      }
      else {
        setSelectedStudents([student.id])
        setMultiSelect(true)
      }
    }

    // list was not empty
    if (selectedStudents.length > 0) {
      // the newly selected is in the list.
      if (selectedStudents.includes(student.id))  {
        setSelectedStudents(selectedStudents.filter((id) => id !== student.id))
        return
      }
      if (!multiSelect) {
        alert("Eine Mehrfachauswahl ist nur möglich, wenn keiner der ausgewählten Studenten ein Abonnement hat.")
        return
      }
      // the newly selected is not in the list.
      if (!selectedStudents.includes(student.id)) {
        // students has one or more subscription
        if (student.subscription.length > 0) {
          alert("Eine Mehrfachauswahl ist nur möglich, wenn keiner der ausgewählten Studenten ein Abonnement hat.")
          return
        } // students has no subscription
        else {
          setSelectedStudents([...selectedStudents, student.id])
        }
      }
    }    
  }

  const clickSubscribe = () => { }

  return (
    <>
      <main className={styles.studentPage}>
        <div className={styles.container}>

          <header className={styles.header}>
            <div>
              <h1>Students</h1>
              <p>Manage your student records</p>
            </div>

            <button
              className={styles.createButton}
              onClick={clickSave}>
              + Create New Student
            </button>
          </header>

          {
            showSaveStudent ?
              <SaveStudent
                editStudent={ToEditStudent}
                stopEditing={stopEditing}
                submit={submitSave}
              /> :
              <StudentTable
                students={students}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
                toggleSelectStudent={toggleSelectStudent}
                selectedStudents={selectedStudents} />
          }

          {
            toDeleteStudent &&
            <DeleteStudent
              studentId={toDeleteStudent.id}
              onConfirm={requestDelete}
              onCancel={stopDeleting} />
          }
        </div>

        <div className={styles.subscribeContainer}>
          <button
            className={styles.subscribeButton}
            onClick={clickSubscribe}
          >
            Edit Subscribe
          </button>
        </div>
        <div className={styles.container}>
          <EditSubscribe
          editSubscribes={[]}
          ></EditSubscribe>
        </div>

      </main>
    </>
  )
}

export default Student
