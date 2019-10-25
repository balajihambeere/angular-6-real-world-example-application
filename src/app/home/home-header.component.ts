import { Component } from "@angular/core";
import { HomeService, KeyValue } from "../shared";
import { Router } from "@angular/router";

@Component({
    selector: 'home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
    mySidebar = false;
    categories = new Array<KeyValue>();

    constructor(private homeService: HomeService,
        private router: Router) {

    }
    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        this.loadCategories();
    }
    loadCategories() {
        this.homeService.getCategories().subscribe(data => {
            this.categories = data;
        })
    }
    open() {
        this.mySidebar = true;
    }
    close() {
        this.mySidebar = false;
    }

    onGoToPage(item: KeyValue) {
        this.router.navigate(['/', item.slug]);
        this.mySidebar = false;
    }
}