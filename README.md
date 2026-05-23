# PointGov — Registro de Problemas Urbanos

Aplicativo móvel de **cidadania ativa**: permite que o cidadão registre, acompanhe
e atualize problemas urbanos do seu bairro — **iluminação pública**, **buracos nas
vias** e **focos do mosquito da dengue** — com foto e localização GPS.

Trabalho prático da disciplina **Programação para Dispositivos Móveis (Android)**.

## 👥 Equipe

Douglas de Souza Ferreira (Mat. 202503114633)

## 🧩 Problema social

Problemas urbanos como postes apagados, buracos em vias e criadouros do mosquito
da dengue costumam demorar a ser resolvidos por falta de um canal simples para o
cidadão registrar e acompanhar a ocorrência. O **PointGov** oferece esse canal:
cada problema é documentado com **categoria, descrição, foto e coordenadas GPS** e
acompanhado por uma situação — **Aberto → Em andamento → Resolvido** — até a
resolução.

## ✨ Funcionalidades (CRUD completo)

- **Criar** — registrar um novo problema (categoria, descrição, foto da câmera/galeria e localização GPS).
- **Ler** — listar todos os problemas (com filtro por situação) e ver os detalhes de cada um.
- **Atualizar** — editar um registro e/ou alterar rapidamente sua situação.
- **Deletar** — excluir um registro (com confirmação).
- Persistência **100% local e offline** (SQLite no dispositivo).

## 🛠️ Tecnologias

| Área | Tecnologia |
|---|---|
| Framework | React Native + **Expo (SDK 54)** |
| Linguagem | TypeScript |
| Navegação | React Navigation (Bottom Tabs + Native Stack) |
| Persistência | **expo-sqlite** (SQLite local) |
| Câmera/Galeria | expo-image-picker |
| Localização | expo-location |
| Estado | React Hooks (`useState`, `useEffect`, `useFocusEffect`, hooks customizados) |

## 📁 Estrutura

```
src/
  components/   # ReportCard, ReportForm, CategoryPicker, PhotoPicker, StatusBadge, EmptyState
  screens/      # Lista, Detalhe, Criar, Editar, Sobre
  navigation/   # RootNavigator (Tabs + Stack) e tipos
  db/           # database (schema) + reportsRepository (CRUD)
  hooks/        # useReports, useReport, useLocation
  constants/    # categorias, situações, tema
  types/        # modelo de dados Report
  utils/        # formatação de data/coordenadas
```

## 🚀 Como executar

Pré-requisitos: **Node.js 18+** e o app **Expo Go** instalado no celular
(Android/iOS).

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start
```

Depois, leia o QR Code com o app **Expo Go** (Android) ou com a câmera (iOS).

> 💡 Use um **celular físico** para testar câmera e GPS reais. Em emulador, a
> localização pode ser simulada pelas configurações do emulador.

## ✅ Como testar (roteiro de demonstração)

1. **Criar**: aba *Registrar* → escolha "Buraco na via", descreva, tire uma foto, capture a localização e salve.
2. **Ler**: aba *Problemas* → o registro aparece na lista; toque para ver os detalhes.
3. **Atualizar**: na tela de detalhes, altere a situação para *Resolvido* ou toque em *Editar*.
4. **Deletar**: na tela de detalhes, *Excluir registro* → confirme.
5. **Persistência**: feche e reabra o app — os registros continuam salvos.

## 📌 Requisitos do trabalho

Especificação: <https://github.com/juliocartier/turma_android_sexta>
