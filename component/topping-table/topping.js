import React, { useState } from "react";
import Pizza from "../pizza-table/pizza";
import "./topping.css";

export default function Topping() {
  const [toppings, setToppings] = useState([
    { name: "Cheese", selected: false },
    { name: "Mushroom", selected: false },
    { name: "Sausage", selected: false },
  ]);
  const [editing, setEditing] = useState(null);
  const [newTopping, setNewTopping] = useState("");
  const [newToppingInput, setNewToppingInput] = useState("");

  const deleteTopping = (toppingToDelete) => {
    setToppings(toppings.filter((topping) => topping.name !== toppingToDelete));
  };

  const editTopping = (toppingToEdit) => {
    setEditing(toppingToEdit);
    setNewTopping(toppingToEdit);
  };

  const saveTopping = () => {
    setToppings(
      toppings.map((topping) =>
        topping.name === editing ? { ...topping, name: newTopping } : topping
      )
    );
    setEditing(null);
  };

  const addTopping = () => {
    const toppingExists = toppings.some(
      (topping) => topping.name.toLowerCase() === newToppingInput.toLowerCase()
    );

    if (!toppingExists && newToppingInput.trim() !== "") {
      setToppings([
        ...toppings,
        { name: newToppingInput.trim(), selected: false },
      ]);
      setNewToppingInput("");
    } else {
      alert("This topping already exists or input is invalid!");
    }
  };

  return (
    <div className="topping-container">
      <h1>Topping List</h1>
      <div className="add-topping-container">
        <input
          type="text"
          value={newToppingInput}
          onChange={(e) => setNewToppingInput(e.target.value)}
          placeholder="Add new topping"
        />
        <button onClick={addTopping}>Add</button>
      </div>
      <table>
        <tbody>
          {toppings.map((topping, idx) => (
            <tr key={topping.name}>
              <td id="idx">{idx + 1}</td>
              <td>
                {editing === topping.name ? (
                  <input
                    type="text"
                    value={newTopping}
                    onChange={(e) => setNewTopping(e.target.value)}
                  />
                ) : (
                  topping.name
                )}
              </td>

              <td>
                {editing === topping.name ? (
                  <button onClick={saveTopping}>Save</button>
                ) : (
                  <button onClick={() => editTopping(topping.name)}>
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => deleteTopping(topping.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pizza toppings={toppings} />
    </div>
  );
}
