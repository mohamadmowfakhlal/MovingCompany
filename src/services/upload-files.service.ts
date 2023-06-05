import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private _baseUrl = environment.link + ':3000/api';

  //private _baseUrl = 'http://localhost:3000/api';
  //private _baseUrl = 'http://52.28.147.250:3000/api';

  constructor(private http: HttpClient) { }

  upload(file: File,fileName: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file,fileName);
    const req = new HttpRequest('POST', `${this._baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this._baseUrl}/files`);
  }
}