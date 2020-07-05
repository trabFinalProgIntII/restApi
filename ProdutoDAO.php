<?php
    include_once 'Loja.php';
    include_once 'Produto.php';
	include_once 'PDOFactory.php';

    class ProdutoDAO
    {
        public function inserir(Produto $produto)
        {
            $qInserir = "INSERT INTO produtos(nome,preco,loja_id) VALUES (:nome,:preco,:loja_id)";            
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
            $qDeletar = "DELETE from produtos WHERE id=:id";            
            $produto = $this->buscarPorId($id);
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
            return $produto;
        }

        public function atualizar(Produto $produto)
        {
            $qAtualizar = "UPDATE produtos SET nome=:nome, preco=:preco, loja_id=:loja_id WHERE id=:id";            
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
		    $query = 'SELECT produtos.id as prodId, produtos.nome prodNome, produtos.preco prodPreco, lojas.id lojaId, lojas.nome lojaNome, lojas.endereco lojaEnd, lojas.telefone lojaTel FROM produtos INNER JOIN lojas ON produtos.loja_id = lojas.id';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $produtos=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $produtos[] = new Produto($row->prodId,$row->prodNome,$row->prodPreco, new Loja($row->lojaId,$row->lojaNome,$row->lojaEnd, $row->lojaTel));
            }
            return $produtos;
        }

        public function buscarPorId($id)
        { 
            $query = 'SELECT produtos.id as prodId, produtos.nome prodNome, produtos.preco prodPreco, lojas.id lojaId, lojas.nome lojaNome, lojas.endereco lojaEnd, lojas.telefone lojaTel FROM produtos INNER JOIN lojas ON produtos.loja_id = lojas.id WHERE produtos.id=:id';
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
            if($result)
                return new Produto($result->prodId,$result->prodNome,$result->prodPreco, new Loja($result->lojaId,$result->lojaNome,$result->lojaEnd, $result->lojaTel));
            else
                return null;
        }
    }
?>