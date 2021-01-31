document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  totalIssue();
  totalOpenIssues();
  totalClosedIssues();
  e.preventDefault();
  
}

const totalIssue = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  const totalIssues = issues.length;
  document.getElementById('totalIssue').innerText = totalIssues;
}

totalIssue();

const totalOpenIssues = () => {
  let openIssues = 0;
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  issues.forEach(element => {
    if(element.status === 'Open') {
      openIssues += 1;
    }
  })
  document.getElementById('openedIssue').innerText = openIssues;
}

totalOpenIssues();

const totalClosedIssues = () => {
  let closedIssues = 0;
  const issues = JSON.parse(localStorage.getItem('issues'))
  issues.forEach(element => {
    if(element.status === 'Closed') {
      closedIssues += 1;
    }
  })
  document.getElementById('closedIssue').innerText = closedIssues;
}
totalClosedIssues();

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  totalOpenIssues();
  totalClosedIssues();
  totalIssue();
  
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id)
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  document.getElementById('issuesList').style.display = "none";
  location.reload();
  totalIssue();
  totalClosedIssues();
  totalOpenIssues();
  
}

const setStatusClosed = (id) =>{
  const issues = JSON.parse(localStorage.getItem('issues'));
  const closeStatus = issues.find( issue => issue.id == id);
  closeStatus.status = "Closed";
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  totalIssue();
  totalOpenIssues();
  totalClosedIssues();
  if(closeStatus.status === "Closed") {
    document.getElementById('descriptionText').style.textDecoration = "line-through";
  }

}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span id="status-${id}" class="label label-info"> ${status} </span></p>
                              <h3 id="descriptionText"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
