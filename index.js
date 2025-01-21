const config = require('./config.js');
const inquirer = require('inquirer');

module.exports = {
  prompter: (cz, commit) => {
    const questions = [
      {
        type: 'list',
        name: 'emoji',
        message: 'Escolha um emoji para o commit:',
        choices: config.emojis,
      },
      {
        type: 'list',
        name: 'type',
        message: config.messages.type,
        choices: config.types,
      },
      {
        type: 'list',
        name: 'scope',
        message: config.messages.scope,
        choices: [
          ...config.scopes.map(scope => scope.name),
          new inquirer.Separator(),
          'custom',
        ],
      },
      {
        type: 'input',
        name: 'customScope',
        message: config.messages.customScope,
        when: answers => answers.scope === 'custom',
      },
      {
        type: 'input',
        name: 'subject',
        message: config.messages.subject,
        validate: input =>
          input.length <= config.subjectLimit
            ? true
            : `Limite de ${config.subjectLimit} caracteres excedido.`,
      },
      {
        type: 'input',
        name: 'body',
        message: config.messages.body,
      },
      {
        type: 'input',
        name: 'breaking',
        message: config.messages.breaking,
        when: answers => config.allowBreakingChanges.includes(answers.type),
      },
      {
        type: 'input',
        name: 'footer',
        message: config.messages.footer,
      },
      {
        type: 'confirm',
        name: 'confirmCommit',
        message: config.messages.confirmCommit,
      },
    ];

    inquirer.prompt(questions).then(answers => {
      const scope = answers.customScope
        ? `(${answers.customScope})`
        : answers.scope
        ? `(${answers.scope})`
        : '';
      const breaking = answers.breaking ? `\n\nBREAKING CHANGE:\n${answers.breaking}` : '';
      const footer = answers.footer ? `\n\n${config.footerPrefix} ${answers.footer}` : '';

      const commitMessage = `${answers.emoji} ${answers.type}${scope}: ${answers.subject}${breaking}${footer}`;
      if (answers.confirmCommit) {
        commit(commitMessage);
      }
    });
  },
};
