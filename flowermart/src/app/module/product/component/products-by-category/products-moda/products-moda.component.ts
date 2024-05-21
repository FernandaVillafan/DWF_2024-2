import { Component } from '@angular/core';
import { SwalMessages } from '../../../../commons/_dto/swal-messages';
import { ProductService } from '../../../_service/product.service';
import { DtoProductList } from '../../../_dto/dto-product-list';
import { Router } from '@angular/router';
import { ProductImage } from '../../../_model/product/product-image';
import { ProductImageService } from '../../../_service/product-image.service';

declare var $: any; // JQuery

@Component({
  selector: 'app-products-moda',
  templateUrl: './products-moda.component.html',
  styleUrl: './products-moda.component.css'
})
export class ProductsModaComponent {
  products: DtoProductList[] = []; // product list

  images: { [key: number]: ProductImage[] } = {};

  swal: SwalMessages = new SwalMessages(); // swal messages

  categoria : number = 2; // Categoria moda

  constructor(
    private router: Router,
    private productService: ProductService,
    private productImageService: ProductImageService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.body!.filter(product => product.category_id === this.categoria);
        this.products.forEach(product => this.getProductImages(product.product_id));
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  getProductImages(product_id: number) {
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        this.images[product_id] = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  navigateToView(gtin: string) {
    if (gtin) {
      this.router.navigate(['/product/', gtin]);
    } else {
      this.swal.errorMessage("No hay información de producto para mostrar.");
    }
  }
}

