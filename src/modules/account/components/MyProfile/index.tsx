"use client";
import React, { PropsWithChildren } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { format, subMonths } from "date-fns";

import InputField from "@/core/components/FormField/InputField";
import Button from "@/core/components/Button";
import { useAuth } from "@/auth/hooks/useAuth";
import useTranslations from "@/core/hooks/useTranslations";
import { RESOLVED } from "@/core/constants/states";
import { TranslateType } from "@/core/providers/TranslationProvider";
import useHeaders from "@/core/hooks/useHeaders";
import { publicAxios } from "@/core/utils/axios";
import toastAlert from "@/core/utils/toast";
import Modal from "@/core/components/Modal";
import PhoneField from "@/core/components/FormField/PhoneField";

import { ContactInfoWrap, StyledDiv, UpdatedProfileFormWrap } from "./style";

const updateProfileSchema = (_t: TranslateType) =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .required(`${_t("email", "Email")} ${_t("is_required", "is_required")}`),
    phone: Yup.string(),
    first_name: Yup.string().required(
      `${_t("first_name", "First Name")} ${_t("is_required", "is_required")}`
    ),
    last_name: Yup.string().required(
      `${_t("last_name", "Last Name")} ${_t("is_required", "is_required")}`
    ),
    dob: Yup.date()
      .required(`${_t("dob", "Dob")} ${_t("is_required", "is_required")}`)
      .max(
        format(subMonths(new Date(), 6), "yyyy-MM-dd"),
        `${_t("dob_must_be_a_date_before", "Dob must be a date before")}  ${format(subMonths(new Date(), 6), "yyyy-MM-dd")}`
      ),
  });

const updatePasswordSchema = (_t: TranslateType) =>
  Yup.object().shape({
    password: Yup.string()
      .min(
        6,
        `${_t("password_must_be_at_least_6_characters", "Password must be at least 6 characters")}`
      )
      .required(
        `${_t("password", "Password")} ${_t("is_required", "is_required")}`
      ),
    password_confirmation: Yup.string().when("password", {
      is: (val: string) => !!(val && val.length > 0),
      then: Yup.string()
        .required(
          `${_t("confirmation_password_is_required", "Confirmation Password is required")}`
        )
        .oneOf(
          [Yup.ref("password")],
          `${_t("password_don't_match", "Passwords don't match")}`
        ),
    }),
    old_password: Yup.string().required(
      `${_t("old_password", "Old Password")} ${_t("is_required", "is_required")}`
    ),
  });

type ProfileFormType = {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  dob: string;
};

type PasswordFormType = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

