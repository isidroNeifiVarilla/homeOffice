import { NgModule } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localeEs from '@angular/common/locales/Es';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { NavComponent } from './common/nav/nav.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { TareasComponent } from './views/tareas/tareas.component';
import { ColaboradoresComponent } from './views/colaboradores/colaboradores.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';
import { VistaGeneralComponent } from './views/vista-general/vista-general.component';
import { MisDatosComponent } from './views/mis-datos/mis-datos.component';
import { OrganigramaComponent } from './views/organigrama/organigrama.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProyectoDetalleComponent } from './views/proyecto-detalle/proyecto-detalle.component';
import { ModalProyectoComponent } from './views/proyectos/components/modal-proyecto/modal-proyecto.component';
import { ModalActividadesComponent } from './views/vista-general/components/modal-actividades/modal-actividades.component';
import { ModalEstatusProyectoComponent } from './views/vista-general/components/modal-estatus-proyecto/modal-estatus-proyecto.component';
import { ModalInformacionComponent } from './views/proyecto-detalle/components/modal-informacion/modal-informacion.component';
import { ModalProyectoDetalleComponent } from './views/proyecto-detalle/components/modal-proyecto-detalle/modal-proyecto-detalle.component';
import { TaskCollapsedComponent } from './views/proyecto-detalle/components/task-collapsed/task-collapsed.component';
import { CalendarComponent } from './views/tareas/components/calendar/calendar.component';
import { LoginGoogleComponent } from './views/login-google/login-google.component';
import { from } from 'rxjs';
import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/services/chat.service';
import { AreasProyectosComponent } from './views/areas-proyectos/areas-proyectos.component';
import { UserSearchPipe } from './pipes/user-search.pipe';
import { ScrollToBottomDirective} from './scroll.-to-bottom.directive';
import { CalendarioReportesComponent } from './views/areas-proyectos/calendario-reportes/calendario-reportes.component';
import { ChatButtonComponent } from './common/chat-button/chat-button.component';

registerLocaleData(localeEs);
//External
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './services/interceptor.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChatComponent } from './views/chat/chat.component';
import { SpinnerComponent } from './views/spinner/spinner.component';
import { AltaUsuariosComponent } from './views/alta-usuarios/alta-usuarios.component';
import { ModalDriveComponent } from './views/proyecto-detalle/components/modal-drive/modal-drive.component';
import { CargaArchivoComponent } from './views/carga-archivo/carga-archivo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    LoginComponent,
    ScrollToBottomDirective,
    NotFoundComponent,
    TareasComponent,
    ColaboradoresComponent,
    ProyectosComponent,
    VistaGeneralComponent,
    MisDatosComponent,
    OrganigramaComponent,
    ProyectoDetalleComponent,
    ModalProyectoComponent,
    ModalActividadesComponent,
    ModalEstatusProyectoComponent,
    ModalInformacionComponent,
    ModalProyectoDetalleComponent,
    TaskCollapsedComponent,
    CalendarComponent,
    LoginGoogleComponent,
    SearchPipe,
    FilterPipe,
    ChatComponent,
    SpinnerComponent,
    AreasProyectosComponent,
    UserSearchPipe,
    AltaUsuariosComponent,
    CalendarioReportesComponent,
    ModalDriveComponent,
    ChatButtonComponent,
    CargaArchivoComponent,
  ],
  imports: [
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    DragScrollModule

  ],
  providers: [DatePipe,ChatService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
}