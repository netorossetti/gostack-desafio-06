# Desafio: Banco de dados e upload de arquivos no Node.js


## 🚀 Sobre o desafio
Nesse desafio, você deve continuar desenvolvendo a aplicação de gestão de transações, treinando o que você aprendeu até agora no Node.js junto ao TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

Essa será uma aplicação que deve armazenar transações financeiras de entrada e saída e permitir o cadastro e a listagem dessas transações, além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv.

## Rotas da aplicação
Agora que você já está com o template clonado e pronto para continuar, você deve verificar os arquivos da pasta src e completar onde não possui código com o código para atingir os objetivos de cada rota.

<ul>
<li><strong><code>POST /transactions</code></strong>: A rota deve receber <code>title</code>, <code>value</code>, <code>type</code>, e <code>category</code> dentro do corpo da requisição, sendo o <code>type</code> o tipo da transação, que deve ser <code>income</code> para entradas (depósitos) e <code>outcome</code> para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos <code>id</code>, <code>title</code>, <code>value</code>, <code>type</code>, <code>category_id</code>, <code>created_at</code>, <code>updated_at</code>.</li>
</ul>
<p><strong>Dica</strong>: Para a categoria, você deve criar uma nova tabela, que terá os campos <code>id</code>, <code>title</code>, <code>created_at</code>, <code>updated_at</code>.</p>
<p><strong>Dica 2</strong>: Antes de criar uma nova categoria, sempre verifique se já existe uma categoria com o mesmo título. Caso ela exista, use o <code>id</code> já existente no banco de dados.</p>
<div class="highlight highlight-source-json"><pre>{
  <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Salário<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>value<span class="pl-pds">"</span></span>: <span class="pl-c1">3000</span>,
  <span class="pl-s"><span class="pl-pds">"</span>type<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>income<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>category<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Alimentação<span class="pl-pds">"</span></span>
}</pre></div>
<ul>
<li><strong><code>GET /transactions</code></strong>: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor da soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto o seguinte formato:</li>
</ul>
<div class="highlight highlight-source-json"><pre>{
  <span class="pl-s"><span class="pl-pds">"</span>transactions<span class="pl-pds">"</span></span>: [
    {
      <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Salário<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>value<span class="pl-pds">"</span></span>: <span class="pl-c1">4000</span>,
      <span class="pl-s"><span class="pl-pds">"</span>type<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>income<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>category<span class="pl-pds">"</span></span>: {
        <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Salary<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
      },
      <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
    },
    {
      <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Freela<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>value<span class="pl-pds">"</span></span>: <span class="pl-c1">2000</span>,
      <span class="pl-s"><span class="pl-pds">"</span>type<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>income<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>category<span class="pl-pds">"</span></span>: {
        <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Others<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
      },
      <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
    },
    {
      <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Pagamento da fatura<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>value<span class="pl-pds">"</span></span>: <span class="pl-c1">4000</span>,
      <span class="pl-s"><span class="pl-pds">"</span>type<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>outcome<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>category<span class="pl-pds">"</span></span>: {
        <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Others<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
      },
      <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
    },
    {
      <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Cadeira Gamer<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>value<span class="pl-pds">"</span></span>: <span class="pl-c1">1200</span>,
      <span class="pl-s"><span class="pl-pds">"</span>type<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>outcome<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>category<span class="pl-pds">"</span></span>: {
        <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>uuid<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Recreation<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
      },
      <span class="pl-s"><span class="pl-pds">"</span>created_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>,
      <span class="pl-s"><span class="pl-pds">"</span>updated_at<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2020-04-20T00:00:49.620Z<span class="pl-pds">"</span></span>
    }
  ],
  <span class="pl-s"><span class="pl-pds">"</span>balance<span class="pl-pds">"</span></span>: {
    <span class="pl-s"><span class="pl-pds">"</span>income<span class="pl-pds">"</span></span>: <span class="pl-c1">6000</span>,
    <span class="pl-s"><span class="pl-pds">"</span>outcome<span class="pl-pds">"</span></span>: <span class="pl-c1">5200</span>,
    <span class="pl-s"><span class="pl-pds">"</span>total<span class="pl-pds">"</span></span>: <span class="pl-c1">800</span>
  }
}</pre></div>
<p><strong>Dica</strong>: Dentro de balance, o income é a soma de todos os valores das transações com <code>type</code> income. O outcome é a soma de todos os valores das transações com <code>type</code> outcome, e o total é o valor de <code>income - outcome</code>.</p>
<p><strong>Dica 2</strong>: Para fazer a soma dos valores, você pode usar a função <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" rel="nofollow">reduce</a> para agrupar as transações pela propriedade <code>type</code>, assim você irá conseguir somar todos os valores com facilidade e obter o retorno do <code>balance</code>.</p>
<ul>
<li><strong><code>DELETE /transactions/:id</code></strong>: A rota deve deletar uma transação com o <code>id</code> presente nos parâmetros da rota;</li>
</ul>
<ul>
<li><strong><code>POST /transactions/import</code></strong>: A rota deve permitir a importação de um arquivo com formato <code>.csv</code> contendo as mesmas informações necessárias para criação de uma transação <code>id</code>, <code>title</code>, <code>value</code>, <code>type</code>, <code>category_id</code>, <code>created_at</code>, <code>updated_at</code>, onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados, e por fim retorne todas as <code>transactions</code> que foram importadas para seu banco de dados. O arquivo csv, deve seguir o seguinte <a href="/rocketseat-education/bootcamp-gostack-desafios/blob/master/desafio-database-upload/assets/file.csv">modelo</a></li>
</ul>
