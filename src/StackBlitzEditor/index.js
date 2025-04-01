import React, { useEffect, useRef } from 'react';
import sdk from "@stackblitz/sdk";

/**
 * Componente StackBlitz para integrar o editor StackBlitz em aplicações React
 * @param {Object} props - Propriedades do componente
 * @param {string} props.embedId - ID do elemento onde o editor será incorporado
 * @param {string} props.github - Repositório do GitHub no formato 'usuario/repositorio'
 * @param {string} props.file - Arquivo a ser aberto inicialmente
 * @param {string} props.branch - Branch a ser aberta (padrão: 'main')
 * @param {Object} props.options - Opções de configuração do editor
 * @param {boolean} props.openFile - Se deve abrir o arquivo especificado automaticamente
 * @param {boolean} props.hideNavigation - Se deve ocultar a navegação
 * @param {boolean} props.hideExplorer - Se deve ocultar o explorador de arquivos
 * @param {string} props.view - Tipo de visualização ('preview', 'editor', etc)
 * @param {string|number} props.height - Altura do editor
 * @param {string} props.width - Largura do editor
 * @param {function} props.onLoad - Callback para acesso à VM
 */
const GithubEditor = ({
  embedId = 'stackblitz-container',
  github,
  options = {},
  openFile = false,
  hideNavigation = false,
  hideExplorer = false,
  view = 'both',
  height = 500,
  width = '100%',
  onLoad = null,

}) => {
  const containerRef = useRef(null);
  const vmInitializedRef = useRef(false);

  useEffect(() => {
    if (!github || vmInitializedRef.current) return;

    // Configurar opções do editor
    const editorOptions = {
      openFile: openFile || undefined,
      hideNavigation,
      hideExplorer,
      view,
      height,
      width,
      forceEmbedLayout: true,
      clickToLoad: false,
      ...options
    };

    // Abrir projeto do GitHub com as opções corretas e capturar VM
    const vmPromise = sdk.embedGithubProject(embedId, github, editorOptions);
    
    // Acesso à VM quando estiver pronta
    if (onLoad) {
      vmPromise.then(vm => {
        // Marca que a VM já foi inicializada
        vmInitializedRef.current = true;
      
        
        // Chamar o callback fornecendo a VM 
        onLoad(vm);
      }).catch(error => {
        console.error('Erro ao carregar VM do StackBlitz:', error);
      });
    }
  }, [github, embedId]); 

  return (
    <div 
      id={embedId}
      ref={containerRef}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height, 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    />
  );
};
/**
 * Componente ProjectEditor para criar projetos com arquivos personalizados
 * @param {Object} props - Propriedades do componente
 * @param {string} props.embedId - ID do elemento onde o editor será incorporado
 * @param {string} props.template - Tipo de projeto (react, angular, etc)
 * @param {string} props.title - Título do projeto
 * @param {string} props.description - Descrição do projeto
 * @param {Object} props.files - Arquivos do projeto e seus conteúdos
 * @param {string} props.openFile - Arquivo a ser aberto inicialmente
 * @param {boolean} props.hideNavigation - Se deve ocultar a navegação
 * @param {boolean} props.hideExplorer - Se deve ocultar o explorador de arquivos
 * @param {string|number} props.height - Altura do editor
 * @param {string} props.width - Largura do editor
 * @param {string} props.view - Tipo de visualização ('preview', 'editor', etc)
 * @param {function} props.onLoad - Callback para acesso à VM
 */
