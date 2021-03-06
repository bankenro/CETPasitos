import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Estudiantes} from '../../Data/Estudiantes';
import {ConexionService} from '../../Servicios/conexion.service';
import {DetallesEstudianteComponent} from '../../DialogsC/detalles-estudiante/detalles-estudiante.component';
import {DetallesPadreComponent} from '../../DialogsC/detalles-padre/detalles-padre.component';
import {Padres} from '../../Data/Padres';
import {EditFamiliComponent} from '../../DialogsC/edit-famili/edit-famili.component';
import {EditPadreComponent} from '../../DialogsC/edit-padre/edit-padre.component';

@Component({
  selector: 'app-padres',
  templateUrl: './padres.component.html',
  styleUrls: ['./padres.component.css']
})
export class PadresComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  dataSource = new MatTableDataSource<Padres>();
  estudiantes: Padres[];
  columnas = ['dni', 'apellidos', 'nombres', 'celular',
    'centro', 'familiar', 'hijo', 'detalles', 'editar'];
  keydata = 'padres';
  keymens = 'mensaje';
  keyerro = 'error';
  visible: boolean;

  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarPadres();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarPadres() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.estudiantes = null;
    this.conexion.servicio(formData).subscribe(
      padres => {
        // alert(padres[this.keymens]);
        Object.keys(padres).map(() => {
          this.visible = padres[this.keyerro] === false;
          this.estudiantes = padres[this.keydata];
          this.dataSource.data = padres[this.keydata] as Padres[];
        });
      }
    );
  }

  Detalles(dni: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dni};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    this.dialog.open(DetallesPadreComponent, dialogConfig);
    /* dialogRef.afterClosed().subscribe(result => {
      alert(result);
      // console.log(result);
    }); */
  }

  Editar(dni: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dni};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(EditPadreComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // alert(result);
      this.LlenarPadres();
      // console.log(result);
    });
  }
}
