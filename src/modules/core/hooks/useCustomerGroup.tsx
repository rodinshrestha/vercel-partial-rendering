import { useAuth } from '@/auth/hooks/useAuth';

import useResolver from './useResolver';

const useCustomerGroup = () => {
  const { user } = useAuth();
  const { customer_group } = useResolver();

  /**
   * Get the customer group id
   * From resolver
   */

  const getCurrentCustomerGroupCode = () => {
    if (user) {
      return customer_group?.member.code || '';
    }

    return customer_group?.default.code || '';
  };

  return { customerGroupCode: getCurrentCustomerGroupCode() };
};

export default useCustomerGroup;
