import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-personas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-personas.component.html',
  styleUrls: ['./formulario-personas.component.css']
})
export class FormularioPersonasComponent implements OnInit {
  @Output() usuarioAgregado = new EventEmitter<any>();
  personas!: FormGroup;
  errorMessages: { [key: string]: { [key: string]: string } } = {
    nombre: {
      required: 'El nombre es obligatorio.',
      minlength: 'El nombre debe tener al menos 4 letras.',
      pattern: 'El nombre solo puede contener letras.'
    },
    edad: {
      required: 'La edad es obligatoria.',
      min: 'La edad no puede ser negativa.',
      pattern: 'La edad solo puede contener números.'
    },
    dpi: {
      required: 'El DPI es obligatorio.',
      minlength: 'El DPI debe tener 13 dígitos.',
      maxlength: 'El DPI debe tener 13 dígitos.',
      pattern: 'El DPI solo puede contener números.'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.personas = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]*$')]],
      edad: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      dpi: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]]
    });
  }

  getErrorMessages(controlName: string): string[] {
    const control = this.personas.get(controlName);
    const errors = control?.errors;
    const messages = [];

    if (errors) {
      for (const errorKey in errors) {
        if (errors.hasOwnProperty(errorKey)) {
          messages.push(this.errorMessages[controlName][errorKey]);
        }
      }
    }

    return messages;
  }

  onSubmit() {
    if (this.personas.valid) {
      this.usuarioAgregado.emit(this.personas.value);
      this.personas.reset();
    }
  }
}
