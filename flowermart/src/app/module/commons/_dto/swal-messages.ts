import Swal from "sweetalert2";

export class SwalMessages {

    confirmMessage: any;

    constructor() {
        this.confirmMessage = Swal.mixin({
            customClass: {
                title: 'swal-title',
                icon: 'swal-icon',
                confirmButton: 'btn btn-secondary swal-confirm-button',
                cancelButton: 'btn btn-danger swal-cancel-button',
            },
            buttonsStyling: false
        });
    }
    
    // show confirmation message
    successMessage(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 12000
        });
    }
   
    // show error message
    errorMessage(message: string) {
        if (message == null) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                toast: true,
                text: "No se pudieron obtener los datos",
                background: '#F8E8F8',
                showConfirmButton: false,
                timer: 12000
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                toast: true,
                text: message,
                background: '#F8E8F8',
                showConfirmButton: false,
                timer: 12000
            });
        }
    }
}