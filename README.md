Projeto ITW 2023

# TODO:

Fazer uma grelha na caixa do jogo

Fazer uma versão do website para menos de 600 pixeis

# Prazos:

Site do jogo -> 9 de abril

Site + funcionamento -> 21 de maio

# Objetivo:

Criar um jogo Bejeweled

Ideia geral: Tabuleiro com joias
Alinhar 3 ou mais joias

## Requisitos essenciais:

### Jogadores

Modo individual (em cada jogo participa apenas 1 jogador)
Registo de dados de cada jogador em local storage do browser

### Tabuleiro

Dimensão 8x8, com joias de 7 tipos diferentes dispostas aleatoriamente
Objetivo a atingir, em termos do número de joias a eliminar
Tempo de jogo, pontos obtidos, quantas joias eliminadas
Botão de terminar o jogo

### Progressão no jogo

Alinhar 3 ou mais joias iguais na horizontal faz com que sejam eliminadas
As joias que estavam acima das eliminadas descem no tabuleiro
Novas joias aparecem no topo do tabuleiro, escolhidas aleatoriamente
Pontos obtidos por alinhamento de N joias iguais consecutivas: (N−3) + 1

### Interação

Trocar duas joias adjacentes, na **horizontal ou vertical**
Só possível se troca fizer alinhar 3 ou mais joias iguais, **na horizontal**
Pode ser usado o teclado ou o rato (um dos dispositivos de entrada)

### Fim de jogo

Ganha se atingir o objetivo de eliminar 20 ou mais joias do tabuleiro
Perde se ficar sem jogadas possíveis

### Estatísticas

Tabela com as 10 maiores pontuações e respetivos nomes dos jogadores

## Funcionalidades adicionais:

### Jogadores

Multijogador com tabuleiros lado-a-lado e tempo limite por jogada
Ex. jogador tem 15s para fazer uma jogada, depois passa ao próximo

### Tabuleiro

Tabuleiros maiores, com mais casas
Temas para fundos e peças (além das joias)
Joias especiais que, quando eliminadas, têm um impacto maior
Ex. eliminação de todas as joias na mesma linha ou coluna

### Outros modos de jogo

Máximo de pontos até ser atingido um limite de jogadas
Máximo de pontos dentro de um limite de tempo (com botão de pausa)

### Progressão no jogo

Verificar alinhamento de joias também na vertical

### Interação

Segundo dispositivo de entrada

### Fim do jogo

Se atingido o limite de jogadas ou o limite de tempo
Deteção automática da inexistência de jogadas possíveis
Pode ser usado botão para baralhar as peças do tabuleiro
Para poder continuar a jogar até atingido o limite de jogadas ou de tempo

### Estatísticas

Tabelas de pontuações para cada tipo de tabuleiro e modo de jogo
