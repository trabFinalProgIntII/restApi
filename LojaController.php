<?php

include_once('Loja.php');
include_once('LojaDAO.php');

class LojaController {

    public function listar($request, $response, $args){
        $dao= new LojaDAO;    
        $Lojas = $dao->listar();
    
        return $response->withJSON($Lojas);
    
    }

    public function inserir($request, $response, $args) {
        $data = $request->getParsedBody();
        $Loja = new Loja(0,$data['nome'],$data['endereco'],$data['telefone']);
    
        $dao = new LojaDAO;
        $Loja = $dao->inserir($Loja);
    
        return $response->withJson($Loja,201);
    }

    public function buscarPorId($request, $response, $args) {
        $id = $args['id'];
        
        $dao= new LojaDAO;    
        $Loja = $dao->buscarPorId($id);
        
        return $response->withJson($Loja);
    }
    
    public function atualizar($request, $response, $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();
        $Loja = new Loja($id, $data['nome'],$data['endereco'],$data['telefone']);
    
        $dao = new LojaDAO;
        $Loja = $dao->atualizar($Loja);
    
        return $response->withJson($Loja);
    }
    
    public function deletar($request, $response, $args) {
        $id = $args['id'];
    
        $dao = new LojaDAO;
        $Loja = $dao->deletar($id);
    
        return $response->withJson($Loja);
    }
}
?>