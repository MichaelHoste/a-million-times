import React    from 'react';
import ReactDOM from 'react-dom';
import Clocks   from './Clocks';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Clocks),
    document.getElementById('clocks')
  );
});
