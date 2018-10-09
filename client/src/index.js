import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { render } from 'inferno';
import App from './App';
import './index.css';

render(<App />, document.getElementById('app'));