const MyProfile = ({ children }: PropsWithChildren) => {
  const { user, status } = useAuth();
  const { _t } = useTranslations();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenUpdatePassword, setIsOpenUpdatePassword] = React.useState(false);

  const formInitialValue =
    status === RESOLVED && user
      ? {
          email: user.email,
          phone: user.customer?.phone || "",
          first_name: user.first_name,
          last_name: user.last_name,
          dob: user.customer?.dob
            ? format(new Date(user.customer?.dob), "yyyy-MM-dd")
            : "",
        }
      : null;

  const passwordFormInitialValue =
    status === RESOLVED && user
      ? {
          email: user.email,
          phone: user.customer?.phone || "",
          first_name: user.first_name,
          last_name: user.last_name,
          dob: user.customer?.dob
            ? format(new Date(user.customer?.dob), "yyyy-MM-dd")
            : "",
          old_password: "",
          password: "",
          password_confirmation: "",
        }
      : null;

  return (
    <>
      <StyledDiv>
        <ContactInfoWrap className="contact-info-wrap">
          <div className="contact-info-wrap">
            <div className="contact-info-title">
              <h2 className="h6 ">
                <strong>
                  {_t("contact_information", "Contact Information")}
                </strong>
              </h2>
            </div>
            <div className="contact-info-item">
              <span className="info-title">{_t("name", "Name")}:</span>
              <span className="info-content">{user?.full_name}</span>
            </div>
            <div className="contact-info-item">
              <span className="info-title">{_t("email", "Email")}:</span>
              <span className="info-content">{user?.email}</span>
            </div>
            <div className="contact-info-item">
              <span className="info-title">{_t("dob", "Dob")}:</span>
              <span className="info-content">{user?.customer?.dob || "-"}</span>
            </div>
            <div className="contact-info-item">
              <span className="info-title">{_t("telephone", "Phone")}:</span>
              <span className="info-content">
                {user?.customer?.phone || "N/A"}
              </span>
            </div>
          </div>

          <div className="btn-wrapper">
            <Button
              skin="body"
              variant="transparent"
              asSelfLink
              onClick={() => setIsOpen(!isOpen)}
            >
              {_t("edit", "Edit")}
            </Button>

            <Button
              skin="body"
              variant="transparent"
              asSelfLink
              onClick={() => setIsOpenUpdatePassword(!isOpenUpdatePassword)}
            >
              {_t("update_password", "Update Password")}
            </Button>
          </div>
        </ContactInfoWrap>

        {children}
      </StyledDiv>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={_t("edit_profile", "Edit Profile")}
      >
        <div className="edit-modal">
          <UpdateProfileForm
            values={formInitialValue}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </Modal>

      <Modal
        open={isOpenUpdatePassword}
        onClose={() => setIsOpenUpdatePassword(false)}
        title={_t("update_password", "Update Password")}
        maxWidth="400px"
      >
        <div className="edit-modal">
          <UpdatePasswordForm
            values={passwordFormInitialValue}
            onClose={() => setIsOpenUpdatePassword(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export const UpdateProfileForm = ({
  values,
  onClose,
}: {
  values: ProfileFormType | null;
  onClose: () => void;
}) => {
  const [loading, setLoading] = React.useState(false);

  const { setUser } = useAuth();
  const { clientHeaders } = useHeaders();
  const { _t } = useTranslations();

  const profileSchema = updateProfileSchema(_t);

  const formik = useFormik({
    initialValues: values || {
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      dob: "",
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    async onSubmit(values) {
      try {
        setLoading(true);
        await publicAxios.put("/sf/customer/auth/profile", values, {
          headers: clientHeaders,
        });
        setUser((p) =>
          p
            ? {
                ...p,
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                full_name: [values.first_name, values.last_name].join(" "),
                customer: p.customer
                  ? { ...p.customer, dob: values.dob, phone: values.phone }
                  : p.customer,
              }
            : p
        );
        toastAlert("Profile Updated Successfully", "success");
        onClose();
      } catch {
        toastAlert("Unable to Update Profile", "custom-error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <UpdatedProfileFormWrap>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="col-half">
              <InputField
                name="email"
                label={_t("email", "Email")}
                // value={user?.email}
                placeholder={_t("email", "Email")}
                value={formik.values.email}
                errorMsg={formik.errors.email}
                touched={formik.touched.email}
                error={Boolean(formik.errors.email)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-half">
              <PhoneField
                label={_t("phone_number", "Phone Number")}
                placeholder={_t("phone_number", "Phone Number")}
                errorMsg={formik.errors?.phone}
                touched={formik.touched?.phone}
                error={Boolean(formik.errors.phone)}
                value={formik.values.phone}
                onBlur={() => formik.setFieldTouched("phone", true)}
                onChange={(value) => formik.setFieldValue("phone", value)}
              />
            </div>
            <div className="col-half">
              <InputField
                name="first_name"
                label={_t("first_name", "First Name")}
                placeholder={_t("first_name", "First Name")}
                value={formik.values.first_name}
                errorMsg={formik.errors.first_name}
                touched={formik.touched.first_name}
                error={Boolean(formik.errors.first_name)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-half">
              <InputField
                name="last_name"
                label={_t("last_name", "Last Name")}
                placeholder={_t("last_name", "Last Name")}
                value={formik.values.last_name}
                errorMsg={formik.errors.last_name}
                touched={formik.touched.last_name}
                error={Boolean(formik.errors.last_name)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-half">
              <InputField
                name="dob"
                type="date"
                label={_t("dob", "Dob")}
                placeholder={_t("dob", "Dob")}
                value={formik.values.dob}
                errorMsg={formik.errors.dob}
                touched={formik.touched.dob}
                error={Boolean(formik.errors.dob)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-full btn-wrapper">
              <Button
                className="btn ml-auto"
                type="submit"
                variant="contained"
                skin="primary"
                size="lg"
                isLoading={loading}
                disabled={!formik.dirty}
              >
                {_t("update_details", "Update Details")}
              </Button>
            </div>
          </div>
        </form>
      </UpdatedProfileFormWrap>
    </>
  );
};

export const UpdatePasswordForm = ({
  values,
  onClose,
}: {
  values: PasswordFormType | null;
  onClose: () => void;
}) => {
  const [loading, setLoading] = React.useState(false);

  const { clientHeaders } = useHeaders();
  const { _t } = useTranslations();

  const passwordSchema = updatePasswordSchema(_t);

  const formik = useFormik({
    initialValues: values || {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    enableReinitialize: true,
    validationSchema: passwordSchema,
    async onSubmit(values) {
      try {
        setLoading(true);
        await publicAxios
          .put("/sf/customer/auth/profile", values, {
            headers: clientHeaders,
          })
          .then(() => {
            toastAlert("Password Updated Successfully", "success");
            onClose();
          })
          .catch((err) => {
            if (err?.response?.data?.message) {
              formik.setErrors(err.response.data.message);
            }
          });
      } catch {
        toastAlert("Unable to Update Password", "custom-error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <UpdatedProfileFormWrap>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="col-full">
              <InputField
                name="old_password"
                type="password"
                value={formik.values.old_password}
                label={_t("old_password", "Old Password")}
                placeholder={_t("old_password", "Old Password")}
                error={Boolean(formik.errors.old_password)}
                errorMsg={formik.errors.old_password}
                touched={formik.touched.old_password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-full">
              <InputField
                name="password"
                type="password"
                value={formik.values.password}
                label={_t("new_password", "New Password")}
                placeholder={_t("new_password", "New Password")}
                error={Boolean(formik.errors.password)}
                errorMsg={formik.errors.password}
                touched={formik.touched.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-full">
              <InputField
                name="password_confirmation"
                type="password"
                value={formik.values.password_confirmation}
                label={_t("password_confirmation", "Password Confirmation")}
                placeholder={_t(
                  "password_confirmation",
                  "Password Confirmation"
                )}
                error={Boolean(formik.errors.password_confirmation)}
                errorMsg={formik.errors.password_confirmation}
                touched={formik.touched.password_confirmation}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-full btn-wrapper">
            <Button
              className="btn ml-auto"
              type="submit"
              variant="contained"
              skin="primary"
              size="lg"
              isLoading={loading}
              disabled={!formik.dirty}
            >
              {_t("update_password", "Update Password")}
            </Button>
          </div>
        </form>
      </UpdatedProfileFormWrap>
    </>
  );
};

export default MyProfile;
