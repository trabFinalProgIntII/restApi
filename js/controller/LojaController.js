class LojaController{  
    constructor() {
        this.lojaService = new LojaService(); 
        this.tabelaLojas = new TabelaLojas(this,"main");
        this.formLojas = new FormLojas(this,"main");
    } 

    inicializa(){
        this.carregaLojas();
    }

    carregarFormulario(){
        event.preventDefault();
        this.formLojas.montarForm();
    }

    carregaLojas(){
        const self = this;
        const sucesso = function(lojas){
            self.tabelaLojas.montarTabela(lojas);
        }

        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }

        this.lojaService.buscarLojas(sucesso, trataErro);
    }

    limpar(event){
        event.preventDefault();
        this.formLojas.limparFormulario();
        this.carregaLojas();
    }
    
    salvar(event){        
        event.preventDefault();
        var loja = this.formLojas.getDataLoja();        
        console.log("Loja", loja);

        this.salvarLoja(loja);

    }

    salvarLoja(loja){
        const self = this;

        const sucesso = function(lojaCriado) {
            console.log("loja Criada",lojaCriado);
            self.carregaLojas();
            self.formLojas.limparFormulario();
        }

        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }
                
        this.lojaService.enviarLoja(loja, sucesso, trataErro);    

    }

    deletarLoja(id, event){
        const self = this;
        this.lojaService.deletarLoja(id, 
            function() {
                self.carregaLojas();
            },
            function(status) { 
                console.log(status);
            }
        );
    }

    carregaFormularioLoja(id, event){
        event.preventDefault();             
        
        const self = this;
        const ok = function(loja){
            self.formLojas.montarForm(loja);
        }
        const erro = function(status){
            console.log(status);
        }
        this.lojaService.buscarLojaPorId(id,ok,erro);   
    }

    editar(id,event){
        event.preventDefault();
    
        let loja = this.formLojas.getDataLoja();
        
        const self = this;

        this.lojaService.atualizarLoja(id,loja, 
            function() {
                self.formLojas.limparFormulario();
                self.carregaLojas();
            },
            function(status) {
                console.log(status);
            } 
        );

    }    
}