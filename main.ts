import jquery = require('jquery');
const $:JQueryStatic = jquery;

(function () {
    'use strict'
    
    let forms = $('#formu')
    let btnLimpiar = $("#limpiar");
    let msg = $("#done-msg");

    //Form input validation
    function validate() {
        validatePL();
        validateCursos();
    }

    //Set validity to checklists
    function validatePL() {
        let pl : any = $("input[name='pl']");
        let plc = $("input[name='pl']:checked").length;

        if(plc == 0) {
            for(let i = 0; i < pl.length; i++)
                pl[i].setCustomValidity("Invalido");
        } else {
            for(let i = 0; i < pl.length; i++)
                pl[i].setCustomValidity("");
        }
    }

    function validateCursos() {
        let cursos : any = $("input[name='cursos']");
        let cursosc = $("input[name='cursos']:checked").length;
        let otro = $("#otro");

        if(cursosc == 0 && !otro.val()) {    
            for(let i = 0; i < cursos.length; i++)
                cursos[i].setCustomValidity("Invalido");
        } else {
            for(let i = 0; i < cursos.length; i++)
                cursos[i].setCustomValidity("");
        }
    }

    //Clean form
    function limpiarDatos() {
        forms.trigger("reset");
        validate();
    }
    
    btnLimpiar.click(limpiarDatos);

    //Done message
    function doneMsg() {
        setTimeout(() => {
            forms.fadeOut("fast");
        }, 1000)

        setTimeout(() => {
            msg.fadeIn("slow");
        }, 1500)
    }
    
    //Checklists validation on change
    $("input[name='cursos']").change(() => {
        validateCursos();
    });
    
    $("input[name='pl']").change(() => {
        validatePL();
    });
    
    //Bootstrap validation
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event : any) {
                validate();

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    event.stopPropagation()
                    doneMsg();
                }
                form.classList.add('was-validated');
            }, false)
        })
    })()