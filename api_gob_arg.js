//variables provenientes de archivo PHP
_prov = JSON.parse(_provi_selec_db);
_muni = JSON.parse(_munici_selec_db);
_locali = JSON.parse(_locali_selec_db);
obtenerProvincia(_prov.id, _muni.id, _locali.id);

//PROVINCIA
function obtenerProvincia(_pr, _mu, _lo)
{
    if (_mu !== false) 
        document.getElementById('seccion_editar_partido').classList.remove('opc-oculto');
    provincia = document.getElementById('edit_provincia');
    fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&orden=nombre")
    .then(resultado => resultado.json())
    .then(data => 
    {
        if (data.cantidad > 0) 
        {
            document.getElementById('edit_provincia').innerHTML = "";
            for (var indice of data.provincias) {
                var opciones = document.createElement("option")
                if (_pr !== false) 
                {
                    if (_pr == indice.id) 
                    {
                        document.getElementById('provincia_select').value = indice.id;
                        document.getElementById('provincia_select').innerHTML = indice.nombre.toLowerCase();
                        //editar
                        opciones.selected = true;
                    }
                }
                opciones.value = indice.id
                opciones.innerHTML = indice.nombre.toUpperCase();
                provincia.appendChild(opciones)
            }
            document.getElementById('edit_provincia').disabled = false;
        }
    });
    obtenerPartido(_pr, _mu, _lo, "municipios");
}
//FIN PROVINCIA

//PARTIDO
function obtenerPartido(_pr, _mu, _lo, _tipo_busqueda)
{
    if (_lo !== false)
    {
        document.getElementById('seccion_editar_localidad').classList.remove('opc-oculto');
        document.getElementById('edit_localidad').required = true;
    } 
    else
    {
        document.getElementById('seccion_editar_localidad').classList.add('opc-oculto');
        document.getElementById('edit_localidad').required = false;
    }

    // _tipo_busqueda = (_pr == "02") ? "localidades" : "municipios"; 
    fetch("https://apis.datos.gob.ar/georef/api/"+_tipo_busqueda+"?provincia="+_pr+"&campos=id,nombre&max=1000&orden=nombre")
        .then(resultado => resultado.json())
        .then(data => {

            if (data.cantidad > 0) 
            {
                document.getElementById('edit_partido').innerHTML = ""
                _tipo = (_tipo_busqueda == "municipios") ? data.municipios : data.localidades;
                if (_mu === false) 
                {
                    op_primero = document.createElement('option');
                    op_primero.value = "";
                    op_primero.innerHTML = "Seleccione una opción";
                    op_primero.selected = true;
                    op_primero.disabled = true;
                    document.getElementById('edit_partido').appendChild(op_primero);
                }
                for (var indice of _tipo)
                {

                    var opcionesMuni = document.createElement("option")
                    // si viene seteado de base de datos
                    if (_mu !== false) 
                    {
                        if (_mu == indice.id) 
                        {
                            document.getElementById('partido_select').value = indice.id;
                            document.getElementById('partido_select').innerHTML = indice.nombre.toLowerCase();
                            opcionesMuni.selected = true;
                        } 
                    }
                    opcionesMuni.value = indice.id
                    opcionesMuni.innerHTML = indice.nombre.toUpperCase()
                    document.getElementById('edit_partido').appendChild(opcionesMuni)
                }
                document.getElementById('edit_partido').disabled = false;
                if (_mu !== false) 
                {
                    obtenerLocalidad(_mu, _lo, "municipios")
                }
            }
            else
            {
                obtenerPartido(_pr, _mu, _lo, "localidades")
            }
    });
}
//FIN PARTIDO

//LOCALIDAD
function obtenerLocalidad(_mu, _lo, _tipo_busqueda)
{
    console.log(_mu +' '+_lo+' '+_tipo_busqueda)

    if (_tipo_busqueda == "municipios") 
    {
        // LOCALIDAD del MUNICIPIO
        fetch("https://apis.datos.gob.ar/georef/api/localidades?municipio="+_mu+"&campos=id,nombre&max=1000&orden=nombre")
        .then(resultado => resultado.json())
        .then(data => {
            console.log('cantidad = '+data.cantidad)
                if (data.cantidad > 0 ) 
                {
                    if (_lo !== -1 && _lo !== false) 
                    {
                        document.getElementById('p_card_localidad').classList.remove('opc-oculto');
                    }
                    document.getElementById('seccion_editar_localidad').classList.remove('opc-oculto');
                    document.getElementById('edit_localidad').required = true;
                    document.getElementById('edit_localidad').innerHTML = "";
                    if (_lo === false) 
                    {
                        op_primero = document.createElement('option');
                        op_primero.value = "";
                        op_primero.innerHTML = "Seleccione una opción";
                        op_primero.selected = true;
                        op_primero.disabled = true;
                        document.getElementById('edit_localidad').appendChild(op_primero);
                    }
                    for (var indice of data.localidades)
                    {
                        var opcionesLo = document.createElement("option")
                        if (_lo !== false) 
                        {
                            if (_lo == indice.id) 
                            {
                                document.getElementById('localidad_select').value = indice.id;
                                document.getElementById('localidad_select').innerHTML = indice.nombre.toLowerCase();
                                opcionesLo.selected = true;  
                            }
                        }
                        opcionesLo.value = indice.id
                        opcionesLo._datos = indice;
                        opcionesLo.innerHTML = indice.nombre.toUpperCase()
                        document.getElementById('edit_localidad').appendChild(opcionesLo)
                    }
                    document.getElementById('edit_localidad').disabled = false;

                }
                else 
                {
                    document.getElementById('seccion_editar_localidad').classList.add('opc-oculto');
                    document.getElementById('edit_localidad').required = false;
                }
        })
    }
}
// FIN LOCALIDAD

//cambios en la provincia
_cambio_provincia = function()
{
    _opt_localidad = document.createElement('option');
    _opt_localidad.innerHTML = "-";
    _opt_cargando_partido = document.createElement('option');
    _opt_cargando_partido.innerHTML = "Cargando...";

    document.getElementById('edit_partido').innerHTML = "";
    document.getElementById('edit_localidad').innerHTML = "";

    document.getElementById('edit_localidad').appendChild(_opt_localidad);
    document.getElementById('edit_partido').appendChild(_opt_cargando_partido);

    document.getElementById('edit_localidad').disabled = true;
    document.getElementById('edit_partido').disabled = true;

    _pr = document.getElementById('edit_provincia').value;
    obtenerPartido(_pr, false, false, "municipios");
}
document.getElementById('edit_provincia').addEventListener('change', _cambio_provincia, false);
delete _cambio_provincia;

//cambios en el partido
_camnbio_partido = function()
{

    _opt_cargando_localidad = document.createElement('option');
    _opt_cargando_localidad.innerHTML = "Cargando...";

    document.getElementById('edit_localidad').innerHTML = "";
    document.getElementById('edit_localidad').appendChild(_opt_cargando_localidad);

    document.getElementById('edit_localidad').disabled = true;

    _mu = document.getElementById('edit_partido').value;
    obtenerLocalidad(_mu, false, "municipios");
}
document.getElementById('edit_partido').addEventListener('change', _camnbio_partido, false);
delete _camnbio_partido;
