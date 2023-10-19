const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#solution");
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "9");
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
};

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
  }
};

const solve = async () => {
  joinValues();
  const data = submission.join("");
  console.log("data", data);
  const options = {
    method: "POST",
    url: "https://solve-sudoku.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "87b4ed04c9msh50e3a23b0e46409p1cf6f6jsn34c4e6f11a26",
      "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
    },
    data: {
      puzzle: data,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    populateValues(response.data.solvable, response.data.solution);
  } catch (error) {
    console.log(error);
  }
};

solveButton.addEventListener("click", solve);
