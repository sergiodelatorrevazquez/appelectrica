import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const NoLoginGuard = () => {

    const router = inject(Router);

    if(!localStorage.getItem('usuario')){
        return true;
    }else{
        router.navigate(['/inicio/perfil']);
        return false;
    }
}