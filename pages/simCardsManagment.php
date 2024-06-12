<!DOCTYPE html>
<html lang="en" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta اسم الخط="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../assets/css/all.css" />
    <link rel="stylesheet" href="../assets/css/aos.css" />
    <link rel="stylesheet" href="../assets/css/bootstrap.css" />
    <link rel="stylesheet" href="../assets/css/sharp-light.css" />
    <link rel="stylesheet" href="../assets/css/sharp-regular.css" />
    <link rel="stylesheet" href="../assets/css/sharp-solid.css" />
    <link rel="stylesheet" href="../assets/css/sharp-thin.css" />
    <link rel="stylesheet" href="../assets/css/sweetalert2.css" />
    <link rel="stylesheet" href="../assets/css/simCardsManagment.css" />
    <title>Document</title>
  </head>
  <body>
    <header class="header py-2 col-12 d-flex px-3 justify-content-between align-items-center">
      <div class="logoAndName d-flex align-items-center">
        <div class="logo"><img src="../assets/imgs/logo.png" alt="" /></div>
        <div class="name fs-5 py-2 me-3 d-none d-md-block">
          إدارة فودافون كاش
        </div>
      </div>
      <div class="name fs-4" style="color:var(--titles-color)">صفحة الخطوط</div>
      <div class="profile">
        <div class="img">
          <img src="../assets/imgs/profile.jpg" alt="" />
        </div>
      </div>
    </header>

    <section
      class="simCardsShowAndEdit d-flex flex-column align-items-center col-12 px-2 mt-4"
    >
      <div class="simAdder col-12 d-flex flex-column align-items-center mt-3">
        <div class="simAdderTitle col-12 text-center fs-5" style="color:var(--titles-color)">
          اضافة خط
        </div>
        <form
          class="col-11 col-md-8 col-lg-7 mt-2 d-flex flex-column align-items-center flex-lg-row justify-content-lg-center gap-2"
        >
          <input type="text" placeholder="ادخل الرقم" class="col-12 col-lg-4" />
          <input type="text" placeholder="ادخل الاسم" class="col-12 col-lg-4" />
          <input type="text" value="any" placeholder="ادخل الاسم" class="col-12 col-lg-0 d-none" />
          <button type="button" class="col-12 col-lg-2">
            اضافه <i class="fa-light fa-square-plus"></i>
          </button>
        </form>
      </div>

      <div class="allCards col-12 d-flex flex-column align-items-center mt-5">
        <table class="table">
          <thead>
            <tr>
              <th>الرقم</th>
              <th>اسم الخط</th>
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div
          class="edit-main col-12 d-none justify-content-center align-items-center"
        >
          <div class="edit-main-box col-10 col-md-7 col-lg-5 px-3 py-2">
            <div class="sim-card-edit-title text-white text-center fs-5">
              تعديل على الخط
            </div>
            <div class="editing-form col-12 d-block px-2 py-3">
              <label for="num">الرقم : </label>
              <input type="text" id="num" />
              <label for="name">الاسم : </label>
              <input type="text" id="name" class="d-none"/>
              <label for="money" class="d-none">الرصيد : </label>
              <input type="text" id="money"  /><button class="upd">تحديث</button><button class="cls me-2">اغلاق</button>
            </div>
          </div>
        </div>
      </div>

      <div class="options col-12 d-flex justify-content-around flex-wrap">
        <button class="option delAll col-11 col-md-5 col-lg-2 mt-2">حذف الكل</button>
        <button class="option downExcel col-11 col-md-5 col-lg-2 mt-2">تحميل ملف اكسل</button>
        <button class="option pdf col-11 col-md-5 col-lg-2 mt-2">تحميل ملف pdf</button>
        <button class="option csv col-11 col-md-5 col-lg-2 mt-2"> تحميل ملف csv</button>
      </div>
    </section>
    <script src="../assets/js/bootstrap.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/popper-bootstrap.js"></script>
    <script src="../assets/js/tools/sweetalert2.js"></script>
    <script src="../assets/js/tools/sheet.js"></script>
    <script src="../assets/js/tools/html2pdf.bundle.min.js"></script>
    <script src="../assets/js/simCarsManagment.js"></script>
  </body>
</html>
