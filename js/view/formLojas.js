class FormLojas {

    constructor(controller, seletor){
        this.lojaController = controller;
        this.seletor = seletor;
    }

    montarForm(loja){
        if(!loja){
            loja = new Loja();
        }
        var str = `
        <h2>Formulario de Lojas</h2>
        <form id="formulario">
            <input type="hidden" id="idLoja" value="${loja.id}" />
            <label for="txtnome">Nome:</label>
            <input type="text" id="txtnome" value="${loja.nome ?loja.nome :''}">
            <br />
            <br />
            <input type="submit" id="btnsalvar" value="Salvar">
            <input type="reset" value="Cancelar">
            <br />
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){
            if(!loja.id){
                self.lojaController.salvar(event);
            }
            else{
                self.lojaController.editar(loja.id,event);
            }
        }

        form.onreset = function(event){
            self.lojaController.limpar(event);
        }
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
    }

    getDataloja(){
        let loja = new Loja();
        if(!document.querySelector("#idLoja").value)
            loja.id = document.querySelector("#idLoja").value;
        loja.nome = document.querySelector("#txtnome").value;
        return loja;        
    }

}