const SchemeModels = require("./scheme-model");

/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params;

  SchemeModels.findById(scheme_id)
    .then((response) => {
      if (response) {
        next();
      } else {
        next({
          status: 404,
          message: `scheme_id ${scheme_id} id li şema bulunamadı`,
        });
      }
    })
    .catch((err) => {
      next({ status: 500, message: `database error` });
    });
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  req.body["scheme_name"] && typeof req.body["scheme_name"] === "string"
    ? next()
    : next({ status: 400, message: `Geçersiz scheme_name` });
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  req.body["instructions"] &&
  typeof req.body["instructions"] === "string" &&
  req.body["step_number"] &&
  req.body["step_number"] >= 1 &&
  typeof req.body["step_number"] === "number"
    ? next()
    : next({ status: 400, message: "Hatalı step" });
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
