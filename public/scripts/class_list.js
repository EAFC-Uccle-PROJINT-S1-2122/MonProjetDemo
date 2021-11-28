const noClassMsg = document.getElementById("noClass");
const classListContainer = document.getElementById("classes");
const tableBody = classListContainer.querySelector("table tbody");
const collapsibleNoClassMsg = new bootstrap.Collapse(noClassMsg, {
  toggle: false,
});
const collapsibleClassListContainer = new bootstrap.Collapse(
  classListContainer,
  { toggle: false }
);
const refreshBtn = document.getElementById("refreshBtn");

function buildClassRow(c) {
  const row = document.createElement("tr");

  const shortNameCol = document.createElement("th");
  shortNameCol.scope = "row";
  const shortNameTxt = document.createTextNode(c.shortName);
  shortNameCol.appendChild(shortNameTxt);
  row.appendChild(shortNameCol);

  const euCol = document.createElement("td");
  const euTxt = document.createTextNode(c.educationUnit.name);
  euCol.appendChild(euTxt);
  row.appendChild(euCol);

  const teacherCol = document.createElement("td");
  const teacherTxt = document.createTextNode(
    `${c.teacher.lastName.toUpperCase()} ${c.teacher.firstName}`
  );
  teacherCol.appendChild(teacherTxt);
  row.appendChild(teacherCol);

  return row;
}

function displayClasses(classes) {
  if (classes.length === 0) {
    collapsibleNoClassMsg.show();
    collapsibleClassListContainer.hide();
  } else {
    const classRows = classes.map(buildClassRow);
    tableBody.replaceChildren(...classRows);
    collapsibleNoClassMsg.hide();
    collapsibleClassListContainer.show();
  }
}

function refreshClasses() {
  fetch("/classes/")
    .then((response) => response.json())
    .then(displayClasses)
    .catch((error) => console.error("Error: ", error));
}

refreshBtn.addEventListener("click", refreshClasses);

refreshClasses();
