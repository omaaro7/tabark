export const card = (
  id,
  simCardNumber,
  client_number,
  money,
  opeS,
  dateDay,
  time,
  baky
) =>  {
  let opeStatues;
  let agl;
  let debt;
  let agld;
  let debtd;
  if (opeS == 0) {
    opeStatues = "تحويل";
    agl = baky;
    debt = "0";
    agld = "block";
    debtd = "none";
  } else {
    opeStatues = "استلام";
    agl = "0";
    debt = baky;
    agld = "none";
    debtd = "debt";
  }
  const item = `
    <div
                        class="ope-container mt-3 col-10 col-md-6 col-lg-4 col-xl-3 px-2 d-flex justify-content-center" data-id="${id}" data-opeT="${opeS}" data-aos="zoom-in" data-aos-duration="600"
                      >
                        <div class="ope col-11 px-3 py-3" >
                          <div class="imgContainer col-12 d-flex justify-content-center">
                            <img src="../assets/imgs/invoice.png" alt="" />
                          </div>
                          <div class="infoContainer col-12 mt-3">
                            <div class="shop-number-box col-12">
                              رقم خط المحل : <span class="col-12 ">${simCardNumber}</span>
                            </div>
                            <div class="client-number-box col-12 mt-2">
                              رقم العميل : <span>${client_number}</span>
                            </div>
                            <div class="cridet-box col-12 mt-2">
                              المبلغ : <span>${money}</span>
                            </div>
                            <div class="ope-box col-12 mt-2">
                              نوع العمليه : <span>${opeStatues}</span>
                            </div>
                            <div class="date-box col-12 mt-2">
                               التاريخ : <span>${dateDay}</span>
                            </div>
                            <div class="time-box col-12 mt-2">
                               الوقت : <span>${time}</span>
                            </div>
                            <div class="agl-box col-12 mt-2 d-${agld}">الآجل : <span>${agl}</span></div>
                            <div class="debt-box col-12 mt-2 d-${debtd}">الدين : <span>${debt}</span></div>
                          </div>
                          <div
                            class="options-container col-12 d-flex justify-content-between flex-wrap mt-3"
                          >
                            <button class="option col-12 col-md-5 mt-2 edit" data-id="${id}">
                              تعديل
                            </button>
                            <button class="o col-12 col-md-5 mt-2 delete" data-id="${id}">
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                      `;

  return item;
}
export const moneyBack = (number,money,id) => {
  const item = `<div class="agl-g col-12 d-flex justify-content-between p-2 mt-1">
              <div class="agl-number col-3 d-flex align-items-center">
                ${number}
              </div>
              <div
                class="agl-money col-3 d-flex justify-content-center align-items-center"
              >
                ${money}
              </div>
              <div class="agl-clickers col-3 d-flex justify-content-end">
                <button class="given-part px-3 py-2" data-id="${id}">استلام جزء</button>
                <button class="given-all me-2 px-3 py-2" data-id="${id}">استلام كل</button>
              </div>
            </div>`
        return item
}