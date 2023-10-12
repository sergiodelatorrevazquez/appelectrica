import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const LoginGuard = () => {

    const router = inject(Router);

    if(localStorage.getItem('usuario')){
        return true;
    }else{
        router.navigate(['/inicio-sesion']);
        return false;
    }
}