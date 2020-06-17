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
       text: 'You wake up in your blocky treehouse.',//. You see your wooden pickaxe on the floor.',
       options: [
           //{ 
                // requiredState: (currentState) => !(currentState.woodenPickaxe),
                // text: 'Take the pickaxe',
                // setState: {woodenPickaxe: true},
                // nextText: 2
           //},
                     
           {
               text: 'Look around',
               nextText: 101
           },
           {
            text: 'Go back to sleep',
            nextText: 100
           },
           {
            text: 'Climb down the ladder',
            nextText: 2
           },            
       ]
    },
    {
        id: 2,
        text: 'You look around. You see a cave to the North, a forest to the East, an ocean to the South, and a village to the West.',
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
                nextText: 200
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
            },
            {
                text: 'Climb up the ladder',
                //requiredState: (currentState) => currentState.woodenPickaxe,                
                // setState: { woodenPickaxe: true },
                nextText: 1
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
                requiredState: (currentState) => (!(currentState.coal) && (currentState.woodenPickaxe)),                
                setState: { coal: true },
                nextText: 4
            },
            {
                text: 'Mine the stone',
                requiredState: (currentState) => (!(currentState.stone) && (currentState.woodenPickaxe)),           
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
        text: 'You pull out your trusty wooden pickaxe and start swinging away at the coal blocks. You find 6 lumps of coal and gain a level!',
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
                setState: { coal: true },
                nextText: 4
            },
            {
                text: 'Mine the stone',
                requiredState: (currentState) => !(currentState.stone),
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
        id: 5,
        text: 'You pull out your trusty wooden pickaxe and start swinging away at the stone You find 6 blocks of cobblestone. HURRAY!',
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
                 setState: { coal: true },
                nextText: 4
            },
            {
                text: 'Mine the stone',
                requiredState: (currentState) => !(currentState.stone),
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
        id: 6,
        text: 'You start walking into the cave and it gets pitch black.',
        options:[            
            {
                text: 'Use torch',
                 requiredState: (currentState) => (currentState.torch),                 
                nextText: 7
            }, 
            {
                text: 'Push forward',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 8
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
        id: 7,
        text: 'You light your torch. After your eyes adjust you see a rather ugly zombie slowly walking towards you.',
        options:[            
            {
                text: 'Use sword',
                 requiredState: (currentState) => (currentState.stoneSword),                 
                nextText: 9
            }, 
            {
                text: 'Use sword',
                 requiredState: (currentState) => (currentState.woodenSword) && !(currentState.stoneSword),                 
                nextText: 10
            },             
            {
                text: 'Return to treehouse',
                nextText: 2
            }
        ]        
    },
    {
        id: 8,
        text: "You aren't afraid of the dark! You slowly make your way into the cave and you feel a cold slimy hand on your shoulder. Oh no! You are zombie Chow. Good thing you can't see the zombie as he eats your brains!",
        options:[                                 
            {
                text: 'Start Over',
                // requiredState: (currentState) => currentState.woodenPickaxe,
                // setState: { woodenPickaxe: true },
                nextText: 0               
            }
        ],      
    },
    {
        id: 9,
        text: "You pull out your stone sword and make quick work of the evil zombie. Brains aren't on the menu today! What's this? You find an enchanted helmet!",
        options:[                                    
            {
                text: 'Return to treehouse',                
                setState: { enchantedHelmet: true },
                nextText: 2
            }
        ]        
    },
    {
        id: 10,
        text: "You pull out your wooden sword and hack away at the evil zombie. It was a close fight, but you come out victorious! And look, you found a big chunk of rotten flesh.",
        options:[                                    
            {
                text: 'Pick up the Rotten Flesh',                
                setState: { rottenFlesh: true },
                nextText: 11
            },
            {
                text: 'Leave the Rotten Flesh',                
                setState: { rottenFlesh: false },
                nextText: 12
            }
        ]        
    },
    {
        id: 11,
        text: "That's some nice rotten flesh! That should squish nicely in my front pocket!",
        options:[                                               
            {
                text: 'Return to treehouse',                               
                nextText: 2
            }
        ]        
    },
    {
        id: 12,
        text: "Why on earth would I want to pick up a piece of rotten flesh.",
        options:[                                    
            {
                text: 'Return to treehouse',                                
                nextText: 2
            }
        ]        
    },
    {
        id: 100,
        text: 'You fall into a deep sleep.',
        options:[
            {
                 text: 'Ok',
                 //requiredState: (currentState) => currentState.woodenPickaxe,                
                 // setState: { woodenPickaxe: true },
                 nextText: 1
            },
            // {
            //     text: ''',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Explore the ocean to the South',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Explore the village to the West',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Climb up the ladder',
            //     //requiredState: (currentState) => currentState.woodenPickaxe,                
            //     // setState: { woodenPickaxe: true },
            //     nextText: 1
            // }
        ]          
    },
    {
        id: 101,
        text: 'You look around your well crafted treehouse. It truly is a thing of beauty. There is a crafting table in the center of the room. Over in the corner you see a chest.' ,
        options:[
            {
                 text: 'Open the chest',
                 requiredState: (currentState) => currentState.woodenAxe,                
                 // setState: { woodenPickaxe: true },
                 nextText: 103
            },
            {
                text: 'Open the chest',
                requiredState: (currentState) => !(currentState.woodenAxe),                
                // setState: { woodenPickaxe: true },
                nextText: 102
            },
            {
                text: 'Use crafting table',
                nextText:999
            },
            {
                 text: 'Ignore the chest',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
                 nextText: 1
            }
            // {
            //     text: 'Explore the ocean to the South',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Explore the village to the West',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Climb up the ladder',
            //     //requiredState: (currentState) => currentState.woodenPickaxe,                
            //     // setState: { woodenPickaxe: true },
            //     nextText: 1
            // }
        ]          
    },
    {
        id: 102,
        text: "You open the chest. There she is, your favorite wooden axe. She's well worn but still has a few good swings left in her.",
        options:[
            {
                 text: 'Take the axe',
                 //requiredState: (currentState) => currentState.woodenPickaxe,                
                 setState: { woodenAxe: true },
                 nextText: 101
            },
            {
                 text: 'Ignore the axe',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
                 nextText: 101
            },
            // {
            //     text: 'Explore the ocean to the South',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Explore the village to the West',
            //     // requiredState: (currentState) => currentState.woodenPickaxe,
            //     // setState: { woodenPickaxe: true },
            //     nextText: 99
            // },
            // {
            //     text: 'Climb up the ladder',
            //     //requiredState: (currentState) => currentState.woodenPickaxe,                
            //     // setState: { woodenPickaxe: true },
            //     nextText: 1
            // }
        ]
    },
    {
        id: 103,
        text: "You open the chest. Not sure what you are looking for. It's empty.",
        options:[
                    // {
                    //      text: 'Take the axe',
                    //      //requiredState: (currentState) => currentState.woodenPickaxe,                
                    //      setState: { woodenAxe: true },
                    //      nextText: 1
                    // },
                    {
                         text: 'Ok',
                    //     // requiredState: (currentState) => currentState.woodenPickaxe,
                    //     // setState: { woodenPickaxe: true },
                         nextText: 101
                    }
                    // {
                    //     text: 'Explore the ocean to the South',
                    //     // requiredState: (currentState) => currentState.woodenPickaxe,
                    //     // setState: { woodenPickaxe: true },
                    //     nextText: 99
                    // },
                    // {
                    //     text: 'Explore the village to the West',
                    //     // requiredState: (currentState) => currentState.woodenPickaxe,
                    //     // setState: { woodenPickaxe: true },
                    //     nextText: 99
                    // },
                    // {
                    //     text: 'Climb up the ladder',
                    //     //requiredState: (currentState) => currentState.woodenPickaxe,                
                    //     // setState: { woodenPickaxe: true },
                    //     nextText: 1
                    // }
                ]
    },           
             {
                id: 200,
                text: "You enter the dark oak forest. It's branches darken the sky.",
                options:[
                    // {
                    //     text: 'Explore the forest',
                    // //    setState: {},
                    //     nextText: 201
                    // },                    
                    {
                         text: 'Use your axe',
                         requiredState: (currentState) => currentState.woodenAxe && !(currentState.woodPlanks),                         
                         setState: { woodPlanks: true },
                         nextText: 202
                    },
                    {
                        text: 'Return to the treehouse',                        
                        nextText: 2
                   },
                ]
            },
            {
                id: 201,
                text: "Exploring.",
                options:[
                    {
                        text: 'Ok',
                    //    setState: {},
                        nextText: 200
                    },                                        
                ]
            },
            {
                id: 202,
                text: "You pull out your old friend. Chop... Chop... Chop... TIMBER!!! You gain a stack of wood planks. I can craft some neat stuff if I could find a crafting table.",
                options:[
                    {
                        text: 'Ok',
                    //    setState: {},
                        nextText: 200
                    },                                        
                ]
            },
            {
                id: 200,
                text: "You walk towards the village you see a creeper scareing",
                options:[
                    // {
                    //     text: 'Explore the forest',
                    // //    setState: {},
                    //     nextText: 201
                    // },                    
                    {
                         text: 'Use your axe',
                         requiredState: (currentState) => currentState.woodenAxe && !(currentState.woodPlanks),                         
                         setState: { woodPlanks: true },
                         nextText: 202
                    },
                    {
                        text: 'Return to the treehouse',                        
                        nextText: 2
                   }
                ]
            },
            {
                id: 999,
                text: "Let me see what I can build...",
                options:[
                    {
                        text: 'Craft in Wood',
                        requiredState: (currentState) => (currentState.woodPlanks),
                    //    setState: {},
                        nextText: 1001
                    },
                    {
                        text: 'Craft in Stone',
                        requiredState: (currentState) => (currentState.stone),
                    //    setState: {},
                        nextText: 1002
                    },
                    // {
                    //     text: 'Craft in Iron',
                    // //    setState: {},
                    //     nextText: 1003
                    // },
                    {
                        text: 'Back',
                        nextText: 101
                    }           
                ]
            },
            {
                id: 1001,
                text: "I love the smell of sawdust in the morning.",
                options:[
                    {
                        text: 'Craft Sticks',
                        requiredState: (currentState) => !(currentState.sticks),
                        setState: {sticks: true},
                        nextText: 1001
                    },
                    {
                        text: 'Craft Axe',
                        requiredState: (currentState) => !(currentState.woodenAxe) && (currentState.sticks),
                        setState: {woodenAxe: true},
                        nextText: 1001
                    },
                    {
                        text: 'Craft Sword',
                        requiredState: (currentState) => !(currentState.woodenSword) && (currentState.sticks),
                        setState: {woodenSword: true},
                        nextText: 1001
                    },
                    {
                        text: 'Craft Pickaxe',
                        requiredState: (currentState) => !(currentState.woodenPickaxe) && (currentState.sticks),
                        setState: {woodenPickaxe: true},
                        nextText: 1001
                    },           
                    {
                        text: 'Craft Torch',                
                        requiredState: (currentState) => (!(currentState.torch) && (currentState.coal) && (currentState.sticks)),   
                        setState: {torch: true},
                        nextText: 1001
                    },
                    {
                        text: 'Back',
                        nextText: 999
                    }

                ]
            },
            {
                id: 1002,
                text: "I don't take my crafting table for granite.",
                options:[                    
                    {
                        text: 'Craft Stone Axe',
                        requiredState: (currentState) => !(currentState.stoneAxe) && (currentState.sticks) && (currentState.stone),
                        setState: {stoneAxe: true},
                        nextText: 1002
                    },
                    {
                        text: 'Craft Stone Sword',
                        requiredState: (currentState) => !(currentState.stoneSword) && (currentState.sticks)&& (currentState.stone),
                        setState: {stoneSword: true},
                        nextText: 1002
                    },
                    {
                        text: 'Craft Stone Pickaxe',
                        requiredState: (currentState) => !(currentState.stonePickaxe) && (currentState.sticks)&& (currentState.stone),
                        setState: {stonePickaxe: true},
                        nextText: 1002
                    },                               
                    {
                        text: 'Back',
                        nextText: 999
                    }
                    
                ]
            },                                                        
]                            

startGame()