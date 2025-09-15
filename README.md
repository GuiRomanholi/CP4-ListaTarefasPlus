# Projeto: Lista Tarefas Plus

Projeto desenvolvido para a disciplina de Mobile Application Development do curso de Tecnologia em Desenvolvimento de Sistemas da FIAP.

## Integrantes do Grupo

- Luiz Eduardo Da Silva Pinto - RM: 555213
- Guilherme Romanholi Santos - RM: 557462
- Erick Alves - RM: 556862

## Funcionalidades

O aplicativo "Lista Tarefas Plus" cumpre todos os requisitos obrigatórios do Checkpoint 4:

- [x] **Autenticação Firebase:** Login com E-mail/Senha e Google.
- [x] **Login Persistente:** O usuário continua logado mesmo após fechar o app.
- [x] **Firestore:** Armazenamento de tarefas por usuário, com sincronização em tempo real.
- [x] **CRUD de Tarefas:** Funcionalidades para Criar, Ler, Atualizar (marcar como concluída e editar) e Deletar tarefas.
- [x] **Tema Claro/Escuro:** Troca de tema com persistência usando AsyncStorage.
- [x] **Internacionalização (i18n):** Suporte para Português (pt-BR) e Inglês (en-US) com troca dinâmica.
- [x] **Notificações Locais:** Agendamento de notificações para alertar sobre o vencimento de tarefas.
- [x] **TanStack Query:** Consumo de uma API externa de citações motivacionais.

## Tecnologias e Bibliotecas Utilizadas

- **Expo**
- **React Native**
- **TypeScript**
- **Firebase (Auth & Firestore)**
- **Expo Router** (para navegação)
- **React i18next** (para internacionalização)
- **@tanstack/react-query** (para fetching de dados da API)
- **Expo Notifications** (para notificações locais)
- **@react-native-async-storage/async-storage** (para persistência do tema)

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/GuiRomanholi/CP4-ListaTarefasPlus.git](https://github.com/GuiRomanholi/CP4-ListaTarefasPlus.git)
    ```
2.  **Acesse a pasta do projeto:**
    ```bash
    cd CP4-ListaTarefasPlus
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Execute o projeto:**
    ```bash
    npx expo start
    ```

5.  Leia o QR Code com o aplicativo Expo Go no seu celular.