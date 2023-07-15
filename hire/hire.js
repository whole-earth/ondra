document.addEventListener('DOMContentLoaded', youAre__setFolderPosition);
window.addEventListener('resize', youAre__setFolderPosition);

window.addEventListener("scroll", youAre__toggleScroll);

const youAreContainer = document.querySelector(".folder-container");
const youAreFolder = document.querySelectorAll(".folder");
const youAreP = document.querySelectorAll('.folder-p');

function youAre__setFolderPosition() {

    if (window.innerWidth >= 768) {
        let folderRowHeight = document.querySelector('.folder-row').offsetHeight;
        let paddingValue = (window.innerHeight - folderRowHeight) + 'px';
        // youAreContainer.style.paddingTop = paddingValue;

        youAreP.forEach(p => {
            p.style.opacity = '0';
        });

    } else {
        youAreContainer.removeAttribute('style');
        youAreP.forEach(p => {
            p.removeAttribute('style');
        });
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function youAre__handleScroll() {
    youAreFolder.forEach((folder) => {

        if (isInViewport(folder)) {
            folder.querySelector('.folder-p').style.opacity = 1;
        } else {
            folder.querySelector('.folder-p').style.opacity = 0;
        }
    });
}

function youAre__toggleScroll() {
    if (!isInViewport(youAreContainer)) {
        window.addEventListener("scroll", youAre__handleScroll);
    } else {
        window.removeEventListener("scroll", youAre__handleScroll);
    }
}

// 07.15 'Beginner's Mind' Animation
  const beginner = document.querySelector("#beginner");
  const circle = document.querySelector(".beginner");
  const line = document.querySelector(".stem");
  const leaves = document.querySelectorAll(".leaf-0, .leaf-1");

  let timeouts = []; // Store references to the setTimeout calls

  beginner.addEventListener("mouseenter", function () {

    timeouts.forEach((timeout) => clearTimeout(timeout));
    timeouts = [];

      circle.style.transform = "rotateX(60deg)";
      timeouts.push(
        setTimeout(function () {
          line.style.opacity = 1;
          line.style.height = "12em";
          timeouts.push(
            setTimeout(function () {
              leaves[1].style.opacity = 1;
              timeouts.push(
                setTimeout(function () {
                  leaves[0].style.opacity = 1;
                }, 200) // delay: leaf opacity
              );
            }, 300) // delay: stem grow
          );
        }, 300) // delay: circle translate
      );
  });

  beginner.addEventListener("mouseleave", function () {

    line.style.opacity = 0;
    line.style.height = 0;
    leaves.forEach((leaf) => { leaf.style.opacity = 0; });
    circle.style.transform = "";

    timeouts.forEach((timeout) => clearTimeout(timeout));
    timeouts = [];

  });

    window.addEventListener("DOMContentLoaded", (event) => {
  const peaceGrid = document.querySelector(".peace-grid");
  const peaceNumCells = 24;
  const peaceCells = [];

  // Create the grid
  for (let i = 0; i < peaceNumCells; i++) {
    const row = document.createElement("div");
    row.classList.add("peace-row");
    peaceGrid.appendChild(row);
    peaceCells[i] = [];
    for (let j = 0; j < peaceNumCells; j++) {
      const cell = document.createElement("div");
      cell.classList.add("peace-cell");
      row.appendChild(cell);
      peaceCells[i][j] = false; // Set initial state as false (white)
    }
  }

  // Render the grid
  function renderGrid() {
    for (let i = 0; i < peaceNumCells; i++) {
      for (let j = 0; j < peaceNumCells; j++) {
        const cellState = peaceCells[i][j];
        const cell = peaceGrid.children[i].children[j];

        cell.style.backgroundColor = cellState ? "#fafafa" : "inherit";

        cell.style.borderColor = cellState ? "#fafafa" : "#333";
      }
    }
  }

  // Toggle cell state and update grid
  function toggleCellState(event) {
    const cell = event.target;
    const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);
    const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

    peaceCells[rowIndex][colIndex] = !peaceCells[rowIndex][colIndex];
    renderGrid();
  }

  // Add click event listener to cells
  const cellsList = document.getElementsByClassName("peace-cell");
  for (const cell of cellsList) {
    cell.addEventListener("click", toggleCellState);
  }

  // Function to set the initial configuration based on the coordinate system
  function setInitialConfiguration(coordinates) {
    // Reset the grid to the initial state
    peaceCells.forEach((row, rowIndex) => {
      row.fill(false);
    });

    // Update the cells based on the provided coordinates
    coordinates.forEach((coord) => {
      const [row, col] = coord;
      if (row >= 0 && row < peaceNumCells && col >= 0 && col < peaceNumCells) {
        peaceCells[row][col] = true;
      }
    });

    renderGrid();
  }

  // Example initial configuration
  const initialCoordinates = [
    [2, 9],
    [2, 10],
    [3, 8],
    [3, 11],
    [3, 15],
    [3, 16],
    [3, 17],
    [4, 8],
    [4, 11],
    [4, 14],
    [4, 15],
    [4, 18],
    [5, 9],
    [5, 12],
    [5, 14],
    [5, 17],
    [6, 9],
    [6, 12],
    [6, 14],
    [6, 17],
    [7, 9],
    [7, 12],
    [7, 14],
    [7, 17],
    [8, 8],
    [8, 9],
    [8, 12],
    [8, 14],
    [8, 17],
    [9, 7],
    [9, 10],
    [9, 12],
    [9, 14],
    [9, 17],
    [10, 5],
    [10, 6],
    [10, 7],
    [10, 10],
    [10, 13],
    [10, 16],
    [11, 4],
    [11, 7],
    [11, 10],
    [11, 13],
    [11, 14],
    [12, 4],
    [12, 9],
    [12, 10],
    [12, 15],
    [13, 4],
    [13, 6],
    [13, 10],
    [13, 13],
    [13, 14],
    [13, 15],
    [13, 16],
    [13, 17],
    [14, 4],
    [14, 7],
    [14, 10],
    [14, 12],
    [14, 18],
    [15, 5],
    [15, 7],
    [15, 8],
    [15, 9],
    [15, 12],
    [15, 19],
    [16, 6],
    [16, 13],
    [16, 14],
    [16, 15],
    [16, 16],
    [16, 19],
    [17, 5],
    [17, 14],
    [17, 19],
    [18, 5],
    [18, 13],
    [18, 19],
    [19, 5],
    [19, 18],
    [20, 6],
    [20, 16],
    [20, 17],
    [21, 7],
    [21, 16],
    [22, 7],
    [22, 16]
  ];

  setInitialConfiguration(initialCoordinates);
  
   peaceGrid.addEventListener("mouseenter", function () {
    document.querySelector(".peace-reset").style.opacity = "1";
  },{ once: true });

  document.querySelector(".peace-reset").addEventListener("click", function () {
    setInitialConfiguration(initialCoordinates);
  });
  
});

window.addEventListener("DOMContentLoaded", (event) => {
  const peaceGrid = document.querySelector(".peace-grid");
  const peaceNumCells = 24;
  const peaceCells = [];

  // Create the grid
  for (let i = 0; i < peaceNumCells; i++) {
    const row = document.createElement("div");
    row.classList.add("peace-row");
    peaceGrid.appendChild(row);
    peaceCells[i] = [];
    for (let j = 0; j < peaceNumCells; j++) {
      const cell = document.createElement("div");
      cell.classList.add("peace-cell");
      row.appendChild(cell);
      peaceCells[i][j] = false; // Set initial state as false (white)
    }
  }

  // Render the grid
  function renderGrid() {
    for (let i = 0; i < peaceNumCells; i++) {
      for (let j = 0; j < peaceNumCells; j++) {
        const cellState = peaceCells[i][j];
        const cell = peaceGrid.children[i].children[j];

        cell.style.backgroundColor = cellState ? "#fafafa" : "inherit";

        cell.style.borderColor = cellState ? "#fafafa" : "#333";
      }
    }
  }

  // Toggle cell state and update grid
  function toggleCellState(event) {
    const cell = event.target;
    const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);
    const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

    peaceCells[rowIndex][colIndex] = !peaceCells[rowIndex][colIndex];
    renderGrid();
  }

  // Add click event listener to cells
  const cellsList = document.getElementsByClassName("peace-cell");
  for (const cell of cellsList) {
    cell.addEventListener("click", toggleCellState);
  }

  // Function to set the initial configuration based on the coordinate system
  function setInitialConfiguration(coordinates) {
    // Reset the grid to the initial state
    peaceCells.forEach((row, rowIndex) => {
      row.fill(false);
    });

    // Update the cells based on the provided coordinates
    coordinates.forEach((coord) => {
      const [row, col] = coord;
      if (row >= 0 && row < peaceNumCells && col >= 0 && col < peaceNumCells) {
        peaceCells[row][col] = true;
      }
    });

    renderGrid();
  }

  // Example initial configuration
  const initialCoordinates = [
    [2, 9],
    [2, 10],
    [3, 8],
    [3, 11],
    [3, 15],
    [3, 16],
    [3, 17],
    [4, 8],
    [4, 11],
    [4, 14],
    [4, 15],
    [4, 18],
    [5, 9],
    [5, 12],
    [5, 14],
    [5, 17],
    [6, 9],
    [6, 12],
    [6, 14],
    [6, 17],
    [7, 9],
    [7, 12],
    [7, 14],
    [7, 17],
    [8, 8],
    [8, 9],
    [8, 12],
    [8, 14],
    [8, 17],
    [9, 7],
    [9, 10],
    [9, 12],
    [9, 14],
    [9, 17],
    [10, 5],
    [10, 6],
    [10, 7],
    [10, 10],
    [10, 13],
    [10, 16],
    [11, 4],
    [11, 7],
    [11, 10],
    [11, 13],
    [11, 14],
    [12, 4],
    [12, 9],
    [12, 10],
    [12, 15],
    [13, 4],
    [13, 6],
    [13, 10],
    [13, 13],
    [13, 14],
    [13, 15],
    [13, 16],
    [13, 17],
    [14, 4],
    [14, 7],
    [14, 10],
    [14, 12],
    [14, 18],
    [15, 5],
    [15, 7],
    [15, 8],
    [15, 9],
    [15, 12],
    [15, 19],
    [16, 6],
    [16, 13],
    [16, 14],
    [16, 15],
    [16, 16],
    [16, 19],
    [17, 5],
    [17, 14],
    [17, 19],
    [18, 5],
    [18, 13],
    [18, 19],
    [19, 5],
    [19, 18],
    [20, 6],
    [20, 16],
    [20, 17],
    [21, 7],
    [21, 16],
    [22, 7],
    [22, 16]
  ];

  setInitialConfiguration(initialCoordinates);
  
   peaceGrid.addEventListener("mouseenter", function () {
    document.querySelector(".peace-reset").style.opacity = "1";
  },{ once: true });

  document.querySelector(".peace-reset").addEventListener("click", function () {
    setInitialConfiguration(initialCoordinates);
  });
  
});



/*
// Dark popout div: radial-gradient cursor
const darkDivs = document.querySelectorAll('.bits');
darkDivs.forEach(div => {
  const radialGradient = document.createElement('div');
  radialGradient.className = 'radial-gradient';
  div.appendChild(radialGradient);

  div.addEventListener('mousemove', e => {
    const parentRect = div.getBoundingClientRect();
    const x = e.clientX - parentRect.left;
    const y = e.clientY - parentRect.top;

    const gradient = div.querySelector('.radial-gradient');
    gradient.style.left = `${x - 160}px`;
    gradient.style.top = `${y - 160}px`;

    gradient.style.opacity = 1;
  });

  div.addEventListener('mouseout', () => {
    const gradient = div.querySelector('.radial-gradient');
    gradient.style.opacity = 0;
  });
});

*/
