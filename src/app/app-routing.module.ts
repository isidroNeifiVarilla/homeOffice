import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './views/colaboradores/colaboradores.component';
import { LoginComponent } from './views/login/login.component';
import { MisDatosComponent } from './views/mis-datos/mis-datos.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { OrganigramaComponent } from './views/organigrama/organigrama.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';
import { TareasComponent } from './views/tareas/tareas.component';
import { VistaGeneralComponent } from './views/vista-general/vista-general.component';
import { AreasProyectosComponent } from './views/areas-proyectos/areas-proyectos.component';
import { ProyectoDetalleComponent } from './views/proyecto-detalle/proyecto-detalle.component';
import { from } from 'rxjs';
import { LoginGoogleComponent } from './views/login-google/login-google.component';
import { AltaUsuariosComponent } from './views/alta-usuarios/alta-usuarios.component';
import {CalendarComponent} from './views/tareas/components/calendar/calendar.component';
import { CargaArchivoComponent } from './views/carga-archivo/carga-archivo.component';


const routes: Routes = [
  {path: '', component: LoginGoogleComponent},
  {path: 'vista-general', component: VistaGeneralComponent},
  {path: 'alta-usuarios', component: AltaUsuariosComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'colaboradores', component: ColaboradoresComponent},
  {path: 'tareas', component: TareasComponent},
  {path: 'areas-proyectos', component: AreasProyectosComponent},
  {path: 'mis-datos', component: MisDatosComponent},
  {path: 'organigrama', component: OrganigramaComponent},
  {path: 'proyecto-detalle/:id', component: ProyectoDetalleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'calendario', component:  CalendarComponent},
  {path: 'carga-archivo', component:  CargaArchivoComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
