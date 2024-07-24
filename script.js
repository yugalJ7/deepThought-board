async function fetchData() {
  try {
    const res = await fetch("./constant/data.json");
    const data = await res.json();
    console.log(data);
    renderedData(data);
  } catch (error) {
    console.log(error);
  }
}

function renderedData(data) {
  const pageTitle = document.querySelector(".heading-text");
  pageTitle.innerHTML = `${data.title}`;

  const aboutHead = document.querySelector(".about-heading");
  aboutHead.innerHTML = `${data.tasks[0].task_title}`;

  const aboutText = document.querySelector(".about-text");
  aboutText.innerHTML = `${data.tasks[0].task_description}`;

  const assets = data.tasks[0].assets;
  assets.forEach((element, i) => {
    const gridHeadText = document.querySelectorAll(".grid-head_text");
    gridHeadText[i].innerHTML = `${element.asset_title}`;

    const gridDescription = document.querySelectorAll(
      ".infogrid-desc span:nth-child(2)"
    );
    gridDescription[i].innerHTML = `${element.asset_description}`;
  });
}

fetchData();
