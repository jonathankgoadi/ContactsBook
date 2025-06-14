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

document.getElementById("refresh").addEventListener("click", fetchContacts);
