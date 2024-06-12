import {
  getCurrentDate,
  getDateAfterOneDay,
  getCurrentTime,
  getCurrentArabicDay,
  getDateAfterOneMonth,
  getDateAfterOneWeek,
} from "./tools/createDateAndTimeAndDay.js";
import card from "./tools/card.js";
//helping vars
let title = document.querySelector(".ope-title");
window.onload = () => {
  reret();
  createOperationCards();
  putSimCardsNumbers();
  dropAndUpSubOptions();
  addOperation();
  showOpeType(
    document.querySelector(".ope-t"),
    document.querySelector(".OpeShowerMain.add")
  );
  showShopSimCards(
    document.querySelector(".input-click"),
    document.querySelector(".simCardsShowerMain.add")
  );
  ret(1,"0",document.querySelector(".aglPaid"),document.querySelector(".agl-given-box"))
  deleteAll();
};
function makeFilteers() {
  //edit / delete

  //add filter functions
  showAllFilter();
  filterByOperationType();
  //? "filterBySimCard()" in putSimCards function
  filterByClientNumber();
  filterByMoney();
  filterByAgl();
  filterByDebt();
  filterByDate();
}
function mkOperations() {
  editOperation();
  deleteOperation();
}
function reret() {
  let returner = document.querySelector(".returner");
  window.onscroll = () => {
    if (window.scrollY > 200) {
      returner.classList.replace("d-none", "d-flex");
    } else {
      returner.classList.replace("d-flex", "d-none");
    }
  };
  returner.addEventListener("click", () => {
    console.log(returner);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
//create cards and apply filters
async function createOperationCards() {
  let box = document.querySelector(".ope-box-con");
  let res = await fetch(" ../routers/operations/get_operations.php");
  let data = await res.json();

  let each = await data.forEach((ele, index) => {
    box.innerHTML += card(
      ele.id,
      ele.simCardNumber,
      ele.client_number,
      ele.money,
      ele.operationType,
      ele.dateDay,
      ele.time,
      ele.baky
    );
  });

  makeFilteers();
  mkOperations();
}

//safes managment
function sendMoneyToAllSafs(i) {
  fetch(` ../routers/safes/get_safe.php?id=${i}`)
    .then((res) => res.json())
    .then((data) => {
      let startDate = data.startDate;
      let endDate = data.endDate;
      console.log(endDate, data.endDate);
      const day = () => {
        if (endDate == getCurrentDate()) {
          startDate = getCurrentDate();
          endDate = getDateAfterOneDay();
        }
      };
      const week = () => {
        if (endDate == getCurrentDate()) {
          startDate = endDate;
          endDate = getDateAfterOneWeek();
        }
      };
      const month = () => {
        if (endDate == getCurrentDate()) {
          startDate = endDate;
          endDate = getDateAfterOneMonth();
        }
      };
      if (i == "1") {
        day();
      }
      if (i == "2") {
        week();
      }
      if (i == "3") {
        month();
      }

      let end = {
        startDate: startDate,
        endDate: endDate,
      };
      fetch(` ../routers/safes/put_safe.php?id=${i}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(end),
      })
        .then((res) => {
          if (res.ok) {
            res.json();
          }
        })
        .then((d) => {});
    });
}

//left section
function showShopSimCards(clicker, box, func) {
  let items;

  // Check if the event listener is already added
  if (!clicker.hasEventListener) {
    // Add the event listener
    clicker.addEventListener("click", () => {
      box.classList.replace("d-none", "d-flex");
      box.style.zIndex = "10000";
      fetch(" ../routers/simCards/get_simCards.php")
        .then((res) => res.json())
        .then((data) => {
          // Clear previous items
          box.firstElementChild.innerHTML = "";
          data.forEach((ele) => {
            let item = `<div class="itm p-2 col-12 text-center mt-2">${ele.number}</div>`;
            box.firstElementChild.innerHTML += item;
          });
          items = document.querySelectorAll(".itm");
          // Add click event listener to each item
          items.forEach((ele) => {
            ele.addEventListener("click", (e) => {
              clicker.value = e.target.innerHTML;
              box.firstElementChild.innerHTML = "";
              box.classList.replace("d-flex", "d-none");
              func;
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching SIM cards:", error);
        });
    });

    // Set the flag to indicate that the event listener is added
    clicker.hasEventListener = true;
  }
}
function showOpeType(clicker, box) {
  let itms = document.querySelectorAll(".OpeShower .item");
  clicker.addEventListener("click", (e) => {
    box.classList.replace("d-none", "d-flex");
    box.style.zIndex = "10000";
    itms.forEach((ele) => {
      ele.addEventListener("click", (e) => {
        clicker.value = e.target.innerHTML.trim();
        clicker.setAttribute("data-ope", e.target.dataset.id);
        box.classList.replace("d-flex", "d-none");
      });
    });
  });
}
function addOperation() {
  let inputs = document.querySelectorAll("form.add-form input");
  let clicker = document.querySelector("form.add-form button");
  clicker.addEventListener("click", (e) => {
    if (
      inputs[0].value.trim() === "" ||
      inputs[1].value.trim() === "" ||
      inputs[2].value.trim() === "" ||
      inputs[3].value.trim() === "" ||
      inputs[4].value.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "يرجى ملء جميع البيانات",
      });
    } else {
      let iArr = Array.from(inputs[0].value.trim());
      if (iArr.length < 11 || iArr.length > 11) {
        Swal.fire({
          icon: "error",
          title: "يجب الا يزيد او يقل رقم المحل عن 11 رقم",
        });
      } else {
        let totel;
        totel = +inputs[2].value - +inputs[4].value;
        let data = {
          dateDay: getCurrentDate(),
          time: getCurrentTime(),
          money: inputs[2].value,
          simCardNumber: inputs[0].value.trim(),
          client_number: inputs[1].value,
          operationType: inputs[3].dataset.ope,
          baky: inputs[4].value,
          totel_money: totel,
        };
        Swal.fire({
          title: "هل انت متأكد ؟",
          icon: "warning",
          html: `
            رقم المحل : ${inputs[0].value} <br>
            رقم العميل : ${data.client_number}<br>
            المبلغ : ${data.money}<br>
            نوع العمليه : ${inputs[3].value}<br>
           الآجل / الدين : ${data.baky}<br>
        `,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم",
          cancelButtonText: "الغاء",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(` ../routers/operations/post_operations.php`, {
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
                let pp;
                data.operationType == 0 ? (pp = "-") : (pp = "+");
                sendMoneyToAllSafs("1");
                sendMoneyToAllSafs("2");
                sendMoneyToAllSafs("3");
                Swal.fire({
                  title: "تمت الاضافه بنجاح",
                  icon: "success",
                }).then(() => {
                  gAllCards();
                });
              }
            });
          }
        });
      }
    }
  });
}
function editOperation() {
  let box = document.querySelector(".edit-main");
  let labels = document.querySelectorAll(".edit-main-box .editing-form label");
  let inputs = document.querySelectorAll(".edit-main-box .editing-form input");

  let updater = document.querySelector(
    ".edit-main-box .editing-form button.upd"
  );
  let closer = document.querySelector(
    ".edit-main-box .editing-form button.cls"
  );
  let opT;
  let d;
  let clickers = document.querySelectorAll(".option.edit");
  clickers.forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      fetch(" ../routers/operations/get_operations.php?id=" + id)
        .then((res) => res.json())
        .then((data) => {
          box.classList.replace("d-none", "d-flex");
          let dataE = {
            simCardNumber: data.simCardNumber,
            client_number: data.client_number,
            operationType: data.operationType,
            money: data.money,
            baky: data.baky,
          };
          dataE.operationType == "0" ? (opT = "تحويل") : (opT = "استلام");
          labels[0].innerHTML += dataE.simCardNumber;
          labels[1].innerHTML += dataE.client_number;
          labels[2].innerHTML += opT;
          labels[3].textContent += dataE.money;
          labels[4].textContent += dataE.baky;
          async function sendData() {
            updater.addEventListener("click", () => {
              inputs[0].value.trim() != ""
                ? (dataE.simCardNumber = inputs[0].value)
                : (dataE.simCardNumber = data.simCardNumber);
              inputs[1].value.trim() != ""
                ? (dataE.client_number = inputs[1].value)
                : (dataE.client_number = data.client_number);
              inputs[2].value.trim() != ""
                ? (dataE.operationType = inputs[2].dataset.ope)
                : (dataE.operationType = data.operationType);
              inputs[3].value.trim() != ""
                ? (dataE.money = inputs[3].value)
                : (dataE.money = data.money);
              inputs[4].value.trim() != ""
                ? (dataE.baky = inputs[4].value)
                : (dataE.baky = data.baky);
              dataE.operationType == "0" ? (opT = "تحويل") : (opT = "استلام");
              Swal.fire({
                title: "هل انت متأكد ؟",
                icon: "warning",
                html: `
                      رقم المحل : ${dataE.simCardNumber}  <br>
                      رقم العميل : ${dataE.client_number} <br>
              نوع العمليه :${opT} <br>
              المبلغ :${dataE.money} <br>
              الآجل / الدين : ${dataE.baky}
              
              `,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم",
                cancelButtonText: "الغاء",
              }).then((result) => {
                if (result.isConfirmed) {
                  fetch(` ../routers/operations/put_operations.php?id=${id}`, {
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
          }
          sendData();
          showShopSimCards(
            document.querySelector(".upd-sim"),
            document.querySelector(".simCardsShowerMain.edit"),
            sendData()
          );
          showOpeType(
            document.querySelector("#upd-ope-up"),
            document.querySelector(".OpeShowerMain.edit")
          );
          sendData();
          closer.addEventListener("click", () => {
            box.classList.replace("d-flex", "d-none");
            labels[0].textContent = "رقم المحل : ";
            labels[1].textContent = "رقم العميل : ";
            labels[2].textContent = "نوع العمليه : ";
            labels[3].textContent = " المبلغ : ";
            labels[4].textContent = "الآجل / الدين : ";
          });
        });
    });
  });
}
function deleteOperation() {
  let clickers = document.querySelectorAll(".o");
  clickers.forEach((ele) => {
    ele.addEventListener("click", (e) => {
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
          fetch(
            ` ../routers/operations/delete_operations.php?id=${e.target.dataset.id}`,
            {
              method: "delete",
            }
          ).then((res) => {
            res.json();
            if (!res.ok) {
              Swal.fire({
                title: "حدث خطأ",
                icon: "error",
              });
            } else {
              Swal.fire({
                title: "تم الحذف بنجاح ",
                icon: "success",
              }).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    });
  });
}
//right section
//section functions
function putSimCardsNumbers() {
  let box = document.querySelector(".ch-num-simCards");
  fetch(` ../routers/simCards/get_simCards.php`)
    .then((res) => res.json())
    .then((data) => {
      let simsC;
      data.map((ele, index) => {
        let mt = "";
        index == 0 ? (mt = "0") : (mt = "2");
        let nOp = `<div class="s-option col-12 simCard mt-${mt}">${ele.number}</div>`;
        box.innerHTML += nOp;
      });
      simsC = document.querySelectorAll(".simCard");
      //?filter by sims
      filterBySimCard(simsC);
    });
}
function dropAndUpSubOptions() {
  let options = document.querySelectorAll(".option");
  let sOptions = document.querySelectorAll(".s-options");
  options.forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
      if (sOptions[index].previousElementSibling.classList.contains("down")) {
        sOptions[index].previousElementSibling.classList.replace("down", "up");
        sOptions[index].classList.replace("d-none", "d-block");
        options[index].lastElementChild.classList.replace(
          "fa-angle-down",
          "fa-angle-up"
        );
      } else {
        sOptions[index].previousElementSibling.classList.replace("up", "down");
        sOptions[index].classList.replace("d-block", "d-none");
        options[index].lastElementChild.classList.replace(
          "fa-angle-up",
          "fa-angle-down"
        );
      }
    });
  });
}
//filtering functions

function gAllCards() {
  let box = document.querySelector(".ope-box-con");
  box.innerHTML = "";
  fetch(" ../routers/operations/get_operations.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        box.innerHTML = "omar";
      } else {
        data.forEach((ele) => {
          box.innerHTML += card(
            ele.id,
            ele.simCardNumber,
            ele.client_number,
            ele.money,
            ele.operationType,
            ele.dateDay,
            ele.time,
            ele.baky
          );
          mkOperations();
        });
      }
    });
}
function showAllFilter() {
  let clicker = document.querySelector(".opt");
  clicker.addEventListener("click", () => {
    gAllCards();
    title.textContent = "كل العمليات";
  });
}
function filterByOperationType() {
  let clickers = document.querySelectorAll(".operationTypes div");
  const box = document.querySelector(".ope-box-con");
  clickers[0].addEventListener("click", () => {
    getOpeData(0, " التحويل : ");
  });
  clickers[1].addEventListener("click", () => {
    getOpeData(1, " الاستلام :");
  });
  async function getOpeData(opo, oper) {
    box.innerHTML = "";
    let res = await fetch(
      ` ../routers/operations/filtring/by_opeType.php?operationType=${opo}`
    );
    let data = await res.json();
    data.forEach((ele) => {
      box.innerHTML += card(
        ele.id,
        ele.simCardNumber,
        ele.client_number,
        ele.money,
        ele.operationType,
        ele.dateDay,
        ele.time,
        ele.baky
      );
      mkOperations();
    });
    title.textContent = `عمليات ${oper}`;
  }
}
function filterBySimCard(nums) {
  let clickers = document.querySelectorAll(".simCard");
  function getBysim(sim) {
    let box = document.querySelector(".ope-box-con");
    fetch(` ../routers/operations/filtring/by_simNum.php?simCardNumber=${sim}`)
      .then((response) => response.json())
      .then((data) => {
        box.innerHTML = "";
        data.forEach((ele) => {
          box.innerHTML += card(
            ele.id,
            ele.simCardNumber,
            ele.client_number,
            ele.money,
            ele.operationType,
            ele.dateDay,
            ele.time,
            ele.baky
          );
        });
        mkOperations();
      });
  }
  nums.forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
      getBysim(e.target.textContent.trim());
    });
  });
}

//?inputs filters control function
function inputs_filter(inp, url, button, tit) {
  let box = document.querySelector(".ope-box-con");
  button.addEventListener("click", (e) => {
    async function get() {
      let res = await fetch(`${url}${inp.value}`);
      let data = await res.json();
      data.forEach((ele) => {
        box.innerHTML += card(
          ele.id,
          ele.simCardNumber,
          ele.client_number,
          ele.money,
          ele.operationType,
          ele.dateDay,
          ele.time,
          ele.baky
        );
        mkOperations();
      });
    }
    if (inp.value.trim() !== "") {
      title.textContent = `${tit} : ${inp.value}`;
      box.innerHTML = "";
      get();
    }
  });
}
//!filters
function filterByClientNumber() {
  let input = document.querySelector(".clie-view input");
  let btn = document.querySelector(".clie-view button");
  inputs_filter(
    input,
    ` ../routers/operations/filtring/by_clientNum.php?client_number=`,
    btn,
    `كل التعاملات على رثم العميل `
  );
}
function filterByMoney() {
  let input = document.querySelector(".money-view input");
  let btn = document.querySelector(".money-view button");
  inputs_filter(
    input,
    ` ../routers/operations/filtring/by_money.php?money=`,
    btn,
    `كل التعاملات بمبلغ `
  );
}
function filterByAgl() {
  let input = document.querySelector(".agl-view input");
  let btn = document.querySelector(".agl-view button");
  inputs_filter(
    input,
    ` ../routers/operations/filtring/by_operationTypeAndBaky.php?operationType=0&baky=`,
    btn,
    `كل التعاملات بآجل `
  );
}
function filterByDebt() {
  let input = document.querySelector(".debt-view input");
  let btn = document.querySelector(".debt-view button");
  inputs_filter(
    input,
    ` ../routers/operations/filtring/by_operationTypeAndBaky.php?operationType=1&baky=`,
    btn,
    `كل التعاملات بالدين `
  );
}
function filterByDate() {
  let input = document.querySelector(".date-inp");
  let btn = document.querySelector(".date-btn");
  inputs_filter(
    input,
    ` ../routers/operations/filtring/by_dateDay.php?dateDay=`,
    btn,
    `كل التعاملات بتاريخ `
  );
}
//clickers
async function ret(num, ope, clicker,box) {
  let res = await fetch(
    ` ../routers/operations/filtring/by_opeType.php?operationType=${ope}`
  );
  let data = await res.json();
  clicker.addEventListener("click", () => {
    box.classList.replace("d-none","d-flex")
  })
}
function deleteAll() {
  let clicker = document.querySelector(".choise.deleteAll");
  clicker.addEventListener("click", (e) => {
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
        fetch(" ../routers/operations/deleteAll.php", {
          method: "delete",
        }).then((res) => {
          res.json();
          if (res.ok) {
            gAllCards();
            Swal.fire({
              icon: "success",
              title: "تم الحذف بنجاح",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "حدث خطأ ما",
            });
          }
        });
      }
    });
  });
}