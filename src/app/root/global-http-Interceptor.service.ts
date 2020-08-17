import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { RollbarService } from './error-reporter';
import { SnackBarComponent } from '../components/snackbar/snackbar.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private snackBar: SnackBarComponent) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${environment.API}${request.url}`
    });

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const rollbar = this.injector.get(RollbarService);
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
        } else {
          // server-side error
          errorMessage = error.message;
        }

        // showing error messages in notification
        this.snackBar.openSnackBar(errorMessage);
        rollbar.error(error);
        return throwError(errorMessage);
      })
    );
  }
}
