import { format, subMonths } from "date-fns";
import * as Yup from "yup";

import { TranslateType } from "@/core/providers/TranslationProvider";

export const registerSchema = (_t: TranslateType) =>
  Yup.object().shape({
    first_name: Yup.string().required(
      `${_t("first_name", "First Name")} ${_t("is_required", "is required")}`
    ),
    last_name: Yup.string().required(
      `${_t("last_name", "Last Name")} ${_t("is_required", "is required")}`
    ),
    dob: Yup.date()
      .required(`${_t("dob", "Dob")} ${_t("is_required", "is required")}`)
      .max(
        format(subMonths(new Date(), 6), "yyyy-MM-dd"),
        `${_t("dob", "Dob")} must be a date before ${format(
          subMonths(new Date(), 6),
          "yyyy-MM-dd"
        )}`
      ),
    phone: Yup.string().required(
      `${_t("input_phone", "Phone")} ${_t("is_required", "is required")}`
    ),
    terms: Yup.boolean()
      .required(
        _t(
          "the_terms_&_conditions_must_be_accepted",
          "The terms & conditions must be Accepted"
        )
      )
      .oneOf(
        [true],
        _t(
          "the_terms_&_conditions_must_be_accepted",
          "The terms & conditions must be Accepted"
        )
      ),
    email: Yup.string()
      .email()
      .label(_t("email", "Email"))
      .required(`${_t("email", "Email")} ${_t("is_required", "is required")}`),
    password: Yup.string()
      .required(
        `${_t("input_password", "Password")} ${_t(
          "is_required",
          "is required"
        )}`
      )
      .min(
        6,
        _t("password_min_length", "Password must be at Least 6 Character")
      ),
    confirm_password: Yup.string()
      .required(
        `${_t("input_confirm", "Confirm Password")} ${_t(
          "is_required",
          "is required"
        )}`
      )
      .oneOf(
        [Yup.ref("password"), null],
        _t("password_match", "Password must Match")
      ),
  });
