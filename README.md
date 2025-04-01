# StackBlitz SDK React Wrapper
[Versão em Português](README-pt.md)

A unofficial React wrapper for the StackBlitz SDK that makes it easy to embed interactive code editors in React applications.

## Table of Contents

- [Installation](#installation)
- [Overview](#overview)
- [Components](#components)
  - [Editor](#editor)
  - [ProjectEditor](#projecteditor)
  - [ProjectIdEditor](#projecteditor)
- [Helper Functions](#helper-functions)
- [Usage Examples](#usage-examples)
- [StackBlitz VM API](#stackblitz-vm-api)
- [Custom Hooks](#custom-hooks)

## Installation

```bash
npm install @stackblitz/react-sdk
```

Then, import the wrapper in your components:

```javascript
import {stackBlitz} from '@stackblitz/react-sdk';
```

## Overview

This wrapper provides a React interface for the StackBlitz SDK, allowing you to easily:

- Embed GitHub projects in your application
- Create projects with custom files
- Embed existing StackBlitz projects using their ID
- Interact with the editor in real-time through the VM API

## Components

### Editor

Component to embed GitHub projects in your application.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| embedId | string | 'stackblitz-container' | ID of the element where the editor will be embedded |
| github | string | - | GitHub repository in the format 'user/repository' |
| openFile | string/boolean | false | File to be initially opened |
| hideNavigation | boolean | false | Whether to hide navigation |
| hideExplorer | boolean | false | Whether to hide the file explorer |
| view | string | 'both' | View type ('preview', 'editor', 'both') |
| height | string/number | 500 | Editor height |
| width | string/number | '100%' | Editor width |
| options | object | {} | Additional configuration options |
| onLoad | function | null | Callback called when the VM is loaded |

#### Example

```jsx
<stackBlitz.Editor
  embedId="github-editor-example"
  github="user/repository"
  openFile="README.md"
  height="400px"
  width="100%"
  view="editor"
  onLoad={(vm) => console.log('VM loaded', vm)}
/>
```

### ProjectEditor

Component to create projects with custom files.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| embedId | string | 'stackblitz-project-editor' | ID of the element where the editor will be embedded |
| template | string | 'javascript' | Project type (javascript, node, react, etc.) |
| title | string | 'StackBlitz Project' | Project title |
| description | string | '' | Project description |
| files | object | {} | Object with project files and their contents |
| openFile | string/boolean | false | File to be initially opened |
| hideNavigation | boolean | false | Whether to hide navigation |
| hideExplorer | boolean | false | Whether to hide the file explorer |
| view | string | 'editor' | View type ('preview', 'editor', 'both') |
| height | string/number | 500 | Editor height |
| width | string/number | '100%' | Editor width |
| options | object | {} | Additional configuration options |
| onLoad | function | null | Callback called when the VM is loaded |

#### Example

```jsx
<stackBlitz.ProjectEditor
  embedId="custom-editor-example"
  template="node"
  title="Node.js Example"
  files={{
    'index.js': 'console.log("Hello from StackBlitz!");',
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
  onLoad={(vm) => console.log('VM loaded', vm)}
/>
```

### ProjectIdEditor

Component to embed existing StackBlitz projects using their ID.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| embedId | string | 'stackblitz-project-id-editor' | ID of the element where the editor will be embedded |
| projectId | string | - | StackBlitz project ID to be embedded |
| openFile | string | - | File to be initially opened |
| hideNavigation | boolean | false | Whether to hide navigation |
| hideExplorer | boolean | false | Whether to hide the file explorer |
| view | string | 'editor' | View type ('preview', 'editor', 'both') |
| height | string/number | 500 | Editor height |
| width | string/number | '100%' | Editor width |
| options | object | {} | Additional configuration options |
| onLoad | function | null | Callback called when the VM is loaded |

#### Example

```jsx
<stackBlitz.ProjectIdEditor
  embedId="project-id-editor-example"
  projectId="sdk-example-project"
  openFile="index.js"
  height="500px"
  width="100%"
  view="both"
  onLoad={(vm) => console.log('VM loaded', vm)}
/>
```

## Helper Functions

The wrapper also provides helper functions to open projects in new tabs or embed them directly without React components.

### openGithubProject

Opens a GitHub project in a new tab.

```javascript
stackBlitz.openGithubProject('user/repository', {
  openFile: 'README.md'
});
```

### openProject

Opens a custom project in a new tab.

```javascript
stackBlitz.openProject({
  template: 'node',
  title: 'Example Node.js Project',
  description: 'A simple Node.js project',
  files: {
    'index.js': 'console.log("Hello from StackBlitz!");',
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

Opens a StackBlitz project by ID in a new tab.

```javascript
stackBlitz.openProjectId('sdk-example-project', {
  openFile: 'index.html',
  view: 'both'
});
```

### embedGithubProject

Embeds a GitHub project in a DOM element.

```javascript
stackBlitz.embedGithubProject('element-id', 'user/repository', {
  openFile: 'README.md',
  height: 500
}).then(vm => {
  console.log('VM loaded', vm);
});
```

### embedProject

Embeds a custom project in a DOM element.

```javascript
stackBlitz.embedProject('element-id', {
  template: 'node',
  title: 'Node.js Project',
  files: {
    'index.js': 'console.log("Hello from StackBlitz!");'
  }
}, {
  height: 500
}).then(vm => {
  console.log('VM loaded', vm);
});
```

### embedProjectId

Embeds a StackBlitz project by ID in a DOM element.

```javascript
stackBlitz.embedProjectId('element-id', 'sdk-example-project', {
  openFile: 'index.js',
  height: 500
}).then(vm => {
  console.log('VM loaded', vm);
});
```

## Usage Examples

### Embedding a GitHub editor

```jsx
import React, { useCallback, useState } from 'react';
import stackBlitz from '../stackblitzEditor';

export default function GithubEditorExample() {
  const [log, setLog] = useState([]);
  
  const handleVmReady = useCallback((vm) => {
    setLog(prev => [...prev, 'VM successfully initialized!']);
    
    // Example of interacting with the VM
    vm.editor.openFile('README.md');
  }, []);
  
  return (
    <div>
      <h1>GitHub Editor</h1>
      <stackBlitz.Editor
        embedId="github-editor-example"
        github="user/repository"
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

### Creating a project with custom files

```jsx
import React from 'react';
import stackBlitz from '../stackblitzEditor';

export default function CustomProjectExample() {
  return (
    <div>
      <h1>Custom Project</h1>
      <stackBlitz.ProjectEditor
        embedId="custom-editor-example"
        template="node"
        title="Node.js Example"
        files={{
          'index.js': 'console.log("Hello from StackBlitz!");',
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

## StackBlitz VM API

When you use the `onLoad` callback, you get access to the StackBlitz VM API, which allows you to interact with the editor in real-time.

### Main VM methods

#### applyFsDiff

Applies changes to the file system.

```javascript
vm.applyFsDiff({
  create: {
    'newFile.js': 'console.log("New file");'
  },
  destroy: ['oldFile.js']
});
```

#### getFsSnapshot

Gets a current snapshot of the file system.

```javascript
vm.getFsSnapshot().then(files => {
  console.log('Available files:', Object.keys(files));
});
```

#### editor.openFile

Opens a specific file in the editor.

```javascript
vm.editor.openFile('index.js');
```

#### preview.getUrl

Gets the preview URL.

```javascript
vm.preview.getUrl().then(url => {
  console.log('Preview URL:', url);
});
```


---

## Limitations and Considerations

- The StackBlitz SDK only works in modern browsers.
- Large projects may take longer to load.
---

## Contribution

Feel free to contribute to this wrapper by creating issues or pull requests.

## License

MIT
