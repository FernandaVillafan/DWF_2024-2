import { CartService } from '../../_service/cart.service';
import { Component } from '@angular/core';
import { Customer } from '../../../customer/_model/customer/customer';
import { CustomerService } from '../../../customer/_service/customer.service';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { PagingConfig } from '../../../commons/_models/paging-config';
import { Router } from '@angular/router';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {

  cart: DtoCartDetails[] = [];
  cartItemCount: number = 0;
  cartTotal: number = 0;

  customer: Customer = new Customer();
  rfc: any | string = "";

  page: number | Event = 1;

  swal: SwalMessages = new SwalMessages(); // Swal messages

  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private router: Router,
  ) { }

  currentPage: number  = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    this.getCart();

    this.pageConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cart = v.body!;
        this.getCartItemCount();
        this.calculateCartTotal();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  async deleteCart() {
    if (this.cart.length != 0) {
      const result = await this.swal.confirmMessage.fire({
        title: '¿Deseas vaciar tu carrito?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.cartService.deleteCart().subscribe({
            next: (v) => {
              this.swal.successMessage(v.body!.message); // show message
              this.getCart(); // reload cart
              window.location.reload();
            },
            error: (e) => {
              console.error(e);
              this.swal.errorMessage(e.error!.message); // show message
            }
          });
        }
      });
    }
  }

  async removeFromCart(product_id: number) {
    const result = await this.swal.confirmMessage.fire({
      title: '¿Deseas eliminar este producto de tu carrito?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(product_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCart(); // reload cart
            this.getCartItemCount();
            this.calculateCartTotal();
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getCartItemCount() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  calculateCartTotal() {
    this.cartTotal = this.cart.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  }

  redirect() {
    this.router.navigate(['buy/']);
  }

  // Customer 

  getCustomerDetail() {
    this.customerService.getCustomerDetail().subscribe({
      next: (v) => {
        this.customer = v.body!;
        this.rfc = this.customer.rfc;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }
}