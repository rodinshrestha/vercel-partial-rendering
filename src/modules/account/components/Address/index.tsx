'use client';

import React from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import useTranslations from '@/core/hooks/useTranslations';
import useHeaders from '@/core/hooks/useHeaders';
import { publicAxios } from '@/core/utils/axios';
import toastAlert from '@/core/utils/toast';
import InputField from '@/core/components/FormField/InputField';
import Button from '@/core/components/Button';
import useResolver from '@/core/hooks/useResolver';
import { AddressType } from '@/auth/types/user.types';
import CheckBox from '@/core/components/FormField/CheckBox';
import { CountriesTypes } from '@/checkout/types/checkout.types';
import SelectField from '@/core/components/FormField/SelectField';
import { formatWithDynamicKey } from '@/core/utils/format';

import { AddressFormWrap, AddressWrap } from './style';

enum UserAddress {
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING',
}

type Props = {
  billing: AddressType | null;
  countries: Array<CountriesTypes>;
  shipping: AddressType | null;
  isSame: boolean;
};

type AddressFrom = {
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  country_code: string;
  region_id: null | string;
  city_id: null | string;
  // region_name: string;
  city_name: string;
  default_billing_address: number;
  default_shipping_address: number;
  isSame: boolean;
};

const Address = ({ shipping, countries, isSame }: Props) => {
  const { _t } = useTranslations();

  const shippingInitialValue: AddressFrom | null = shipping
    ? {
        address_line_1: shipping.address_line_1,
        address_line_2: shipping.address_line_2,
        city_id: shipping.city_id,
        city_name: shipping.city_name,
        country_code: shipping.country_code,
        default_shipping_address: shipping.default_shipping_address,
        default_billing_address: isSame ? 1 : 0,
        postal_code: shipping.postal_code,
        region_id: shipping.region_id,
        // region_name: shipping.region_name,
        isSame: false,
      }
    : null;

  // const billingInitialValue: AddressFrom | null = billing
  //   ? {
  //       address_line_1: billing.address_line_1,
  //       address_line_2: billing.address_line_2,
  //       city_id: billing.city_id,
  //       city_name: billing.city_name,
  //       country_code: billing.country_code,
  //       default_shipping_address: 0,
  //       default_billing_address: billing.default_billing_address,
  //       postal_code: billing.postal_code,
  //       region_id: billing.region_id,
  //       region_name: billing.region_name,
  //       isSame: isSame,
  //     }
  //   : null;

  return (
    <AddressWrap>
      <AddressForm
        formTitle={_t('shipping_address', 'Shipping Address')}
        values={shippingInitialValue}
        type={UserAddress.SHIPPING}
        current={shipping}
        countries={countries}
      />

      {/* <AddressForm
        className="billing-form"
        formTitle={_t('billing_address', 'Billing Address')}
        values={billingInitialValue}
        type={UserAddress.BILLING}
        current={billing}
        currentShipping={shipping}
        countries={countries}
      /> */}
    </AddressWrap>
  );
};

