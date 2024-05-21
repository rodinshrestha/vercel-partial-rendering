export type PermissionList = Array<string>;

export type Role = {
  /** Role created date */
  created_at: string;

  /** Role id */
  id: string;

  /** Role name */
  name: string;

  /** Role permission list: Array */
  permissions: PermissionList;

  /** Role indentifier; slug  */
  slug: string;
};

type OrganizationUser = {
  /** Organization Address 1 */
  address_line_1: string;

  /** Organization Address 2 */
  address_line_2: string;

  /** Organization country code */
  country_code: string;

  /** Organization created */
  created_at: string;

  /** Organization id */
  id: string;

  /** Organization phone number */
  phone: string;

  /** Orgnazation role */
  role: Role;
};

export type ProfileUser = {
  /** User Created date */
  created_at: string;

  /** User created date in readable format */
  created_at_human: string;

  /** User email */
  email: string;

  /** User first name */
  first_name: string;

  /** User gravatar image */
  gravatar: string;

  /** User unique id */
  id: string;

  /** User last name */
  last_name: string;

  /** User middle name */
  middle_name: string;

  /** User full name */
  name: string;

  /** User status, active or inactive */
  status: number;

  /** User given role */
  role: Role;

  /** User given orgnaization  */
  organizationUser: OrganizationUser;

  /** User pricing */
  pricing: 'recommended_price' | 'wholesale_price' | 'both' | null;

  full_name: string;

  customer?: {
    /**phone no of customer */
    phone_number?: string;

    /**Phone number */
    phone: string;

    /**Post number of customer */
    post_number?: string;

    /**place of customer */
    place?: string;

    /**address of customer */
    address?: string;

    dob?: string;

    /** Customer group */
    customer_group: {
      code: string;
    };
  };
};

export type AddressType = {
  created_at: string;
  id: string;
  customer_id: string;
  address_line_1: string;
  address_line_2: string;
  channel_id: string;
  country_code: string;
  region_id: string | null;
  city_id: string | null;
  postal_code: string;
  phone: string;
  region_name: string;
  city_name: string;
  default_billing_address: number;
  default_shipping_address: number;
};
