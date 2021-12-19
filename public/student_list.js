const PAGINATION_LIMIT = 10;
let studentOffset = 0;

const token = sessionStorage.getItem("token");
if (!token) {
  location.assign("/login.html");
}

const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");
const results = document.getElementById("results");
const studentsTableBody = document.querySelector("#results table > tbody");
const paginationControls = document.getElementById("paginationControls");
const paginationText = document.getElementById("paginationText");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const params = new URLSearchParams(document.location.search);
const classId = parseInt(params.get("class"), 10);

previousButton.addEventListener("click", (event) => {
  studentOffset -= PAGINATION_LIMIT;
  fetchStudents(studentOffset);
});

nextButton.addEventListener("click", (event) => {
  studentOffset += PAGINATION_LIMIT;
  fetchStudents(studentOffset);
});

function populatePlaceholder(classInfo) {
  const educationUnitName = classInfo.educationUnit.name;
  const academicYear = classInfo.academicYear;
  const teacherName = [
    classInfo.teacher.firstName,
    classInfo.teacher.lastName,
  ].join(" ");

  const className = document.createTextNode(
    [educationUnitName, academicYear, teacherName].join(" - ")
  );
  const classNamePlaceholder = document.getElementById("classNamePlaceholder");
  classNamePlaceholder.replaceWith(className);
}

function populateStudentsTable(students, offset, count) {
  const listSize = students.length;
  const first = offset + 1;
  const last = offset + listSize;
  if (offset === 0 && listSize < PAGINATION_LIMIT) {
    paginationControls.classList.add("invisible");
  } else {
    paginationControls.classList.remove("invisible");
  }
  previousButton.disabled = first === 1;
  nextButton.disabled = last === count;
  paginationText.innerText = `Étudiants ${first} à ${last} sur ${count} inscrits`;
  const rows = students.map((student) => {
    const row = document.createElement("tr");
    const firstNameCol = document.createElement("td");
    firstNameCol.innerText = student.firstName;
    row.appendChild(firstNameCol);
    const lastNameCol = document.createElement("td");
    lastNameCol.innerText = student.lastName;
    row.appendChild(lastNameCol);
    return row;
  });
  studentsTableBody.replaceChildren(...rows);
  loading.classList.add("invisible");
  if (count === 0) {
    noResults.classList.remove("invisible");
    results.classList.add("invisible");
  } else {
    noResults.classList.add("invisible");
    results.classList.remove("invisible");
  }
}

fetch(`/classes/${classId}`, {
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then((response) => response.json())
  .then((classInfo) => populatePlaceholder(classInfo));

function fetchStudents(offset) {
  const params = new URLSearchParams({
    limit: PAGINATION_LIMIT.toString(10),
    offset: offset,
  });
  loading.classList.remove("invisible");
  results.classList.add("invisible");
  paginationControls.classList.add("invisible");
  fetch(`/classes/${classId}/students?${params.toString()}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((studentListInfo) =>
      populateStudentsTable(studentListInfo.rows, offset, studentListInfo.count)
    );
}

fetchStudents(0);
