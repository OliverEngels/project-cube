import React from 'react';
import ThreeCanvas from './code/three-canvas';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<ThreeCanvas />);