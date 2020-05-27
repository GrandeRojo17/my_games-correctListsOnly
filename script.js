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
      console.log(person);
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

function dragStart() {
  //this Key word pertains to the element.
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
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
