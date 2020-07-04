<?php
    include_once 'Loja.php';
    include_once 'Produto.php';
	include_once 'PDOFactory.php';

    class ProdutoDAO
    {
        public function inserir(Produto $produto)
        {
            $qInserir = "INSERT INTO produto(nome,preco,loja_id) VALUES (:nome,:preco,:loja_id)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":nome",$produto->nome);
            $comando->bindParam(":preco",$produto->preco);
            $comando->bindParam(":loja_id",$produto->loja->id);
            $comando->execute();
            $produto->id = $pdo->lastInsertId();
            return $produto;
        }

        public function deletar($id)
        {
            $qDeletar = "DELETE from produto WHERE id=:id";            
            $produto = $this->buscarPorId($id);
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
            return $produto;
        }

        public function atualizar(Produto $produto)
        {
            $qAtualizar = "UPDATE produto SET nome=:nome, preco=:preco, loja_id=:loja_id WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":nome",$produto->nome);
            $comando->bindParam(":preco",$produto->preco);
            $comando->bindParam(":loja_id",$produto->loja->id);
            $comando->bindParam(":id",$produto->id);
            $comando->execute();    
            return($produto);    
        }

        public function listar()
        {
		    $query = 'SELECT produto.id as prodId, produto.nome prodNome, produto.preco prodPreco, loja.id lojaId, loja.nome lojaNome FROM produto INNER JOIN loja ON produto.marca_id = loja.id';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $produtos=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $produtos[] = new Produto($row->prodId,$row->prodNome,$row->prodPreco, new Loja($row->lojaId,$row->lojaNome));
            }
            return $produtos;
        }

        public function buscarPorId($id)
        {
            $query = 'SELECT produto.id as prodId, produto.nome prodNome, produto.preco prodPreco, loja.id lojaId, loja.nome lojaNome FROM produto INNER JOIN loja ON produto.loja_id = loja.id WHERE produto.id=:id';
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
            if($result)
                return new Produto($result->prodId,$result->prodNome,$result->prodPreco, new Loja($result->lojaId,$result->lojaNome));
            else
                return null;
        }
    }
?>