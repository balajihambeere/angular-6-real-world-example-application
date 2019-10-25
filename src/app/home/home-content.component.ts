import { Component, OnInit } from "@angular/core";
import { CourseList, KeyValue, HomeService } from "../shared";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
    selector: 'home-content',
    templateUrl: './home-content.component.html',
    styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
    categories = new Array<KeyValue>();
    courses = new Array<CourseList>();

    constructor(private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    ngOnInit() {
        //Angular 2 Scroll to top on Route Change
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        const category = this.route.snapshot.paramMap.get('category');
        if (category) {
            this.courses = new Array<CourseList>();
            this.homeService.getCoursesByCategorName(category).subscribe(data => {
                this.courses = data
            })
        } else {
            this.loadCourses();
        }
    }

    loadCourses() {
        this.homeService.getCourses().subscribe(data => {
            this.courses = data
        })
    }

    onGoToPage(item: CourseList) {
        this.router.navigate(['/', item.categorySlug, item.slug]);
    }
}