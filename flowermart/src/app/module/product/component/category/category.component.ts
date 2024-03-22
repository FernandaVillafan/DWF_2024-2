import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category/category';
import Swal from'sweetalert2';

declare var $: any; // JQuery

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  categories: Category[] = []; // Category List

  // Category form
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]],
  });

  submitted = false; // Form submitted

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit() {
    this.getCategories();
  }

  onSubmit() {
    // validate form
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    // add category to category list
    let id = this.categories.length + 1;
    let category = new Category(id, this.form.controls['category'].value!, this.form.controls['acronym'].value!, 1);
    this.categories.push(category);

    // close modal
    this.hideModalForm();

    // show message
    Swal.fire({
      position: 'center',
      icon: 'success',
      iconColor: 'white',
      title: 'La categoría ha sido agregada',
      color: 'white',
      background: '#669dc1',
      showConfirmButton: false,
      timer: 3000
    });
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  showModalForm() {
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
    this.form.reset();
  }
}