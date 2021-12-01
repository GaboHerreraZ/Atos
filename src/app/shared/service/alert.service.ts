import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }


  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Ok',
      text: message,
    });
  }


}
