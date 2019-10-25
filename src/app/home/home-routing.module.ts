import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from "@angular/router";
import { HomeHeaderComponent } from "./home-header.component";
import { HomeContentComponent } from "./home-content.component";
import { HomeDetailsComponent } from "./home-details.component";
import { AboutComponent } from "../about/about-component";
import { HomeSideMenuComponent } from "./home-sidemenu.component";

export function aboutMatcher(url: UrlSegment[]): UrlMatchResult {
    if (url.length === 0) {
        return null;
    }

    const reg = /^about$/;
    const param = url[0].toString();

    if (param.match(reg)) {
        return ({ consumed: url });
    }

    return null;

}
const homeRoutes: Routes = [
    {
        path: '',
        component: HomeHeaderComponent,
        children: [
            { matcher: aboutMatcher, component: AboutComponent },
            { path: '', component: HomeContentComponent },
            
            { path: ':category', component: HomeContentComponent },
            {
                path: ':category/:slug', component: HomeSideMenuComponent,
                children: [
                    { path: '', component: HomeDetailsComponent },
                    { path: ':topicId/:slug2', component: HomeDetailsComponent }
                ]
            }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}