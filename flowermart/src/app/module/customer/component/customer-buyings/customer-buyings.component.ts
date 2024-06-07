import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Customer } from '../../_model/customer/customer';
import { CustomerService } from '../../_service/customer.service';
import { Invoice } from '../../../invoice/_model/invoice';
import { InvoiceService } from '../../../invoice/_service/invoice.service';
import { PagingConfig } from '../../../commons/_models/paging-config';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any; // JQuery

@Component({
  selector: 'app-customer-buyings',
  templateUrl: './customer-buyings.component.html',
  styleUrl: './customer-buyings.component.css'
})

export class CustomerBuyingsComponent {

  customer: any | Customer = new Customer();
  rfc: any | string = "";

  invoices: Invoice[] = []; // Invoice list

  page: number | Event = 1;

  swal: SwalMessages = new SwalMessages(); // swal messages

  customerData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
  ) { }

  currentPage: number  = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if (this.rfc) {
      this.getCustomerDetail();
      this.getInvoices();
    } else {
      this.swal.errorMessage("¡Cliente Inexistente!");
    }

    this.pageConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  showInvoiceDetails(invoice_id: number) {
    if (this.customerData && this.customerData.rfc) {
      this.router.navigate(['invoice/' + invoice_id], { state: { customer: this.customerData } });
    } else {
      console.error("No hay facturas o los datos del cliente son nulos o inválidos");
    }
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }

  // Customer 

  getCustomerDetail() {
    this.customerService.getCustomerDetail().subscribe({
      next: (v) => {
        this.customer = v.body!;
        this.rfc = this.customer.rfc;

        this.customerData = {
          rfc: this.customer.rfc,
        };
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // Invoice

  getInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}