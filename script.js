import { toolbar } from "./constant/data.js";

async function fetchData() {
  try {
    const res = await fetch("./constant/data.json");
    const data = await res.json();
    console.log(data);
    renderedData(data);
    handleBoard(data);
  } catch (error) {
    console.log(error);
  }
}

function renderedData(data) {
  // Data for Heading & About Section
  const pageTitle = document.querySelector(".heading-text");
  pageTitle.innerHTML = `${data.title}`;

  const aboutHead = document.querySelector(".about-heading");
  aboutHead.innerHTML = `${data.tasks[0].task_title}`;

  const aboutText = document.querySelector(".about-text");
  aboutText.innerHTML = `${data.tasks[0].task_description}`;

  // Data for Grid
  const assets = data.tasks[0].assets;
  assets.forEach((element, i) => {
    //Grid Heading
    const gridHeadText = document.querySelectorAll(".grid-head_text");
    gridHeadText[i].innerHTML = `${element.asset_title}`;

    // Grid Description
    const gridDescription = document.querySelectorAll(
      ".infogrid-desc span:nth-child(2)"
    );
    gridDescription[i].innerHTML = `${element.asset_description}`;

    // Extra Styling for Grid Description
    const divDesc = document.querySelectorAll(".infogrid-desc");
    if (i === 3) {
      divDesc[i].style.marginBottom = "1.7rem";
      divDesc[i].style.marginTop = "2rem";
    }
  });
}

fetchData();

//Third Grid Toolbar
function addSpanElement() {
  toolbar.forEach((item) => {
    const newSpan = document.createElement("span");
    newSpan.className = "topbar_text";
    const content = document.createTextNode(`${item.text}`);
    newSpan.appendChild(content);
    const parentDiv = document.querySelector(".third-tools_topbar");
    parentDiv.appendChild(newSpan);
  });
}

addSpanElement();

// Handling Accordian
function handleAccordian(classOne, classTwo) {
  const gridAccordian = document.querySelector(classOne);

  gridAccordian.addEventListener("click", function () {
    const icon = document.querySelector(`${classOne} img`);
    const accContent = document.querySelector(classTwo);
    if (accContent.style.display === "block") {
      accContent.style.display = "none";
      icon.setAttribute("src", "./assets/Icon-Down.svg");
    } else {
      accContent.style.display = "block";
      icon.setAttribute("src", "./assets/Icon-up.svg");
    }
  });
}

handleAccordian(".second-content_accordian", ".second_accordian-features");
handleAccordian(".accordian_thread-header", ".accordian_thread-content");
handleAccordian(
  ".fourth-accordian_intro-head",
  ".fourth-accordian_intro-content"
);

//Journey Board

function handleBoard(data) {
  const assets = data.tasks[0].assets;
  const mainDiv = document.querySelector(".journey");
  const button = document.querySelector(".journey-header_button");
  const parentDiv = document.querySelector(".journey-content_list");
  const icon = document.querySelector(".journey-header_button");
  const header = document.querySelector(".journey-header_text");
  const number = document.querySelector(".journey-content_number");

  const listhead = document.createElement("li");
  listhead.style.margin = "1rem 0";
  listhead.style.fontWeight = "600";
  listhead.appendChild(document.createTextNode(`${data.tasks[0].task_title}`));
  parentDiv.appendChild(listhead);
  assets.forEach((element) => {
    const newlist = document.createElement("li");
    const content = document.createTextNode(`${element.asset_title}`);
    newlist.appendChild(content);
    parentDiv.appendChild(newlist);
  });

  button.addEventListener("click", function () {
    if (parentDiv.style.display === "block") {
      parentDiv.style.display = "none";
      header.style.display = "none";
      number.style.display = "block";
      mainDiv.style.width = "102px";
      icon.setAttribute("src", "./assets/journey-right-arrow-icon.svg");
    } else {
      parentDiv.style.display = "block";
      header.style.display = "block";
      number.style.display = "none";
      mainDiv.style.width = "392px";
      icon.setAttribute("src", "./assets/journey-left-arrow-icon.svg");
    }
  });
}
