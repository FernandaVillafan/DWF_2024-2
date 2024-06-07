import { Item } from "../_model/item";

export class DtoInvoiceList {
    
    invoice_id: number = 0;
    rfc: string = "";
    subtotal: number = 0;
    total: number = 0;
    taxes: number = 0;
    created_at: Date = new Date();
    status: number = 0;
    items: Item[] = [];
}