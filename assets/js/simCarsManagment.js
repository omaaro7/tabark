let tableBody = document.querySelector(".table tbody");
let delAll = document.querySelector("button.delAll");
let exc = document.querySelector("button.downExcel");
let csv = document.querySelector("button.csv");
let pdf = document.querySelector("button.pdf");
window.onload = () => {
  fetch(" ../routers/simCards/get_simCards.php").then((res) =>
    res.json().then((data) => {
      data.map((ele) => {
        let nItem = `
                <tr>
                    <td data-label="الرقم">${ele.number}</td>
                    <td data-label="اسم الخط">${ele.name}</td>
                    <td data-label="تعديل" class="edi">
                  <div class="edit" data-id="${ele.id}"><i class="fa-thin fa-pen-to-square"></i></div>
                </td>
                <td data-label="حذف" class="del">
                    <div class="delete" data-id="${ele.id}"><i class="fa-thin fa-trash"></i></div>
                </td>
                </tr>
            `;
        tableBody.innerHTML += nItem;
      });
      let deleteItems = document.querySelectorAll("table tbody tr td.del");
      let editItems = document.querySelectorAll("table tbody tr td.edi");
      let adder = document.querySelector("form button");
      adder.addEventListener("click", () => {
        addSimCard();
      });
      editItems.forEach((ele, index) => {
        ele.addEventListener("click", (e) => {
          editSimCard(data, index, e.target.dataset.id);
        });
      });
      deleteItems.forEach((ele, index) => {
        ele.addEventListener("click", (e) => {
          deleteSimCard(e.target.dataset.id);
        });
      });
      exc.addEventListener("click", () => {
        exportExcelAndCsv("xls");
      });
      csv.addEventListener("click", () => {
        exportExcelAndCsv("csv");
      });
      pdf.addEventListener("click", () => {
        exportAsPdf();
      });
      delAll.addEventListener("click", () => {
        deleteAll(data);
      });
    })
  );
};
function addSimCard() {
  let inputs = document.querySelectorAll("form input");
  if (
    inputs[0].value.trim() === "" ||
    inputs[1].value.trim() === "" ||
    inputs[2].value.trim() === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "يرجى ملء جميع البيانات",
    });
  } else {
    let data = {
      id: null,
      number: inputs[0].value.trim(),
      name: inputs[1].value.trim(),
      money: inputs[2].value.trim(),
    };
    fetch(` ../routers/simCards/post_simCard.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json();
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "تمت الاضافه بنجاح",
        }).then(() => setTimeout(() => window.location.reload(), 1000));
      } else {
        Swal.fire({
          icon: "erorr",
          title: "حدث خطأ",
        });
      }
    });
  }
}
function editSimCard(d, i, f) {
  let box = document.querySelector(".edit-main");
  let labels = document.querySelectorAll(".edit-main-box .editing-form label");
  let inputs = document.querySelectorAll(".edit-main-box .editing-form input");
  let updater = document.querySelector(".edit-main-box .editing-form button.upd");
  let closer = document.querySelector(".edit-main-box .editing-form button.cls");
  box.classList.replace("d-none", "d-flex");
  let dataE = {
    number: d[i].number,
    name: d[i].name,
    money: d[i].money,
  };
  labels[0].innerHTML += dataE.number;
  labels[1].innerHTML += dataE.name;
  labels[2].innerHTML += dataE.money;
  updater.addEventListener("click", () => {
    inputs[0].value.trim() != ""
      ? (dataE.number = inputs[0].value)
      : (dataE.number = d[i].number);
    inputs[1].value.trim() != ""
      ? (dataE.name = inputs[1].value)
      : (dataE.name = d[i].name);
    inputs[2].value.trim() != ""
      ? (dataE.money = inputs[2].value)
      : (dataE.money = d[i].money);
    Swal.fire({
      title: "هل انت متأكد ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` ../routers/simCards/put_simCards.php?id=${f}`, {
          method: "PUT",
          body: JSON.stringify(dataE),
        }).then((res) => {
          res.json();
          if (res.status !== 200) {
            Swal.fire({
              title: "حدث خطأ",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "تم التعديل بنجاح",
              icon: "success",
            }).then(() => {
              setTimeout(() => window.location.reload(), 1000);
            });
          }
        });
      }
    });
  });
  closer.addEventListener("click" , () => {
    box.classList.replace("d-flex" , "d-none")
  })
}
function deleteSimCard(id) {
  Swal.fire({
    title: "هل انت متأكد ؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم",
    cancelButtonText: "الغاء",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(` ../routers/simCards/delete_simCards.php?id=${id}`, {
        method: "delete",
      }).then((res) => {
        res.json();
        if (res.status !== 200) {
          Swal.fire({
            title: "حدث خطأ",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "تم الحذف بنجاح",
            icon: "success",
          }).then(() => {
            setTimeout(() => window.location.reload(), 1000);
          });
        }
      });
    }
  });
}
function deleteAll(d) {
  Swal.fire({
    title: "هل انت متأكد ؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم",
    cancelButtonText: "الغاء",
  }).then((result) => {
    if (result.isConfirmed) {
      d.forEach((ele) => {
        fetch(` ../routers/simCards/delete_simCards.php?id=${ele.id}`, {
          method: "delete",
        }).then((res) => {
          res.json();
          if (res.status !== 200) {
            Swal.fire({
              title: "حدث خطأ",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "تم الحذف بنجاح",
              icon: "success",
            }).then(() => {
              setTimeout(() => window.location.reload(), 1000);
            });
          }
        });
      });
    }
  });
}
function exportExcelAndCsv(type) {
  const fileName = "exported." + type;
  const table = document.querySelector(".table");
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, fileName);
}
function exportAsPdf() {
  let element = document.querySelector("div.allCards");
  let opt = {
    margin: 1,
    filename: "sheet.pdf",
    imag: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter" },
  };
  html2pdf(element, opt);
}