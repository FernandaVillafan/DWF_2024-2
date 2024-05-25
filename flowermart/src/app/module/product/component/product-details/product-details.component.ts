import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { ProductService } from '../../_service/product.service';
import { Product } from '../../_model/product/product';
import { ProductImage } from '../../_model/product/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { Category } from '../../_model/category/category';
import { CategoryService } from '../../_service/category.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any; // JQuery

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent {

  product: Product = new Product(); // product
  gtin: any | string = "";

  images: any | ProductImage[] = []; // product images

  category: any | Category = new Category();
  categories: Category[] = []; // category list

  quantity: number = 1; // quantity of a product

  activeImageIndex: number = 0; 

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
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private service: NgxPhotoEditorService,
  ) { }

  ngOnInit() {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if (this.gtin) {
      this.getProduct();
      this.getActiveCategories();
    } else {
      this.swal.errorMessage("Producto inexistente");
    }
  }

  onSubmit() {
    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message

        if (this.form.controls['gtin'].value != this.gtin) {
          this.gtin = this.form.controls['gtin'].value!;

          let currentURL = this.router.url.split("/");
          currentURL.pop();
          currentURL.push();

          this.redirect(currentURL);
        }

        this.getProduct();

        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProduct() {
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v.body!;
        this.getCategory(this.product.category_id);
        this.getProductImages(this.product.product_id);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateProduct() {
    this.form.reset();
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['description'].setValue(this.product.description);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

  getProductImages(product_id: number) {
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        this.images = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  uploadProductImage(image: string) {
    let productImage = new ProductImage();
    productImage.image = image;
    productImage.product_id = this.product.product_id;

    this.productImageService.uploadProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProductImages(this.product.product_id); // reload products
        this.activeImageIndex = 0;
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  updateQuantity(value: string): void {
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue >= 1) {
      this.quantity = parsedValue;
    }
  }

  incrementImageIndex() {  
    if (this.activeImageIndex === (this.images.length - 1)) {
      this.activeImageIndex = 0;
    } else {
      this.activeImageIndex++;
    }
  }

  decrementImageIndex() {
    if (this.activeImageIndex === 0) {
      this.activeImageIndex = (this.images.length - 1);
    } else {
      this.activeImageIndex--;
    }
  }

  deleteActiveImage() {
    if (this.images.length > 0 && this.activeImageIndex != null) {
      const imageToDelete = this.images[this.activeImageIndex];
      this.deleteProductImage(imageToDelete);
    }
  }

  deleteProductImage(productImage: ProductImage) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la eliminación de la imagen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productImageService.deleteProductImage(productImage.product_image_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message);
            this.getProductImages(productImage.product_id);
            this.activeImageIndex = 0;
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.uploadProductImage(data.base64!);
    });
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }

  showModalForm() {
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  // Category

  getCategory(category_id: number) {
    this.categoryService.getCategory(category_id).subscribe({
      next: (v) => {
        this.category = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

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