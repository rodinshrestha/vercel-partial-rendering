import { color } from './color';

export const coreColor = {
  primary: {
    default: {
      background: color.green[200],
      color: color.black[1000],
    },
    hover: {
      background: color.black[1000],
      color: color.white[1000],
    },
    disabled: color.green[200],
  },

  secondary: {
    default: {
      background: color.black[600],
      color: color.white[1000],
    },
    hover: {
      background: color.green[200],
      color: color.black[600],
    },
    disabled: color.black[600],
  },

  sucess: {
    default: {
      background: color.green[300],
      color: color.white[1000],
    },
    hover: {
      background: color.black[600],
      color: color.white[1000],
    },
    disabled: color.green[300],
  },

  warning: {
    default: {
      background: color.yellow[200],
      color: color.black[600],
    },
    hover: {
      background: color.black[600],
      color: color.white[1000],
    },
    disabled: color.yellow[200],
  },

  info: {
    default: {
      background: color.blue[600],
      color: color.white[1000],
    },
    hover: {
      background: color.grey[300],
      color: color.black[800],
    },
    disabled: color.blue[600],
  },

  danger: {
    default: {
      background: color.red[1000],
      color: color.white[1000],
    },
    hover: {
      background: color.black[1000],
      color: color.red[900],
    },
    disabled: color.red[1000],
  },

  light: {
    default: {
      background: color.white[1000],
      color: color.black[600],
    },
    hover: {
      background: color.black[600],
      color: color.white[1000],
    },
    disabled: color.white[1000],
  },

  dark: {
    default: {
      background: color.black[600],
      color: color.white[1000],
    },
    hover: {
      background: color.grey[900],
      color: color.black[600],
    },
    disabled: color.black[600],
  },

  body: {
    default: {
      background: color.white[1000],
      color: color.black[600],
    },
    hover: {
      background: color.black[600],
      color: color.white[1000],
    },
    disabled: color.grey[300],
  },

  header: {
    default: {
      background: color.white[1000],
      color: color.black[600],
    },
  },
};
