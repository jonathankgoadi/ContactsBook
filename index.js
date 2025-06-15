function fetchContacts() {
  fetch(rootPath + "/controller/get-contacts/")
    .then((response) => response.json())
    .then((data) => renderContacts(data));
}
function renderContacts(contacts) {
  html = `<table>`;
  for (const key in contacts) {
    html += `<tr onclick="editContact(${contacts[key].id})">
        <td><img src=${
          rootPath + "controller/uploads/" + contacts[key].avatar
        }><td>
        <td><h5>${contacts[key].firstname}</h5><td>
        <td><h5>${contacts[key].lastname}</h5><td>              
     </tr>`;
  }
  html += `</table>`;
  const contacts_h = document.getElementById("contacts");
  contacts_h.innerHTML = html;
}

document.querySelector("#refresh")?.addEventListener("click", fetchContacts);
document.getElementById("add-contact")?.addEventListener("click", () => {
  window.open("add-contact.html", "_self");
});

// ========================================================================================
// ADD-CONTACTS
// ========================================================================================
document.getElementById("submitForm")?.addEventListener("click", submitForm);
document.querySelector("homeBtn")?.addEventListener("click", homeLink);

function submitForm(e) {
  e.preventDefault();

  const form = document.querySelector("#edit-form");
  const formData = new FormData(form);
  formData.append("apiKey", apiKey);

  fetch(rootPath + "controller/insert-contact/", {
    method: "POST",
    headers: { accept: "application/json, *.*" },
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "1") {
        alert("contact added");
        homeLink();
      } else {
        alert(data);
        homeLink();
      }
    })
    .catch();
}
function homeLink() {
  window.open("index.html", "_self");
}
// ============================================================================
// EDIT CONTACT
// ============================================================================
function editContact(id) {
  window.open("edit-contact.html?id=" + id, "_self");
}
const id = getId();

function getId() {
  const url = window.location.href;
  const id = url.split("=")[1];
  return id;
}
