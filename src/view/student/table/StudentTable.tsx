import styles from "./StudentTable.module.css";
import type { IStudent } from '../../../api/dto/student';

interface StudentTableProps {
  students: IStudent[];
  clickEdit: (student: IStudent) => void;
  clickDelete: (student: IStudent) => void;
  selectedStudents: number[];
  toggleSelectStudent: (student: IStudent) => void
}

function StudentTable({
  students,
  clickEdit,
  clickDelete,
  selectedStudents,
  toggleSelectStudent
}: StudentTableProps) {

  const isSelected = (id: number): boolean => {
    if (selectedStudents.includes(id)) {
      return true
    }
    return false
  }

  return (
    <>
      <section className={styles.tableContainer}>
        <table className={styles.studentTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subscriptions</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}
                className={isSelected(student.id) ? styles.selectedRow : ""}
                onClick={() => toggleSelectStudent(student)}
              >
                <td className={styles.studentId}>
                  #{student.id}
                </td>

                <td className={styles.studentName}>
                  {student.name}
                </td>

                <td>
                  <div className={styles.subscriptions}>
                    {student.subscription?.length > 0 ? (
                      student.subscription.map((sub, index) => (
                        <div
                          key={index}
                          className={styles.subscriptionBadge}
                        >
                          <span className={styles.subscriptionDay}>
                            {sub.day}
                          </span>

                          <span className={styles.subscriptionMenu}>
                            {sub.menu}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className={styles.noSubscription}>
                        No subscription
                      </span>
                    )}
                  </div>
                </td>

                <td>
                  <div className={styles.actions}>
                    <button className={styles.editButton}
                      onClick={() => { clickEdit(student) }}>
                      Edit
                    </button>

                    <button className={styles.deleteButton}
                      onClick={() => { clickDelete(student) }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default StudentTable
