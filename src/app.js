import "./css/style.css";
import "./css/bootstrap.css";
import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";

import CalorieTracker from "./Tracker";
import { Meal, Workout } from "./Item";

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", (event) => this._newItem(event, "meal"));

    document
      .getElementById("workout-form")
      .addEventListener("submit", (event) => this._newItem(event, "workout"));

    document
      .getElementById("filter-meals")
      .addEventListener("input", (event) => this._filterItem(event, "meal"));

    document
      .getElementById("filter-workouts")
      .addEventListener("input", (event) => this._filterItem(event, "workout"));

    document
      .getElementById("reset")
      .addEventListener("click", () => this._reset());

    document
      .getElementById("limit-form")
      .addEventListener("submit", (event) => this._setLimit(event));
  }

  _newItem(event, type) {
    event.preventDefault();

    const nameInput = document.getElementById(`${type}-name`);
    const caloriesInput = document.getElementById(`${type}-calories`);

    if (nameInput.value === "" || caloriesInput.value === "") {
      alert("Please fill in all fields");
      return;
    }

    // Create a new instance (Meal or Workout)
    const item =
      type === "meal"
        ? new Meal(nameInput.value, +caloriesInput.value)
        : new Workout(nameInput.value, +caloriesInput.value);

    // Add to the tracker
    if (type === "meal") {
      this._tracker.addMeal(item);
      //this._tracker._displayNewMeal(item);
    } else {
      this._tracker.addWorkout(item);
      //this._tracker._displayNewWorkout(item);
    }

    // Clear input fields
    nameInput.value = "";
    caloriesInput.value = "";

    // Collapse the form dynamically
    let collapseForm = new Collapse(
      document.getElementById(`collapse-${type}`),
      {
        toggle: true,
      }
    );
    //    collapseForm.hide();
  }

  _filterItem(event, type) {
    {
      const items = document.querySelectorAll(`#${type}-items .card`);
      const text = event.target.value.toLowerCase();
      items.forEach((item) => {
        const itemName =
          item.firstElementChild.firstElementChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  }

  _setLimit(event) {
    event.preventDefault();
    const limit = document.getElementById("limit");

    if (limit.value === "") {
      alert("Please add a limit");
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = "";

    const modalEl = document.getElementById("limit-modal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }

  _reset() {
    this._tracker.reset();
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-workouts").value = "";
  }
}

const app = new App();
