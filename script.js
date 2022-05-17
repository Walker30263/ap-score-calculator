/*
just wanna start off by saying i'm sorry to anyone reading this spaghetti code
*/

let selectedCourseId = "";

window.onload = function() {
  //create divs with names of courses and put them in the container of ap exams to choose from
  Object.keys(data).forEach(key => {
    let course = document.createElement("div");
    course.classList.add("course");
    course.id = key;
    course.textContent = data[key].fullName;

    course.addEventListener("click", function() {
      if (selectedCourseId) {
        if (course.id === selectedCourseId) {
          course.classList.remove("selectedCourse");
          selectedCourseId = "";
          resetCalculator();
        } else {
          document.getElementsByClassName("selectedCourse")[0].classList.remove("selectedCourse");
          selectedCourseId = "";
          course.classList.add("selectedCourse");
          selectedCourseId = course.id;
          showCalculator();
        }
      } else {
        course.classList.add("selectedCourse");
        selectedCourseId = course.id;
        showCalculator();
      }
    });
    
    document.getElementById("divCoursesContainer").append(course);
  });
}

let divInputsContainer = document.getElementById("divInputsContainer");
let divResults = document.getElementById("divResults");

function showCalculator() {
  resetCalculator();

  divInputsContainer.innerHTML += "<h1>Enter your section scores below using the sliders:</h1>";
  
  let mcqInput = document.createElement("input");
  mcqInput.id = "mcqInput";
  mcqInput.classList.add("scoreInput");
  mcqInput.type = "range";
  mcqInput.min = 0;
  mcqInput.max = data[selectedCourseId]["sections"]["mcq"]["questions"];
  mcqInput.value = Math.round((mcqInput.min + mcqInput.max)/2);

  let mcqInputLabel = document.createElement("label");
  mcqInputLabel.id = "mcqInputLabel";
  mcqInputLabel.for = "mcqInput";
  mcqInputLabel.textContent = `MCQ questions right: ${mcqInput.value}/${data[selectedCourseId]["sections"]["mcq"]["questions"]}`;
  
  divInputsContainer.appendChild(mcqInput);
  divInputsContainer.appendChild(mcqInputLabel);
  divInputsContainer.innerHTML += "<br><br>";

  Object.keys(data[selectedCourseId]["sections"]["frq"]["questions"]).forEach(key => {
    let input = document.createElement("input");
    input.id = key;
    input.classList.add("scoreInput");
    input.type = "range";
    input.min = 0;
    input.max = data[selectedCourseId]["sections"]["frq"]["questions"][key]["points"];
    input.value = Math.round((input.min + input.max)/2);

    let label = document.createElement("label");
    label.id = `${key}Label`;
    label.for = key;
    label.textContent = `${data[selectedCourseId]["sections"]["frq"]["questions"][key]["full"]}: ${input.value}/${data[selectedCourseId]["sections"]["frq"]["questions"][key]["points"]}`

    divInputsContainer.appendChild(input);
    divInputsContainer.appendChild(label);
    divInputsContainer.innerHTML += "<br>";
  });
  
  syncLabels("scoreInput");
}

//function to "clear" everything by making the innerHTML of the containers blank
function resetCalculator() {
  divInputsContainer.innerHTML = "";
  divResults.innerHTML = "";
}

//helper function to make sure that the inputs' labels update when the value of the inputs are changed
function syncLabels(className) {
  Array.from(document.getElementsByClassName(className)).forEach(input => {
    input.addEventListener("change", function() {
      let correspondingLabel = document.getElementById(input.id + "Label");
      if (input.id === "mcqInput") {
        correspondingLabel.textContent = `MCQ questions right: ${input.value}/${data[selectedCourseId]["sections"]["mcq"]["questions"]}`;
      } else {
        correspondingLabel.textContent = `${data[selectedCourseId]["sections"]["frq"]["questions"][input.id]["full"]}: ${input.value}/${data[selectedCourseId]["sections"]["frq"]["questions"][input.id]["points"]}`;
      }
    }); 
  });
}
