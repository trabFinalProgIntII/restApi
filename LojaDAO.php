<?php
    include_once 'Loja.php';
	include_once 'PDOFactory.php';

    class LojaDao
    {
        public function inserir(Loja $loja)
        {
            $qInserir = "INSERT INTO lojas(nome, endereco, telefone) VALUES (:nome, :endereco,:telefone)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":nome",$loja->nome);
            $comando->bindParam(":telefone",$loja->telefone);
            $comando->bindParam(":endereco",$loja->endereco);
            $comando->execute();
            $loja->id = $pdo->lastInsertId();
            return $loja;
        }

        public function deletar($id)
        {
            $qDeletar = "DELETE from lojas WHERE id=:id";            
            $loja = $this->buscarPorId($id);
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
            return $loja;
        }

        public function atualizar(Loja $loja)
        {
            $qAtualizar = "UPDATE lojas SET nome=:nome, endereco=:endereco,telefone=:telefone WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":nome",$loja->nome);
            $comando->bindParam(":telefone",$loja->telefone);
            $comando->bindParam(":endereco",$loja->endereco);
            $comando->bindParam(":id",$loja->id);
            $comando->execute();    
            return($loja);    
        }

        public function listar()
        {
		    $query = 'SELECT * FROM lojas';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $lojas=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $lojas[] = new Loja($row->id,$row->nome,$row->endereco, $row->telefone);
            }
            return $lojas;
        }

        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM lojas WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Loja($result->id,$result->nome,$result->endereco, $result->telefone,);
        }
    }
?>