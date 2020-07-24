<?php 

// RANGO (MÍNIMO, MÁXIMO)
// formato de $rango = "min8,max10" ó "min8" ó "max10"

function validaRango($rango, $valor)
{
	if (strpos($rango, ',') == false) // // solo se valida un limite (min o max)
	{
		if( is_string(substr($rango, 0, 3) ) && ( substr($rango, 0, 3) == "min" || substr($rango, 0, 3) == "max") )
		{
			if(is_numeric(substr($rango, 3)))
			{
				if (substr($rango, 0, 3) == "min") 
				{
					if ($valor < substr($rango, 3)) 
						return "El valor envíado no cumple con el mínimo permitodo";
				} 
				elseif (substr($rango, 0, 3) == "max") 
				{
					if ($valor > substr($rango, 3)) 
						return "El valor envíado excede el máximo permitodo";
				} 
				else
					return "El indicador 'min' o 'max' en el validador no está bien escrito";
			}
			else
				return "El parámetro envíado como 'min' o 'max' en el validador no es un número";
		}
		else
			return "El indicador 'min' o 'max' en el validador no está bien escrito";
	} 
	else 
	{
		 // manda min y max
	}
}



 ?>
