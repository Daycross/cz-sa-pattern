const config = require('./config.js');
const inquirer = require('inquirer');

module.exports = {
  prompter: (cz, commit) => {
    const questions = [
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
        // If the scope is custom, it will be assigned with parentheses
        const scope = answers.customScope
          ? `(${answers.customScope})`
          : answers.scope
          ? `(${answers.scope})`
          : '';
      
        // If there is a breaking change, it will be formatted
        const breaking = answers.breaking ? `\n\nBREAKING CHANGE:\n${answers.breaking}` : '';
      
        // If there is a footer, it will be added to the message
        const footer = answers.footer ? `\n\n${config.footerPrefix} ${answers.footer}` : '';
      
        // Constructing the commit message without emoji
        const commitMessage = `${answers.type}${scope}: ${answers.subject}${breaking}${footer}`;
      
        // Check that 'type' and 'subject' are not empty before attempting to commit
        if (!answers.type || !answers.subject) {
          console.error('Error: O tipo e o assunto não podem estar vazios!');
          return;
        }
      
        // Performing the commit, if confirmed
        if (answers.confirmCommit) {
          commit(commitMessage);
        }
      });
  },
};
