export interface AbstractInterface {
  filterFields: Array<string>;
}

class AbstractFilter implements AbstractInterface {
  public filterFields: Array<string> = [];

  protected queryFilters = [];

  public compute() {
    const resolvedFields = this.filterFields.reduce((acc, field) => {
      return {
        ...acc,
        [field]: this[field as keyof AbstractInterface],
      };
    }, []);
    this.queryFilters = resolvedFields;
  }

  public mappedQueryFilters(query: any) {
    const mappedFilters = Object.entries(query).reduce((acc, iterator) => {
      const [key, value] = iterator;

      if (key in this.getFilterMap()) {
        if (!value) return acc;
        return { ...acc, [this.getFilterMap()[key as any]]: value };
      }

      return acc;
    }, {});

    return mappedFilters;
  }

  public getFilterMap() {
    return this.queryFilters;
  }

  public status = '__eq_status';

  public q = 'search';

  public email = '__like_email';

  public order_number = '__like_order_no';

  public invoice_order_number = '__like_order_number';

  public number = '__like_number';

  public reference = '__like_your_reference';

  public document_no = '__like_external_document_no';

  public sell_to_customer_name = '__like_sell_to_contact';

  public created_at = '__like_created_at';

  public increment_id = '__like_increment_id';
}

export default AbstractFilter;
