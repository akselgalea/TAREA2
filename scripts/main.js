define(["require", "exports", "jquery"], function (require, exports, jquery) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = jquery;
    (function () {
        'use strict';
        var forms = $('#formu');
        var btnLimpiar = $("#limpiar");
        var msg = $("#done-msg");
        //Form input validation
        function validate() {
            validatePL();
            validateCursos();
        }
        //Set validity to checklists
        function validatePL() {
            var pl = $("input[name='pl']");
            var plc = $("input[name='pl']:checked").length;
            if (plc == 0) {
                for (var i = 0; i < pl.length; i++)
                    pl[i].setCustomValidity("Invalido");
            }
            else {
                for (var i = 0; i < pl.length; i++)
                    pl[i].setCustomValidity("");
            }
        }
        function validateCursos() {
            var cursos = $("input[name='cursos']");
            var cursosc = $("input[name='cursos']:checked").length;
            var otro = $("#otro");
            if (cursosc == 0 && !otro.val()) {
                for (var i = 0; i < cursos.length; i++)
                    cursos[i].setCustomValidity("Invalido");
            }
            else {
                for (var i = 0; i < cursos.length; i++)
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
            setTimeout(function () {
                forms.fadeOut("fast");
            }, 1000);
            setTimeout(function () {
                msg.fadeIn("slow");
            }, 1500);
        }
        //Checklists validation on change
        $("input[name='cursos']").change(function () {
            validateCursos();
        });
        $("input[name='pl']").change(function () {
            validatePL();
        });
        //Bootstrap validation
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                validate();
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    event.preventDefault();
                    event.stopPropagation();
                    doneMsg();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();
});
