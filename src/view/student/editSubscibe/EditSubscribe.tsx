import { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./EditSubscribe.module.css";
import type { ISubscription } from "../../../api/dto/student";

interface EditSubscribeProps {
  editSubscribes: IEditSubscribe[]
}

interface IEditSubscribe {
  Day: string;
  Menu: string;
}

function EditSubscribe({ editSubscribes }: EditSubscribeProps) {
  const [dayMode, setDayMode] = useState("all");
  const [selectedDay, setSelectedDay] = useState("");

  const [subscribes, setSubscribes] = useState<IEditSubscribe[]>(editSubscribes);

  const [subscribe, setSubscribe] = useState<IEditSubscribe>({ Day: "all", Menu: "" });

  const addSubscription = () => {
    if (subscribe.Menu != "") {
      alert("checl day redundant")
      setSubscribes([...subscribes, subscribe])
      setSubscribe({ Day: "all", Menu: "" })
    } else {
      alert("menu empty")
    }
  }

  const setMenu = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubscribe({
      ...subscribe,
      Menu: e.target.value,
    })
  }

  const removeSubscription = (subscribe: IEditSubscribe) => {
    setSubscribes(subscribes.filter((s) => s.Day != subscribe.Day && s.Menu != subscribe.Menu))
  }
  return (
    <>
      <div className={styles.editSubscriptions}>

        {/* Header */}
        <div className={styles.subscriptionHeader}>
          <div>
            <h2>Edit Subscriptions</h2>
            <p>Manage the student's meal subscriptions</p>
          </div>
        </div>

        {/* Subscription rows */}

        <div className={styles.subscriptionRows}>

          {subscribes.map((subscribe, index) => (
            <div className={styles.subscribeRow} key={index}>

              <div className={styles.subscribeInfo}>
                <div className={styles.subscribeDay}>
                  {subscribe.Day}
                </div>

                <div className={styles.subscribeMenu}>
                  {subscribe.Menu}
                </div>
              </div>

              <button
                className={styles.remove}
                type="button"
                onClick={() => removeSubscription(subscribe)}
                aria-label="Remove subscription"
              >
                −
              </button>

            </div>
          ))}

          <div className={styles.subscriptionRow}>
            {/* Days */}
            <div className={styles.subscriptionField}>
              <label>Day</label>

              <div className={styles.menuOptions}>
                <label>
                  <input
                    type="radio"
                    name="dayMode"
                    value="all"
                    checked={dayMode === "all"}
                    onChange={() => setDayMode("all")}
                  />
                  All days
                </label>

                <label>
                  <input
                    type="radio"
                    name="dayMode"
                    value="one"
                    checked={dayMode === "one"}
                    onChange={() => setDayMode("one")}
                  />
                  One day
                </label>
              </div>

              {dayMode === "one" && (
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Choose one menu</option>
                  <option value="Montag">Montag</option>
                  <option value="Dienstag">Dienstag</option>
                  <option value="Mittwoch">Mittwoch</option>
                  <option value="Donnerstag">Donnerstag</option>
                  <option value="Freitag">Freitag</option>
                </select>
              )}
            </div>

            {/* Menu */}
            <div className={styles.subscriptionField}>
              <label>Menu</label>

              <select
                value={subscribe.Menu}
                onChange={setMenu}>
                <option value="">Choose one menu</option>
                <option value="Menu 1">Menu 1</option>
                <option value="Menu 2">Menu 2</option>
                <option value="Menu 3">Menu 3</option>
                <option value="Menu 4">Menu 4</option>
              </select>
            </div>

            {/* Remove */}
            <button
              className={styles.add}
              type="button"
              onClick={addSubscription}
            >
              +
            </button>

          </div>

        </div>

        {/* Add subscription 
        <button
          className={styles.addSubscription}
          type="button"
          onClick={() => alert("test")}
          disabled={true}
        >
          + Add Another Subscription
        </button>*/}

        {/* Save */}
        <div className={styles.subscriptionSave}>
          <button
            className={styles.saveSubscription}
            type="button"
          >
            Save Changes
          </button>
        </div>

      </div>
    </>
  );
}

export default EditSubscribe
