import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { ProductService } from '../../_service/product.service';
import { DtoProductList } from '../../_dto/dto-product-list';
import { Category } from '../../_model/category/category';
import { CategoryService } from '../../_service/category.service';
import { Router } from '@angular/router';

declare var $: any; // JQuery

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {

  products: DtoProductList[] = []; // product list

  categories: Category[] = []; // category list

  // Product form
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  });

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getActiveCategories();
  }

  onSubmit() {
    // validate form
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProducts(); // reload products
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  disableProduct(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la desactivación del producto',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.disableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getProducts(); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableProduct(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación del producto',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.enableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getProducts(); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  } 

  showProductDetails(gtin: string) {
    this.router.navigate(['product/' + gtin]);
  }

  showModalForm() {
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  // Catalogues 

  getActiveCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}