let saveLead = document.getElementById("save-leads");
let myLeads = [];
const inputLeads = document.getElementById("inputLeads");
const leadList = document.getElementById("leads-list");
const deleteBtn = document.getElementById("delete-btn");
const saveTab = document.getElementById("save-tab");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  Render(myLeads);
}
saveLead.addEventListener("click", function () {
  myLeads.push(inputLeads.value);
  inputLeads.value = "";
  const localStorageLeads = JSON.stringify(myLeads);
  localStorage.setItem("myLeads", localStorageLeads);

  Render(myLeads);
});
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  Render(myLeads);
});
function Render(leads) {
  let list = "";
  for (i = 0; i < leads.length; i++) {
    list +=
      "<li> <a href=' " +
      leads[i] +
      " ' target='_blank'>" +
      leads[i] +
      "</a></ li>";
  }
  leadList.innerHTML = list;
}
saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    Render(myLeads);
  });
});
