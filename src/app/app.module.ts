import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostCreateComponent} from '../app/posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PostListComponent } from './posts/post-list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-intercepter';
import { ErrorInterceptor } from './auth/error-interceptor';
import { MatDialogModule } from '@angular/material';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [
    AppComponent,PostCreateComponent, HeaderComponent, PostListComponent, LoginComponent, SignupComponent, ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule

  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
              {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
