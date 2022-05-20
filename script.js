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
    input.classList.add("scoreInput", "frqScoreInput");
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

//helper function to "clear" everything by making the innerHTML of the containers blank
function resetCalculator() {
  divInputsContainer.innerHTML = "";
  divResults.innerHTML = "";
}

//function to add event listeners to make sure that the inputs' labels and the calculated scores update when the value of the inputs are changed
function syncLabels(className) {
  Array.from(document.getElementsByClassName(className)).forEach(input => {
    input.addEventListener("change", function() {
      let correspondingLabel = document.getElementById(input.id + "Label");
      if (input.id === "mcqInput") {
        correspondingLabel.textContent = `MCQ questions right: ${input.value}/${data[selectedCourseId]["sections"]["mcq"]["questions"]}`;
      } else {
        correspondingLabel.textContent = `${data[selectedCourseId]["sections"]["frq"]["questions"][input.id]["full"]}: ${input.value}/${data[selectedCourseId]["sections"]["frq"]["questions"][input.id]["points"]}`;
      }

      score();
    }); 
  });
}

//helper function to get score given composite score and course id 
function getScore(compositeScore, course) {
  let scores = data[course]["scores"];

  if (compositeScore >= scores.five) {
    return 5;
  } else if (compositeScore >= scores.four) {
    return 4;
  } else if (compositeScore >= scores.three) {
    return 3;
  } else if (compositeScore >= scores.two) {
    return 2;
  } else {
    return 1;
  }
}

//function to calculate and display scores in the divResults container
function score() {
  let maxTotalComposite = data[selectedCourseId].maxTotalComposite; //get max total composite score
      
  let mcqWeight = data[selectedCourseId].sections.mcq.weight;
  let mcqQuestions = data[selectedCourseId]["sections"]["mcq"]["questions"]; //get number of questions on the mcq section
  let maxMCQscore = maxTotalComposite*mcqWeight; //max MCQ section score will be whatever % the MCQ section is worth of the total composite score possible
  //basically solving a proportion: (MCQ right)/(MCQ total) = (x points)/(total points), solving for x
  let mcqScore = Math.round((parseInt(document.getElementById("mcqInput").value)/mcqQuestions)*maxMCQscore);

  
  let frqWeight = data[selectedCourseId].sections.frq.weight;
  let totalFRQPoints = 0;
  //use a for-loop to add the amount of points each FRQ is to the variable totalFRQPoints
  Object.keys(data[selectedCourseId].sections.frq.questions).forEach(key => {
    totalFRQPoints += data[selectedCourseId].sections.frq.questions[key].points;
  });
  
  let maxFRQscore = maxTotalComposite*frqWeight; //max FRQ section score will be whatever % the FRQ section is worth of the total composite score possible 
  
  let frqPointsEarned = 0;
  //use a for-loop to add the value of each frq score slider input to the frqPointsEarned variable
  Array.from(document.getElementsByClassName("frqScoreInput")).forEach(slider => {
    frqPointsEarned += parseInt(slider.value);
  });

  //basically solving a proportion: (FRQ points earned)/(Total FRQ points possible) = (x composite score points)/(maximum possible composite score points from FRQ), solving for x
  let frqScore = Math.round((frqPointsEarned/totalFRQPoints)*maxFRQscore);
  
  let compositeScore = mcqScore + frqScore;
  divResults.innerHTML = 
  `
    <h1>Your scores:</h1>
    MCQ Score: ${mcqScore}
    <br>
    FRQ Score: ${frqScore}
    <br>
    Composite Score: ${compositeScore}/100
    <br>
    <br>
    <br>
    Your score... a<br><span style='font-size:2em;font-weight:bold;'>${getScore(compositeScore, selectedCourseId)}<span>
  `
}