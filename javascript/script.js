document.addEventListener("DOMContentLoaded", function () {
    let nodes = new vis.DataSet([]);
    let edges = new vis.DataSet([]);
    let network;

    const container = document.getElementById("mynetwork");
    const data = { nodes: nodes, edges: edges };
    const options = {
        interaction: {
            navigationButtons: true,
        },
        manipulation: {
            enabled: true,
            addNode: function (data, callback) {
                const label = prompt("Digite o rótulo para o nó:");
                if (label !== null && label !== "") {
                    data.label = label.toUpperCase();
                    callback(data);
                    showResult(`Adicionando Nó "${label}".`);
                }
            },
            addEdge: function (data, callback) {
                const fromNodeId = data.from;
                const toNodeId = data.to;
                
                // Adiciona uma janela modal para configurar a aresta
                const modal = document.createElement("div");
                modal.innerHTML = `
                    <p>Escolha o tipo de grafo:</p>
                    <button id="direcionadaButton">Direcionada</button>
                    <button id="naoDirecionadaButton">Não-Direcionada</button>
                    <input type="text" id="labelAresta" placeholder="Label da Aresta">
                    <button id="confirmaButton">Confirma</button>
                    <button id="closeModal">Fechar</button>
                `;
                modal.style.position = "fixed";
                modal.style.top = "50%";
                modal.style.left = "50%";
                modal.style.transform = "translate(-50%, -50%)";
                modal.style.backgroundColor = "white";
                modal.style.padding = "20px";
                modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
                document.body.appendChild(modal);

                // Adiciona eventos aos botões da janela modal
                const direcionadaButton = document.getElementById("direcionadaButton");
                const naoDirecionadaButton = document.getElementById("naoDirecionadaButton");
                const confirmaButton = document.getElementById("confirmaButton");
                const labelArestaInput = document.getElementById("labelAresta");

                naoDirecionadaButton.classList.add("active-button");

                closeModal.addEventListener("click", function () {
                    document.body.removeChild(modal);
                })

                direcionadaButton.addEventListener("click", function () {
                    direcionadaButton.classList.add("active-button");
                    naoDirecionadaButton.classList.remove("active-button");
                });

                naoDirecionadaButton.addEventListener("click", function () {
                    naoDirecionadaButton.classList.add("active-button");
                    direcionadaButton.classList.remove("active-button");
                });

                confirmaButton.addEventListener("click", function () {
                    const isDirected = direcionadaButton.classList.contains("active-button");
                    const labelAresta = labelArestaInput.value.trim();

                    if (isDirected || !isDirected) {
                        // Configura a aresta com base nas escolhas do usuário
                        data.label = labelAresta;
                        if (isDirected) {
                            data.arrows = { to: { enabled: true } };
                        }
                        callback(data);

                        // Fecha a janela modal
                        document.body.removeChild(modal);
                        showResult(`Aresta adicionada entre "${nodes.get(fromNodeId).label}" e "${nodes.get(toNodeId).label}"`);
                    } else {
                        // Mostra uma mensagem se nenhum botão foi selecionado
                        alert("Selecione o tipo de aresta (Direcionada ou Não-Direcionada)");
                    }
                });
            }
        },
    };

    const getOrderButton = document.getElementById("getOrderButton");
    const getSizeButton = document.getElementById("getSizeButton");

    getOrderButton.addEventListener("click", function () {
        const order = nodes.length;
        showResult(`A ordem do grafo é ${order}.`);
    });

    getSizeButton.addEventListener("click", function () {
        const size = edges.length;
        showResult(`O tamanho do grafo é ${size}.`);
    });

    const getAdjacentVerticesButton = document.getElementById("getAdjacentVerticesButton");

    getAdjacentVerticesButton.addEventListener("click", function () {
        // Obtém o ID do nó selecionado
        const selectedNodeId = network.getSelectedNodes()[0];

        // Adiciona uma janela modal para configurar a aresta
        const modal = document.createElement("div");
        modal.innerHTML = `
            <p>Escolha o tipo de grafo:</p>
            <button id="direcionadaButton">Direcionada</button>
            <button id="naoDirecionadaButton">Não-Direcionada</button>
            <button id="confirmaButton">Confirma</button>
            <button id="closeModal">Fechar</button>
        `;
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
        document.body.appendChild(modal);

        // Adiciona eventos aos botões da janela modal
        const direcionadaButton = document.getElementById("direcionadaButton");
        const naoDirecionadaButton = document.getElementById("naoDirecionadaButton");
        const confirmaButton = document.getElementById("confirmaButton");

        naoDirecionadaButton.classList.add("active-button");

        closeModal.addEventListener("click", function () {
            document.body.removeChild(modal);
        })

        direcionadaButton.addEventListener("click", function () {
            direcionadaButton.classList.add("active-button");
            naoDirecionadaButton.classList.remove("active-button");
        });

        naoDirecionadaButton.addEventListener("click", function () {
            naoDirecionadaButton.classList.add("active-button");
            direcionadaButton.classList.remove("active-button");
        });

        confirmaButton.addEventListener("click", function () {
            const isDirected = direcionadaButton.classList.contains("active-button");
            if (isDirected || !isDirected) {

                if (selectedNodeId !== undefined) {
                    // Obtém a lista de vértices adjacentes
                    const adjacentNodes = network.getConnectedNodes(selectedNodeId);
                    const adjacentEdges = network.getConnectedEdges(selectedNodeId);
                    const inEdges = adjacentEdges.filter(edgeId => edges.get(edgeId).to === selectedNodeId);
                    const outEdges = adjacentEdges.filter(edgeId => edges.get(edgeId).from === selectedNodeId);

                    // Grau do vértice
                    const degree = adjacentNodes.length;

                    // Grau de adjacência de entrada e saída
                    const inDegree = inEdges.length;
                    const outDegree = outEdges.length;

                    // Exibe a lista de vértices adjacentes e informações direcionadas
                    if (adjacentNodes.length > 0) {
                        let adjacentVerticesText = `Vértice selecionado: "${nodes.get(selectedNodeId).label}"`;
                        adjacentVerticesText += `<br>&nbsp&nbsp&nbsp&nbsp - Vértices adjacentes: ${adjacentNodes.map(nodeId => nodes.get(nodeId).label).join(", ")}`;
                        adjacentVerticesText += `<br>&nbsp&nbsp&nbsp&nbsp - Grau do vértice: ${degree}`;
                        if (isDirected) {
                            adjacentVerticesText += `<br>&nbsp&nbsp&nbsp&nbsp - Entradas: ${inEdges.map(edgeId => nodes.get(edges.get(edgeId).from).label).join(", ")}`;
                            adjacentVerticesText += `<br>&nbsp&nbsp&nbsp&nbsp - Grau de Entrada: ${inDegree}`;
                            adjacentVerticesText += `<br>&nbsp&nbsp&nbsp&nbsp - Saídas: ${outEdges.map(edgeId => nodes.get(edges.get(edgeId).to).label).join(", ")}`;    
                            adjacentVerticesText += `<br>&nbsp&nbsp&nbsp&nbsp - Grau de Saída: ${outDegree}`;
                        }
                        showResult(adjacentVerticesText);
                    } else {
                        alert(`O vértice "${nodes.get(selectedNodeId).label}" não tem vértices adjacentes.`);
                    }         
                } else {
                    alert("Selecione um vértice antes de obter os vértices adjacentes.");
                }
                // Fecha a janela modal
                document.body.removeChild(modal);
            } else {
                // Mostra uma mensagem se nenhum botão foi selecionado
                alert("Selecione o tipo de aresta (Direcionada ou Não-Direcionada)");
            }
        });
    });

    const verificarAdjacenciaButton = document.getElementById("verificarAdjacenciaButton");
    verificarAdjacenciaButton.addEventListener("click", function () {
        // Adiciona uma janela modal para inserir as labels dos nós
        const modal = document.createElement("div");
        modal.innerHTML = `
            <p>Insira as labels dos nós:</p>
            <input type="text" id="labelNode1" placeholder="Label do Nó 1">
            <input type="text" id="labelNode2" placeholder="Label do Nó 2">
            <button id="confirmaAdjacenciaButton">Confirma</button>
            <button id="closeModal">Fechar</button>
        `;
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
        document.body.appendChild(modal);

        // Adiciona eventos ao botão da janela modal
        const confirmaAdjacenciaButton = document.getElementById("confirmaAdjacenciaButton");
        const labelNode1Input = document.getElementById("labelNode1");
        const labelNode2Input = document.getElementById("labelNode2");

        closeModal.addEventListener("click", function () {
            document.body.removeChild(modal);
        })

        confirmaAdjacenciaButton.addEventListener("click", function () {
            const labelNode1 = labelNode1Input.value.trim();
            const labelNode2 = labelNode2Input.value.trim();

            // Obtém os identificadores dos nós com base nas labels
            const node1 = nodes.getIds({ filter: node => node.label === labelNode1 })[0];
            const node2 = nodes.getIds({ filter: node => node.label === labelNode2 })[0];

            if (node1 !== undefined && node2 !== undefined) {
                // Verifica se há uma aresta entre os dois vértices
                const arestaExistente = edges.get({
                    filter: function (item) {
                        return (item.from === node1 && item.to === node2) || (item.from === node2 && item.to === node1);
                    }
                }).length > 0;

                // Exibe o resultado
                if (arestaExistente) {
                    showResult(`Os vértices ${labelNode1} e ${labelNode2} são adjacentes.`);
                } else {
                    showResult(`Os vértices ${labelNode1} e ${labelNode2} não são adjacentes.`);
                }
            } else {
                alert("Labels dos nós não encontradas. Tente novamente.");
            }

            // Fecha a janela modal
            document.body.removeChild(modal);
        });
    });

    const caminhoMaisCurtoButton = document.getElementById("caminhoMaisCurtoButton");

    caminhoMaisCurtoButton.addEventListener("click", function () {
        // Abre a janela modal para o caminho mais curto
        const modal = document.createElement("div");
        modal.innerHTML = `
            <p>Digite os vértices para o caminho mais curto:</p>
            <input type="text" id="verticeOrigem" placeholder="Vértice de Origem">
            <input type="text" id="verticeDestino" placeholder="Vértice de Destino">
            <button id="calculaCaminhoButton">Calcular Caminho</button>
            <button id="closeModal">Fechar</button>
        `;
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
        document.body.appendChild(modal);

        // Adiciona eventos ao botão da janela modal
        const calculaCaminhoButton = document.getElementById("calculaCaminhoButton");
        const verticeOrigemInput = document.getElementById("verticeOrigem");
        const verticeDestinoInput = document.getElementById("verticeDestino");

        closeModal.addEventListener("click", function () {
            document.body.removeChild(modal);
        })

        calculaCaminhoButton.addEventListener("click", function () {
            const origemLabel = verticeOrigemInput.value.trim().toUpperCase();
            const destinoLabel = verticeDestinoInput.value.trim().toUpperCase();

            if (origemLabel !== "" && destinoLabel !== "") {
                // Encontrar o caminho mais curto e exibir os resultados
                const caminho = encontrarCaminhoMaisCurto(origemLabel, destinoLabel);
                if (caminho) {
                    const { custo, sequencia } = caminho;
                    showResult(`Caminho mais curto entre "${origemLabel}" e "${destinoLabel}":<br>Custo: ${custo}<br>Sequência: ${sequencia}`);
                } else {
                    alert(`Não foi possível encontrar um caminho entre "${origemLabel}" e "${destinoLabel}"`);
                }
            } else {
                alert("Por favor, preencha ambos os vértices.");
            }

            // Fecha a janela modal
            document.body.removeChild(modal);
        });
    });

    function encontrarCaminhoMaisCurto(origemLabel, destinoLabel) {
        const origemNodeId = nodes.getIds({ filter: node => node.label === origemLabel })[0];
        const destinoNodeId = nodes.getIds({ filter: node => node.label === destinoLabel })[0];

        const distancias = {};
        const predecessores = {};
        nodes.forEach(node => {
            distancias[node.id] = node.id === origemNodeId ? 0 : Infinity;
            predecessores[node.id] = null;
        });

        const naoVisitados = new Set(nodes.getIds());

        while (naoVisitados.size > 0) {
            const menorDistanciaNode = Array.from(naoVisitados).reduce((menor, nodeId) => {
                return distancias[nodeId] < distancias[menor] ? nodeId : menor;
            });

            naoVisitados.delete(menorDistanciaNode);

            const vizinhos = network.getConnectedNodes(menorDistanciaNode);
            for (const vizinho of vizinhos) {
                const aresta = edges.get({ filter: edge => (edge.from === menorDistanciaNode && edge.to === vizinho) || (edge.from === vizinho && edge.to === menorDistanciaNode) })[0];
                const novaDistancia = distancias[menorDistanciaNode] + (aresta && aresta.label ? parseFloat(aresta.label) : 1);

                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    predecessores[vizinho] = menorDistanciaNode;
                }
            }
        }

        const caminho = reconstruirCaminho(origemNodeId, destinoNodeId, predecessores);

        if (caminho) {
            const custo = distancias[destinoNodeId];
            const sequencia = caminho.map(nodeId => nodes.get(nodeId).label).join(" -> ");
            return { custo, sequencia };
        } else {
            return null;
        }
    }

    function reconstruirCaminho(origem, destino, predecessores) {
        const caminho = [];
        let atual = destino;
        while (atual !== null) {
            caminho.unshift(atual);
            atual = predecessores[atual];
        }
        return caminho.length > 1 ? caminho : null;
    }

    const calcularExcentricidadeButton = document.getElementById("calcularExcentricidade");

    calcularExcentricidadeButton.addEventListener("click", function () {
        // Abre a janela modal para a excentricidade
        const modal = document.createElement("div");
        modal.innerHTML = `
            <p>Digite o vértice para calcular a excentricidade:</p>
            <input type="text" id="verticeSelecionado" placeholder="Vértice Selecionado">
            <button id="calculaExcentricidadeButton">Calcular Excentricidade</button>
            <button id="closeModal">Fechar</button>
        `;
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
        modal.style.display = "block";

        document.body.appendChild(modal);

        // Adiciona eventos ao botão da janela modal
        const calculaExcentricidadeButton = document.getElementById("calculaExcentricidadeButton");
        const closeModal = document.getElementById("closeModal");
        const verticeSelecionadoInput = document.getElementById("verticeSelecionado");

        closeModal.addEventListener("click", function () {
            document.body.removeChild(modal);
        })

        calculaExcentricidadeButton.addEventListener("click", function () {
            const verticeSelecionadoLabel = verticeSelecionadoInput.value.trim().toUpperCase();


            if (verticeSelecionadoLabel !== "") {
                // Encontrar a excentricidade e exibir os resultados
                const excentricidade = calcularExcentricidade(verticeSelecionadoLabel);
                showResult(`Excentricidade do vértice "${verticeSelecionadoLabel}": ${excentricidade}`);
            } else {
                alert("Por favor, preencha o vértice.");
            }

            // Fecha a janela modal
            document.body.removeChild(modal);
        });
    });

    function calcularExcentricidade(verticeLabel) {
        const verticeNodeId = nodes.getIds({ filter: node => node.label === verticeLabel })[0];

        const distancias = {};
        nodes.forEach(node => {
            distancias[node.id] = node.id === verticeNodeId ? 0 : Infinity;
        });

        const naoVisitados = new Set(nodes.getIds());

        while (naoVisitados.size > 0) {
            const menorDistanciaNode = Array.from(naoVisitados).reduce((menor, nodeId) => {
                return distancias[nodeId] < distancias[menor] ? nodeId : menor;
            });

            naoVisitados.delete(menorDistanciaNode);

            const vizinhos = network.getConnectedNodes(menorDistanciaNode);
            for (const vizinho of vizinhos) {
                const aresta = edges.get({
                    filter: edge =>
                        (edge.from === menorDistanciaNode && edge.to === vizinho) ||
                        (edge.from === vizinho && edge.to === menorDistanciaNode),
                })[0];
                const novaDistancia = distancias[menorDistanciaNode] + (aresta && aresta.label ? parseFloat(aresta.label) : 1);

                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                }
            }
        }

        // Encontra a maior distância, que representa a excentricidade
        let excentricidade = 0;
        nodes.forEach(function (node) {
            excentricidade = Math.max(excentricidade, distancias[node.id]);
        });

        return excentricidade === Infinity ? "Infinito" : excentricidade;
    }

    openModalButton.addEventListener("click", function () {
        // Adiciona uma janela modal para inserir as arestas
        const modal = document.createElement("div");
        modal.innerHTML = `
            <p>Escolha o tipo de grafo:</p>
            <button id="direcionadoButton">Direcionado</button>
            <button id="naoDirecionadoButton" class="active-button">Não Direcionado</button>
            <textarea id="inputArestas" placeholder="Digite as arestas"></textarea>
            <button id="gerarGrafoButton">Gerar Grafo</button>
            <button id="closeModal">Fechar</button>
        `;
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
        document.body.appendChild(modal);

        const direcionadoButton = document.getElementById("direcionadoButton");
        const naoDirecionadoButton = document.getElementById("naoDirecionadoButton");
        const gerarGrafoButton = document.getElementById("gerarGrafoButton");

        closeModal.addEventListener("click", function () {
            document.body.removeChild(modal);
        })

        direcionadoButton.addEventListener("click", function () {
            direcionadoButton.classList.add("active-button");
            naoDirecionadoButton.classList.remove("active-button");
        });

        naoDirecionadoButton.addEventListener("click", function () {
            naoDirecionadoButton.classList.add("active-button");
            direcionadoButton.classList.remove("active-button");
        });

        gerarGrafoButton.addEventListener("click", function () {
            const arestasText = document.getElementById("inputArestas").value.trim().split("\n");
            const isDirecionado = direcionadoButton.classList.contains("active-button");

            // Limpa os conjuntos de nós e arestas
            nodes.clear();
            edges.clear();

            // Adiciona os nós ao conjunto para garantir que não há nós duplicados
            const uniqueNodes = new Set();

            // Adiciona as arestas com base no texto inserido e tipo de grafo
            arestasText.forEach(arestaText => {
                const [vertices, peso] = arestaText.split(":");
                const [vertice1, vertice2] = vertices.split("-");

                // Adiciona os nós ao conjunto
                uniqueNodes.add(vertice1);
                uniqueNodes.add(vertice2);

                // Adiciona as arestas
                edges.add({ from: vertice1, to: vertice2, label: peso, arrows: isDirecionado ? { to: { enabled: true } } : undefined });
            });

            // Adiciona os nós ao grafo
            uniqueNodes.forEach(node => {
                nodes.add({ id: node, label: node });
            });

            // Fecha a janela modal
            document.body.removeChild(modal);

            // Atualiza o grafo na tela
            network.setData({ nodes: nodes, edges: edges });
        });

    });

    const calcularDiametroButton = document.getElementById("calcularDiametroButton");

    calcularDiametroButton.addEventListener("click", function () {
        const diametro = calcularDiametro();
        showResult(`O diâmetro do grafo é ${diametro}`);
    });

    function calcularDiametro() {
        let diametro = 0;

        // Itera sobre todos os pares de vértices e calcula a distância entre eles
        nodes.forEach(function (node1) {
            nodes.forEach(function (node2) {
                if (node1.id !== node2.id) {
                    const distancia = encontrarCaminhoMaisCurto(node1.label, node2.label)?.custo || Infinity;
                    diametro = Math.max(diametro, distancia);
                }
            });
        });

        return diametro === Infinity ? "Infinito" : diametro;
    }

    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const csvContent = e.target.result;
                processarCSV(csvContent);
            };

            reader.onerror = function (error) {
                console.error("Erro durante a leitura do arquivo:", error);
            };

            reader.readAsText(file);
        }
    });

    function processarCSV(csvContent) {
        const linhas = csvContent.split("\n");

        // Ignora a primeira linha (cabeçalhos)
        for (let i = 1; i < linhas.length; i++) {
            const linha = linhas[i].trim();

            // Verifica se a linha não está vazia e contém pelo menos três valores
            if (linha.length > 0 && linha.split(",").length >= 3) {
                const valores = linha.split(",");
                const vertice1 = valores[0].trim();
                const vertice2 = valores[1].trim();
                const peso = parseFloat(valores[2].trim());

                console.log(`Linha ${i}: Vertice1=${vertice1}, Vertice2=${vertice2}, Peso=${peso}`);

                // Adiciona ou atualiza os vértices
                nodes.update({ id: vertice1, label: vertice1 });
                nodes.update({ id: vertice2, label: vertice2 });

                edges.add({ from: vertice1, to: vertice2, label: peso.toString() });
            }
        }

        // Exibe a quantidade de nós e arestas após o processamento
        console.log(`Total de nós: ${nodes.length}, Total de arestas: ${edges.length}`);

        network.setData({ nodes: nodes, edges: edges });
    }

    function showResult(message) {
        document.getElementById("result-container").innerHTML = message;
    }

    network = new vis.Network(container, data, options);
});

function showQuadro() {
    div = document.getElementById("quadro1");

    if(div.style.display == "none"){
        div.style.display = "block";
    } else {
        div.style.display = "block";
    }
}