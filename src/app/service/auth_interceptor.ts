import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class Auth_interceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("Token_Key");
    console.log(token);
    if(token){
      req = req.clone({
        setHeaders: {Authorization: 'Bearer '+ token}
      });
    }
    return next.handle(req);
  }
}
