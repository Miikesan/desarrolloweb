/*----------------------------inicio--------------------------------

[Script - principal ]

Proyecto:  Mis Perris
Version:  v1.0
Ultimo cambio: 10-09-18  -  11:00 SEBC
Asignado a:  SEBC
Primary use:  Informative. 

----------------------

[Tabla de contenido]

1.Inicializacion de controles.
2.Controles generales.
3.Controles de contacto.

** Recomendaciones para navegacion de tabla de contenido **

[Shortcuts]

1.Ctrl+inicio (regresas a la linea 1 del archivo).
2.Ctrl+fin    (te lleva a la ultima linea del archivo).

-------------------------fin---------------------------------*/
$(function () {
    init();
});
// 1.Inicializacion de controles.
function init() {
    confiGenerales.init();
    if ($(".contacto").length) {
        contacto.init();
    }
}
// 2.Controles generales.
var confiGenerales = {
    init: function () {
        confiGenerales.copyrigth();
        confiGenerales.oldBrowsers();
    }
    , copyrigth: function () {
        $(".js-year").html((new Date).getFullYear());
    }
    , oldBrowsers: function () {
        var promiseSupport = false;
        try {
            var promise = new Promise(function (x, y) {});
            promiseSupport = true;
        }
        catch (e) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js';
            head.appendChild(script);
        }
        if (window.ActiveXObject || "ActiveXObject" in window) {
            alert("Ferouch estÃ¡ optimizado para versiones superiores a IE11, es posible que no pueda disfrutar de todas las funcionalidades que ofrecemos con esta versiÃ³n de su navegador.");
        }
    }
};
// 3.Contacto
var contacto = {
    init: function () {
        contacto.datepicker();
        contacto.enviar();
        contacto.format();
        contacto.regionesComunas();
    }
    , datepicker: function () {
        $("[data-toggle='datepicker']").length > 0 && ($.fn.datepicker.languages["es-CL"] = {
            format: "dd/mm/yyyy"
            , days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
            , daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
            , daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
            , weekStart: 1
            , months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
            , monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        }, $('[data-toggle="datepicker"]').datepicker({
            language: "es-CL"
            , startDate: "01/01/1900"
            , endDate: "01/01/2001"
            , date: new Date("01/01/1980")
            , yearFirst: !0
            , startView: 2
        }));
    }
    , enviar: function () {
        $('form').submit(function (e) {
            e.preventDefault();
            var rut = $('#run').val();
            if ($.validateRut(rut)) {
                $('form').trigger("reset");
                swal({
                    type: 'success'
                    , title: '¡Gracias!'
                    , text: 'Pronto te contactaremos.'
                , })
            }
            else {
                swal({
                    type: 'warning'
                    , html: 'El RUT <b> ' + rut + '</b> no es válido.'
                    , showCloseButton: true
                    , confirmButtonText: 'Volver'
                });
            }
        });
    }
    , format: function () {
        // Only numbers
        $('#run').keyup(function () {
            var val = $(this).val();
            if (isNaN(val)) {
                val = val.replace(/[^\d-.kK]/g, '');
            }
            $(this).val(val);
        });
        $("#run").rut({
            formatOn: 'keyup'
        });
        // Only letters
        $('#nombre').keyup(function () {
            var val = $(this).val();
            if (val) {
                val = val.replace(/[^a-z]/g, '');
            }
            $(this).val(val);
        });
    }
    , regionesComunas: function () {
        var RegionesYcomunas = {
            "regiones": [{
                    "NombreRegion": "Arica y Parinacota"
                    , "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
	}
            , {
                    "NombreRegion": "Tarapacá"
                    , "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
	}
            , {
                    "NombreRegion": "Antofagasta"
                    , "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
	}
            , {
                    "NombreRegion": "Atacama"
                    , "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
	}
            , {
                    "NombreRegion": "Coquimbo"
                    , "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
	}
            , {
                    "NombreRegion": "Valparaíso"
                    , "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
	}
            , {
                    "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins"
                    , "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
	}
            , {
                    "NombreRegion": "Región del Maule"
                    , "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
	}
            , {
                    "NombreRegion": "Región del Biobío"
                    , "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
	}
            , {
                    "NombreRegion": "Región de la Araucanía"
                    , "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria", ]
	}
            , {
                    "NombreRegion": "Región de Los Ríos"
                    , "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
	}
            , {
                    "NombreRegion": "Región de Los Lagos"
                    , "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
	}
            , {
                    "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo"
                    , "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
	}
            , {
                    "NombreRegion": "Región de Magallanes y de la AntárVca Chilena"
                    , "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
	}
            , {
                    "NombreRegion": "Región Metropolitana de Santiago"
                    , "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
	}]
        }
        $(document).ready(function () {
            var iRegion = 0;
            var htmlRegion = '<option value="sin-region" disabled selected >Seleccione región</option>';
            var htmlComunas = '<option value="sin-region" disabled selected >Seleccione comuna</option>';
            $.each(RegionesYcomunas.regiones, function () {
                htmlRegion = htmlRegion + '<option value="' + RegionesYcomunas.regiones[iRegion].NombreRegion + '">' + RegionesYcomunas.regiones[iRegion].NombreRegion + '</option>';
                iRegion++;
            });
            $('#regiones').html(htmlRegion);
            $('#comunas').html(htmlComunas);
            $('#regiones').change(function () {
                var iRegiones = 0;
                var valorRegion = $(this).val();
                var htmlComuna = '<option value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
                $.each(RegionesYcomunas.regiones, function () {
                    if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
                        var iComunas = 0;
                        $.each(RegionesYcomunas.regiones[iRegiones].comunas, function () {
                            htmlComuna = htmlComuna + '<option value="' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '">' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '</option>';
                            iComunas++;
                        });
                    }
                    iRegiones++;
                });
                $('#comunas').html(htmlComuna);
            });
            $('#comunas').change(function () {
                if ($(this).val() == 'sin-region') {
                    alert('selecciones Región');
                }
                else if ($(this).val() == 'sin-comuna') {
                    alert('selecciones Comuna');
                }
            });
            $('#regiones').change(function () {
                if ($(this).val() == 'sin-region') {
                    alert('selecciones Región');
                }
            });
        });
    }
};