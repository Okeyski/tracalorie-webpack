class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories") === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }
    return totalCalories;
  }

  static UpdateTotalCalories(calories) {
    localStorage.setItem("totalCalories", calories);
  }

  static getMeals() {
    let meals = localStorage.getItem("meals");
    return meals ? JSON.parse(meals) : [];
  }

  static updateMeals(meal = null, removeId = null) {
    let meals = Storage.getMeals();

    if (meal) {
      // If a new meal is provided, add it to the list
      meals.push(meal);
    }

    if (removeId) {
      // If removeId is provided, filter out the deleted meal
      meals = meals.filter((m) => m.id !== removeId);
    }

    localStorage.setItem("meals", JSON.stringify(meals)); // Save updated list
  }

  static getWorkouts() {
    let workouts = localStorage.getItem("workouts");
    return workouts ? JSON.parse(workouts) : [];
  }

  static updateWorkouts(workout = null, removeId = null) {
    let workouts = Storage.getWorkouts();

    if (workout) {
      workouts.push(workout);
    }

    if (removeId) {
      workouts = workouts.filter((w) => w.id !== removeId);
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
  }
}

export default Storage;
