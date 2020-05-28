/*Technically completed on 5/27/20
Some additional notes here.
*Create a README
*Refactor the game.
*add a start or home page.
*instead of a list, maybe have different shapes.
*add info inside a banner perhaps?
*Add Categories or different list options
*Save this version and create another but with a better UI.
*Make the correctly chosen fonts more noticeable. 
**Larger Fonts, blinking/fading/glowing fx
**Shrink the UI to mitigate scrolling.
** The  "Check-list" button should be visable from the start.



*/
const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");
const richestPeople = [
  "David Yennerell",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "The Mars Family",
  "Mark Zuckerberg",
  "Vladamir Putin",
  "Amancio Ortega",
  "Larry Page",
  "Larry Ellison",
];

const listItems = [];
let dragStartIndex;

createList();
//insert list items into DOM

function createList() {
  //spread operator makes a copy of the array
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      //Experiment with adding new classes for each action
      //   listItem.classList.add('over');

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number"> ${index + 1} </span>
        <div class = "draggable" draggable="true">
        <p class = "person-name">${person} </p>
        <i class =" fas fa-arrows-alt-v"></i></div>
 `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

//Drag and Drop functions
function dragStart() {
  //this Key word pertains to the element.
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");

  // console.log("Event: " ,dragStart);
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}
//Timer to clear the red text.
function clearAll() {
  listItems.forEach((listItem, index) => {
    listItem.classList.remove("wrong");
  });
  //The function 'clearAll' is designed to clean up the game from 'sensory overload'. ATM the correctly placed tiles are still mobile.
}
//check the order of list Items on 'click'
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
  setTimeout(clearAll, 5000);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
