import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Customer } from '../../../customer/_model/customer/customer';
import { CustomerService } from '../../../customer/_service/customer.service';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { InvoiceService } from '../../_service/invoice.service';
import { jsPDF } from 'jspdf';
import { Product } from '../../../product/_model/product/product';
import { ProductService } from '../../../product/_service/product.service';
import Swal from 'sweetalert2';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any; // JQuery

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})

export class InvoiceDetailsComponent {

  invoice: any | DtoInvoiceList = new DtoInvoiceList();
  invoice_id: any | number = 0;

  customer: Customer = new Customer();
  rfc: any | number = 0;

  products: { [key: string]: Product } = {};

  randStr: string = this.generateRandomStr();

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState && navigationState.customer) {
      this.rfc = navigationState.customer.rfc;
      this.getCustomer();
    } else {
      console.error('Los datos de la factura y/o cliente no están disponibles');
      this.swal.errorMessage('¡Los datos son inválidos para realizar la factura!');
    }

    this.invoice_id = this.route.snapshot.paramMap.get('id');
    if (this.invoice_id) {
      this.getInvoice();
    } else {
      this.swal.errorMessage("Factura Inexistente!");
    }
  }

  getInvoice() {
    this.invoiceService.getInvoice(this.invoice_id).subscribe({
      next: (v) => {
        this.invoice = v.body!;
        this.invoice.items.forEach((item: any) => {
          this.getProduct(item.gtin);
        });
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  downloadInvoice() {
    Swal.fire({
      imageUrl: 'assets/images/loading.gif',
      imageWidth: 350,
      imageHeight: 200,
      imageAlt: 'loading icon',
      background: '#ecf0ef',
      color: '#013a55',
      title: "Realizando la descarga de la factura...",
      text: "Espera un momento",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false
    });

    setTimeout(() => {
      this.swal.successMessage('¡Descarga realizada exitosamente!');
      const doc = new jsPDF();

      // Agregamos el contenido de la factura al PDF
      const invoiceElement = document.querySelector('.card.principal') as HTMLElement;
      if (invoiceElement) {
        doc.html(invoiceElement, {
          callback: (doc) => {
            // Guardamos el PDF
            doc.save('flowermart-factura.pdf');
          },
          x: 10,
          y: 10,
          width: 190,
          windowWidth: 650
        });
      }

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    }, 4000);
  }

  generateRandomStr() {
    const abc: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result: string = '';
  
    for (let i: number = 0; i < 8; i++) {
      const randIndex: number = Math.floor(Math.random() * abc.length);
      result += abc.charAt(randIndex);
    }
  
    return result;
  }

  redirect() {
    this.router.navigate(["customer/" + this.customer.rfc + "/buyings"]);
  }

  // Customer 

  getCustomer() {
    this.customerService.getCustomer(this.rfc).subscribe({
      next: (v) => {
        this.customer = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // Product 

  getProduct(gtin: string) {
    this.productService.getProduct(gtin).subscribe({
      next: (v) => {
        this.products[gtin] = v.body!;
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}