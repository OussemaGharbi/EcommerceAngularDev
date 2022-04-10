import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
	name: string;
	price: string;
	code: string;
	size: string;
	description: string;
	qty: number;
	img: string;
};

type Doc = Product;

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private http: HttpClient) { }
	url = `${environment.apiUrl}/api/product`

	/**
   * GET all
   */
	getAll(): Observable<Doc[]> {
		return this.http.get<Doc[]>(this.url);
	}

	/**
   * GET by Id
   * @param {string} id    id
   */
	findById(id): Observable<Doc> {
		return this.http.get<Doc>(`${this.url}/${id}`);
	}

	/**
   * Search by Name or description
   * @param {string} query    query
   */
	search(query: string): Observable<Doc[]> {
		return this.http.get<Doc[]>(`${this.url}/search/${query}`);
	}

	/**
	 * Create
	 * @param {any}    data data to be created
	*/
	create(data: Partial<Doc>): Observable<Doc> {
		return this.http.post<Doc>(`${this.url}/`, data);
	}

	/**
	 * Create
	 * @param {Partial<Doc>}    data to be updated
	 * @param {string} id    id of the teacher
	*/
	editById(id: string, data: Partial<Doc>): Observable<Doc> {
		return this.http.put<Doc>(`${this.url}/${id}`, data);
	}

	/**
	 * Delete
	 * @param {string} id    id
	*/
	delete(id: string): Observable<Doc> {
		return this.http.delete<Doc>(`${this.url}/${id}`);
	}

}
