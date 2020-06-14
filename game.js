const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
   state = {}
   showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)   
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
      if (showOption(option))  {
         const button = document.createElement('button')
         button.innerText = option.text
         button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
      }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)    
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if(nextTextNodeId <= 0 ){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
       id: 1,
       text: 'You wake up in your blocky treehouse. You see your wooden pickaxe on the floor.',
       options: [
           {
                text: 'Take the pickaxe',
                setState: {woodenPickaxe: true},
                nextText: 2
           },
           {
                text: 'Leave the pickaxe',
                nextText: 2
           }         
       ]
    },
    {
        id: 2,
        text: 'You climb down the ladder in the blocky treehouse and look around. You see a cave to the North, a forest to the East, an ocean to the South, and a village to the West.',
        options:[
            {
                text: 'Explore the cave to the North',
                //requiredState: (currentState) => currentState.woodenPickaxe,                
                // setState: { woodenPickaxe: true },
                nextText: 3
            },
            {
                text: 'Explore the forest to the East',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 99
            },
            {
                text: 'Explore the ocean to the South',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 99
            },
            {
                text: 'Explore the village to the West',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 99
            }
        ]
        
    },
    {
        id: 3,
        text: 'You see the opening of a small cave. It is dimly lit and you can only see 10 feet inside the cave. You see 6 blocks of coal in the cave among the stone and dirt blocks.',
        options:[
            {
                text: 'Explore the cave',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 6
            },
            {
                text: 'Mine the coal',
                requiredState: (currentState) => !(currentState.coal),
                requiredState: (currentState) => currentState.woodenPickaxe, 
                setState: { coal: true },
                nextText: 4
            },
            {
                text: 'Mine the stone',
                requiredState: (currentState) => !(currentState.stone),
                requiredState: (currentState) => currentState.woodenPickaxe,               
                setState: { stone: true },
                nextText: 5
            },
            {
                text: 'Return to treehouse',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 2
            }
        ]
        
    },
    {
        id: 4,
        text: 'You pull out your trusty wooden pickaxe and start swinging away at the coal blocks. You find 6 chunks of coal and gain a level!',
        options:[
            {
                text: 'Explore the cave',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 6
            },
            {
                text: 'Mine the coal',
                requiredState: (currentState) => !(currentState.coal),
                //setState: { coal: true },
                nextText: 4
            },
            {
                text: 'Mine the stone',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 5
            },
            {
                text: 'Return to treehouse',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 2
            }
        ]
        
    },
    {
        id: 5,
        text: 'Mine Stone.',
        options:[
            {
                text: 'Explore the cave',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 3
            },
            {
                text: 'Mine the coal',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 4
            },
            {
                text: 'Mine the stone',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 5
            },
            {
                text: 'Return to treehouse',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 2
            }
        ]
        
    }
]

startGame()