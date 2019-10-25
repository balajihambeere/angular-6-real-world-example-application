import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService, HandleError } from "./errorHandler.service";
import { ErrorModel } from '../models'

@Injectable()
export class ApiService {
    private handleError: HandleError;
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    }

    private setHttpHeaders(): HttpHeaders {
        const httpOptions = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return new HttpHeaders(httpOptions);
    }

    get<Object>(path?: string, param?: HttpParams, errorLog?: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.get(`${environment.api_url}${path}`,
            { headers: this.setHttpHeaders(), params: param })
            .pipe(
                catchError(this.handleError(errorLog.methodName, param))
            );
    }
}