import { Routes } from "@angular/router";
import { RegistrationComponent } from "./auth/components/registration/registration.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { UserHomeComponent } from "./user/components/user-home/user-home.component";
import { AuthGuard } from "../app/guards/auth.guard";


export const routes: Routes = [

    {path:"", component: UserHomeComponent, canActivate: [AuthGuard]},
    {path:"registration", component: RegistrationComponent},
    {path:"login", component: LoginComponent},
    {path:"user-home", component: UserHomeComponent, canActivate: [AuthGuard]},
];
