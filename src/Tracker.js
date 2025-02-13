import Storage from "./Storage";

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCalorieLimit();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
    this._loadStoredItems();
  }

  // Public Methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.UpdateTotalCalories(this._totalCalories);
    Storage.updateMeals(meal);
    this._displayNewMeal(meal);

    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.UpdateTotalCalories(this._totalCalories);
    Storage.updateWorkouts(workout);
    this._displayNewWorkout(workout);

    this._render();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCalorieLimit();
    this._render();
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    localStorage.removeItem("meals");
    localStorage.removeItem("workouts");
    localStorage.removeItem("totalCalories");
    this._render();
  }

  _displayTotalCalories() {
    const totalCalories = document.getElementById("calories-total");
    totalCalories.innerHTML = this._totalCalories;
  }

  _displayCalorieLimit() {
    const calorieLimit = document.getElementById("calories-limit");
    calorieLimit.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumed.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurned = document.getElementById("calories-burned");
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurned.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesProgress = document.getElementById("calorie-progress");
    const caloriesRemaining = document.getElementById("calories-remaining");
    const remainder = this._calorieLimit - this._totalCalories;
    caloriesRemaining.innerHTML = remainder;

    if (remainder < 0) {
      caloriesRemaining.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemaining.parentElement.parentElement.classList.add("bg-danger");
      caloriesProgress.classList.remove("bg-success");
      caloriesProgress.classList.add("bg-danger");
    } else {
      caloriesRemaining.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemaining.parentElement.parentElement.classList.add("bg-light");
      caloriesProgress.classList.remove("bg-danger");
      caloriesProgress.classList.add("bg-success");
    }
  }
  _displayCaloriesProgress() {
    const caloriesProgress = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    caloriesProgress.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    // Create the main card container
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "my-2");
    cardDiv.setAttribute("data-id", meal.id);

    // Create the card body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    // Create the flex container
    const flexDiv = document.createElement("div");
    flexDiv.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );

    // Create the heading
    const heading = document.createElement("h4");
    heading.classList.add("mx-1");
    heading.textContent = `${meal.name}`;

    // Create the calorie counter div
    const calorieDiv = document.createElement("div");
    calorieDiv.classList.add(
      "fs-1",
      "bg-primary",
      "text-white",
      "text-center",
      "rounded-2",
      "px-2",
      "px-sm-5"
    );
    calorieDiv.textContent = `${meal.calories}`;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "btn", "btn-danger", "btn-sm", "mx-2");

    // Create the delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-xmark");

    // Append the icon to the button
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener("click", () => {
      this._removeItem(meal.id, "meal");
      cardDiv.remove();
    });

    // Append all elements to their respective parents
    flexDiv.appendChild(heading);
    flexDiv.appendChild(calorieDiv);
    flexDiv.appendChild(deleteButton);
    cardBodyDiv.appendChild(flexDiv);
    cardDiv.appendChild(cardBodyDiv);

    const container = document.getElementById("meal-items");
    container.appendChild(cardDiv);
  }

  _displayNewWorkout(workout) {
    // Create the main card container
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "my-2");
    cardDiv.setAttribute("data-id", workout.id);
    // Create the card body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    // Create the flex container
    const flexDiv = document.createElement("div");
    flexDiv.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );

    // Create the heading
    const heading = document.createElement("h4");
    heading.classList.add("mx-1");
    heading.textContent = `${workout.name}`;

    // Create the calorie counter div
    const calorieDiv = document.createElement("div");
    calorieDiv.classList.add(
      "fs-1",
      "bg-secondary",
      "text-white",
      "text-center",
      "rounded-2",
      "px-2",
      "px-sm-5"
    );
    calorieDiv.textContent = `${workout.calories}`;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "btn", "btn-danger", "btn-sm", "mx-2");

    // Create the delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-xmark");

    // Append the icon to the button
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener("click", () => {
      this._removeItem(workout.id, "workout");
      cardDiv.remove();
    });

    // Append all elements to their respective parents
    flexDiv.appendChild(heading);
    flexDiv.appendChild(calorieDiv);
    flexDiv.appendChild(deleteButton);
    cardBodyDiv.appendChild(flexDiv);
    cardDiv.appendChild(cardBodyDiv);

    // Append the card to a container in the DOM
    const container = document.getElementById("workout-items");
    container.appendChild(cardDiv);
  }

  _removeItem(id, type) {
    console.log(`Trying to remove item with ID: ${id}, Type: ${type}`);

    if (type === "meal") {
      this._meals = this._meals.filter((meal) => meal.id !== id);
      this._totalCalories = this._meals.reduce(
        (total, meal) => total + meal.calories,
        0
      );
      Storage.updateMeals(null, id);
    } else {
      console.log("Before removal (workouts):", this._workouts);
      const removedWorkout = this._workouts.find(
        (workout) => workout.id.toString() === id.toString()
      );
      this._workouts = this._workouts.filter((workout) => workout.id !== id);
      this._totalCalories += removedWorkout.calories;
      Storage.updateWorkouts(null, id);
    }
    //console.log("After removal (workouts):", this._workouts);
    // Re-render the calorie stats

    Storage.UpdateTotalCalories(this._totalCalories);
    this._render();
  }

  _loadStoredItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  _render() {
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

export default CalorieTracker;
