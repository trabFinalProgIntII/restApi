<?php
    include_once 'Loja.php';

    class Produto {
        public $id;
        public $nome;
        public $preco;
        public $marca;

        function __construct($id, $nome, $preco, Loja $loja){
            $this->id = $id;
            $this->nome = $nome;
            $this->preco = $preco;
            $this->loja = $loja;
        }
    }
?>