import { useState } from "react";
import styles from "./Menu.module.css";
import { useLoaderData } from "react-router-dom";
import type { IMenu, IMenuPost } from '../../api/dto/menu';
import MenuTable from "./table/MenuTable";
import SaveMenu from "./save/SaveMenu";
import DeleteMenu from "./delete/DeleteMenu";
import { createMenu, deleteMenu, updateMenu } from "../../api/request/menu";
import { useRevalidator } from "react-router-dom";

function Menu() {
  const menus = useLoaderData<IMenu[]>();
  const revalidator = useRevalidator();

  const [showSaveMenu, setShowSaveMenu] = useState<boolean>(false);
  const [ToEditMenu, setToEditMenu] = useState<IMenu | null>(null);

  const [toDeleteMenu, setToDeleteMenu] = useState<IMenu | null>(null);

  const clickSave = () => {
    setShowSaveMenu(true);
    setToEditMenu(null);
  }

  const clickEdit = (menu: IMenu) => {
    setShowSaveMenu(true);
    setToEditMenu(menu);
  }

  const stopEditing = () => {
    setShowSaveMenu(false);
    setToEditMenu(null);
  }

  const clickDelete = (menu: IMenu) => {
    setToDeleteMenu(menu);
  }

  const stopDeleting = () => {
    setToDeleteMenu(null);
  }

  const requestCreate = (menu: IMenu) => {
    const st: IMenuPost = { name: menu.name }
    createMenu(st).
      then(
        () => {
          setShowSaveMenu(false)
          setToEditMenu(null)
          revalidator.revalidate();
        }
        /** todo refresh menu list */).
      catch(/*to do handle; do we need finally? */)
  }

  const requestUpdate = (menu: IMenu) => {
    updateMenu(menu).
      then(
        () => {
          setShowSaveMenu(false)
          setToEditMenu(null)
          revalidator.revalidate();
        }
        /** todo refresh menu list */).
      catch(/*to do handle; do we need finally? */)
  }

  const requestDelete = (menuId: number) => {
    deleteMenu(menuId).
      then(
        () => {
          alert()
          setToDeleteMenu(null)
          revalidator.revalidate();
        }
        /** todo refresh menu list */).
      catch(/*to do handle; do we need finally? */)
  }

  const submitSave = (menu: IMenu) => {
    if (ToEditMenu === null) {
      requestCreate(menu);
    } else {
      requestUpdate(menu);
    }
  }

  return (
    <>
      <main className={styles.menuPage}>
        <div className={styles.container}>

          <header className={styles.header}>
            <div>
              <h1>Menus</h1>
              <p>Manage your menu records</p>
            </div>

            <button
              className={styles.createButton}
              onClick={clickSave}>
              + Create New Menu
            </button>
          </header>

          {
            showSaveMenu ?
              <SaveMenu
                editMenu={ToEditMenu}
                stopEditing={stopEditing}
                submit={submitSave}
              /> :
              <MenuTable
                menus={menus}
                clickEdit={clickEdit}
                clickDelete={clickDelete} />
          }

          {
            toDeleteMenu &&
            <DeleteMenu
              menuId={toDeleteMenu.id}
              onConfirm={requestDelete}
              onCancel={stopDeleting} />
          }
        </div>
      </main>
    </>
  )
}

export default Menu
