import { Component, OnInit } from '@angular/core';
import { faBuilding, faEnvelope, faUser }  from '@fortawesome/free-solid-svg-icons';
import { faGlobe, faKey, faLocationArrow, faUserPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Region } from '../../customer/_model/region/region';
import { RegionService } from '../../customer/_service/region.service';
import { SwalMessages } from '../../commons/_dto/swal-messages';
import { urlApiRegistroUsuario } from '../_helper/urls';
import { Usuario } from '../_model/usuario';

declare var $: any; // JQuery

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  urlRegistro : string = urlApiRegistroUsuario;
  usuario: Usuario = new Usuario();
  userIcon = faUser;
  surnameIcon = faUserPlus;
  addressIcon = faLocationArrow;
  mailIcon = faEnvelope;
  usernameIcon = faUserSecret;
  passwordIcon = faKey;
  regionIcon = faGlobe;
  rfcIcon = faBuilding;

  regions: Region[] = []; // region list
  region: any | Region = new Region();

  swal: SwalMessages = new SwalMessages(); // Swal messages

  constructor(
    private http : HttpClient,
    private regionService: RegionService,
  ) { }

  ngOnInit() {
    this.getActiveRegions();
  }

  onSubmit() {
    console.log(this.usuario);
    
    this.http.post(this.urlRegistro, this.usuario, { observe: 'body' }).subscribe({
      next: (v) => {
        this.swal.successMessage('¡Usuario registrado exitosamente!');
        this.hideModalForm(); // close modal

        this.showModalForm(); // show modal
      }, 
      error: (e) => {
        console.log('Error en llamada a la API de registro');
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  clearForm() {
    this.usuario = new Usuario();
  }

  showModalForm() {
    $("#loginModal").modal("show");
  }

  hideModalForm() {
    $("#registerModal").modal("hide");
  }

  // Region

  getRegion(region_id: number) {
    this.regionService.getRegion(region_id).subscribe({
      next: (v) => {
        this.region = v.body!;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getActiveRegions() {
    this.regionService.getActiveRegions().subscribe({
      next: (v) => {
        this.regions = v.body!;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}