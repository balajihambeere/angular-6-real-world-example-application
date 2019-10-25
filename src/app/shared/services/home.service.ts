import { Injectable } from "@angular/core";
import { ErrorModel, KeyValue, CourseList, CourseIndex, Course, Topic } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class HomeService {

    private errorLog = new ErrorModel();
    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "HomeService";
    }

    getCategories(): Observable<Array<KeyValue>> {
        this.errorLog.methodName = "getCategories";
        return this.apiService.get('api/home/getCategories', new HttpParams(), this.errorLog);
    }

    getCourses(): Observable<Array<CourseList>> {
        this.errorLog.methodName = "getCourses";
        return this.apiService.get('api/home/getCourses', new HttpParams(), this.errorLog);
    }

    getCoursesByCategorName(name: string): Observable<Array<CourseList>> {
        this.errorLog.methodName = "getCoursesByCategorId";
        return this.apiService.get('api/home/getCoursesByCategorName/' + name, new HttpParams(), this.errorLog);
    }

    getCoursesBySlug(name: string): Observable<CourseIndex> {
        this.errorLog.methodName = "getCoursesById";
        return this.apiService.get('api/home/getCoursesBySlug/' + name, new HttpParams(), this.errorLog);
    }

    getCourseByName(name: string): Observable<Course> {
        this.errorLog.methodName = "getCourseByName";
        return this.apiService.get('api/home/getCourseByName/' + name, new HttpParams(), this.errorLog);
    }

    getTopicByName(topicId: number): Observable<Topic> {
        this.errorLog.methodName = "getTopicById";
        return this.apiService.get('/api/home/getTopicById/' + topicId, new HttpParams(), this.errorLog);
    }
}