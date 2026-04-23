const commitlintConfig = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.+?):\s(.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['⚙️Chore', '✨Feature', '♻️Refactor', '🐛Fix', '🖼️Assets', '🎨Style'],
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
}

export default commitlintConfig
