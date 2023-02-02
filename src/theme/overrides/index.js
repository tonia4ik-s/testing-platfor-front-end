//

import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import CssBaseline from './CssBaseline';
import Autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Input(theme),
    Paper(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    CssBaseline(theme),
    Autocomplete(theme)
  );
}
