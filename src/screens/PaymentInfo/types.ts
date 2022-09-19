export interface PaymentMethod {
  id: string;
  object: string;
  billing_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string
    };
    email: string;
    name: string;
    phone: string
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: string;
      address_postal_code_check: string;
      cvc_check: string;
    };
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string;
    last4: number;
    networks: {
      available: string[];
      preferred: string
    };
    three_d_secure_usage: {
      supported: boolean
    };
    wallet: object
  };
  created: number;
  customer: string;
  livemode: boolean;
  metadata: object;
  redaction: string;
  type: string;
}

export interface PaymentMethodData {
  paymentMethods: {
    data: PaymentMethod[];
  }
}