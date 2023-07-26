document.addEventListener('DOMContentLoaded', youAre__setFolderPosition);
window.addEventListener('resize', youAre__setFolderPosition);

window.addEventListener("scroll", youAre__toggleScroll);

window.addEventListener('load', function () {
  const element = document.querySelector('.cursor-anim_notif');
  let timeoutID;

  const hideElement = () => {
    element.style.top = '-4rem';
    setTimeout(() => {
      element.remove();
    }, 800);
  };

  // Click event listener for the element and setTimeout combined
  element.addEventListener('click', () => {
    hideElement();
    clearTimeout(timeoutID);
  });

  // setTimeout to hide the element after 3 seconds
  timeoutID = setTimeout(hideElement, 3000);
});

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
const stem = document.querySelector(".stem");
const leaves = document.querySelectorAll(".leaf-0, .leaf-1");

let timeouts = []; // Store references to the setTimeout calls

beginner.addEventListener("mouseenter", function () {

  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];

  circle.style.transform = "rotateX(60deg)";
  timeouts.push(
    setTimeout(function () {
      stem.style.opacity = 1;
      stem.style.height = "12em";
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

  stem.style.opacity = 0;
  stem.style.height = 0;
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

        cell.style.backgroundColor = cellState ? "black" : "inherit";
        cell.style.borderColor = cellState ? "black" : "#e3e3e3";

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
  }, { once: true });

  document.querySelector(".peace-reset").addEventListener("click", function () {
    setInitialConfiguration(initialCoordinates);
  });

});

window.addEventListener("DOMContentLoaded", (event) => {
  const cdjGrid = document.querySelector(".cdj-grid");
  const cdjNumCells = 29;
  const cdjNumRows = 29;
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

        cell.style.backgroundColor = cellState ? "black" : "inherit";
        cell.style.borderColor = cellState ? "black" : "#e3e3e3";

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
  const initialCoordinates = [[3, 5], [3, 12], [3, 19], [4, 5], [4, 12], [4, 18], [4, 19], [5, 5], [5, 12], [5, 17], [5, 18], [5, 19], [5, 20], [5, 21], [5, 22], [5, 23], [5, 24], [5, 26], [6, 5], [6, 12], [6, 18], [6, 19], [7, 4], [7, 13], [7, 19], [7, 25], [8, 4], [8, 14], [8, 25], [8, 26], [9, 4], [9, 14], [9, 18], [9, 20], [9, 21], [9, 22], [9, 23], [9, 24], [9, 25], [9, 26], [9, 27], [10, 3], [10, 15], [10, 25], [10, 26], [11, 3], [11, 16], [11, 25], [12, 2], [12, 5], [12, 17], [13, 1], [13, 4], [13, 14], [13, 17], [14, 2], [14, 3], [14, 5], [14, 9], [14, 12], [14, 15], [14, 18], [15, 6], [15, 10], [15, 13], [15, 16], [15, 19], [16, 7], [16, 11], [16, 14], [16, 17], [16, 20], [17, 8], [17, 12], [17, 15], [17, 18], [17, 19], [18, 5], [18, 6], [18, 7], [18, 9], [18, 10], [18, 13], [18, 16], [18, 18], [18, 20], [18, 21], [18, 22], [19, 2], [19, 3], [19, 4], [19, 11], [19, 14], [19, 17], [19, 23], [19, 24], [20, 1], [20, 12], [20, 13], [20, 15], [20, 16], [20, 25], [20, 26], [21, 1], [21, 26], [22, 1], [22, 2], [22, 3], [22, 26], [23, 4], [23, 24], [23, 25], [24, 5], [24, 6], [24, 7], [24, 21], [24, 22], [24, 23], [25, 8], [25, 9], [25, 10], [25, 11], [25, 12], [25, 13], [25, 14], [25, 15], [25, 16], [25, 17], [25, 18], [25, 19], [25, 20]];

  setInitialConfiguration(initialCoordinates);

  cdjGrid.addEventListener("mouseenter", function () {
    document.querySelector(".cdj-reset").style.opacity = "0.8";
  }, { once: true });

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
  const jamWord = document.querySelector('.jam-word');
  let intervalId;
  let currentMCount = 0;
  const maxMCount = 6;
  const removeInterval = 10; // ms
  const addInterval = 40; // ms

  function addM() {
    if (currentMCount < maxMCount) {
      jamWord.textContent += 'm';
      currentMCount++;
    } else {
      clearInterval(intervalId);
    }
  }

  function removeM() {
    if (currentMCount > 0) {
      jamWord.textContent = jamWord.textContent.slice(0, -1);
      currentMCount--;
    } else {
      clearInterval(intervalId);
    }
  }

  jamLink.addEventListener('mouseenter', function () {
    intervalId = setInterval(addM, addInterval);
  });

  jamLink.addEventListener('mouseleave', function () {
    clearInterval(intervalId);
    intervalId = setInterval(function () {
      if (jamWord.textContent === "Jam") {
        clearInterval(intervalId);
      } else {
        removeM();
      }
    }, removeInterval);
  });
});
