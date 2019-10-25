import { Injectable } from "@angular/core";
import { ErrorModel, Topic } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class TopicService {
    private errorLog = new ErrorModel();

    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "TopicService";
    }

    getAll(): Observable<Array<Topic>> {
        this.errorLog.methodName = "getAll";
        return this.apiService.get('api/topic', new HttpParams(), this.errorLog);
    }

    getById(id: number): Observable<Topic> {
        this.errorLog.methodName = "getById";
        return this.apiService.get('/api/topic/' + id, new HttpParams(), this.errorLog);
    }

    getByLesson(id: number): Observable<Array<Topic>> {
        this.errorLog.methodName = "getByCourse";
        return this.apiService.get('api/topic/getTopicByLesson/' + id, new HttpParams(), this.errorLog);
    }
}