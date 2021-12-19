const classList = document.getElementById("classList");

function populateTable(classes) {
  const classRows = classes.map((c) => {
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    const nameLink = document.createElement("a");
    const nameLinkParams = new URLSearchParams({ class: c.id.toString(10) });
    nameLink.href = `/student_list.html?${nameLinkParams.toString()}`;
    nameLink.innerText = c.shortName;
    nameCol.appendChild(nameLink);
    row.appendChild(nameCol);

    const euCol = document.createElement("td");
    euCol.innerText = c.educationUnit.name;
    row.appendChild(euCol);

    const teacherCol = document.createElement("td");
    teacherCol.innerText = [c.teacher.firstName, c.teacher.lastName].join(" ");
    row.appendChild(teacherCol);

    return row;
  });
  const tableBody = classList.querySelector("tbody");
  tableBody.replaceChildren(...classRows);
}

const token = sessionStorage.getItem("token");
fetch("/classes/", {
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then((response) => response.json())
  .then((classes) => populateTable(classes));
