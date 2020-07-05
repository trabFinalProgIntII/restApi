class ProdutoController{  
    constructor() {
        this.lojaService = new LojaService();
        this.produtoService = new ProdutoService(); 
        this.tabelaProdutos = new TabelaProdutos(this,"main");
        this.formProdutos = new FormProdutos(this,"main");
    } 

    inicializa(){
        this.carregarProdutos();
    }

    carregarFormulario(){
        event.preventDefault();

        const self = this;
        this.lojaService.buscarLojas(
            function(marcas) 
            { 
                self.formProdutos.montarForm(marcas); 
            },
            function(statusCode) {
                console.log("Erro - status:",statusCode);
            }
        )
        
    }

    carregarProdutos(){
        const self = this;
        const sucesso = function(produtos){
            self.tabelaProdutos.montarTabela(produtos);
        }

        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }

        this.produtoService.buscarProdutos(sucesso, trataErro);
    }

    limpar(event){
        event.preventDefault();
        this.formProdutos.limparFormulario();
        this.carregarProdutos();
    }
    
    salvar(event){        
        event.preventDefault();
        var produto = this.formProdutos.getDataProduto();        
        console.log("Produto", produto);

        this.salvarProduto(produto);

    }

    salvarProduto(produto){
        const self = this;

        const sucesso = function(produtoCriado) {
            console.log("Produto Criado",produtoCriado);
            self.carregarProdutos();
            self.formProdutos.limparFormulario();
        }

        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }
                
        this.produtoService.enviarProduto(produto, sucesso, trataErro);    

    }

    deletarProduto(id, event){
        const self = this;
        this.produtoService.deletarProduto(id, 
            function() {
                self.carregarProdutos();
            },
            function(status) { 
                console.log(status);
            }
        );
    }

    carregaFormularioComProduto(id, event){
        event.preventDefault();             
        
        const self = this;
        const ok = function(produto){
            self.marcaService.buscarMarcas(
                function(marcas) 
                { 
                    self.formProdutos.montarForm(marcas,produto); 
                },
                function(statusCode) {
                    console.log("Erro - status:",statusCode);
                }
            )
        }
        const erro = function(status){
            console.log(status);
        }

        this.produtoService.buscarProduto(id,ok,erro);   
    }

    editar(id,event){
        event.preventDefault();
    
        let produto = this.formProdutos.getDataProduto();
        
        const self = this;

        this.produtoService.atualizarProduto(id,produto, 
            function() {
                self.formProdutos.limparFormulario();
                self.carregarProdutos();
            },
            function(status) {
                console.log(status);
            } 
        );

    }
}