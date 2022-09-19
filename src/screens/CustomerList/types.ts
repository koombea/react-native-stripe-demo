export interface Customer {
  id: string
  object: string;
  address: string;
  balance: number;
  created: number;
  currency: string;
  default_source: string;
  delinquent: boolean;
  description: string;
  discount: string;
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: string;
    default_payment_method: string;
    footer: string;
    rendering_options: string;
  }
  livemode: boolean;
  metadata: object;
  name: string;
  next_invoice_sequence: number;
  phone: string;
  preferred_locales: string[];
  shipping: string;
  tax_exempt: string;
  test_clock: string;
}

export interface CustomerData {
  customers: {
    data: Customer[];
  };
}