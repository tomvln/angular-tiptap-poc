const BASE_COMMANDS = {
  setAlign:
    (align) =>
    ({ commands, tr }) => {
      tr.curSelection.node.attrs.align = align;
      return commands.focus();
    },
};

const BASE_ATTRIBUTES = {
  align: {
    default: 'center',
  },
};

const filterActions = (actions, keys: string[]) =>
  Object.keys(actions)
    .filter((key: string) =>
      keys.includes(key.toLowerCase().replace(/^set/, ''))
    )
    .reduce((obj, key: string) => {
      return Object.assign(obj, {
        [key]: actions[key],
      });
    }, {});

export const getBaseActions = (actionNames: string[] = []) => {
  const filteredCommands = actionNames
    ? filterActions(BASE_COMMANDS, actionNames)
    : BASE_COMMANDS;

  const filteredAttributes = actionNames
    ? filterActions(BASE_ATTRIBUTES, actionNames)
    : BASE_ATTRIBUTES;

  return [filteredCommands, filteredAttributes];
};
