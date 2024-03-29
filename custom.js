// This file has the game-row and game-tile component
// It only needs to run, not be imported by main.js

const template_gametile=document.createElement('template');
template_gametile.innerHTML = `
    <style>
    :host {
        display: inline-block;
    }
    .tile {
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        line-height: 2rem;
        font-weight: bold;
        vertical-align: middle;
        box-sizing: border-box;
        color: var(--tile-text-color);
        text-transform: uppercase;
        user-select: none;
    }
    .tile::before {
        content: '';
        display: inline-block;
        padding-bottom: 100%;
    }

    /* Allow tiles to be smaller on small screens */
    @media (max-height: 600px) {
        .tile {
        font-size: 1em;
        line-height: 1em;
        }
    }

    .tile[data-state='empty'] {
        border: 2px solid var(--color-tone-4);
    }
    .tile[data-state='tbd'] {
        background-color: var(--color-tone-7);
        border: 2px solid var(--color-tone-3);
        color: var(--color-tone-1);
    }
    .tile[data-state='correct'] {
        background-color: var(--color-correct);
    }
    .tile[data-state='present'] {
        background-color: var(--color-present);
    }
    .tile[data-state='absent'] {
        background-color: var(--color-absent);
    }

    .tile[data-animation='pop'] {
        animation-name: PopIn;
        animation-duration: 100ms;
    }

    @keyframes PopIn {
        from {
        transform: scale(0.8);
        opacity: 0;
        }

        40% {
        transform: scale(1.1);
        opacity: 1;
        }
    }
    .tile[data-animation='flip-in'] {
        animation-name: FlipIn;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
    }
    @keyframes FlipIn {
        0% {
        transform: rotateX(0);
        }
        100% {
        transform: rotateX(-90deg);
        }
    }
    .tile[data-animation='flip-out'] {
        animation-name: FlipOut;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
    }
    @keyframes FlipOut {
        0% {
        transform: rotateX(-90deg);
        }
        100% {
        transform: rotateX(0);
        }
    }
    </style>
    <div>
    <slot name="letter"></slot>
    </div>
`;

const template_gamerow=document.createElement('template');
template_gamerow.innerHTML = `
    <style>
        :host {
            display: block;
        }
        :host([invalid]){
            animation-name: Shake;
            animation-duration: 600ms;
        }
        .row {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 5px;
        }
        .win {
            animation-name: Bounce;
            animation-duration: 1000ms;
        }

        @keyframes Bounce {
            0%, 20% {
            transform: translateY(0);
            }
            40% {
            transform: translateY(-30px);
            }
            50% {
            transform: translateY(5px);
            }
            60% {
            transform: translateY(-15px);
            }
            80% {
            transform: translateY(2px);
            }
            100% {
            transform: translateY(0);
            }
        }

        @keyframes Shake {
            10%,
            90% {
            transform: translateX(-1px);
            }

            20%,
            80% {
            transform: translateX(2px);
            }

            30%,
            50%,
            70% {
            transform: translateX(-4px);
            }

            40%,
            60% {
            transform: translateX(4px);
            }
        }
  </style>
  <div>
    <slot name="letters"></slot>
    </div>
`;

const template_gameapp=document.createElement('template');
template_gameapp.innerHTML = `
    <div>
    <slot name="board"></slot>
    </div>
`;

class GameTile extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode : 'open'});
        let clone = template_gametile.content.cloneNode(true);
        shadowRoot.append(clone);
    }
}
customElements.define('game-tile',GameTile);

class GameRow extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode : 'open'});
        let clone = template_gamerow.content.cloneNode(true);
        shadowRoot.append(clone);
    }
}
customElements.define('game-row',GameRow);

class GameApp extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode : 'open'});
        let clone = template_gameapp.content.cloneNode(true);
        shadowRoot.append(clone);
    }
}
customElements.define('game-app',GameApp);