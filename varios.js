//buscar y recorrer con una sola linea
_e.d.nuevo_paciente_sexo.querySelectorAll('input').forEach((input) =>{console.log(input.checked)})


//click derecho con posición absoluta
//opciones de click derecho
_opciones_click = function(a)
{

    a.preventDefault();

    var _papa   = {"top":a.clientY,"left":a.clientX};
    var _abuelo = _e.d.contenedor_gral_asig_prot.getBoundingClientRect()
    var relativePos = {};

    relativePos.top     = (_papa.top - _abuelo.top)+13,
    relativePos.left    = (_papa.left - _abuelo.left)+5;

    _e.d.menu_estudio_selec_asignar_protocolo.style.display  = "inline-block";
    _e.d.menu_estudio_selec_asignar_protocolo.style.top      = (relativePos.top) +'px';
    _e.d.menu_estudio_selec_asignar_protocolo.style.left     = (relativePos.left) +'px';

    _e.d.btn_eliminar_estudio_selec_asignar_protocolo.setAttribute('data-delete_tr', this.dataset.tr)
    _eliminar_estudi_selec = function (__a)
    {
        __a.preventDefault()
        for (var i = 0; i < _e.d.tabla_estudios_convenidos_asignar_protocolo_tbody.querySelectorAll('tr').length; i++) 
        {
            if (_e.d.tabla_estudios_convenidos_asignar_protocolo_tbody.querySelectorAll('tr')[i].dataset.tr == this.dataset.delete_tr )
            {
                _e.d.tabla_estudios_convenidos_asignar_protocolo_tbody.querySelectorAll('tr')[i].remove();
                //saco el estudio eliminado de la varibale "_variables.ticket.estudios_seleccionados"
                for (var ii = 0; ii < _variables.ticket.estudios_seleccionados.length; ii++) 
                {
                    if (_variables.ticket.estudios_seleccionados[ii].id == this.dataset.delete_tr) 
                        _variables.ticket.estudios_seleccionados.splice(ii, 1);
                }
            }
        }
        _e.d.menu_estudio_selec_asignar_protocolo.style.display = 'none';

        // console.log(this.dataset.delete_tr);
    }
    _e.d.btn_eliminar_estudio_selec_asignar_protocolo.addEventListener('click', _eliminar_estudi_selec, false);
    delete _eliminar_estudi_selec;

    _opciones_click_cierra = function(){
        _e.d.menu_estudio_selec_asignar_protocolo.style.display = "none";
    };
    window.document.addEventListener('click',_opciones_click_cierra, false);
    delete _opciones_click_cierra;

    // _e.d.__task_form_crear.style.top      = (relativePos.top) +'px';
    // _e.d.__task_form_crear.style.left     = (relativePos.left) +'px';
}
tr_.addEventListener('contextmenu', _opciones_click, false);
delete _opciones_click;
tabla_estudios_convenidos_asignar_protocolo_tbody.appendChild(tr_);
