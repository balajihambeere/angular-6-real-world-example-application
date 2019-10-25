import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Course, Topic, HomeService } from "../shared";

@Component({
    selector: 'home-details',
    templateUrl: './home-details.component.html',
})

export class HomeDetailsComponent implements OnInit {
    course = new Course();
    topic = new Topic();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private homeService: HomeService) {
    }

    ngOnInit() {

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        const courseName = this.route.snapshot.paramMap.get('slug');
        const topicId = +this.route.snapshot.paramMap.get('topicId');

        if (courseName) {
            this.homeService.getCourseByName(courseName).subscribe(data => {
                this.course = data
            })
        }

        if (topicId) {
            this.homeService.getTopicByName(topicId).subscribe(data => {
                this.topic = data
            })
        }
    }
}