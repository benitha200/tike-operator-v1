export interface User {
    id: string;
    fullname: string;
    identifier: string;
    role: string;
    operator: OperatorDetails | null;
}

export interface OperatorDetails {
    id: string;
    code: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
    tin: string | null;
    tax_inclusive: boolean;
    representative_name: string;
    representative_phone: string;
    representative_email: string | null;
    support_phone: string;
    support_email: string | null;
}