const ProjectEditor = ({
  embedId = 'stackblitz-project-editor',
  template = 'javascript',
  title = 'Projeto StackBlitz',
  description = '',
  files = {},
  openFile = false,
  hideNavigation = false,
  hideExplorer = false,
  view = 'editor',
  height = 500,
  width = '100%',
  options = {},
  onLoad = null // Novo callback para VM
}) => {
  const containerRef = useRef(null);
  const initializedRef = useRef(false)

  useEffect(() => {
    if (Object.keys(files).length === 0 || initializedRef.current) return;
    
    // Marca que o projeto já foi inicializado
    initializedRef.current = true;

        // Definição do projeto
    const project = {
      template,
      title,
      description,
      files
    };

    // Opções para o editor conforme documentação oficial
    const editorOptions = {
      openFile,
      hideNavigation,
      hideExplorer,
      view,
      height, 
      width, 
      forceEmbedLayout: true,
      clickToLoad: false, 
      ...options
    };

    // Incorpora o projeto no elemento e captura a VM
    const vmPromise = sdk.embedProject(embedId, project, editorOptions);
    
    // Acesso à VM quando estiver pronta
    if (onLoad) {
      vmPromise.then(vm => {
       // Chamar o callback fornecendo a VM e projectView
        onLoad(vm);
      }).catch(error => {
        console.error('Erro ao carregar VM do StackBlitz:', error);
      });
    }
  }, [embedId, files]); 

  return (
    <div 
      id={embedId}
      ref={containerRef}
      style={{ 
        width: width,
        height: height, 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    />
  );
};



/**
 * Componente ProjectIdEditor para incorporar projetos do StackBlitz existentes pelo ID
 * @param {Object} props - Propriedades do componente
 * @param {string} props.embedId - ID do elemento onde o editor será incorporado
 * @param {string} props.projectId - ID do projeto do StackBlitz a ser incorporado
 * @param {string} props.openFile - Arquivo a ser aberto inicialmente
 * @param {boolean} props.hideNavigation - Se deve ocultar a navegação
 * @param {boolean} props.hideExplorer - Se deve ocultar o explorador de arquivos
 * @param {string|number} props.height - Altura do editor
 * @param {string} props.width - Largura do editor
 * @param {string} props.view - Tipo de visualização ('preview', 'editor', etc)
 * @param {Object} props.options - Opções adicionais de configuração
 * @param {function} props.onLoad - Callback para acesso à VM
 */
const ProjectIdEditor = ({
  embedId = 'stackblitz-project-id-editor',
  projectId,
  openFile,
  hideNavigation = false,
  hideExplorer = false,
  view = 'editor',
  height = 500,
  width = '100%',
  options = {},
  onLoad = null
}) => {
  const containerRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!projectId || initializedRef.current) return;
    
    // Marca que o projeto já foi inicializado
    initializedRef.current = true;

    // Opções para o editor conforme documentação oficial
    const editorOptions = {
      openFile: openFile || undefined,
      hideNavigation,
      hideExplorer,
      view,
      height, 
      width, 
      forceEmbedLayout: true,
      clickToLoad: false,
      ...options
    };

    // Incorpora o projeto no elemento e captura a VM
    const vmPromise = sdk.embedProjectId(embedId, projectId, editorOptions);
    
    // Acesso à VM quando estiver pronta
    if (onLoad) {
      vmPromise.then(vm => {
        // Chamar o callback fornecendo a VM
        onLoad(vm);
      }).catch(error => {
        console.error('Erro ao carregar VM do StackBlitz:', error);
      });
    }
  }, [projectId]); 

  return (
    <div 
      id={embedId}
      ref={containerRef}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height, 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    />
  );
};

/**
 * API wrapper para o StackBlitz SDK
 */
export const stackBlitz = {
  /**
   * Componente React para incorporar o editor StackBlitz baseado em GitHub
   */
  GithubEditor: GithubEditor,

  /**
   * Componente React para incorporar o editor StackBlitz com arquivos personalizados
   */
  ProjectEditor: ProjectEditor,


  /**
   * Componente React para incorporar o editor StackBlitz pelo ID do projeto
   */
    ProjectIdEditor: ProjectIdEditor,

  /**
   * Abre um projeto do GitHub em uma nova aba
   * @param {string} repo - Repositório no formato 'usuario/repositorio'
   * @param {Object} options - Opções de configuração
   */
  openGithubProject: (repo, options = {}) => {
    return sdk.openGithubProject(repo, options);
  },

  /**
   * Abre um projeto a partir de arquivos em uma nova aba
   * @param {Object} project - Configuração do projeto
   */
  openProject: (project) => {
    return sdk.openProject(project);
  },

  /**
   * Abre um projeto do StackBlitz pelo ID em uma nova aba
   * @param {string} projectId - ID do projeto StackBlitz
   * @param {Object} options - Opções de configuração
   */
    openProjectId: (projectId, options = {}) => {
      return sdk.openProjectId(projectId, options);
    },

  /**
   * Incorpora um projeto do GitHub em um elemento da DOM
   * @param {string} elementId - ID do elemento onde incorporar
   * @param {string} repo - Repositório no formato 'usuario/repositorio'
   * @param {Object} options - Opções de configuração
   */
  embedGithubProject: (elementId, repo, options = {}) => {
    return sdk.embedGithubProject(elementId, repo, options);
  },

  /**
   * Incorpora um projeto a partir de arquivos em um elemento da DOM
   * @param {string} elementId - ID do elemento onde incorporar
   * @param {Object} project - Configuração do projeto
   * @param {Object} options - Opções de configuração
   */
  embedProject: (elementId, project, options = {}) => {
    return sdk.embedProject(elementId, project, options);
  },

  /**
   * Incorpora um projeto do StackBlitz pelo ID em um elemento da DOM
   * @param {string} elementId - ID do elemento onde incorporar
   * @param {string} projectId - ID do projeto StackBlitz
   * @param {Object} options - Opções de configuração
   */
  embedProjectId: (elementId, projectId, options = {}) => {
    return sdk.embedProjectId(elementId, projectId, options);
  }
};

