import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  submitted = false; // Añadir una variable para rastrear si el formulario ha sido enviado

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      acronym: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  onSubmit(): void {
    this.submitted = true; // Marcar el formulario como enviado para mostrar errores si es necesario
    if (this.form.valid) {
      const newCategory: Category = {
        category_id: this.categories.length + 1, // O alguna otra lógica para generar el ID
        category: this.form.value.category,
        acronym: this.form.value.acronym,
        status: 1 // Suponiendo que 1 representa una categoría activa
      };
      this.categories.push(newCategory);
      // Mostrar mensaje de confirmación
      alert('Categoría agregada con éxito'); // Considera usar una librería de alertas para un mejor UI
      this.form.reset();
      this.submitted = false; // Resetear el estado de enviado
    }
  }

}
