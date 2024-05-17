const tblName = "Tbl_Name";
let _editId = null;

$("#btnSave").click(function () {
  if (_editId == null) {
    createData();
  } else {
    updateData();
  }
});

function createData() {
  let lst = [];
  if (localStorage.getItem(tblName) != null) {
    lst = JSON.parse(localStorage.getItem(tblName));
  }

  const name = $("#txtName").val();
  const data = {
    Id: uuidv4(),
    Name: name,
  };
  lst.push(data);
  localStorage.setItem(tblName, JSON.stringify(lst));
  successMessage("Create Successful");

  $("#txtName").val("");
  $("#txtName").focus();
  readData();
}

function readData() {
  if (localStorage.getItem(tblName) == null) return;

  var jsonStr = localStorage.getItem(tblName);
  var lst = JSON.parse(jsonStr);
  let trRows = "";
  let count = 0;
  lst.forEach((item) => {
    trRows += `
<tr>
    <td>
        <button type="button" class="btn btn-warning" onclick="editData('${
          item.Id
        }')">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="btn btn-danger" onclick="deleteData('${
          item.Id
        }')">
            <i class="fa-solid fa-trash"></i>    
        </button>
    </td>
    <td>${++count}</td>
    <td>${item.Name}</td>
</tr>`;
  });

  $("#tableData").html(trRows);
}

function editData(id) {
  if (localStorage.getItem(tblName) == null) return;

  var jsonStr = localStorage.getItem(tblName);
  var lst = JSON.parse(jsonStr);
  var results = lst.filter((x) => x.Id == id);
  if (results.length == 0) {
    alert("No data found.");
    return;
  }
  var item = results[0];
  _editId = item.Id;
  $("#txtName").val(item.Name);
}

function updateData() {
  let lst = [];
  if (localStorage.getItem(tblName) != null) {
    lst = JSON.parse(localStorage.getItem(tblName));
  }

  let index = lst.findIndex((x) => x.Id == _editId);
  lst[index].Name = $("#txtName").val();

  localStorage.setItem(tblName, JSON.stringify(lst));
  successMessage("Updating Successful");
  $("#txtName").val("");
  $("#txtName").focus();
  _editId = null;
  readData();
}

function deleteData(id) {
  confirmMessage("Are you sure want to delete?").then(function (result) {
    if(!result) return;
    let lst = [];
    if (localStorage.getItem(tblName) != null) {
      lst = JSON.parse(localStorage.getItem(tblName));
    }
    lst = lst.filter((x) => x.Id != id);
    localStorage.setItem(tblName, JSON.stringify(lst));
    successMessage("Deleting Successful");
    readData();
  });
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

readData();
