export const card = (
  id,
  simCardNumber,
  client_number,
  money,
  opeS,
  dateDay,
  time,
  baky
) => {
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
                            <button class="option bt col-12 col-md-5 mt-2 edit" data-id="${id}">
                              تعديل
                            </button>
                            <button class="o bt col-12 col-md-5 mt-2 delete" data-id="${id}">
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                      `;

  return item;
};
export const moneyBack = (number, money, id,mg) => {
  const item = `<div class="agl-g col-12 d-flex justify-content-between p-2 mt-1">
              <div class="agl-number col-3 d-flex align-items-center">
                ${number}
              </div>
              <div
                class="agl-money col-3 d-flex justify-content-center align-items-center"
              >
                ${money}
              </div>
              <div class="agl-clickers col-4 d-flex justify-content-end">
                <button class="given-part px-3 py-2" data-id="${id}"> ${mg} جزء</button>
                <button class="given-all me-2 px-3 py-2" data-id="${id}">${mg} الكل</button>
              </div>
            </div>`;
  return item;
};
export const part = (type, num, id,baky) => {
  const item = `
        <div class="part-box col-11 col-md-9 col-lg-7 col-xl-5 px-2 py-3">
          <div class="closer  position-absolute top-3">
            <i class="fa-sharp fa-solid fa-circle-xmark"></i>
          </div>
          <div
            class="part-box-title col-12 text-center fs-5 pb-2 mt-2"
            style="color: var(--titles-color)"
          >
            <span>${type}</span> : <span>${num}</span>
          </div>
          <div class="part-box-form col-12 d-flex justify-content-around">
            
            <input
              type="number"
              placeholder="اكتب المبلغ..."
              class="recivedSend col-5 py-1 px-2 rounded-2"
              style="border: 2px solid var(--second-color)"
            />
            <div class="col-1 text-center d-flex align-items-center justify-content-center">من</div>
            <div
              class="main-part col-3 py-1 px-2 rounded-3 text-center"
              style="border: 2px dashed var(--fourth-color)"
            >${baky} جنيه</div>
            <button
              class="col-2 py-1 px-2 rounded-3"
              style="
                border: 2px solid var(--second-color);
                background-color: var(--second-color);
                color: var(--main-color);
                transition: all 0.5s;
              "
              data-id="${id}"
            >
              تأكيد
            </button>
          </div>
        </div>
`;
  return item;
};
export const moneyBackSearch = (moneyType , searchType,searchTitle) => {
  const item = `
    <div class="show-number col-11 col-md-9 col-lg-6 py-3 px-2">
          <div class="closer position-absolute top-3">
            <i class="fa-sharp fa-solid fa-circle-xmark"></i>
          </div>
          <div class="show-number-title col-12 text-center mt-2 fs-5">بحث عن ${moneyType} ${searchType}</div>
          <div class="show-number-form col-12 mt-2 d-flex justify-content-between">
            <input type="number" class="show-number-input col-9 py-1" placeholder="${searchTitle}... "/>
            <button type="button" class="col-2 show-number button py-1">
              اظهار
            </button>
          </div>
        </div>
  `
  return item
}