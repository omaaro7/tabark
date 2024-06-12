let addInputs = document.querySelectorAll("form input");
let addButton = document.querySelector("form button");
let deleters = "";
let editers = "";
let historyShower = "";
let operationController = "";
window.onload = () => {
  main();
  addButton.addEventListener("click", () => addClient());
};
function addClient() {
  if (
    addInputs[0].value.trim() === "" ||
    addInputs[1].value.trim() === "" ||
    addInputs[2].value.trim() === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "يرجى ملء جميع البيانات",
    });
  } else {
    let data = {
      client_name: addInputs[0].value,
      client_number: addInputs[1].value,
      client_credit: addInputs[2].value,
    };
    Swal.fire({
      title: "هل انت متأكد ؟",
      icon: "warning",
      html: `
      اسم العميل : ${addInputs[0].value} <br>
      رقم العميل : ${addInputs[1].value} <br>
      الرصيد المعتاد : ${addInputs[2].value}
  `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` ../routers/best_clients/post_bestClient.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        }).then((res) => {
          res.json();
          if (!res.ok) {
            Swal.fire({
              title: "حدث خطأ",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "تمت الاضافه بنجاح",
              icon: "success",
            }).then(() => {
              setTimeout(() => window.location.reload(), 1000);
            });
          }
        });
      }
    });
  }
}
function main() {
  //create clients cards
  let box = document.querySelector(".users-container");
  fetch(` ../routers/best_clients/get_bestClients.php`).then((res) => {
    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء جلب البياتات",
      });
    } else {
      res.json().then((data) => {
        data.forEach((ele) => {
          let client = `
        <div class="user-box mt-3 col-12 col-md-6 col-lg-4 col-xl-3 px-2 d-flex justify-content-center">
        <div class="user col-11 px-3 py-3" data-id="${ele.id}">
          <div class="imgContainer col-12 d-flex justify-content-center">
            <img src="../assets/imgs/user.png" alt="">
          </div>
          <div class="infoContainer  col-12 mt-2">
            <div class="name-box col-12">
              الاسم :  <span class="col-12"> ${ele.client_name}</span>
            </div>
            <div class="number-box col-12 mt-2">
              الرقم :  <span>${ele.client_number}</span>
            </div>
            <div class="cridet-box col-12 mt-2">
              الرصيد المعتاد :  <span>${ele.client_credit}</span>
            </div>
          </div>
          <div class="options-container col-12 d-flex justify-content-between flex-wrap mt-3">
            <button class="option col-12 col-md-5 mt-2 ope" data-id="${ele.id}">اضافة معامله</button>
            <button class="option col-12 col-md-5 mt-2 history" data-id="${ele.id}">السجل</button>
            <button class="option col-12 col-md-5 mt-2 edit" data-id="${ele.id}">تعديل</button>
            <button class="option col-12 col-md-5 mt-2  delete" data-id="${ele.id}">حذف</button>
          </div>
        </div>
      </div>
        `;
          box.innerHTML += client;
          //update values
          deleters = document.querySelectorAll(".option.delete");
          editers = document.querySelectorAll(".option.edit");
          historyShower = document.querySelectorAll(".option.history");
          operationController = document.querySelectorAll(".option.ope");
        });
        //delete client
        deleters.forEach((ele) =>
          ele.addEventListener("click", (e) =>
            deleteClient(e.target.dataset.id)
          )
        );
        //udpdate client
        editers.forEach((ele,index) =>
          ele.addEventListener("click", (e) => editClient(data,index,e.target.dataset.id))
        );
      });
    }
  });
}
function deleteClient(id) {
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
      fetch(` ../routers/best_clients/delete_bestClient.php?id=${id}`, {
        method: "delete",
      }).then((res) => {
        res.json();
        if (!res.ok) {
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
function editClient(d,i,f) {
  let box = document.querySelector(".edit-main");
  let labels = document.querySelectorAll(".edit-main-box .editing-form label");
  let inputs = document.querySelectorAll(".edit-main-box .editing-form input");
  let updater = document.querySelector(".edit-main-box .editing-form button.upd");
  let closer = document.querySelector(".edit-main-box .editing-form button.cls");
  box.classList.replace("d-none", "d-flex");
  let dataE = {
    client_name: d[i].client_name,
    client_number: d[i].client_number,
    client_credit: d[i].client_credit,
  };
  labels[0].innerHTML += dataE.client_name;
  labels[1].innerHTML += dataE.client_number;
  labels[2].innerHTML += dataE.client_credit;
  updater.addEventListener("click", () => {
    inputs[0].value.trim() != ""
      ? (dataE.client_name = inputs[0].value)
      : (dataE.client_name = d[i].client_name);
    inputs[1].value.trim() != ""
      ? (dataE.client_number = inputs[1].value)
      : (dataE.client_number = d[i].client_number);
    inputs[2].value.trim() != ""
      ? (dataE.client_credit = inputs[2].value)
      : (dataE.client_credit = d[i].client_credit);
    Swal.fire({
      title: "هل انت متأكد ؟",
      html:`
        الاسم :  ${dataE.client_name} <br>
        الرقم :  ${dataE.client_number} <br>
        الرصيد  :  ${dataE.client_credit} <br>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` ../routers/best_clients/put_bestClient.php?id=${f}`, {
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
