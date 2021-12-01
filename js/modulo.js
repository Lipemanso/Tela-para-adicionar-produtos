class Produtos{
    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        
    }

    salvar(){

        let produto = this.lerDados();

        if(this.validaCampo(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            }else{
                this.atualizar(this.editId, produto)
            }
        }
        this.listarTabela();
       this.cancelar();
        
    }

    listarTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            
            let tr = tbody.insertRow();
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();
            
            

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco;
            
            td_id.classList.add('center');
            td_produto.classList.add('center');
            td_preco.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = "img/editar-documento.png";
            imgEdit.setAttribute("onclick","produtos.editaProd("+JSON.stringify(this.arrayProdutos[i])+")");

            let imgDelete = document.createElement('img');
            imgDelete.src = "img/deletar-lixeira.png";
            imgDelete.setAttribute("onclick","produtos.deletar("+this.arrayProdutos[i].id+")");
            
            
            
            
           
            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)
            
            
        }
    }
 
   

    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for( let i = 0; i < this.arrayProdutos.length; i++){

            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
                document.getElementById("btn1").innerHTML = "Salvar"
            }
        }
    }

    editaProd(dados){
        
        this.editId = dados.id;
        
       let confirmarEdit = confirm("deseja editar o produto " + dados.nomeProduto + " ?")
       let mudarBtn = document.getElementById("btn1")
        if(confirmarEdit){
       
        document.getElementById("produto").value = dados.nomeProduto;
        document.getElementById("preco").value = dados.preco;
        mudarBtn.innerHTML = "Atualizar";

        }
        
         
    }
    lerDados(){
        let produto = {};

        produto.id = this.id;
        produto.nomeProduto = document.getElementById("produto").value;
        produto.preco = document.getElementById("preco").value;
        
        return produto;
    }

    validaCampo(produto){
        let msg ='';

        if(produto.nomeProduto == ''){
            msg += '-Informe o nome do produto.';
        }
        if(produto.preco == ''){
            msg += 'Informe o preço do produto.';
        }
        if(msg !=''){
            alert(msg);
            return false;
        }
        return true;
    }
 
    cancelar(){

        document.getElementById("produto").value = '';
        document.getElementById("preco").value = '';
        document.getElementById("btn1").innerHTML = "Salvar"
    }

    deletar(id){
        for(let i= 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                let confirmar = confirm("Deseja Deletar o produto?")
                if(confirmar == true){
                    this.arrayProdutos.splice(i,1)
                tbody.deleteRow(i);
                }
            }
        }
        
    }
 
}

let produtos = new Produtos();