# 🕸️ GraphsOnline - O Mundo dos Grafos com os Brenetes! 🎉

## Olá, pessoal! 👋

Nós somos os **Brenetes**, e estamos aqui para mostrar que nada é impossível, desde que se tenha Grafos (a não ser enriquecer urânio e produzir bombas caseiras)! 🕵️‍♂️💻

### O que é isso? 🤔

**GraphsOnline** é uma aplicação web que permite você explorar o fascinante (ou quase) mundo dos grafos! Crie, visualize e manipule  nós e grafos como se não houvesse amanhã (ou pelo menos até a próxima deadline). Com nossa incrível interface, você pode descobrir tudo sobre seus grafos favoritos (se é que você tem um), como ordem, tamanho, adjacências, e até o menor caminho entre dois nós! 🌟

### Funcionalidades 🛠️

- **Adicionar Nós**: Crie seus próprios nós e dê a eles um nome que faça seus amigos chorarem de emoção! 😢
- **Adicionar Arestas**: Conecte os nós de forma direcionada ou não-direcionada (a escolha é sua, jovem padawan). 🥷
- **Verificação de Adjacência**: Quer saber se dois nós são brothers? Use nossa função de verificação de adjacência e descubra! 👯‍♂️
- **Caminho Mais Curto**: Não sabe como chegar em um nó? Calcule o menor caminho e evite ficar perdido no nesse mundão vei, sem porteira! 🗺️
- **Excentricidade e Diâmetro**: Porque todo grafo precisa de um pouco de excentricidade, certo? 🤪
- **Importação de CSV**: Se você é do time "importar tudo" ou do time "Não irei fazer meu grafo na mão", temos suporte para arquivos CSV e Grafos de Texto. Prepare-se para importar seu mundo de grafos (coisa que todo nerd tem)! 📈

### Como a Implementação Foi Feita 🧑‍💻

A aplicação **GraphsOnline** foi desenvolvida utilizando as seguintes tecnologias e bibliotecas:

#### 1. HTML
A estrutura básica da aplicação é definida em HTML. Um exemplo de como a interface é configurada:
```html
<button id="imprimirGrafoButton">Imprimir Grafo</button>
<div id="mynetwork"></div>
```

#### 2. CSS
Estilização da aplicação para garantir uma aparência agradável e responsiva:

```css
#mynetwork {
    width: 800px;
    height: 600px;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

#### 3. JavaScript
A lógica principal da aplicação, incluindo manipulação de grafos e eventos do usuário. Um exemplo do código que inicializa a rede com a biblioteca Vis.js:

```javascript
const network = new vis.Network(container, data, options);
```

#### 4. Vis.js
Usada para a criação e visualização dos grafos. Aqui está um exemplo de como adicionar nós e arestas:

```javascript
nodes.add({ id: '1', label: 'Nó 1' });
edges.add({ from: '1', to: '2', label: 'Aresta de 1 a 2' });
```

#### 5. html2canvas
Usada para capturar a visualização do grafo e gerar uma imagem. Abaixo está um exemplo de como a biblioteca é utilizada para imprimir o grafo:

```javascript
const imprimirGrafoButton = document.getElementById("imprimirGrafoButton");

imprimirGrafoButton.addEventListener("click", function () {
    html2canvas(document.getElementById("mynetwork")).then(function (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'grafo.png'; // Nome do arquivo de imagem
        link.click(); // Simula o clique no link para iniciar o download
    }).catch(function (error) {
        console.error("Erro ao capturar o grafo:", error);
    });
});
```

### Como Começar? 🚀

1. Clone o repositório: 
   ```bash
   git clone https://github.com/AleixoCv/BrenetesGraphOnline.git

2. Abra o arquivo index.html no seu navegador (não faça pataquada, não abre o código no VS Code, tu sabe que não vai funcionar).

3. Divirta-se (ou tente) criando seus grafos e explorando todas as funcionalidades!

### Dicas 🤭

- Se você não tem uma ideia de como usar a aplicação (assim como quem fez), não se preocupe! Tente criar um grafo de amizade entre você e seus amigos! 😅
- Não se esqueça de testar a funcionalidade de menor caminho - você pode se surpreender com os resultados (ou não, mas é divertido assim mesmo, ou não também, tu é chato hein, mano).

### Contribuições 👐

Se você tem ideias de como melhorar o **GraphsOnline**, sinta-se à vontade para abrir um pull request! Vamos adorar ver suas contribuições e quem sabe adicionar mais "poderes" aos nossos grafos!