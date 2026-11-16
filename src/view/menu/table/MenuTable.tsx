import styles from "./MenuTable.module.css";
import type { IMenu } from '../../../api/dto/menu';

interface MenuTableProps {
  menus: IMenu[];
  clickEdit: (menu: IMenu) => void;
  clickDelete: (menu: IMenu) => void;
}
function MenuTable({ menus, clickEdit, clickDelete }: MenuTableProps) {
  return (
    <>
      <section className={styles.tableContainer}>
        <table className={styles.menuTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td className={styles.menuId}>
                  #{menu.id}
                </td>

                <td className={styles.menuName}>
                  {menu.name}
                </td>

                <td>
                  <div className={styles.actions}>
                    <button className={styles.editButton}
                      onClick={() => { clickEdit(menu) }}>
                      Edit
                    </button>

                    <button className={styles.deleteButton}
                      onClick={() => { clickDelete(menu) }}>
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

export default MenuTable
