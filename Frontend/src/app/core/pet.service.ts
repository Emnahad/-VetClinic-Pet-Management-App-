import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) {}

  getAllPets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPet(pet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pet);
  }
  updatePet(id: string, pet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pet);
  }

  deletePet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