export const AddressForm = ({
  values,
  type,
  countries,
  current,
  currentShipping,
  formTitle,
  className,
}: {
  className?: string;
  values: AddressFrom | null;
  type: UserAddress;
  countries: Array<CountriesTypes>;
  current: AddressType | null;
  currentShipping?: AddressType | null;
  formTitle?: string;
}) => {
  const [loading, setLoading] = React.useState(false);
  // const [sameAsShipping, setSameAsShipping] = React.useState(isSame || false);

  const { clientHeaders } = useHeaders();
  const { _t } = useTranslations();
  const data = useResolver();
  const router = useRouter();

  const formik = useFormik<AddressFrom>({
    initialValues: values || {
      address_line_1: '',
      address_line_2: '',
      city_id: null,
      city_name: '',
      country_code: '',
      default_billing_address: 0,
      default_shipping_address: 0,
      postal_code: '',
      region_id: null,
      // region_name: '',
      isSame: false,
    },
    enableReinitialize: true,
    async onSubmit(formValues) {
      // If same is choosed
      // If current is not available then use currentShipping for billing
      const existingAddress = formValues.isSame ? currentShipping : current;
      const create = !existingAddress;

      const defaultAddress =
        type === UserAddress.SHIPPING
          ? {
              default_shipping_address: 1,
            }
          : {
              default_billing_address: 1,
            };

      const previouslyBillingSameAsShipping =
        current && currentShipping && !formValues.isSame
          ? current.id === currentShipping.id
          : false;

      const xHttpObject =
        create || previouslyBillingSameAsShipping
          ? {
              url: '/sf/customer/addresses',
              data: {
                ...formValues,
                ...defaultAddress,
              },
            }
          : {
              url: `/sf/customer/addresses/${existingAddress.id}`,
              method: 'PUT',
              data: formValues.isSame
                ? {
                    address_line_1: existingAddress.address_line_1,
                    address_line_2: existingAddress.address_line_2,
                    city_id: existingAddress.city_id,
                    city_name: existingAddress.city_name,
                    country_code: existingAddress.country_code,
                    default_billing_address:
                      existingAddress.default_billing_address,
                    default_shipping_address:
                      existingAddress.default_shipping_address,
                    postal_code: existingAddress.postal_code,
                    region_id: existingAddress.region_id,
                    region_name: existingAddress.region_name,
                    ...defaultAddress,
                  }
                : { ...formValues, ...defaultAddress },
            };

      try {
        setLoading(true);
        await publicAxios({
          url: xHttpObject.url,
          method: xHttpObject.method || 'POST',
          headers: clientHeaders,
          data: {
            ...xHttpObject.data,
            channel_id: data.channel?.id,
          },
        });

        toastAlert('Address Updated Successfully', 'success');
        router.refresh();
      } catch {
        toastAlert('Unable to Update Address', 'custom-error');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('isSame', e.target.checked);
  };

  // if (isSame) {
  //   return (
  //     <CheckBox
  //       id="sameAsShipping"
  //       name="same"
  //       onChange={handleCheck}
  //       label="Same as Shipping Address"
  //       checked={sameAsShipping}
  //     />
  //   );
  // }

  return (
    <AddressFormWrap className={className}>
      <div className="form-title">
        <h6>
          <strong>{formTitle}</strong>
        </h6>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          {type === UserAddress.BILLING && Boolean(currentShipping) && (
            <div className="col-full mb-35">
              <CheckBox
                id="sameAsShipping"
                name="same"
                onChange={handleCheck}
                label="Same as Shipping Address"
                checked={formik.values.isSame}
              />
            </div>
          )}
          {Boolean(!formik.values.isSame) && (
            <>
              <div className="col-half">
                <SelectField
                  name="shipping.country_code"
                  label={_t('country', 'Country')}
                  options={
                    countries.length
                      ? formatWithDynamicKey(countries, {
                          label: 'name',
                          value: 'iso_2_code',
                        })
                      : []
                  }
                  className="select-shiping"
                  value={formik.values.country_code}
                  onChange={(e) => {
                    formik.setFieldValue('country_code', e.value);
                  }}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.country_code}
                  placeholder={_t('select_country', 'Select Country')}
                  error={Boolean(formik.errors.country_code)}
                  errorMsg={formik.errors.country_code}
                  disabled={!countries.length}
                />
                {/* <InputField
                  name="country_code"
                  label={_t('input_country', 'Country')}
                  placeholder={_t('input_country', 'Country')}
                  value={formik.values.country_code}
                  errorMsg={formik.errors.country_code}
                  touched={formik.touched.country_code}
                  error={Boolean(formik.errors.country_code)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                /> */}
              </div>
              <div className="col-half">
                <InputField
                  name="city_name"
                  label={_t('input_cityname', 'City Name')}
                  placeholder={_t('input_cityname', 'City Name')}
                  type="text"
                  value={formik.values.city_name}
                  errorMsg={formik.errors.city_name}
                  touched={formik.touched.city_name}
                  error={Boolean(formik.errors.city_name)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              {/* <div className="col-half">
                <InputField
                  name="region_name"
                  label={_t('input_region_name', 'Region Name')}
                  placeholder={_t('input_cityname', 'City Name')}
                  value={formik.values.region_name}
                  errorMsg={formik.errors.region_name}
                  touched={formik.touched.region_name}
                  error={Boolean(formik.errors.region_name)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div> */}
              <div className="col-half">
                <InputField
                  name="address_line_1"
                  label={_t('input_address_line_1', 'Address Line 1')}
                  placeholder={_t('input_cityname', 'City Name')}
                  value={formik.values.address_line_1}
                  errorMsg={formik.errors.address_line_1}
                  touched={formik.touched.address_line_1}
                  error={Boolean(formik.errors.address_line_1)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-half">
                <InputField
                  name="address_line_2"
                  label={_t('input_address_line_2', 'Address Line 2')}
                  placeholder={_t('input_address_line_2', 'Address Line 2')}
                  value={formik.values.address_line_2}
                  errorMsg={formik.errors.address_line_2}
                  touched={formik.touched.address_line_2}
                  error={Boolean(formik.errors.address_line_2)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-full">
                <InputField
                  name="postal_code"
                  label={_t('input_postal_code', 'Postal Code')}
                  placeholder={_t('input_postal_code', 'Postal Code')}
                  value={formik.values.postal_code}
                  errorMsg={formik.errors.postal_code}
                  touched={formik.touched.postal_code}
                  error={Boolean(formik.errors.postal_code)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
            </>
          )}
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
              {values
                ? _t('update_details', 'Update Details')
                : _t('save_details', 'Save Details')}
            </Button>
          </div>
        </div>
      </form>
    </AddressFormWrap>
  );
};

export default Address;
