import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TiposT} from '../../Data/TiposT';
import {ConexionService} from '../../Servicios/conexion.service';
import {AddTurnoComponent} from '../../DialogsC/add-turno/add-turno.component';
import {EditPadreComponent} from '../../DialogsC/edit-padre/edit-padre.component';

@Component({
  selector: 'app-costoturno',
  templateUrl: './costoturno.component.html',
  styleUrls: ['./costoturno.component.css']
})
export class CostoturnoComponent implements OnInit {
  visible: boolean;

  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  dataSource = new MatTableDataSource<TiposT>();
  columnas = ['codigo', 'nombre', 'total', 'detalles', 'editar'];
  keydata = 'costturnextra';
  keymens = 'mensaje';
  keyerro = 'error';

  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarTurnoExtra();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarTurnoExtra() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.conexion.servicio(formData).subscribe(
      horas => {
        // alert(padres[this.keymens]);
        Object.keys(horas).map(() => {
          this.visible = horas[this.keyerro] === false;
          this.dataSource.data = horas[this.keydata] as TiposT[];
        });
      }
    );
  }

  Detalles(id: any) {
    const dialogConfig = new MatDialogConfig();
    const accion = 'detalles';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion, id};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    this.dialog.open(AddTurnoComponent, dialogConfig);
  }

  Editar(id: any) {
    const dialogConfig = new MatDialogConfig();
    const accion = 'actturnoextra';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion, id};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddTurnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarTurnoExtra();
      alert(result);
      // console.log(result);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addturno';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddTurnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarTurnoExtra();
      alert(result);
      // console.log(result);
    });
  }
}
