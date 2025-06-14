function fetchContacts() {
  fetch(rootPath + "/controller/get-contacts/")
    .then((response) => response.json())
    .then((data) => renderContacts(data));
}
function renderContacts(contacts) {
  html = `<table>`;
  for (const key in contacts) {
    html += `<tr>
        <td><img src=${
          rootPath + "controller/uploads/" + contacts[key]["avatar"]
        }/><td>
        <td><h5>${contacts[key]["firstname"]}</h5><td>
        <td><h5>${contacts[key]["lastname"]}</h5><td>              
     </tr>`;
  }
  html += `</table>`;
  const contacts_h = document.getElementById("contacts");
  contacts_h.innerHTML = html;
}

// document.getElementById("refresh").addEventListener("click", fetchContacts);

// ========================================================================================
// ADD-CONTACTS
// ========================================================================================
document.getElementById("submitForm").addEventListener("click", submitForm);
function submitForm(e) {
  e.preventDefault();

  const form = document.querySelector("#edit-form");
  const formData = new FormData(form);
  formData.append("apiKey", apiKey);
  for (const element of formData.values()) {
    console.log(element);
  }

  fetch(rootPath + "controller/insert-contact/", {
    method: "POST",
    headers: { accept: "application/json, *.*" },
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "1") {
        alert("contact added");
        window.open("index.html", "_self");
      } else {
        alert(data);
        window.open("index.html", "_self");
      }
    })
    .catch();
}
