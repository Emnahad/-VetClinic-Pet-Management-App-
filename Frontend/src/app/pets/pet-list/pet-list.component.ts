import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { PetService } from '../../core/pet.service';
import {MatDialog} from '@angular/material/dialog';
import {PetFormComponent} from '../pet-form/pet-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['name', 'species', 'breed','status','age','actions'];

  speciesList = ['Dog', 'Cat', 'Bird'];
  statusList = ['Healthy', 'Sick'];
  filterSpecies = '';
  filterStatus = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private petService: PetService,private dialog: MatDialog) {}

  ngOnInit() {
    this.petService.getAllPets().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.dataSource.filterPredicate = (data, filter) => {
      const [species, status] = filter.split(',');
      const matchSpecies = !species || data.species === species;
      const matchStatus = !status || data.status === status;
      return matchSpecies && matchStatus;
    };
    this.dataSource.filter = `${this.filterSpecies},${this.filterStatus}`;
  }

  onFilterChange() {
    this.applyFilters();
    if (this.paginator) this.paginator.firstPage();
  }
  openAddPetDialog(): void {
    const dialogRef = this.dialog.open(PetFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPets();
      }
    });
  }
  getPets() {
    this.petService.getAllPets().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilters();
    });
  }
  editPet(pet: any): void {
    this.dialog.open(PetFormComponent, {
      width: '400px',
      data: pet
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getPets();
      }
    });
  }


  deletePet(id: string): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(() => {
        this.getPets();
      });
    }
  }



}
