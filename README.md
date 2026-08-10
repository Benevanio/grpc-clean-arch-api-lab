# 🚀 API gRPC em Node.js com Clean Architecture

Uma API gRPC de alta performance desenvolvida em Node.js, estruturada com os princípios da Clean Architecture para garantir isolamento das regras de negócio, baixo acoplamento e alta manutenibilidade.

## 1) 🧭 Titulo do Projeto & Descricao

Este projeto demonstra como organizar uma API gRPC com foco em separação de responsabilidades entre domínio, apresentação e infraestrutura.

### Objetivos principais

- Regras de negócio independentes de framework
- Facilidade para evoluir casos de uso sem impacto direto em transporte/protocolo
- Estrutura pronta para trocar repositorio fake por banco real no futuro

## 2) 🛠️ Tecnologias Utilizadas

- Node.js
- gRPC
- @grpc/grpc-js
- @grpc/proto-loader

### Stack tecnica (resumo)

| Camada | Tecnologia | Finalidade |
|---|---|---|
| Runtime | Node.js | Execução do servidor |
| Transporte RPC | gRPC + @grpc/grpc-js | Comunicação de alta performance |
| Contrato | .proto + @grpc/proto-loader | Definição e carregamento do schema |

## 3) 🧱 Estrutura de Pastas (Clean Architecture)

```text
grpc-clean-arch-api/
├─ package.json
├─ src/
│  ├─ domain/
│  │  ├─ entities/
│  │  │  └─ user.js
│  │  └─ use-cases/
│  │     └─ get-user-by-id.js
│  ├─ presentation/
│  │  └─ controllers/
│  │     └─ user-controller.js
│  └─ infrastructure/
│     ├─ grpc/
│     │  ├─ proto/
│     │  │  └─ user.proto
│     │  └─ servers/
│     │     └─ server.js
│     └─ repositories/
│        └─ fake-user-repository.js
```

### Papel de cada camada

| Camada | Caminho | Responsabilidade |
|---|---|---|
| Domain | src/domain | Entidades e casos de uso (regras de negócio puras) |
| Presentation | src/presentation | Controladores que adaptam entradas do gRPC para os casos de uso |
| Infrastructure | src/infrastructure | Servidor gRPC, contrato .proto e repositorios (incluindo banco fake) |

## 4) ▶️ Como Executar o Projeto

### Passo 1: Clonar o repositório (ou criar as pastas)

```bash
git clone <URL_DO_REPOSITORIO>
cd grpc-clean-arch-api
```

Se você estiver criando do zero, mantenha a estrutura de pastas conforme a seção anterior.

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Iniciar o servidor gRPC

```bash
npm start
```

Servidor em execução na porta `50051`.

## 5) 🧪 Como Testar a API (Clientes)

### Opcao A: 📬 Testar com Postman (visual)

1. Abra o Postman e crie uma nova requisição gRPC.
2. Informe o endereço do servidor: `localhost:50051`.
3. Importe o arquivo `.proto` em `src/infrastructure/grpc/proto/user.proto`.
4. Selecione o serviço `UserService` e o método `GetUserById`.
5. Envie um payload como:

```json
{
	"id": "1"
}
```

### Opcao B: 💻 Script cliente em Node.js

Crie um arquivo chamado `client-test.js` na raiz do projeto:

```js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, 'src/infrastructure/grpc/proto/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService(
	'localhost:50051',
	grpc.credentials.createInsecure()
);

client.GetUserById({ id: '1' }, (err, response) => {
	if (err) {
		console.error('Erro na chamada gRPC:', err.message);
		return;
	}

	console.log('Resposta:', response);
});
```

Executar:

```bash
node client-test.js
```

## 6) 📜 Definição do Contrato (.proto)

Arquivo: `src/infrastructure/grpc/proto/user.proto`

```proto
syntax = "proto3";

package user;

service UserService {
	rpc GetUserById (UserRequest) returns (UserResponse);
}

message UserRequest {
	string id = 1;
}

message UserResponse {
	string id = 1;
	string name = 2;
	string email = 3;
}
```

## 📌 Observacoes

- Projeto ideal para estudar Clean Architecture aplicada a APIs gRPC.
- O repositório fake pode ser substituído por qualquer banco (SQL/NoSQL) sem alterar o domínio.
- Para desenvolvimento com recarga automática, utilize:

```bash
npm run dev
```

## ✅ Status

| Item | Situação |
|---|---|
| Servidor gRPC | ✅ Pronto |
| Contrato .proto | ✅ Documentado |
| Exemplo de cliente | ✅ Incluido |
| Estrutura Clean Architecture | ✅ Aplicada |
