# StackBlitz SDK React Wrapper
[English Version](README.md)

Um wrapper React não oficial para o SDK do StackBlitz que facilita a incorporação de editores de código interativos em aplicações React.

## Índice

- [Instalação](#instalação)
- [Visão Geral](#visão-geral)
- [Componentes](#componentes)
  - [Editor](#editor)
  - [ProjectEditor](#projecteditor)
  - [ProjectIdEditor](#projecteditor)
- [Funções Auxiliares](#funções-auxiliares)
- [Exemplos de Uso](#exemplos-de-uso)
- [API VM do StackBlitz](#api-vm-do-stackblitz)
- [Hooks Personalizados](#hooks-personalizados)

## Instalação

```bash
npm install @stackblitz/react-sdk
```

Em seguida, importe o wrapper em seus componentes:

```javascript
import {stackBlitz} from '@stackblitz/react-sdk';
```

## Visão Geral

Este wrapper fornece uma interface React para o SDK do StackBlitz, permitindo que você facilmente:

- Incorpore projetos do GitHub em sua aplicação
- Crie projetos com arquivos personalizados
- Incorpore projetos existentes do StackBlitz usando seu ID
- Interaja com o editor em tempo real através da API VM

## Componentes

### Editor

Componente para incorporar projetos do GitHub em sua aplicação.

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| embedId | string | 'stackblitz-container' | ID do elemento onde o editor será incorporado |
| github | string | - | Repositório do GitHub no formato 'usuario/repositorio' |
| openFile | string/boolean | false | Arquivo a ser aberto inicialmente |
| hideNavigation | boolean | false | Se deve ocultar a navegação |
| hideExplorer | boolean | false | Se deve ocultar o explorador de arquivos |
| view | string | 'both' | Tipo de visualização ('preview', 'editor', 'both') |
| height | string/number | 500 | Altura do editor |
| width | string/number | '100%' | Largura do editor |
| options | object | {} | Opções adicionais de configuração |
| onLoad | function | null | Callback chamado quando a VM é carregada |

#### Exemplo

```jsx
<stackBlitz.Editor
  embedId="github-editor-example"
  github="usuario/repositorio"
  openFile="README.md"
  height="400px"
  width="100%"
  view="editor"
  onLoad={(vm) => console.log('VM carregada', vm)}
/>
```

### ProjectEditor

Componente para criar projetos com arquivos personalizados.

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| embedId | string | 'stackblitz-project-editor' | ID do elemento onde o editor será incorporado |
| template | string | 'javascript' | Tipo de projeto (javascript, node, react, etc) |
| title | string | 'Projeto StackBlitz' | Título do projeto |
| description | string | '' | Descrição do projeto |
| files | object | {} | Objeto com arquivos do projeto e seus conteúdos |
| openFile | string/boolean | false | Arquivo a ser aberto inicialmente |
| hideNavigation | boolean | false | Se deve ocultar a navegação |
| hideExplorer | boolean | false | Se deve ocultar o explorador de arquivos |
| view | string | 'editor' | Tipo de visualização ('preview', 'editor', 'both') |
| height | string/number | 500 | Altura do editor |
| width | string/number | '100%' | Largura do editor |
| options | object | {} | Opções adicionais de configuração |
| onLoad | function | null | Callback chamado quando a VM é carregada |

#### Exemplo

```jsx
<stackBlitz.ProjectEditor
  embedId="custom-editor-example"
  template="node"
  title="Exemplo de Node.js"
  files={{
    'index.js': 'console.log("Olá do StackBlitz!");',
    'package.json': JSON.stringify({
      name: "node-starter",
      version: "0.0.0",
      private: true,
      scripts: {
        start: "node index.js"
      }
    }, null, 2)
  }}
  height="400px"
  width="100%"
  view="editor"
  onLoad={(vm) => console.log('VM carregada', vm)}
/>
```

### ProjectIdEditor

Componente para incorporar projetos existentes do StackBlitz usando seu ID.

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| embedId | string | 'stackblitz-project-id-editor' | ID do elemento onde o editor será incorporado |
| projectId | string | - | ID do projeto do StackBlitz a ser incorporado |
| openFile | string | - | Arquivo a ser aberto inicialmente |
| hideNavigation | boolean | false | Se deve ocultar a navegação |
| hideExplorer | boolean | false | Se deve ocultar o explorador de arquivos |
| view | string | 'editor' | Tipo de visualização ('preview', 'editor', 'both') |
| height | string/number | 500 | Altura do editor |
| width | string/number | '100%' | Largura do editor |
| options | object | {} | Opções adicionais de configuração |
| onLoad | function | null | Callback chamado quando a VM é carregada |

#### Exemplo

```jsx
<stackBlitz.ProjectIdEditor
  embedId="project-id-editor-example"
  projectId="sdk-example-project"
  openFile="index.js"
  height="500px"
  width="100%"
  view="both"
  onLoad={(vm) => console.log('VM carregada', vm)}
/>
```

## Funções Auxiliares

O wrapper também fornece funções auxiliares para abrir projetos em novas abas ou incorporá-los diretamente sem componentes React.

### openGithubProject

Abre um projeto do GitHub em uma nova aba.

```javascript
stackBlitz.openGithubProject('usuario/repositorio', {
  openFile: 'README.md'
});
```

### openProject

Abre um projeto personalizado em uma nova aba.

```javascript
stackBlitz.openProject({
  template: 'node',
  title: 'Projeto Node.js de exemplo',
  description: 'Um projeto Node.js simples',
  files: {
    'index.js': 'console.log("Olá do StackBlitz!");',
    'package.json': JSON.stringify({
      name: "node-starter",
      version: "0.0.0",
      private: true,
      scripts: {
        start: "node index.js"
      }
    }, null, 2)
  }
});
```

### openProjectId

Abre um projeto do StackBlitz pelo ID em uma nova aba.

```javascript
stackBlitz.openProjectId('sdk-example-project', {
  openFile: 'index.html',
  view: 'both'
});
```

### embedGithubProject

Incorpora um projeto do GitHub em um elemento da DOM.

```javascript
stackBlitz.embedGithubProject('element-id', 'usuario/repositorio', {
  openFile: 'README.md',
  height: 500
}).then(vm => {
  console.log('VM carregada', vm);
});
```

### embedProject

Incorpora um projeto personalizado em um elemento da DOM.

```javascript
stackBlitz.embedProject('element-id', {
  template: 'node',
  title: 'Projeto Node.js',
  files: {
    'index.js': 'console.log("Olá do StackBlitz!");'
  }
}, {
  height: 500
}).then(vm => {
  console.log('VM carregada', vm);
});
```

### embedProjectId

Incorpora um projeto do StackBlitz pelo ID em um elemento da DOM.

```javascript
stackBlitz.embedProjectId('element-id', 'sdk-example-project', {
  openFile: 'index.js',
  height: 500
}).then(vm => {
  console.log('VM carregada', vm);
});
```

## Exemplos de Uso

### Incorporando um editor do GitHub

```jsx
import React, { useCallback, useState } from 'react';
import stackBlitz from '../stackblitzEditor';

export default function ExemploGithubEditor() {
  const [log, setLog] = useState([]);
  
  const handleVmReady = useCallback((vm) => {
    setLog(prev => [...prev, 'VM inicializada com sucesso!']);
    
    // Exemplo de interação com a VM
    vm.editor.openFile('README.md');
  }, []);
  
  return (
    <div>
      <h1>Editor GitHub</h1>
      <stackBlitz.Editor
        embedId="github-editor-example"
        github="usuario/repositorio"
        openFile="README.md"
        height="400px"
        width="100%"
        view="editor"
        onLoad={handleVmReady}
      />
      <div>
        {log.map((entry, index) => <div key={index}>{entry}</div>)}
      </div>
    </div>
  );
}
```

### Criando um projeto com arquivos personalizados

```jsx
import React from 'react';
import stackBlitz from '../stackblitzEditor';

export default function ExemploProjetoCustomizado() {
  return (
    <div>
      <h1>Projeto Personalizado</h1>
      <stackBlitz.ProjectEditor
        embedId="custom-editor-example"
        template="node"
        title="Exemplo de Node.js"
        files={{
          'index.js': 'console.log("Olá do StackBlitz!");',
          'package.json': JSON.stringify({
            name: "node-starter",
            version: "0.0.0",
            private: true,
            scripts: {
              start: "node index.js"
            }
          }, null, 2)
        }}
        height="400px"
        width="100%"
        view="editor"
      />
    </div>
  );
}
```

## API VM do StackBlitz

Quando você usa o callback `onLoad`, você recebe acesso à API VM do StackBlitz, que permite interagir com o editor em tempo real.

### Principais métodos da VM

#### applyFsDiff

Aplica alterações no sistema de arquivos.

```javascript
vm.applyFsDiff({
  create: {
    'novoArquivo.js': 'console.log("Novo arquivo");'
  },
  destroy: ['arquivoAntigo.js']
});
```

#### getFsSnapshot

Obtém um snapshot atual do sistema de arquivos.

```javascript
vm.getFsSnapshot().then(files => {
  console.log('Arquivos disponíveis:', Object.keys(files));
});
```

#### editor.openFile

Abre um arquivo específico no editor.

```javascript
vm.editor.openFile('index.js');
```

#### preview.getUrl

Obtém a URL do preview.

```javascript
vm.preview.getUrl().then(url => {
  console.log('URL do preview:', url);
});
```


---

## Limitações e Considerações

- O StackBlitz SDK funciona apenas em navegadores modernos.
- Projetos muito grandes podem levar mais tempo para carregar.
---

## Contribuição

Sinta-se à vontade para contribuir com este wrapper criando issues ou pull requests.

## Licença

MIT
