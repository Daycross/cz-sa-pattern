export default {
    types: [
      { value: 'feat',     name: 'feat:     Uma nova funcionalidade' },
      { value: 'fix',      name: 'fix:      Correção de um bug' },
      { value: 'chore',    name: 'chore:    Atualização de tarefas, meios de compilação ou correção de conflitos, sem impacto no código' },
      { value: 'style',    name: 'style:    Mudança de formatação e estilos, sem alteração de código lógico' },
      { value: 'revert',   name: 'revert:   Revertendo commits/funcionalidades' },
      { value: 'refactor', name: 'refactor: Código que não adiciona funcionalidade nem corrige bug' },
      { value: 'perf',     name: 'perf:     Melhoria especificamente para ganho de desempenho' },
      { value: 'build',    name: 'build:    Alteração de build ou dependências externas' },
      { value: 'docs',     name: 'docs:     Alteração apenas na documentação' },
    ],
    scopes: [
      { name: 'store-theme' },
      { name: 'custom-theme' },
      { name: 'checkout' },
    ],
    messages: {
      type: 'Selecione o tipo do commit:',
      scope: 'Informe o escopo deste commit:',
      customScope: 'Informe o escopo personalizado (Caso necessário):',
      subject: 'Escreva uma descrição curta do commit:\n',
      body: 'Forneça uma descrição mais detalhada do commit. Use "|" para quebras de linha:\n',
      breaking: 'Liste quaisquer alterações que quebram a compatibilidade (opcional):\n',
      footer: 'Referências de issues (Por enquanto sem suporte :( ), ex.: #123:\n',
      confirmCommit: 'Confirma o commit com as informações acima?',
    },
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    footerPrefix: 'Referências:',
    subjectLimit: 72,
  };
   