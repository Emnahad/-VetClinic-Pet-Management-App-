import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../core/pet.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent {
  petForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;

    this.petForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      species: [data?.species || '', Validators.required],
      breed: [data?.breed || ''],
      age: [data?.age || '', [Validators.required, Validators.min(0)]],
      status: [data?.status || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      const petData = this.petForm.value;

      const request$ = this.isEditMode
        ? this.petService.updatePet(this.data.id, petData)
        : this.petService.addPet(petData);

      request$.subscribe({
        next: () => {
          const message = this.isEditMode ? 'Pet updated successfully!' : 'Pet added successfully!';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: () => {
          const message = this.isEditMode ? 'Error updating pet.' : 'Error adding pet.';
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}
