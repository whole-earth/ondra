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
  const cdjGrid = document.querySelector(".cdj-grid");
  const cdjNumCells = 48;
  const cdjNumRows = 42; // Specify the number of rows you want
  const cdjCells = [];

  // Create the grid
  for (let i = 0; i < cdjNumRows; i++) {
    const row = document.createElement("div");
    row.classList.add("cdj-row");
    cdjGrid.appendChild(row);
    cdjCells[i] = []; // Initialize the cells array for each row
    for (let j = 0; j < cdjNumCells; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cdj-cell");
      row.appendChild(cell);
      cdjCells[i][j] = false; // Set initial state as false (white)
    }
  }

  // Render the grid
  function renderGrid() {
    for (let i = 0; i < cdjNumRows; i++) {
      for (let j = 0; j < cdjNumCells; j++) {
        const cellState = cdjCells[i][j];
        const cell = cdjGrid.children[i].children[j];

        cell.style.backgroundColor = cellState ? "#fafafa" : "inherit";

        cell.style.borderColor = cellState ? "#fafafa" : "#333";
      }
    }
  }

  // Toggle cell state and update grid
  function toggleCellState(event) {
    const cell = event.target;
    const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(
      cell.parentNode
    );
    const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

    cdjCells[rowIndex][colIndex] = !cdjCells[rowIndex][colIndex];
    renderGrid();
  }

  // Add click event listener to cells
  const cellsList = document.getElementsByClassName("cdj-cell");
  for (const cell of cellsList) {
    cell.addEventListener("click", toggleCellState);
  }

  // Function to set the initial configuration based on the coordinate system
  function setInitialConfiguration(coordinates) {
    // Reset the grid to the initial state
    cdjCells.forEach((row, rowIndex) => {
      row.fill(false);
    });

    // Update the cells based on the provided coordinates
    coordinates.forEach((coord) => {
      const [row, col] = coord;
      if (row >= 0 && row < cdjNumCells && col >= 0 && col < cdjNumCells) {
        cdjCells[row][col] = true;
      }
    });

    renderGrid();
  }

  // Example initial configuration
  const initialCoordinates = [
    [3, 9],
    [3, 19],
    [3, 31],
    [4, 9],
    [4, 19],
    [4, 30],
    [4, 31],
    [5, 9],
    [5, 19],
    [5, 29],
    [5, 30],
    [5, 31],
    [6, 9],
    [6, 19],
    [6, 28],
    [6, 29],
    [6, 30],
    [6, 31],
    [7, 9],
    [7, 19],
    [7, 26],
    [7, 27],
    [7, 28],
    [7, 29],
    [7, 30],
    [7, 31],
    [7, 32],
    [7, 33],
    [7, 34],
    [7, 35],
    [7, 36],
    [7, 38],
    [7, 41],
    [7, 42],
    [8, 9],
    [8, 19],
    [8, 20],
    [8, 26],
    [8, 27],
    [8, 28],
    [8, 29],
    [8, 30],
    [8, 31],
    [8, 32],
    [8, 33],
    [8, 34],
    [8, 35],
    [8, 36],
    [8, 38],
    [8, 41],
    [8, 42],
    [9, 8],
    [9, 21],
    [9, 22],
    [9, 28],
    [9, 29],
    [9, 30],
    [9, 31],
    [10, 8],
    [10, 21],
    [10, 22],
    [10, 29],
    [10, 30],
    [10, 31],
    [10, 39],
    [11, 8],
    [11, 23],
    [11, 30],
    [11, 31],
    [11, 39],
    [11, 40],
    [12, 8],
    [12, 23],
    [12, 31],
    [12, 39],
    [12, 40],
    [12, 41],
    [13, 7],
    [13, 8],
    [13, 23],
    [13, 24],
    [13, 39],
    [13, 40],
    [13, 41],
    [13, 42],
    [14, 6],
    [14, 25],
    [14, 27],
    [14, 30],
    [14, 31],
    [14, 34],
    [14, 36],
    [14, 37],
    [14, 38],
    [14, 39],
    [14, 40],
    [14, 41],
    [14, 42],
    [14, 43],
    [14, 44],
    [15, 6],
    [15, 25],
    [15, 27],
    [15, 30],
    [15, 31],
    [15, 34],
    [15, 36],
    [15, 37],
    [15, 38],
    [15, 39],
    [15, 40],
    [15, 41],
    [15, 42],
    [15, 43],
    [15, 44],
    [16, 6],
    [16, 25],
    [16, 39],
    [16, 40],
    [16, 41],
    [16, 42],
    [17, 5],
    [17, 6],
    [17, 25],
    [17, 26],
    [17, 39],
    [17, 40],
    [17, 41],
    [18, 4],
    [18, 9],
    [18, 26],
    [18, 27],
    [18, 39],
    [18, 40],
    [19, 3],
    [19, 8],
    [19, 9],
    [19, 25],
    [19, 28],
    [19, 39],
    [20, 3],
    [20, 7],
    [20, 9],
    [20, 25],
    [20, 28],
    [21, 3],
    [21, 7],
    [21, 9],
    [21, 25],
    [21, 28],
    [21, 29],
    [22, 4],
    [22, 5],
    [22, 6],
    [22, 10],
    [22, 11],
    [22, 12],
    [22, 16],
    [22, 17],
    [22, 21],
    [22, 22],
    [22, 26],
    [22, 27],
    [22, 30],
    [23, 12],
    [23, 13],
    [23, 18],
    [23, 23],
    [23, 28],
    [23, 31],
    [24, 13],
    [24, 18],
    [24, 23],
    [24, 24],
    [24, 28],
    [24, 29],
    [24, 31],
    [25, 14],
    [25, 15],
    [25, 19],
    [25, 20],
    [25, 25],
    [25, 30],
    [25, 31],
    [26, 11],
    [26, 12],
    [26, 13],
    [26, 15],
    [26, 20],
    [26, 21],
    [26, 22],
    [26, 25],
    [26, 30],
    [26, 32],
    [26, 33],
    [26, 34],
    [27, 7],
    [27, 8],
    [27, 9],
    [27, 10],
    [27, 11],
    [27, 12],
    [27, 15],
    [27, 16],
    [27, 17],
    [27, 22],
    [27, 26],
    [27, 27],
    [27, 30],
    [27, 33],
    [27, 34],
    [27, 35],
    [27, 36],
    [28, 4],
    [28, 5],
    [28, 6],
    [28, 7],
    [28, 8],
    [28, 18],
    [28, 23],
    [28, 28],
    [28, 29],
    [28, 35],
    [28, 36],
    [28, 37],
    [28, 38],
    [29, 3],
    [29, 4],
    [29, 18],
    [29, 19],
    [29, 23],
    [29, 24],
    [29, 28],
    [29, 37],
    [29, 38],
    [29, 39],
    [30, 2],
    [30, 3],
    [30, 20],
    [30, 21],
    [30, 22],
    [30, 25],
    [30, 26],
    [30, 27],
    [30, 39],
    [30, 40],
    [30, 41],
    [31, 2],
    [31, 3],
    [31, 40],
    [31, 41],
    [31, 42],
    [32, 3],
    [32, 4],
    [32, 41],
    [32, 42],
    [33, 3],
    [33, 4],
    [33, 5],
    [33, 6],
    [33, 39],
    [33, 40],
    [33, 41],
    [33, 42],
    [34, 5],
    [34, 6],
    [34, 7],
    [34, 38],
    [34, 39],
    [34, 40],
    [35, 7],
    [35, 8],
    [35, 37],
    [35, 38],
    [35, 39],
    [36, 7],
    [36, 8],
    [36, 9],
    [36, 10],
    [36, 11],
    [36, 12],
    [36, 34],
    [36, 35],
    [36, 36],
    [36, 37],
    [36, 38],
    [37, 11],
    [37, 12],
    [37, 13],
    [37, 14],
    [37, 15],
    [37, 16],
    [37, 17],
    [37, 18],
    [37, 19],
    [37, 20],
    [37, 21],
    [37, 22],
    [37, 23],
    [37, 24],
    [37, 25],
    [37, 26],
    [37, 27],
    [37, 28],
    [37, 29],
    [37, 30],
    [37, 31],
    [37, 32],
    [37, 33],
    [37, 34],
    [37, 35],
    [38, 14],
    [38, 15],
    [38, 15],
    [38, 16],
    [38, 17],
    [38, 18],
    [38, 19],
    [38, 20],
    [38, 21],
    [38, 22],
    [38, 23],
    [38, 24],
    [38, 25],
    [38, 26],
    [38, 27],
    [38, 28],
    [38, 29],
    [38, 30],
    [38, 31],
    [38, 32]
  ];

  setInitialConfiguration(initialCoordinates);

  cdjGrid.addEventListener("mouseenter", function () {
    document.querySelector(".cdj-reset").style.opacity = "0.8";
  },{ once: true });

  document.querySelector(".cdj-reset").addEventListener("click", function () {
    setInitialConfiguration(initialCoordinates);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const processDropdowns = document.querySelectorAll('.process-dropdown');
  const pHeights = [];

  processDropdowns.forEach((dropdown) => {
    const processPWrap = dropdown.querySelector('.process-p-wrap');
    pHeights.push(processPWrap.clientHeight);
    
    // REMOVE BEFORE GITHUB PUSH
    processPWrap.classList.add('collapsed');

    dropdown.addEventListener('click', function (event) {
      const isAlreadyOpen = processPWrap.clientHeight !== 0;

      // If the clicked dropdown is already open, just collapse it and return
      if (isAlreadyOpen) {
        processPWrap.removeAttribute('style');
        const carat = dropdown.querySelector('.process-carat');
        if (carat) {
          carat.classList.remove('carat-expanded');
        }
        return;
      }
      
      processDropdowns.forEach((dropdown) => {
        dropdown.removeAttribute('style');
      });

      // Collapse all text descriptions
      document.querySelectorAll('.process-p-wrap').forEach((p) => {
        p.removeAttribute('style');
      });

      // Revert all carats
      document.querySelectorAll('.process-carat').forEach((carat) => {
        carat.classList.remove('carat-expanded');
      });

      // Get the index of the clicked dropdown
      const index = Array.from(processDropdowns).indexOf(dropdown);

      // Expand corresponding text description by setting its height
      const p = dropdown.querySelector('.process-p-wrap');
      if (p) {
        p.style.height = pHeights[index] + 'px';
      }

      const carat = dropdown.querySelector('.process-carat');
      if (carat) {
        carat.classList.add('carat-expanded');
      }
      
      dropdown.style.borderRadius = '2.6rem';
    });
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const jamLink = document.querySelector('.jam-link');
    let intervalId;
    let currentMCount = 0;
    const maxMCount = 8;
    const removeInterval = 10; // ms
    const addInterval = 40; // ms

    function addM() {
      if (currentMCount < maxMCount) {
        jamLink.textContent += 'm';
        currentMCount++;
      } else {
        clearInterval(intervalId);
      }
    }

    function removeM() {
      if (currentMCount > 0) {
        jamLink.textContent = jamLink.textContent.slice(0, -1);
        currentMCount--;
      } else {
        clearInterval(intervalId);
      }
    }

    jamLink.addEventListener('mouseenter', function() {
      intervalId = setInterval(addM, addInterval);
    });

    jamLink.addEventListener('mouseleave', function() {
      clearInterval(intervalId);
      intervalId = setInterval(function() {
        if (jamLink.textContent === "Jam") {
          clearInterval(intervalId);
        } else {
          removeM();
        }
      }, removeInterval);
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
