import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './Componentes/login/login.component';
import {HeaderComponent} from './Componentes/header/header.component';
import {FooterComponent} from './Componentes/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatriculasComponent} from './Componentes/matriculas/matriculas.component';
import {CumpleaniosComponent} from './Componentes/cumpleanios/cumpleanios.component';
import {CostoturnoComponent} from './Componentes/costoturno/costoturno.component';
import {CostoalimentoComponent} from './Componentes/costoalimento/costoalimento.component';
import {PadresComponent} from './Componentes/padres/padres.component';
import {FamiliaresComponent} from './Componentes/familiares/familiares.component';
import {EstudiantesComponent} from './Componentes/estudiantes/estudiantes.component';
import {UsuariosComponent} from './Componentes/usuarios/usuarios.component';
import {MensualidadesComponent} from './Componentes/mensualidades/mensualidades.component';
import {AsistenciaComponent} from './Componentes/asistencia/asistencia.component';
import {AlimentosComponent} from './Componentes/alimentos/alimentos.component';
import {TurnoextraComponent} from './Componentes/turnoextra/turnoextra.component';
import {AlimentosextraComponent} from './Componentes/alimentosextra/alimentosextra.component';
import {DeudopagadoComponent} from './Componentes/deudopagado/deudopagado.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {DetallesPadreComponent} from './DialogsC/detalles-padre/detalles-padre.component';
import {DetallesEstudianteComponent} from './DialogsC/detalles-estudiante/detalles-estudiante.component';
import {ActuaEstadEstudiComponent} from './DialogsC/actua-estad-estudi/actua-estad-estudi.component';
import {AddUsuarioComponent} from './DialogsC/add-usuario/add-usuario.component';
import {AsignarEstudianteComponent} from './DialogsC/asignar-estudiante/asignar-estudiante.component';
import {AddEstudianteComponent} from './DialogsC/add-estudiante/add-estudiante.component';
import {EliminarComponent} from './DialogsC/eliminar/eliminar.component';
import {AddPadreComponent} from './DialogsC/add-padre/add-padre.component';
import {AddFamiliarComponent} from './DialogsC/add-familiar/add-familiar.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {EditPadreComponent} from './DialogsC/edit-padre/edit-padre.component';
import {EditFamiliComponent} from './DialogsC/edit-famili/edit-famili.component';
import {CargandoComponent} from './DialogsC/cargando/cargando.component';
import {CargaService} from './Servicios/carga.service';
import {LoaderInterceptor} from './Interceptor/Carga.Interceptor';
import {AddMatriculaComponent} from './DialogsC/add-matricula/add-matricula.component';
import {DetallesMensualidadComponent} from './DialogsC/detalles-mensualidad/detalles-mensualidad.component';
import {CanActiveGuardServiceService} from './Servicios/can-active-guard-service.service';
import {AsignarTurnoComponent} from './DialogsC/asignar-turno/asignar-turno.component';
import {AsignarAlimentosComponent} from './DialogsC/asignar-alimentos/asignar-alimentos.component';
import {AddHoraTurnoExtraComponent} from './DialogsC/add-hora-turno-extra/add-hora-turno-extra.component';
import {AddAlimentoExtraComponent} from './DialogsC/add-alimento-extra/add-alimento-extra.component';
import {EliminarExtraComponent} from './DialogsC/eliminar-extra/eliminar-extra.component';
import {HorasExtraComponent} from './Componentes/horas-extra/horas-extra.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MatriculasComponent,
    CumpleaniosComponent,
    CostoturnoComponent,
    CostoalimentoComponent,
    PadresComponent,
    FamiliaresComponent,
    EstudiantesComponent,
    UsuariosComponent,
    MensualidadesComponent,
    AsistenciaComponent,
    AlimentosComponent,
    TurnoextraComponent,
    AlimentosextraComponent,
    DeudopagadoComponent,
    DetallesPadreComponent,
    DetallesEstudianteComponent,
    ActuaEstadEstudiComponent,
    AddUsuarioComponent,
    AsignarEstudianteComponent,
    AddEstudianteComponent,
    EliminarComponent,
    AddPadreComponent,
    AddFamiliarComponent,
    EditPadreComponent,
    EditFamiliComponent,
    CargandoComponent,
    AddMatriculaComponent,
    DetallesMensualidadComponent,
    AsignarTurnoComponent,
    AsignarAlimentosComponent,
    AddHoraTurnoExtraComponent,
    AddAlimentoExtraComponent,
    EliminarExtraComponent,
    HorasExtraComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'matriculas', component: MatriculasComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'cumpleanios/:accion', component: CumpleaniosComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'deudopagado/:accion', component: DeudopagadoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costoturn', component: CostoturnoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costoalim', component: CostoalimentoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'padres', component: PadresComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'familiares', component: FamiliaresComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'estudiantes', component: EstudiantesComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'mensualidades', component: MensualidadesComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'asistencia', component: AsistenciaComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'alimentos', component: AlimentosComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'turnoextra', component: TurnoextraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'horaextra', component: HorasExtraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'alimentoextra', component: AlimentosextraComponent, canActivate: [CanActiveGuardServiceService]}
    ]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule, FlexLayoutModule,
    MatMenuModule, MatDividerModule,
    MatSortModule, MatTableModule,
    MatPaginatorModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, NgbAlertModule,
    MatAutocompleteModule, MatProgressSpinnerModule,
    MatExpansionModule, MatIconModule,
    MatSidenavModule, MatListModule
  ],
  providers: [
    CargaService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [DetallesEstudianteComponent, DetallesPadreComponent, ActuaEstadEstudiComponent,
    AddUsuarioComponent, AddEstudianteComponent, EliminarComponent,
    AsignarEstudianteComponent, AddPadreComponent, AddFamiliarComponent, EditPadreComponent,
    EditFamiliComponent, CargandoComponent, AddMatriculaComponent, DetallesMensualidadComponent,
    AsignarTurnoComponent, AsignarAlimentosComponent, AddHoraTurnoExtraComponent, AddAlimentoExtraComponent,
    EliminarExtraComponent]
})
export class AppModule {
}
