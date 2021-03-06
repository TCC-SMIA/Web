import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.min.css';

export default createGlobalStyle`
*{
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
}

body{
   -webkit-font-smoothing: antialiased;
   ::-webkit-scrollbar{
     margin: 0;
     width:10px;
     height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-smia-hover);
    }

    ::-webkit-scrollbar-track {
    background: var(--color-smia);
    }

}

body, input, button {
   font-family: "Poppins", "Helvetica", "Arial", sans-serif;
}


a{
   text-decoration: none;
}

ul{
   list-style: none;
}

button{
   cursor: pointer;
}
:root { 
    --color-smia: #426d49;
    --color-smia-hover: #34573A;
    --color-input: #777;
    --color-placeholder: #9aa0a6;
    --color-bg-button: #0A2342;
    --color-bg-button-hover:#223854;
    --color-icons: #9aa0a6;
    --color-background: #f1f1f1;
    --color-black: rgba(0,0,0,.9);
    --color-gray: rgba(0,0,0,.6);
    --color-separator: rgba(0,0,0,0.15);
    --color-white: #fff;
    --color-hover-tooltip: #dcdcdc;
    --color-title-header: #fffafa;
    --color-title-green: #008000;
    --color-separator-border: #d3d3d3;
    --color-textarea: #fafafc;
    --color-notification: #3D3D3D;
    --header-height: 100px
  }
`;
